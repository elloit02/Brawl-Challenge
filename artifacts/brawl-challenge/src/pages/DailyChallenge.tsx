import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import ComeBackTomorrow from "@/components/ComeBackTomorrow";
import { RotateCcw, CheckCircle, Flame, Clock, Youtube, Zap } from "lucide-react";
import { getNextMidnight, formatCountdown } from "@/lib/storage";

interface Props {
  onNavigate: (page: string) => void;
}

export default function DailyChallenge({ onNavigate }: Props) {
  const { user, getCurrentDailyChallenge, rerollDailyChallenge, completeDailyChallenge, isDailyCompleted } = useUser();
  const [countdown, setCountdown] = useState("");
  const [rerollCountdown, setRerollCountdown] = useState("");
  const [completed, setCompleted] = useState(isDailyCompleted());
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const tick = () => {
      const ms = getNextMidnight().getTime() - Date.now();
      setCountdown(formatCountdown(ms));

      // Reroll reset countdown (7 days from rerollResetDate)
      if (user.rerollResetDate) {
        const resetAt = new Date(user.rerollResetDate);
        resetAt.setDate(resetAt.getDate() + 7);
        const resetMs = resetAt.getTime() - Date.now();
        if (resetMs > 0) {
          const days = Math.floor(resetMs / (1000 * 60 * 60 * 24));
          const h = Math.floor((resetMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          setRerollCountdown(`${days}d ${h}h`);
        } else {
          setRerollCountdown("soon");
        }
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [user.rerollResetDate]);

  useEffect(() => {
    setCompleted(isDailyCompleted());
  }, [isDailyCompleted]);

  const challenge = getCurrentDailyChallenge();

  const diffClass = {
    Easy: "diff-easy",
    Medium: "diff-medium",
    Hard: "diff-hard",
  }[challenge.difficulty];

  function handleComplete() {
    completeDailyChallenge();
    setCompleted(true);
    setShowSuccess(true);
  }

  function handleReroll() {
    rerollDailyChallenge();
  }

  if (completed && !showSuccess) {
    return <ComeBackTomorrow completedMode="daily" onNavigate={onNavigate} />;
  }

  if (showSuccess) {
    return (
      <div className="py-12 text-center max-w-lg mx-auto">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-black mb-2 neon-text">Challenge Complete!</h2>
        <p className="text-muted-foreground mb-2">+{challenge.xp} XP earned</p>
        <p className="text-muted-foreground mb-8 text-sm">Come back tomorrow for a new challenge!</p>

        <div className="space-y-3 mb-8">
          <a
            href="https://www.youtube.com/@ELLOit2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-5 rounded-xl transition-colors"
          >
            <Youtube size={18} />
            Watch Amazing Brawl Stars Content!
          </a>
          <button
            onClick={() => onNavigate("speed")}
            className="flex items-center gap-2 justify-center w-full neon-btn py-3 px-5 rounded-xl font-bold"
          >
            <Zap size={18} />
            Try the Speed Challenge!
          </button>
        </div>

        <button
          onClick={() => setShowSuccess(false)}
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          View completed state
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          DAILY CHALLENGE
        </h1>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-full text-sm">
            <Clock size={14} className="text-primary" />
            <span className="text-muted-foreground">New challenge in</span>
            <span className="font-mono font-bold text-primary">{countdown}</span>
          </div>
          <div className="flex items-center gap-2 streak-badge px-3 py-1.5 rounded-full text-sm text-white">
            <Flame size={14} />
            <span className="font-bold">{user.streak} day streak</span>
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 card-hover neon-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffClass}`}>
            {challenge.difficulty.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 text-primary">
            <span className="font-bold text-lg">+{challenge.xp}</span>
            <span className="text-sm font-semibold">XP</span>
          </div>
        </div>

        <p className="text-xl font-bold text-center py-6 leading-relaxed">
          "{challenge.text}"
        </p>

        <p className="text-center text-muted-foreground text-xs tracking-widest uppercase">
          Prove your worth, Brawler
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleReroll}
          disabled={user.rerollsLeft <= 0}
          className="flex-1 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border border-border bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            <RotateCcw size={16} />
            <span className="font-semibold">REROLL</span>
          </div>
          <span className="text-xs text-muted-foreground">{user.rerollsLeft}/3 left</span>
        </button>

        <button
          onClick={handleComplete}
          className="flex-2 flex-1 neon-btn px-6 py-3 rounded-xl font-black text-sm tracking-wide"
        >
          <CheckCircle size={16} className="inline mr-2" />
          CHALLENGE COMPLETED
        </button>
      </div>

      {user.rerollResetDate && (
        <p className="text-center text-xs text-muted-foreground">
          Rerolls reset in <span className="text-primary font-semibold">{rerollCountdown}</span>
        </p>
      )}
    </div>
  );
}
