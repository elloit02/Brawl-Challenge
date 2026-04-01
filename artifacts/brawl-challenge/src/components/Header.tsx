import { useUser } from "@/contexts/UserContext";
import { Menu, Flame } from "lucide-react";
import { xpRequiredForLevel } from "@/lib/storage";

interface Props {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: Props) {
  const { user, xpForCurrentLevel, xpRequired } = useUser();
  const pct = Math.min(100, (xpForCurrentLevel / xpRequired) * 100);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur px-4 py-3 flex items-center gap-3">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </button>

      {/* Level bar */}
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="hidden sm:flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-lg min-w-0">
          <span className="text-xs text-muted-foreground font-medium">Level</span>
          <span className="text-sm font-bold text-primary">{user.level}</span>
          <div className="level-bar-header flex-1 hidden md:block" style={{ minWidth: 60 }}>
            <div className="xp-bar-fill h-full" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-muted-foreground hidden md:block whitespace-nowrap">
            {xpForCurrentLevel} / {xpRequired} XP
          </span>
        </div>
      </div>

      {/* Streak */}
      <div className="streak-badge flex items-center gap-1.5 px-3 py-1.5 rounded-full">
        <Flame size={14} className="text-white" />
        <span className="text-white font-bold text-sm">{user.streak} day{user.streak !== 1 ? "s" : ""}</span>
      </div>
    </header>
  );
}
