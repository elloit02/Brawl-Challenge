import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Clock, Swords, Zap, CheckCircle, XCircle } from "lucide-react";
import { formatSeconds } from "@/lib/storage";

export default function History() {
  const { user } = useUser();
  const [tab, setTab] = useState<"daily" | "speed">("daily");

  const dailyHistory = user.dailyHistory || [];
  const speedHistory = user.speedHistory || [];

  function formatDate(dateStr: string): string {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  }

  const diffClass = (diff: string) => {
    if (diff === "Easy") return "diff-easy";
    if (diff === "Medium") return "diff-medium";
    return "diff-hard";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-1">PAST CHALLENGES</h1>
        <p className="text-muted-foreground">Your glorious history of combat and triumph.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 bg-muted/50 rounded-xl p-1">
        <button
          onClick={() => setTab("daily")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            tab === "daily"
              ? "bg-card text-primary shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Swords size={15} />
          Daily Challenges
        </button>
        <button
          onClick={() => setTab("speed")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            tab === "speed"
              ? "bg-card text-primary shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Zap size={15} />
          Speed Challenges
        </button>
      </div>

      {/* Daily history */}
      {tab === "daily" && (
        <div className="space-y-3">
          {dailyHistory.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Swords size={40} className="mx-auto mb-3 opacity-30" />
              <p>No daily challenges completed yet.</p>
              <p className="text-sm mt-1">Complete your first one to see it here!</p>
            </div>
          ) : (
            dailyHistory.map(item => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 card-hover"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle size={16} className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs text-muted-foreground">{formatDate(item.completedAt || item.date)}</span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffClass(item.difficulty)}`}>
                      {item.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-semibold text-sm truncate">"{item.challenge}"</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Reward</p>
                  <p className="font-black text-primary">{item.xp} XP</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Speed history */}
      {tab === "speed" && (
        <div className="space-y-3">
          {speedHistory.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Zap size={40} className="mx-auto mb-3 opacity-30" />
              <p>No speed challenges completed yet.</p>
              <p className="text-sm mt-1">Activate your first speed challenge!</p>
            </div>
          ) : (
            speedHistory.map(item => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4 card-hover"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs text-muted-foreground">{formatDate(item.completedAt || item.date)}</span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffClass(item.difficulty)}`}>
                      {item.difficulty.toUpperCase()}
                    </span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {formatSeconds(item.timeTaken)}
                    </span>
                  </div>
                  <p className="font-semibold text-sm truncate">"{item.challenge}"</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Reward</p>
                  <p className="font-black text-primary">{item.xp} XP</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
