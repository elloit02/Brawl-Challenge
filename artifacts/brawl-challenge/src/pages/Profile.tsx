import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { ALL_TITLES, formatSeconds } from "@/lib/storage";
import { QUIZ_LEVEL_NAMES, QUIZ_LEVEL_THRESHOLDS } from "@/lib/quiz";
import {
  Edit2, Check, Sun, Moon, Trophy, Flame, Brain, Zap,
  Target, Clock, Award, Youtube, MessageCircle, Star
} from "lucide-react";

export default function Profile() {
  const { user, updateUser, toggleDarkMode, darkMode } = useUser();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  const accuracy = user.quizTotal > 0
    ? Math.round((user.quizCorrect / user.quizTotal) * 100)
    : 0;

  const quizLevelName = QUIZ_LEVEL_NAMES[(user.quizLevel || 1) - 1] || "Starter";
  const nextThreshold = QUIZ_LEVEL_THRESHOLDS[user.quizLevel] ?? null;
  const dailyCount = (user.dailyHistory || []).length;

  // Challenge progress
  const challengeTier = getChallengesTier(dailyCount);
  const nextTier = getNextChallengesTier(dailyCount);

  function getChallengesTier(count: number) {
    if (count >= 50) return { name: "Challenge God", level: 5 };
    if (count >= 30) return { name: "Challenge God", level: 4, next: 50 };
    if (count >= 10) return { name: "Veteran", level: 3, next: 30 };
    if (count >= 5) return { name: "Challenger", level: 2, next: 10 };
    return { name: "Rookie", level: 1, next: 5 };
  }

  function getNextChallengesTier(count: number) {
    if (count >= 50) return null;
    if (count >= 30) return { name: "Challenge God", at: 50 };
    if (count >= 10) return { name: "Challenge God", at: 30 };
    if (count >= 5) return { name: "Veteran", at: 10 };
    return { name: "Challenger", at: 5 };
  }

  const challengeNextAt = challengeTier.next ?? (nextTier?.at ?? null);
  const challengePct = challengeNextAt
    ? (dailyCount / challengeNextAt) * 100
    : 100;

  // Quiz progress
  const quizPct = nextThreshold
    ? ((user.quizCorrect || 0) / nextThreshold) * 100
    : 100;

  function saveName() {
    if (nameInput.trim()) {
      updateUser({ name: nameInput.trim() });
    }
    setEditing(false);
  }

  function handleEquipTitle(titleId: string) {
    updateUser({ activeTitle: titleId });
  }

  const isUnlocked = (titleId: string) => (user.titlesUnlocked || ["No Title"]).includes(titleId);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile header */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        {/* Name & avatar row */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <span className="text-2xl font-black text-primary">
              {user.level}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && saveName()}
                  className="flex-1 bg-muted border border-border rounded-lg px-3 py-1.5 text-sm font-bold focus:outline-none focus:border-primary"
                  autoFocus
                  maxLength={20}
                />
                <button onClick={saveName} className="neon-btn p-2 rounded-lg">
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black truncate">{user.name}</h2>
                <button onClick={() => { setNameInput(user.name); setEditing(true); }} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  <Edit2 size={14} />
                </button>
              </div>
            )}

            {/* Titles */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ALL_TITLES.map(t => {
                const unlocked = isUnlocked(t.id);
                const active = user.activeTitle === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => unlocked && handleEquipTitle(t.id)}
                    disabled={!unlocked}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                      active
                        ? "title-badge-active ring-1 ring-primary/50"
                        : unlocked
                        ? "bg-muted text-muted-foreground hover:bg-muted/60"
                        : "title-badge-locked cursor-not-allowed"
                    }`}
                    title={unlocked ? t.desc : `🔒 ${t.desc}`}
                  >
                    {!unlocked && <span className="mr-1">🔒</span>}
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 bg-muted hover:bg-muted/60 px-3 py-1.5 rounded-full transition-colors text-sm font-medium shrink-0"
          >
            {darkMode ? <Moon size={14} className="text-primary" /> : <Sun size={14} className="text-yellow-400" />}
            <span className="hidden sm:inline">{darkMode ? "Dark" : "Light"}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Lifetime Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {[
          { icon: <Star size={20} className="text-primary" />, value: user.xp + (user.level > 1 ? (user.level - 1) * 125 : 0), label: "Total XP" },
          { icon: <Target size={20} className="text-blue-400" />, value: user.totalChallengesCompleted || 0, label: "Challenges" },
          { icon: <Brain size={20} className="text-purple-400" />, value: user.quizCorrect || 0, label: "Quiz Correct" },
          { icon: <Zap size={20} className="text-yellow-400" />, value: `${accuracy}%`, label: "Quiz Accuracy" },
          { icon: <Flame size={20} className="text-orange-400" />, value: user.streak || 0, label: "Day Streak" },
          { icon: <Trophy size={20} className="text-yellow-500" />, value: user.trophiesEarned || 0, label: "Trophies" },
          { icon: <Clock size={20} className="text-cyan-400" />, value: formatSeconds(user.speedTimeTotal || 0), label: "Speed Time" },
          { icon: <Award size={20} className="text-pink-400" />, value: (user.titlesUnlocked || ["No Title"]).length, label: "Titles" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center card-hover">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-2xl font-black leading-none mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Challenge Progress */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Challenge Progress</h3>
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Challenge Tier</p>
            <p className="font-black text-lg text-primary">{challengeTier.name.toUpperCase()}</p>
          </div>
          <p className="text-muted-foreground text-sm font-semibold">{dailyCount} completed</p>
        </div>
        <div className="progress-bar mb-1">
          <div className="progress-fill" style={{ width: `${Math.min(100, challengePct)}%` }} />
        </div>
        {nextTier && (
          <p className="text-xs text-muted-foreground text-center">
            {Math.max(0, (challengeNextAt || 0) - dailyCount)} more to reach {nextTier.name}
          </p>
        )}
      </div>

      {/* Quiz Progress */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Quiz Progress</h3>
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Quiz Tier</p>
            <p className="font-black text-lg quiz-tier">Tier {user.quizLevel} — {quizLevelName.toUpperCase()}</p>
          </div>
          <p className="text-muted-foreground text-sm font-semibold">{user.quizCorrect || 0} correct</p>
        </div>
        <div className="progress-bar mb-1">
          <div className="progress-fill" style={{ width: `${Math.min(100, quizPct)}%` }} />
        </div>
        {nextThreshold && (
          <p className="text-xs text-muted-foreground text-center">
            Answer questions correctly to advance tiers
          </p>
        )}
      </div>

      {/* Social links */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://www.youtube.com/@ELLOit2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 rounded-xl p-4 transition-colors"
        >
          <Youtube size={20} className="text-red-500" />
          <div>
            <p className="text-xs text-muted-foreground">Support the Creator</p>
            <p className="font-bold text-sm">Watch ELLOit2 on YouTube</p>
          </div>
        </a>
        <a
          href="https://discord.gg/ErQfemV6ps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 rounded-xl p-4 transition-colors"
        >
          <MessageCircle size={20} className="text-[#5865F2]" />
          <div>
            <p className="text-xs text-muted-foreground">Join the Community</p>
            <p className="font-bold text-sm">Join our Discord server</p>
          </div>
        </a>
      </div>
    </div>
  );
}
