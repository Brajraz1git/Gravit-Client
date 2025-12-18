// TinyShootingStars.tsx
import React, { useEffect, useRef } from "react";

interface TinyShootingStarsProps {
  starCount?: number;     // how many normal stars
  shootingCount?: number; // max concurrent shooting stars
  backgroundAlpha?: number;
}

type Star = {
  x: number;
  y: number;
  r: number;
  twinkle: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
};

const TinyShootingStars: React.FC<TinyShootingStarsProps> = ({
  starCount = 140,
  shootingCount = 3,
  backgroundAlpha = 0.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();

  // Resize canvas to parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width ?? window.innerWidth;
      canvas.height = rect?.height ?? window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Init base stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    starsRef.current = stars;
  }, [starCount]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spawnShootingStar = () => {
      const { width, height } = canvas;
      // Spawn near top-left, moving diagonally down-right
      const startX = Math.random() * width * 0.4;
      const startY = Math.random() * height * 0.3;
      const speed = 5 + Math.random() * 4;
      const angle = (Math.PI / 180) * (20 + Math.random() * 15); // ~20°–35°
      shootingRef.current.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
      });
    };

    let lastSpawn = 0;

    const render = (time: number) => {
      const { width, height } = canvas;

      // Semi-transparent clear for a slight trail effect
      ctx.fillStyle = `rgba(0, 0, 10, ${backgroundAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // Normal stars with subtle twinkle
      ctx.save();
      ctx.fillStyle = "#ffffff";
      for (const star of starsRef.current) {
        star.twinkle += 0.02;
        const alpha = 0.4 + Math.sin(star.twinkle) * 0.3;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Shooting stars
      if (
        shootingRef.current.length < shootingCount &&
        time - lastSpawn > 1200 + Math.random() * 1800
      ) {
        spawnShootingStar();
        lastSpawn = time;
      }

      shootingRef.current = shootingRef.current.filter((s) => s.life > 0);
      for (const s of shootingRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;

        // Remove if off screen
        if (s.x > width + 100 || s.y > height + 100) s.life = 0;

        const trailLength = 40;

        const dx = -s.vx;
        const dy = -s.vy;
        const mag = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = (dx / mag) * trailLength;
        const uy = (dy / mag) * trailLength;

        const tailX = s.x + ux;
        const tailY = s.y + uy;

        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255,255,255,${0.9 * s.life})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [backgroundAlpha, shootingCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default TinyShootingStars;
