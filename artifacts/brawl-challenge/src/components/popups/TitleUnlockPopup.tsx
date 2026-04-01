import { ALL_TITLES } from "@/lib/storage";

interface Props {
  title: string;
  onClose: () => void;
  onEquip: (title: string) => void;
}

export default function TitleUnlockPopup({ title, onClose, onEquip }: Props) {
  const titleInfo = ALL_TITLES.find(t => t.id === title);

  return (
    <div className="modal-backdrop">
      <div className="popup-enter bg-card border border-primary/30 rounded-2xl p-8 max-w-sm w-full text-center neon-glow">
        <div className="text-4xl mb-4">🎖️</div>
        <h2 className="text-2xl font-black mb-2">New Title Unlocked!</h2>
        <div className="inline-block title-badge-active px-4 py-2 rounded-full font-bold text-lg mb-4">
          {title}
        </div>
        {titleInfo && (
          <p className="text-muted-foreground text-sm mb-6">{titleInfo.desc}</p>
        )}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-semibold border border-border bg-secondary hover:bg-secondary/80 transition-colors text-foreground"
          >
            OK
          </button>
          <button
            onClick={() => onEquip(title)}
            className="flex-1 neon-btn px-4 py-3 rounded-xl font-bold"
          >
            Equip
          </button>
        </div>
      </div>
    </div>
  );
}
