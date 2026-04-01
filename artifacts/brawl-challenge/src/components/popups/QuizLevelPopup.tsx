import { QUIZ_LEVEL_NAMES } from "@/lib/quiz";

interface Props {
  level: number;
  onClose: () => void;
}

export default function QuizLevelPopup({ level, onClose }: Props) {
  const levelName = QUIZ_LEVEL_NAMES[level - 1] || `Level ${level}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="popup-enter bg-card border border-primary/30 rounded-2xl p-8 max-w-sm w-full text-center neon-glow"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-4xl mb-4">🧠</div>
        <h2 className="text-2xl font-black mb-2">New Quiz Level!</h2>
        <p className="font-bold text-xl mb-1 quiz-tier">Tier {level} — {levelName}</p>
        <p className="text-muted-foreground text-sm mb-6 mt-3">
          You've reached a new quiz level! The challenges will be harder from now on. Good luck, brawler!
        </p>
        <button
          onClick={onClose}
          className="neon-btn px-8 py-3 rounded-xl font-bold text-lg w-full"
        >
          Bring it on!
        </button>
      </div>
    </div>
  );
}
