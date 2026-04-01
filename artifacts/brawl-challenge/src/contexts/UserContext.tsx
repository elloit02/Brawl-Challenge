import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  UserData,
  loadUserData,
  saveUserData,
  addXP,
  updateStreak,
  checkTitleUnlocks,
  checkQuizLevelUp,
  checkRerollReset,
  xpRequiredForLevel,
  getTodayDate,
  isToday,
} from "@/lib/storage";
import { DAILY_CHALLENGES, SPEED_CHALLENGES, Challenge } from "@/lib/challenges";
import Confetti from "@/components/Confetti";
import LevelUpPopup from "@/components/popups/LevelUpPopup";
import TitleUnlockPopup from "@/components/popups/TitleUnlockPopup";
import QuizLevelPopup from "@/components/popups/QuizLevelPopup";

interface UserContextType {
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
  earnXP: (amount: number) => void;
  getCurrentDailyChallenge: () => Challenge;
  getCurrentSpeedChallenge: () => Challenge;
  rerollDailyChallenge: () => boolean;
  completeDailyChallenge: () => void;
  completeSpeedChallenge: (timeTaken: number) => void;
  activateSpeedChallenge: () => void;
  isDailyCompleted: () => boolean;
  isSpeedCompleted: () => boolean;
  isQuizDailyDone: () => boolean;
  submitQuizAnswer: (correct: boolean) => { xpGained: number; quizLeveledUp: boolean; newQuizLevel: number };
  completeTrophyChallenge: (brawler: string, trophies: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  xpForCurrentLevel: number;
  xpRequired: number;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(loadUserData);
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelUpPopup, setLevelUpPopup] = useState<{ show: boolean; level: number }>({ show: false, level: 1 });
  const [titlePopups, setTitlePopups] = useState<string[]>([]);
  const [quizLevelPopup, setQuizLevelPopup] = useState<{ show: boolean; level: number }>({ show: false, level: 1 });

  // Apply reroll reset on mount
  useEffect(() => {
    setUser(prev => {
      const updated = checkRerollReset(prev);
      saveUserData(updated);
      return updated;
    });
  }, []);

