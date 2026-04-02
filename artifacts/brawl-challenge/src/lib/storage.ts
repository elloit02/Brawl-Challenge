// ─── Local Storage Keys ───────────────────────────────────────────────────────
const KEY = "brawl_challenge_v1";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DailyChallengeHistory {
  id: string;
  date: string; // ISO date string
  challenge: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  completedAt: string;
}

export interface SpeedChallengeHistory {
  id: string;
  date: string;
  challenge: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  completedAt: string;
  timeTaken: number; // seconds
}

export interface UserData {
  name: string;
  xp: number;
  level: number;
  streak: number;
  lastStreakDate: string | null;
  totalChallengesCompleted: number;
  quizCorrect: number;
  quizTotal: number;
  quizLevel: number; // 1-4
  quizDailyCount: number;
  quizDailyDate: string | null;
  trophiesEarned: number;
  speedTimeTotal: number; // seconds spent on speed challenges
  titlesUnlocked: string[];
  activeTitle: string;
  dailyChallengeUsedIndex: number;
  speedChallengeUsedIndex: number;
  rerollsLeft: number;
  rerollResetDate: string | null;
  dailyChallengeDate: string | null; // date of last daily challenge
  speedChallengeDate: string | null; // date of last speed challenge
  speedChallengeActivatedAt: string | null;
  speedChallengeCurrentIndex: number;
  currentDailyIndex: number;
  currentSpeedIndex: number;
  dailyHistory: DailyChallengeHistory[];
  speedHistory: SpeedChallengeHistory[];
  darkMode: boolean;
  usedDailyIndices: number[];
  usedSpeedIndices: number[];
  // Trophy challenge — persisted so navigation never resets it
  currentTrophyBrawler: string | null;
  currentTrophyTrophies: number | null;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

export function getDefaultUserData(): UserData {
  return {
    name: "Brawler",
    xp: 0,
    level: 1,
    streak: 0,
    lastStreakDate: null,
    totalChallengesCompleted: 0,
    quizCorrect: 0,
    quizTotal: 0,
    quizLevel: 1,
    quizDailyCount: 0,
    quizDailyDate: null,
    trophiesEarned: 0,
    speedTimeTotal: 0,
    titlesUnlocked: ["No Title"],
    activeTitle: "No Title",
    dailyChallengeUsedIndex: -1,
    speedChallengeUsedIndex: -1,
    rerollsLeft: 3,
    rerollResetDate: null,
    dailyChallengeDate: null,
    speedChallengeDate: null,
    speedChallengeActivatedAt: null,
    speedChallengeCurrentIndex: -1,
    currentDailyIndex: -1,
    currentSpeedIndex: -1,
    dailyHistory: [],
    speedHistory: [],
    darkMode: true,
    usedDailyIndices: [],
    usedSpeedIndices: [],
    currentTrophyBrawler: null,
    currentTrophyTrophies: null,
  };
}

// ─── Storage Functions ────────────────────────────────────────────────────────

export function loadUserData(): UserData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return getDefaultUserData();
    const parsed = JSON.parse(raw);
    // Merge with defaults to handle new fields
    return { ...getDefaultUserData(), ...parsed };
  } catch {
    return getDefaultUserData();
  }
}

export function saveUserData(data: UserData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage might be full, ignore
  }
}

// ─── XP & Level ──────────────────────────────────────────────────────────────

export function xpRequiredForLevel(level: number): number {
  // Starts at 50 XP for level 1, grows by 15% each level
  return Math.round(50 * Math.pow(1.15, level - 1));
}

export function addXP(data: UserData, amount: number): { data: UserData; leveledUp: boolean; newLevel: number } {
  let newData = { ...data };
  newData.xp += amount;
  let leveledUp = false;

  while (newData.xp >= xpRequiredForLevel(newData.level)) {
    newData.xp -= xpRequiredForLevel(newData.level);
    newData.level += 1;
    leveledUp = true;
  }

  return { data: newData, leveledUp, newLevel: newData.level };
}

// ─── Date Helpers ─────────────────────────────────────────────────────────────

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return dateStr === getTodayDate();
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return d1.toISOString().split("T")[0] === d2.toISOString().split("T")[0];
}

export function isYesterday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().split("T")[0];
}

// ─── Streak ───────────────────────────────────────────────────────────────────

