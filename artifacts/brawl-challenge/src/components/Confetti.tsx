import { useEffect, useRef } from "react";

const COLORS = ["#29b6f6", "#00e5ff", "#4fc3f7", "#81d4fa", "#f9ca24", "#f0932b", "#eb4d4b", "#6ab04c", "#ffffff", "#a78bfa"];

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 160;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = Math.random() * 12 + 6;
      const isRect = Math.random() < 0.6;
      const duration = Math.random() * 3 + 2.5;
      const delay = Math.random() * 1.5;
      const startX = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 200;
      const rotation = Math.random() * 720 - 360;

      const keyframes = `
        @keyframes confettiFall_${i} {
          0%   { transform: translateX(0) translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateX(${drift}px) translateY(110vh) rotate(${rotation}deg); opacity: 0.2; }
        }
      `;
      const style = document.createElement("style");
      style.textContent = keyframes;
      document.head.appendChild(style);

      Object.assign(el.style, {
        position: "fixed",
        width: `${size}px`,
        height: `${isRect ? size * 2 : size}px`,
        background: color,
        borderRadius: isRect ? "2px" : "50%",
        zIndex: "99999",
        pointerEvents: "none",
        top: "-20px",
        left: `${startX}%`,
        animation: `confettiFall_${i} ${duration}s ${delay}s ease-in forwards`,
      });

      container.appendChild(el);
      particles.push(el);

      return () => style.remove();
    }

    const timer = setTimeout(() => {
      particles.forEach(p => p.remove());
    }, 5500);

    return () => {
      clearTimeout(timer);
      particles.forEach(p => {
        try { p.remove(); } catch {}
      });
    };
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }} />;
}
