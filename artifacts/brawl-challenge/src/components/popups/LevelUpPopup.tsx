import { useEffect, useState } from "react";

interface Props {
  level: number;
  onClose: () => void;
}

export default function LevelUpPopup({ level, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // slight delay to allow CSS enter animation
    requestAnimationFrame(() => setVisible(true));

    // auto-close after 6 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[99998] px-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          pointerEvents: "all",
          transition: "opacity 0.3s",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "relative",
          pointerEvents: "all",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)",
          opacity: visible ? 1 : 0,
        }}
        className="bg-card border-2 border-primary/60 rounded-3xl p-10 max-w-sm w-full text-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "1.5rem",
            background: "conic-gradient(from 0deg, #29b6f6, #00e5ff, #a78bfa, #29b6f6)",
            zIndex: -1,
            filter: "blur(8px)",
            opacity: 0.6,
          }}
        />

        <div className="text-6xl mb-4" style={{ filter: "drop-shadow(0 0 16px gold)" }}>🏆</div>

        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-1">
          Congratulations!
        </p>

        <h2
          className="text-4xl font-black mb-3"
          style={{
            background: "linear-gradient(90deg, #29b6f6, #00e5ff, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LEVEL UP!
        </h2>

        <div
          className="text-7xl font-black my-4 text-primary"
          style={{ textShadow: "0 0 30px #29b6f6, 0 0 60px #29b6f6" }}
        >
          {level}
        </div>

        <p className="text-muted-foreground text-sm mb-2">
          You've reached <span className="text-foreground font-bold">Level {level}</span>!
        </p>
        <p className="text-muted-foreground text-xs mb-8">
          Keep completing challenges and quizzes to keep climbing!
        </p>

        <button
          onClick={handleClose}
          className="neon-btn px-8 py-3 rounded-xl font-black text-lg w-full"
        >
          Let's Go! 🔥
        </button>

        <p className="text-xs text-muted-foreground mt-3 opacity-60">Closes automatically in a few seconds</p>
      </div>
    </div>
  );
}