export function updateStreak(data: UserData): UserData {
  const today = getTodayDate();
  if (data.lastStreakDate === today) return data;

  const newData = { ...data };
  if (isYesterday(data.lastStreakDate)) {
    newData.streak = (newData.streak || 0) + 1;
  } else {
    newData.streak = 1;
  }
  newData.lastStreakDate = today;
  return newData;
}

// ─── Titles ───────────────────────────────────────────────────────────────────

export const ALL_TITLES = [
  { id: "No Title",        label: "No Title",        desc: "Free — no unlock needed",           multiplier: 1,   multiplierLabel: "1x XP" },
  { id: "Challenger",      label: "Challenger",      desc: "Complete 5 daily challenges",       multiplier: 1.5, multiplierLabel: "1.5x XP" },
  { id: "Quiz Master",     label: "Quiz Master",     desc: "Reach Quiz Tier 3",                 multiplier: 2,   multiplierLabel: "2x XP" },
  { id: "Challenge Master",label: "Challenge Master",desc: "Reach a 30-day daily streak",       multiplier: 2.5, multiplierLabel: "2.5x XP" },
  { id: "Quiz God",        label: "Quiz God",        desc: "Reach the final quiz tier",         multiplier: 3,   multiplierLabel: "3x XP" },
  { id: "Challenge God",   label: "Challenge God",   desc: "Complete 50 daily challenges",      multiplier: 5,   multiplierLabel: "5x XP" },
];

export function getXPMultiplier(activeTitle: string): number {
  const title = ALL_TITLES.find(t => t.id === activeTitle);
  return title?.multiplier ?? 1;
}

export function applyTitleMultiplier(baseXP: number, activeTitle: string): number {
  return Math.round(baseXP * getXPMultiplier(activeTitle));
}

export function checkTitleUnlocks(data: UserData): { data: UserData; newTitles: string[] } {
  const newTitles: string[] = [];
  const unlocked = new Set(data.titlesUnlocked);

  const dailyCount = data.dailyHistory.length;

  if (!unlocked.has("Challenger") && dailyCount >= 5) {
    newTitles.push("Challenger");
    unlocked.add("Challenger");
  }
  if (!unlocked.has("Quiz Master") && data.quizLevel >= 3) {
    newTitles.push("Quiz Master");
    unlocked.add("Quiz Master");
  }
  if (!unlocked.has("Challenge Master") && data.streak >= 30) {
    newTitles.push("Challenge Master");
    unlocked.add("Challenge Master");
  }
  if (!unlocked.has("Quiz God") && data.quizLevel >= 4) {
    newTitles.push("Quiz God");
    unlocked.add("Quiz God");
  }
  if (!unlocked.has("Challenge God") && dailyCount >= 50) {
    newTitles.push("Challenge God");
    unlocked.add("Challenge God");
  }

  return {
    data: { ...data, titlesUnlocked: Array.from(unlocked) },
    newTitles,
  };
}

// ─── Quiz Level ───────────────────────────────────────────────────────────────

export function getQuizLevelThreshold(level: number): number {
  // Level 1 starts at 0, level 2 at 5, level 3 at 10, level 4 at 20
  const thresholds = [0, 5, 10, 20];
  return thresholds[level - 1] ?? 999;
}

export function checkQuizLevelUp(data: UserData): { data: UserData; leveledUp: boolean; newLevel: number } {
  let newData = { ...data };
  let leveledUp = false;
  const maxLevel = 4;

  while (newData.quizLevel < maxLevel) {
    const nextThreshold = getQuizLevelThreshold(newData.quizLevel + 1);
    if (newData.quizCorrect >= nextThreshold) {
      newData.quizLevel += 1;
      leveledUp = true;
    } else {
      break;
    }
  }

  return { data: newData, leveledUp, newLevel: newData.quizLevel };
}

// ─── Reroll Reset ─────────────────────────────────────────────────────────────

export function checkRerollReset(data: UserData): UserData {
  if (!data.rerollResetDate) {
    return { ...data, rerollsLeft: 3, rerollResetDate: getTodayDate() };
  }
  const resetDate = new Date(data.rerollResetDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays >= 7) {
    return { ...data, rerollsLeft: 3, rerollResetDate: getTodayDate() };
  }
  return data;
}

// ─── Next Reset Time ──────────────────────────────────────────────────────────

export function getNextMidnight(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}
