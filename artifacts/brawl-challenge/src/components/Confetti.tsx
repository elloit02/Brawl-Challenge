import { useEffect, useRef } from "react";

const COLORS = ["#29b6f6", "#00e5ff", "#4fc3f7", "#81d4fa", "#f9ca24", "#f0932b", "#eb4d4b", "#6ab04c"];

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const isLeft = i < count / 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = Math.random() * 10 + 6;
      const duration = Math.random() * 2.5 + 2;
      const delay = Math.random() * 1;

      Object.assign(el.style, {
        position: "fixed",
        width: `${size}px`,
        height: `${size * (Math.random() < 0.5 ? 1 : 2)}px`,
        background: color,
        borderRadius: "2px",
        zIndex: "9999",
        pointerEvents: "none",
        top: `${Math.random() * -20}px`,
        left: isLeft
          ? `${Math.random() * 30}%`
          : `${70 + Math.random() * 30}%`,
        animation: `confettiFall ${duration}s ${delay}s linear forwards`,
      });

      container.appendChild(el);
      particles.push(el);
    }

    const timer = setTimeout(() => {
      particles.forEach(p => p.remove());
    }, 4500);

    return () => {
      clearTimeout(timer);
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} />;
}
