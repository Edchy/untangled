"use client";

import { useEffect, useRef } from "react";

// A single large switch (reuses the motif from switch-illustration) next to
// a dense field of tiny marks suggesting 15 billion transistors.
export function TransistorFieldIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 400, H = 320;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#0a0a0a";

    // Dense field of 0s and 1s fading into noise
    ctx.font = "bold 7px monospace";
    ctx.textAlign = "center";

    const cols = 46, rows = 38;
    const cellW = W / cols, cellH = H / rows;

    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
      };
    };
    const rand = rng(42);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH * 0.7;

        // Fade: brighter near center, dim at edges
        const distX = Math.abs(col / cols - 0.5) * 2;
        const distY = Math.abs(row / rows - 0.5) * 2;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const opacity = Math.max(0.03, 0.22 - dist * 0.18) * (0.6 + rand() * 0.4);

        ctx.globalAlpha = opacity;
        ctx.fillStyle = fg;
        ctx.fillText(rand() > 0.5 ? "1" : "0", x, y);
      }
    }
    ctx.globalAlpha = 1;

    // Highlight a small cluster near center-left to suggest "one transistor"
    const hx = W * 0.28, hy = H * 0.5;
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "#d85a30";
    ctx.font = "bold 9px monospace";
    ctx.fillText("1", hx, hy);
    ctx.globalAlpha = 1;
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
      {/* One switch */}
      <div className="flex flex-col items-center gap-3">
        <svg
          viewBox="0 0 200 130"
          xmlns="http://www.w3.org/2000/svg"
          className="w-40"
          aria-hidden
        >
          <defs>
            <filter id="tf-roughen" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="17" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <g filter="url(#tf-roughen)" strokeLinecap="round" strokeLinejoin="round" stroke="var(--foreground)" strokeWidth="2">
            <line x1="10" y1="78" x2="60" y2="78" />
            <line x1="60" y1="64" x2="60" y2="92" />
            <circle cx="60" cy="78" r="4" fill="var(--foreground)" stroke="none" />
            <line x1="60" y1="78" x2="130" y2="78" />
            <circle cx="130" cy="78" r="4" fill="none" stroke="var(--foreground)" />
            <line x1="130" y1="64" x2="130" y2="92" />
            <line x1="130" y1="78" x2="186" y2="78" />
          </g>
        </svg>
        <span className="text-center text-xs font-semibold uppercase tracking-widest text-foreground/40">
          one transistor
        </span>
      </div>

      {/* Field */}
      <div className="flex flex-col items-center gap-3">
        <canvas ref={canvasRef} aria-hidden style={{ width: 400, height: 320 }} className="block" />
        <span className="text-center text-xs font-semibold uppercase tracking-widest text-foreground/40">
          15,000,000,000 transistors
        </span>
      </div>
    </div>
  );
}
