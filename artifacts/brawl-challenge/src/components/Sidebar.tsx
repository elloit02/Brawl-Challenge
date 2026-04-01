import { useUser } from "@/contexts/UserContext";
import {
  Swords, Zap, Trophy, Brain, Clock, User, Info, X, Youtube, MessageCircle
} from "lucide-react";
import logoUrl from "/logo.png";
import elloPfp from "/ello-profile.png";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "daily", label: "Daily Challenge", icon: <Swords size={18} /> },
  {
    id: "speed",
    label: "Speed Challenge",
    icon: <Zap size={18} />,
    badge: <span className="new-badge ml-auto">NEW</span>,
  },
  { id: "trophy", label: "Trophy Challenge", icon: <Trophy size={18} /> },
  { id: "quiz", label: "Quiz Mode", icon: <Brain size={18} /> },
  { id: "history", label: "History", icon: <Clock size={18} /> },
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "about", label: "About", icon: <Info size={18} /> },
];

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }: Props) {
  const { user } = useUser();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 z-50 flex flex-col
        bg-[hsl(220_20%_9%)] border-r border-border
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Close button (mobile) */}
      <button
        className="absolute top-4 right-4 md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
        onClick={onClose}
      >
        <X size={18} />
      </button>

      {/* Logo */}
      <div className="p-5 pb-3 flex items-center gap-3">
        <img src={logoUrl} alt="Brawl Challenge" className="w-10 h-10 rounded-lg object-cover" />
        <div>
          <h1 className="font-black text-base leading-tight neon-text tracking-tight">BRAWL</h1>
          <h1 className="font-black text-base leading-tight neon-text tracking-tight">CHALLENGE</h1>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${activePage === item.id
                ? "nav-active text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }
            `}
          >
            <span className={activePage === item.id ? "text-primary" : "text-muted-foreground"}>
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge}
          </button>
        ))}
      </nav>

      {/* Promotions */}
      <div className="p-3 space-y-2 border-t border-border">
        <a
          href="https://www.youtube.com/@ELLOit2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
        >
          <img src={elloPfp} alt="ELLOit2" className="w-8 h-8 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">CREATOR</p>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">ELLOit2</p>
          </div>
          <Youtube size={14} className="text-red-500 ml-auto shrink-0" />
        </a>

        <a
          href="https://discord.gg/ErQfemV6ps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center shrink-0">
            <MessageCircle size={15} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">COMMUNITY</p>
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">Discord Server</p>
          </div>
        </a>
      </div>
    </aside>
  );
}
