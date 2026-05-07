"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

export function TransistorFieldIllustration() {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground-canvas").trim() || "#0a0a0a";

    const cellSize = 14;
    const cols = Math.ceil(W / cellSize) + 1;
    const rows = Math.ceil(H / cellSize) + 1;

    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
      };
    };
    const rand = rng(42);

    ctx.font = `bold 9px monospace`;
    ctx.textAlign = "center";
    ctx.fillStyle = fg;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize * 0.8;
        const opacity = 0.12 + rand() * 0.32;
        ctx.globalAlpha = opacity;
        ctx.fillText(rand() > 0.5 ? "1" : "0", x, y);
      }
    }
    ctx.globalAlpha = 1;
  }, [theme]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        maskImage: "radial-gradient(ellipse 80% 80% at 65% 50%, transparent 30%, black 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 65% 50%, transparent 30%, black 100%)",
      }}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
