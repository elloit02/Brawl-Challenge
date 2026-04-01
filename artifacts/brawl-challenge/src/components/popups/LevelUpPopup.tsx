interface Props {
  level: number;
  onClose: () => void;
}

export default function LevelUpPopup({ level, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="popup-enter bg-card border border-primary/30 rounded-2xl p-8 max-w-sm w-full text-center neon-glow"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🏆</div>
        <h2 className="text-3xl font-black mb-2 neon-text">LEVEL UP!</h2>
        <p className="text-muted-foreground text-sm mb-1">You've reached</p>
        <p className="text-5xl font-black text-primary mb-6">Level {level}</p>
        <p className="text-muted-foreground text-sm mb-6">
          Keep completing challenges to level up faster!
        </p>
        <button
          onClick={onClose}
          className="neon-btn px-8 py-3 rounded-xl font-bold text-lg w-full"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
