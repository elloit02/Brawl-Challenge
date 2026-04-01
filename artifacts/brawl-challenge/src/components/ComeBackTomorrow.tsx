import { useEffect, useState } from "react";
import { getNextMidnight, formatCountdown } from "@/lib/storage";
import { Youtube, Zap, Swords, Brain } from "lucide-react";

interface Props {
  completedMode: "daily" | "speed" | "quiz" | "all";
  onNavigate: (page: string) => void;
}

export default function ComeBackTomorrow({ completedMode, onNavigate }: Props) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const tick = () => {
      const ms = getNextMidnight().getTime() - Date.now();
      setCountdown(formatCountdown(ms));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const recommendations = [];
  if (completedMode !== "daily" && completedMode !== "all") {
    recommendations.push({ id: "daily", label: "Daily Challenge", icon: <Swords size={16} /> });
  }
  if (completedMode !== "speed" && completedMode !== "all") {
    recommendations.push({ id: "speed", label: "Speed Challenge", icon: <Zap size={16} /> });
  }
  if (completedMode !== "quiz" && completedMode !== "all") {
    recommendations.push({ id: "quiz", label: "Quiz Mode", icon: <Brain size={16} /> });
  }

  return (
    <div className="text-center py-12 px-4">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-black mb-2">You're done for today!</h2>
      <p className="text-muted-foreground mb-2">Come back tomorrow for a new challenge.</p>

      <div className="inline-flex items-center gap-2 bg-muted/60 rounded-xl px-4 py-2 mb-8">
        <span className="text-muted-foreground text-sm">Resets in</span>
        <span className="font-mono font-bold text-primary text-lg">{countdown}</span>
      </div>

      {recommendations.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">Try these in the meantime:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {recommendations.map(rec => (
              <button
                key={rec.id}
                onClick={() => onNavigate(rec.id)}
                className="flex items-center gap-2 neon-btn px-4 py-2.5 rounded-xl font-semibold text-sm"
              >
                {rec.icon}
                {rec.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-5 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground mb-3">
          While you wait, watch some amazing Brawl Stars content!
        </p>
        <a
          href="https://www.youtube.com/@ELLOit2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 justify-center bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
        >
          <Youtube size={18} />
          Watch ELLOit2 on YouTube
        </a>
      </div>
    </div>
  );
}
