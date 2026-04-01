import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { getRandomTrophyChallenge } from "@/lib/challenges";
import { Trophy, RefreshCw, CheckCircle } from "lucide-react";

export default function TrophyChallenge() {
  const { user, completeTrophyChallenge } = useUser();
  const [current, setCurrent] = useState(() => getRandomTrophyChallenge());
  const [lastCompleted, setLastCompleted] = useState<{ brawler: string; trophies: number } | null>(null);
  const [flash, setFlash] = useState<"success" | null>(null);

  function handleComplete() {
    completeTrophyChallenge(current.brawler, current.trophies);
    setLastCompleted(current);
    setFlash("success");
    setTimeout(() => {
      setFlash(null);
      setCurrent(getRandomTrophyChallenge());
    }, 1500);
  }

  function handleReroll() {
    setCurrent(getRandomTrophyChallenge());
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black mb-2 tracking-tight">TROPHY CHALLENGE</h1>
        <p className="text-muted-foreground text-sm">
          No time limit — do as many as you want!
        </p>
      </div>

      {/* Stats */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Trophy size={20} className="text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Trophies earned from challenges</p>
          <p className="text-2xl font-black text-primary">{user.trophiesEarned}</p>
        </div>
      </div>

      {/* Challenge */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-muted-foreground mb-4">Start a Trophy Challenge</h2>
      </div>

      <div className={`bg-card border rounded-2xl p-8 mb-6 text-center transition-all duration-300 relative overflow-hidden
        ${flash === "success" ? "border-green-500/50 bg-green-500/5" : "border-border card-hover neon-border"}
      `}>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        {flash === "success" ? (
          <div className="py-4">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <p className="text-xl font-bold text-green-400">+{lastCompleted?.trophies} Trophies Earned!</p>
            <p className="text-muted-foreground text-sm">with {lastCompleted?.brawler}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Your challenge</p>
            <p className="text-3xl font-black mb-2 text-foreground">
              {current.brawler}
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Trophy size={20} className="text-primary" />
              <span className="text-2xl font-bold text-primary">{current.trophies} trophies</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Push {current.brawler} to earn {current.trophies} more trophies
            </p>
          </>
        )}
      </div>

      {!flash && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleReroll}
            className="flex flex-col items-center gap-1 px-4 py-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <RefreshCw size={20} className="text-muted-foreground" />
            <span className="font-semibold">Reroll</span>
            <span className="text-xs text-muted-foreground">(I don't have this brawler)</span>
          </button>

          <button
            onClick={handleComplete}
            className="neon-btn px-4 py-4 rounded-xl font-bold flex flex-col items-center gap-1"
          >
            <CheckCircle size={20} />
            <span>Completed</span>
            <span className="text-xs opacity-80">+5 XP</span>
          </button>
        </div>
      )}
    </div>
  );
}
