import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
}

const COLORS = [
  "#29b6f6", "#00e5ff", "#4fc3f7",
  "#f9ca24", "#f0932b",
  "#ffffff", "#a78bfa",
  "#6ab04c", "#eb4d4b",
];

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Create particles spread across the top
    const particles: Particle[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * -200,          // start above viewport
      vx: (Math.random() - 0.5) * 3,   // slight horizontal drift
      vy: Math.random() * 3 + 2,        // fall speed
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      width: Math.random() * 10 + 6,
      height: Math.random() * 6 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 1,
    }));

    const startTime = Date.now();
    const duration = 4500; // ms

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      let anyVisible = false;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.99; // air resistance
        p.rotation += p.rotationSpeed;

        // Fade out in the last third
        if (progress > 0.6) {
          p.opacity = Math.max(0, 1 - (progress - 0.6) / 0.4);
        }

        if (p.y < H + 20 && p.opacity > 0) {
          anyVisible = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
          ctx.restore();
        }
      }

      if (elapsed < duration || anyVisible) {
        animRef.current = requestAnimationFrame(draw);
      }
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}
