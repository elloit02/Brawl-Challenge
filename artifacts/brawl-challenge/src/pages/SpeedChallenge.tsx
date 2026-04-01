import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import ComeBackTomorrow from "@/components/ComeBackTomorrow";
import { Zap, Clock, CheckCircle, Youtube, Swords, AlertTriangle } from "lucide-react";
import { formatCountdown, getNextMidnight } from "@/lib/storage";
import { formatSeconds } from "@/lib/storage";

interface Props {
  onNavigate: (page: string) => void;
}

const SPEED_LIMIT = 5 * 60; // 5 minutes in seconds

export default function SpeedChallenge({ onNavigate }: Props) {
  const {
    user,
    getCurrentSpeedChallenge,
    activateSpeedChallenge,
    completeSpeedChallenge,
    isSpeedCompleted,
  } = useUser();

  const [countdown, setCountdown] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completed, setCompleted] = useState(isSpeedCompleted());
  const startTimeRef = useRef<number | null>(null);

  // Determine if there's an active challenge session
  const activatedAt = user.speedChallengeActivatedAt;
  const isInProgress = !!activatedAt && !isSpeedCompleted();

  useEffect(() => {
    const tick = () => {
      const ms = getNextMidnight().getTime() - Date.now();
      setCountdown(formatCountdown(ms));

      if (activatedAt && !isSpeedCompleted()) {
        const start = new Date(activatedAt).getTime();
        const elapsedSec = Math.floor((Date.now() - start) / 1000);
        const left = SPEED_LIMIT - elapsedSec;

        if (left <= 0) {
          setTimeLeft(0);
          setTimedOut(true);
          setIsActive(false);
        } else {
          setTimeLeft(left);
          setElapsed(elapsedSec);
          setIsActive(true);
          setTimedOut(false);
        }
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activatedAt, isSpeedCompleted]);

  useEffect(() => {
    setCompleted(isSpeedCompleted());
  }, [isSpeedCompleted]);

  const challenge = getCurrentSpeedChallenge();

  const diffClass = {
    Easy: "diff-easy",
    Medium: "diff-medium",
    Hard: "diff-hard",
  }[challenge.difficulty];

  function handleActivate() {
    activateSpeedChallenge();
    setIsActive(true);
    setTimedOut(false);
  }

  function handleComplete() {
    const timeTaken = elapsed || 1;
    completeSpeedChallenge(timeTaken);
    setCompleted(true);
    setShowSuccess(true);
  }

  if (completed && !showSuccess) {
    return <ComeBackTomorrow completedMode="speed" onNavigate={onNavigate} />;
  }

  if (showSuccess) {
    return (
      <div className="py-12 text-center max-w-lg mx-auto">
        <div className="text-5xl mb-4">⚡</div>
        <h2 className="text-3xl font-black mb-2 neon-text">Speed Challenge Complete!</h2>
        <p className="text-muted-foreground mb-2">
          +{challenge.xp} XP in {formatSeconds(elapsed)}!
        </p>
        <p className="text-muted-foreground mb-8 text-sm">Lightning fast, Brawler!</p>

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
            onClick={() => onNavigate("daily")}
            className="flex items-center gap-2 justify-center w-full neon-btn py-3 px-5 rounded-xl font-bold"
          >
            <Swords size={18} />
            Try the Daily Challenge!
          </button>
        </div>
      </div>
    );
  }

  const timerPct = isActive ? (timeLeft / SPEED_LIMIT) * 100 : 100;
  const timerColor = timeLeft < 60 ? "bg-red-500" : timeLeft < 120 ? "bg-yellow-400" : "bg-primary";
  const isUrgent = isActive && timeLeft < 60;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-4xl font-black tracking-tight">SPEED CHALLENGE</h1>
          <span className="new-badge">NEW</span>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          The speed challenge is only unlocked when activated. After activation you only have 5 minutes to complete the challenge.
        </p>

        {!isInProgress && !timedOut && (
          <div className="flex items-center justify-center gap-2 mt-3 bg-muted/60 px-3 py-1.5 rounded-full text-sm w-fit mx-auto">
            <Clock size={14} className="text-primary" />
            <span className="text-muted-foreground">New challenge in</span>
            <span className="font-mono font-bold text-primary">{countdown}</span>
          </div>
        )}
      </div>

      {/* Timed out */}
      {timedOut && (
        <div className="bg-destructive/10 border border-destructive/40 rounded-2xl p-6 mb-6 text-center">
          <AlertTriangle size={32} className="text-destructive mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2 text-destructive">Time's up!</h3>
          <p className="text-muted-foreground text-sm mb-3">
            You ran out of time. Come back tomorrow to try again!
          </p>
          <div className="flex items-center justify-center gap-2 bg-muted/60 px-3 py-1.5 rounded-full text-sm w-fit mx-auto">
            <span className="text-muted-foreground">New attempt in</span>
            <span className="font-mono font-bold text-primary">{countdown}</span>
          </div>
        </div>
      )}

      {/* Not activated */}
      {!isInProgress && !timedOut && (
        <div className="text-center mb-6">
          <div className="bg-card border border-border rounded-2xl p-8 mb-6">
            <Zap size={48} className="text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Ready for the speed run?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Once you activate, the challenge will be revealed and a 5-minute countdown begins immediately. Make sure you're ready!
            </p>
            <button
              onClick={handleActivate}
              className="neon-btn px-8 py-3 rounded-xl font-black text-lg"
            >
              <Zap size={18} className="inline mr-2" />
              ACTIVATE CHALLENGE
            </button>
          </div>
        </div>
      )}

      {/* Active challenge */}
      {isInProgress && !timedOut && (
        <>
          {/* Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Time remaining</span>
              <span className={`font-mono font-black text-2xl ${isUrgent ? "timer-urgent" : "text-primary"}`}>
                {formatSeconds(timeLeft)}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`${timerColor} h-full rounded-full transition-all duration-1000 ease-linear`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 neon-border relative overflow-hidden">
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
              Complete this before the timer runs out!
            </p>
          </div>

          <button
            onClick={handleComplete}
            className="w-full neon-btn px-6 py-4 rounded-xl font-black text-lg"
          >
            <CheckCircle size={20} className="inline mr-2" />
            DONE — CHALLENGE COMPLETED!
          </button>
        </>
      )}
    </div>
  );
}
