import { useEffect, useState } from "react";

interface Props {
  level: number;
  onClose: () => void;
}

export default function LevelUpPopup({ level, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = requestAnimationFrame(() => setVisible(true));
    const t2 = setTimeout(handleClose, 5000);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
    };
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 99997,
          transition: "opacity 0.25s",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99998,
          pointerEvents: "none",
          padding: "1rem",
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: "all",
            background: "hsl(220 20% 12%)",
            border: "1px solid hsl(199 89% 48% / 0.4)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            maxWidth: "340px",
            width: "100%",
            textAlign: "center",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s",
            transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(24px)",
            opacity: visible ? 1 : 0,
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏆</div>

          <p style={{ color: "hsl(210 40% 70%)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Level up!
          </p>

          <p style={{ color: "hsl(210 40% 95%)", fontSize: "4rem", fontWeight: 900, lineHeight: 1, marginBottom: "0.5rem" }}>
            {level}
          </p>

          <p style={{ color: "hsl(210 40% 60%)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
            You reached level {level}. Keep it up!
          </p>

          <button
            onClick={handleClose}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background: "hsl(199 89% 48%)",
              color: "hsl(220 20% 8%)",
              fontWeight: 800,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Let's go!
          </button>
        </div>
      </div>
    </>
  );
}
