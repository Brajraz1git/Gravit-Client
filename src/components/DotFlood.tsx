// WhiteDotsFlood.tsx
import React, { useEffect, useRef } from "react";

interface WhiteDotsFloodProps {
  dotCount?: number;     // how many dots
  maxRadius?: number;    // max dot radius in px
  speed?: number;        // base movement speed
}

type Dot = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
};

const WhiteDotsFlood: React.FC<WhiteDotsFloodProps> = ({
  dotCount = 160,
  maxRadius = 2.2,
  speed = 0.25,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  // Resize canvas to fill parent
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

  // Init dots
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    const dots: Dot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const r = Math.random() * maxRadius + 0.4;
      const angle = Math.random() * Math.PI * 2;
      const v = speed * (0.5 + Math.random()); // slightly varied speed
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
      });
    }

    dotsRef.current = dots;
  }, [dotCount, maxRadius, speed]);

  // Animate dots
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "white";
      ctx.globalAlpha = 0.85;

      for (const dot of dotsRef.current) {
        // Move
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap around edges (infinite flood)
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0,
        pointerEvents: "none", // allows clicks through background
        mixBlendMode: "screen",
      }}
    />
  );
};

export default WhiteDotsFlood;