  // Apply dark/light mode class on body
  useEffect(() => {
    if (user.darkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [user.darkMode]);

  const updateUser = useCallback((data: Partial<UserData>) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      saveUserData(updated);
      return updated;
    });
  }, []);

  const earnXP = useCallback((amount: number) => {
    setUser(prev => {
      const { data: afterXP, leveledUp, newLevel } = addXP(prev, amount);
      const { data: afterTitles, newTitles } = checkTitleUnlocks(afterXP);
      saveUserData(afterTitles);

      if (leveledUp) {
        setShowConfetti(true);
        setLevelUpPopup({ show: true, level: newLevel });
        setTimeout(() => setShowConfetti(false), 4000);
      }
      if (newTitles.length > 0) {
        setTitlePopups(prev => [...prev, ...newTitles]);
      }

      return afterTitles;
    });
  }, []);

  const getCurrentDailyIndex = useCallback((userData: UserData): number => {
    if (userData.currentDailyIndex >= 0) return userData.currentDailyIndex;
    // Pick a random one from unused
    const used = userData.usedDailyIndices || [];
    const total = DAILY_CHALLENGES.length;
    const unused = Array.from({ length: total }, (_, i) => i).filter(i => !used.includes(i));
    if (unused.length === 0) {
      // All used - reset
      const idx = Math.floor(Math.random() * total);
      return idx;
    }
    return unused[Math.floor(Math.random() * unused.length)];
  }, []);

  const getCurrentDailyChallenge = useCallback((): Challenge => {
    const idx = getCurrentDailyIndex(user);
    return DAILY_CHALLENGES[idx] || DAILY_CHALLENGES[0];
  }, [user, getCurrentDailyIndex]);

  const getCurrentSpeedChallenge = useCallback((): Challenge => {
    const idx = user.currentSpeedIndex >= 0 ? user.currentSpeedIndex : 0;
    return SPEED_CHALLENGES[idx] || SPEED_CHALLENGES[0];
  }, [user]);

  const rerollDailyChallenge = useCallback((): boolean => {
    if (user.rerollsLeft <= 0) return false;
    setUser(prev => {
      const used = prev.usedDailyIndices || [];
      const total = DAILY_CHALLENGES.length;
      const unused = Array.from({ length: total }, (_, i) => i).filter(
        i => !used.includes(i) && i !== prev.currentDailyIndex
      );
      let newIdx: number;
      if (unused.length === 0) {
        newIdx = Math.floor(Math.random() * total);
      } else {
        newIdx = unused[Math.floor(Math.random() * unused.length)];
      }
      const updated = {
        ...prev,
        rerollsLeft: prev.rerollsLeft - 1,
        currentDailyIndex: newIdx,
      };
      saveUserData(updated);
      return updated;
    });
    return true;
  }, [user.rerollsLeft]);

  const completeDailyChallenge = useCallback(() => {
    setUser(prev => {
      const today = getTodayDate();
      const challenge = DAILY_CHALLENGES[prev.currentDailyIndex >= 0 ? prev.currentDailyIndex : 0];
      const used = [...(prev.usedDailyIndices || [])];
      if (prev.currentDailyIndex >= 0 && !used.includes(prev.currentDailyIndex)) {
        used.push(prev.currentDailyIndex);
      }

      const historyEntry = {
        id: Date.now().toString(),
        date: today,
        challenge: challenge?.text || "",
        difficulty: challenge?.difficulty || "Easy",
        xp: challenge?.xp || 50,
        completedAt: new Date().toISOString(),
      };

      let updated = {
        ...prev,
        dailyChallengeDate: today,
        totalChallengesCompleted: prev.totalChallengesCompleted + 1,
        usedDailyIndices: used,
        currentDailyIndex: -1,
        dailyHistory: [historyEntry, ...prev.dailyHistory],
      };

      updated = updateStreak(updated);

      const { data: afterXP, leveledUp, newLevel } = addXP(updated, challenge?.xp || 50);
      const { data: afterTitles, newTitles } = checkTitleUnlocks(afterXP);
      saveUserData(afterTitles);

      if (leveledUp) {
        setShowConfetti(true);
        setLevelUpPopup({ show: true, level: newLevel });
        setTimeout(() => setShowConfetti(false), 4000);
      }
      if (newTitles.length > 0) {
        setTitlePopups(p => [...p, ...newTitles]);
      }

      return afterTitles;
    });
  }, []);

  const activateSpeedChallenge = useCallback(() => {
    setUser(prev => {
      const used = prev.usedSpeedIndices || [];
      const total = SPEED_CHALLENGES.length;
      const unused = Array.from({ length: total }, (_, i) => i).filter(i => !used.includes(i));
      const idx = unused.length > 0
        ? unused[Math.floor(Math.random() * unused.length)]
        : Math.floor(Math.random() * total);
      const updated = {
        ...prev,
        speedChallengeActivatedAt: new Date().toISOString(),
        currentSpeedIndex: idx,
      };
      saveUserData(updated);
      return updated;
    });
  }, []);

  const completeSpeedChallenge = useCallback((timeTaken: number) => {
    setUser(prev => {
      const today = getTodayDate();
      const challenge = SPEED_CHALLENGES[prev.currentSpeedIndex >= 0 ? prev.currentSpeedIndex : 0];
      const used = [...(prev.usedSpeedIndices || [])];
      if (prev.currentSpeedIndex >= 0 && !used.includes(prev.currentSpeedIndex)) {
        used.push(prev.currentSpeedIndex);
      }

      const historyEntry = {
        id: Date.now().toString(),
        date: today,
        challenge: challenge?.text || "",
        difficulty: challenge?.difficulty || "Easy",
        xp: challenge?.xp || 50,
        completedAt: new Date().toISOString(),
        timeTaken,
      };

      let updated = {
        ...prev,
        speedChallengeDate: today,
        speedChallengeActivatedAt: null,
        totalChallengesCompleted: prev.totalChallengesCompleted + 1,
        speedTimeTotal: (prev.speedTimeTotal || 0) + timeTaken,
        usedSpeedIndices: used,
        currentSpeedIndex: -1,
        speedHistory: [historyEntry, ...prev.speedHistory],
      };

      updated = updateStreak(updated);

      const { data: afterXP, leveledUp, newLevel } = addXP(updated, challenge?.xp || 50);
      const { data: afterTitles, newTitles } = checkTitleUnlocks(afterXP);
      saveUserData(afterTitles);

      if (leveledUp) {
        setShowConfetti(true);
        setLevelUpPopup({ show: true, level: newLevel });
        setTimeout(() => setShowConfetti(false), 4000);
      }
      if (newTitles.length > 0) {
        setTitlePopups(p => [...p, ...newTitles]);
      }

      return afterTitles;
    });
  }, []);

  const isDailyCompleted = useCallback((): boolean => {
    return isToday(user.dailyChallengeDate);
  }, [user.dailyChallengeDate]);

  const isSpeedCompleted = useCallback((): boolean => {
    return isToday(user.speedChallengeDate);
  }, [user.speedChallengeDate]);

  const isQuizDailyDone = useCallback((): boolean => {
    return isToday(user.quizDailyDate) && (user.quizDailyCount ?? 0) >= 10;
  }, [user.quizDailyDate, user.quizDailyCount]);

  const submitQuizAnswer = useCallback((correct: boolean): { xpGained: number; quizLeveledUp: boolean; newQuizLevel: number } => {
    let xpGained = 0;
    let quizLeveledUp = false;
    let newQuizLevel = user.quizLevel;

    setUser(prev => {
      const today = getTodayDate();
      const todayCount = isToday(prev.quizDailyDate) ? (prev.quizDailyCount || 0) : 0;

      let updated = { ...prev };
      updated.quizDailyDate = today;
      updated.quizDailyCount = todayCount + 1;
      updated.quizTotal = (prev.quizTotal || 0) + 1;

      if (correct) {
        updated.quizCorrect = (prev.quizCorrect || 0) + 1;
        xpGained = 10; // small XP per correct answer
      }

      const { data: afterQuizLevel, leveledUp, newLevel } = checkQuizLevelUp(updated);
      if (leveledUp) {
        quizLeveledUp = true;
        newQuizLevel = newLevel;
        setQuizLevelPopup({ show: true, level: newLevel });
      }

      const { data: afterXP, leveledUp: xpLeveledUp, newLevel: xpLevel } = addXP(afterQuizLevel, xpGained);
      const { data: afterTitles, newTitles } = checkTitleUnlocks(afterXP);
      saveUserData(afterTitles);

      if (xpLeveledUp) {
        setShowConfetti(true);
        setLevelUpPopup({ show: true, level: xpLevel });
        setTimeout(() => setShowConfetti(false), 4000);
      }
      if (newTitles.length > 0) {
        setTitlePopups(p => [...p, ...newTitles]);
      }

      return afterTitles;
    });

    return { xpGained, quizLeveledUp, newQuizLevel };
  }, [user.quizLevel]);

  const completeTrophyChallenge = useCallback((brawler: string, trophies: number) => {
    setUser(prev => {
      const xpGained = 5; // small XP, unlimited mode
      const updated = {
        ...prev,
        trophiesEarned: (prev.trophiesEarned || 0) + trophies,
      };
      const { data: afterXP } = addXP(updated, xpGained);
      const { data: afterTitles } = checkTitleUnlocks(afterXP);
      saveUserData(afterTitles);
      return afterTitles;
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setUser(prev => {
      const updated = { ...prev, darkMode: !prev.darkMode };
      saveUserData(updated);
      return updated;
    });
  }, []);

  // Initialize daily challenge index if needed
  useEffect(() => {
    if (user.currentDailyIndex < 0 && !isDailyCompleted()) {
      setUser(prev => {
        if (prev.currentDailyIndex >= 0) return prev;
        const used = prev.usedDailyIndices || [];
        const total = DAILY_CHALLENGES.length;
        const unused = Array.from({ length: total }, (_, i) => i).filter(i => !used.includes(i));
        const idx = unused.length > 0
          ? unused[Math.floor(Math.random() * unused.length)]
          : Math.floor(Math.random() * total);
        const updated = { ...prev, currentDailyIndex: idx };
        saveUserData(updated);
        return updated;
      });
    }
  }, []);

  const xpRequired = xpRequiredForLevel(user.level);

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      earnXP,
      getCurrentDailyChallenge,
      getCurrentSpeedChallenge,
      rerollDailyChallenge,
      completeDailyChallenge,
      completeSpeedChallenge,
      activateSpeedChallenge,
      isDailyCompleted,
      isSpeedCompleted,
      isQuizDailyDone,
      submitQuizAnswer,
      completeTrophyChallenge,
      darkMode: user.darkMode,
      toggleDarkMode,
      xpForCurrentLevel: user.xp,
      xpRequired,
    }}>
      {children}
      {showConfetti && <Confetti />}
      {levelUpPopup.show && (
        <LevelUpPopup
          level={levelUpPopup.level}
          onClose={() => setLevelUpPopup({ show: false, level: 1 })}
        />
      )}
      {titlePopups.length > 0 && (
        <TitleUnlockPopup
          title={titlePopups[0]}
          onClose={() => setTitlePopups(prev => prev.slice(1))}
          onEquip={(title) => {
            updateUser({ activeTitle: title });
            setTitlePopups(prev => prev.slice(1));
          }}
        />
      )}
      {quizLevelPopup.show && (
        <QuizLevelPopup
          level={quizLevelPopup.level}
          onClose={() => setQuizLevelPopup({ show: false, level: 1 })}
        />
      )}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
