"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

// Decorative field of ~50 tiny switch-and-gate circuits.
// Pure canvas, no interaction, aria-hidden.
export function GateFieldIllustration() {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let raf: number;
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const W = 400, H = 480;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const fg = "#737373";      // mid-gray, readable on both light and dark
      const accent = "#5fa898"; // muted teal, visible on both themes

    // Seeded RNG for stable layout
    let seed = 7;
    function rand() {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    }
    function randRange(lo: number, hi: number) { return lo + rand() * (hi - lo); }
    function randInt(lo: number, hi: number) { return Math.floor(randRange(lo, hi + 1)); }

    // ── Drawing primitives (tiny scale, ~1px strokes) ──────────────────────────

    function tinySwitch(x: number, y: number, on: boolean, alpha: number, isAccent: boolean) {
      const color = isAccent ? accent : fg;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = on ? 1.1 : 0.8;

      // Left lead → left node
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 7, y); ctx.stroke();
      // Left node dot
      ctx.beginPath(); ctx.arc(x + 7, y, 1.5, 0, Math.PI * 2); ctx.fill();
      // Right node dot
      ctx.beginPath(); ctx.arc(x + 16, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = on ? color : "transparent";
      ctx.fill();
      ctx.strokeStyle = color; ctx.stroke();
      // Arm
      if (on) {
        ctx.beginPath(); ctx.moveTo(x + 7, y); ctx.lineTo(x + 16, y); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.moveTo(x + 7, y); ctx.lineTo(x + 14, y - 6); ctx.stroke();
      }
      // Right lead
      ctx.beginPath(); ctx.moveTo(x + 16, y); ctx.lineTo(x + 23, y); ctx.stroke();

      ctx.globalAlpha = 1;
    }

    // AND gate (D-shape, tiny)
    function andGate(x: number, y: number, w: number, h: number, active: boolean, alpha: number, isAccent: boolean) {
      const color = isAccent && active ? accent : fg;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = active ? 1.1 : 0.75;
      ctx.beginPath();
      ctx.moveTo(x, y - h / 2);
      ctx.lineTo(x, y + h / 2);
      ctx.bezierCurveTo(x + w * 1.6, y + h / 2, x + w * 1.6, y - h / 2, x, y - h / 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // OR gate (curved back + shield, tiny)
    function orGate(x: number, y: number, w: number, h: number, active: boolean, alpha: number, isAccent: boolean) {
      const color = isAccent && active ? accent : fg;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = active ? 1.1 : 0.75;
      ctx.beginPath();
      ctx.moveTo(x, y - h / 2);
      ctx.quadraticCurveTo(x + w * 0.35, y, x, y + h / 2);
      ctx.bezierCurveTo(x + w * 1.6, y + h / 2, x + w * 1.6, y - h / 2, x, y - h / 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // NOT gate (triangle + bubble, tiny)
    function notGate(x: number, y: number, w: number, h: number, active: boolean, alpha: number, isAccent: boolean) {
      const color = isAccent && active ? accent : fg;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = active ? 1.1 : 0.75;
      ctx.beginPath();
      ctx.moveTo(x, y - h / 2);
      ctx.lineTo(x, y + h / 2);
      ctx.lineTo(x + w, y);
      ctx.closePath();
      ctx.stroke();
      // bubble
      ctx.beginPath();
      ctx.arc(x + w + 2.5, y, 2.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Wire (any direction)
    function wire(x1: number, y1: number, x2: number, y2: number, active: boolean, alpha: number, isAccent: boolean) {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = isAccent && active ? accent : fg;
      ctx.lineWidth = active ? 1.1 : 0.7;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Tiny bulb
    function bulb(x: number, y: number, on: boolean, alpha: number, isAccent: boolean) {
      const color = isAccent && on ? accent : fg;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = on ? 1.1 : 0.75;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.stroke();
      if (on) {
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * 0.25;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = alpha;
      }
      ctx.globalAlpha = 1;
    }

    // ── Circuit generators ─────────────────────────────────────────────────────

    type Circuit = (x: number, y: number, alpha: number, isAccent: boolean) => void;

    // Single switch → gate → bulb (two inputs for AND/OR, one for NOT)
    const singleAND: Circuit = (x, y, alpha, ac) => {
      const a = rand() > 0.5, b = rand() > 0.5, out = a && b;
      tinySwitch(x, y - 7, a, alpha, ac);
      tinySwitch(x, y + 7, b, alpha, ac);
      wire(x + 23, y - 7, x + 30, y - 7, a, alpha, ac);
      wire(x + 23, y + 7, x + 30, y + 7, b, alpha, ac);
      andGate(x + 30, y, 14, 18, out, alpha, ac);
      wire(x + 52, y, x + 62, y, out, alpha, ac);
      bulb(x + 67, y, out, alpha, ac);
    };

    const singleOR: Circuit = (x, y, alpha, ac) => {
      const a = rand() > 0.5, b = rand() > 0.5, out = a || b;
      tinySwitch(x, y - 7, a, alpha, ac);
      tinySwitch(x, y + 7, b, alpha, ac);
      wire(x + 23, y - 7, x + 30, y - 7, a, alpha, ac);
      wire(x + 23, y + 7, x + 30, y + 7, b, alpha, ac);
      orGate(x + 30, y, 14, 18, out, alpha, ac);
      wire(x + 52, y, x + 62, y, out, alpha, ac);
      bulb(x + 67, y, out, alpha, ac);
    };

    const singleNOT: Circuit = (x, y, alpha, ac) => {
      const a = rand() > 0.5, out = !a;
      tinySwitch(x, y, a, alpha, ac);
      wire(x + 23, y, x + 30, y, a, alpha, ac);
      notGate(x + 30, y, 14, 16, out, alpha, ac);
      wire(x + 47, y, x + 57, y, out, alpha, ac);
      bulb(x + 62, y, out, alpha, ac);
    };

    // Chained: switch → AND → NOT → bulb
    const chainedAND_NOT: Circuit = (x, y, alpha, ac) => {
      const a = rand() > 0.5, b = rand() > 0.5;
      const and = a && b, out = !and;
      tinySwitch(x, y - 7, a, alpha, ac);
      tinySwitch(x, y + 7, b, alpha, ac);
      wire(x + 23, y - 7, x + 28, y - 7, a, alpha, ac);
      wire(x + 23, y + 7, x + 28, y + 7, b, alpha, ac);
      andGate(x + 28, y, 12, 16, and, alpha, ac);
      wire(x + 47, y, x + 54, y, and, alpha, ac);
      notGate(x + 54, y, 11, 14, out, alpha, ac);
      wire(x + 68, y, x + 76, y, out, alpha, ac);
      bulb(x + 81, y, out, alpha, ac);
    };

    // Chained: switch → OR → NOT → bulb
    const chainedOR_NOT: Circuit = (x, y, alpha, ac) => {
      const a = rand() > 0.5, b = rand() > 0.5;
      const or = a || b, out = !or;
      tinySwitch(x, y - 7, a, alpha, ac);
      tinySwitch(x, y + 7, b, alpha, ac);
      wire(x + 23, y - 7, x + 28, y - 7, a, alpha, ac);
      wire(x + 23, y + 7, x + 28, y + 7, b, alpha, ac);
      orGate(x + 28, y, 12, 16, or, alpha, ac);
      wire(x + 47, y, x + 54, y, or, alpha, ac);
      notGate(x + 54, y, 11, 14, out, alpha, ac);
      wire(x + 68, y, x + 76, y, out, alpha, ac);
      bulb(x + 81, y, out, alpha, ac);
    };

    // Three-gate chain: AND → OR(with extra switch) → NOT
    const threeGate: Circuit = (x, y, alpha, ac) => {
      const a = rand() > 0.5, b = rand() > 0.5, c = rand() > 0.5;
      const and = a && b, or = and || c, out = !or;
      // top two switches → AND
      tinySwitch(x, y - 9, a, alpha, ac);
      tinySwitch(x, y + 3, b, alpha, ac);
      wire(x + 23, y - 9, x + 27, y - 9, a, alpha, ac);
      wire(x + 23, y + 3, x + 27, y + 3, b, alpha, ac);
      andGate(x + 27, y - 3, 11, 14, and, alpha, ac);
      wire(x + 44, y - 3, x + 50, y - 3, and, alpha, ac);
      // C switch → OR bottom input
      tinySwitch(x, y + 15, c, alpha, ac);
      wire(x + 23, y + 15, x + 50, y + 15, c, alpha, ac);
      orGate(x + 50, y + 6, 11, 20, or, alpha, ac);
      wire(x + 68, y + 6, x + 74, y + 6, or, alpha, ac);
      notGate(x + 74, y + 6, 10, 13, out, alpha, ac);
      wire(x + 87, y + 6, x + 93, y + 6, out, alpha, ac);
      bulb(x + 98, y + 6, out, alpha, ac);
    };

    const circuits: Circuit[] = [singleAND, singleOR, singleNOT, chainedAND_NOT, chainedOR_NOT, threeGate];

    // ── Place circuits in a loose grid ────────────────────────────────────────
    // Widths: singleAND/OR ~75, singleNOT ~70, chained ~90, three-gate ~110
    const placements: { x: number; y: number; type: number }[] = [];

    // Row-based placement with jitter
    const rows: { y: number; xs: number[] }[] = [
      { y: 32,  xs: [8,  95,  185, 285] },
      { y: 80,  xs: [8,  110, 215] },
      { y: 126, xs: [8,  95,  190, 295] },
      { y: 172, xs: [8,  110, 220] },
      { y: 218, xs: [8,  95,  185, 290] },
      { y: 264, xs: [8,  115, 220] },
      { y: 312, xs: [8,  95,  190, 295] },
      { y: 358, xs: [8,  110, 215] },
      { y: 408, xs: [8,  95,  185, 290] },
      { y: 454, xs: [8,  115, 225] },
    ];

    for (const row of rows) {
      for (const x of row.xs) {
        placements.push({ x, y: row.y + randRange(-3, 3), type: randInt(0, circuits.length - 1) });
      }
    }

    // Pick a handful to highlight in accent
    const accentIndices = new Set<number>();
    while (accentIndices.size < 6) {
      accentIndices.add(randInt(0, placements.length - 1));
    }

    // Draw all circuits
    for (let i = 0; i < placements.length; i++) {
      const { x, y, type } = placements[i];
      const isAccent = accentIndices.has(i);
      // Fade circuits near right edge slightly
      const edgeFade = Math.min(1, (W - x) / 80);
      const alpha = isAccent
        ? randRange(0.7, 0.9) * edgeFade
        : randRange(0.32, 0.52) * edgeFade;
      circuits[type % circuits.length](x, y, alpha, isAccent);
    }
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="block w-full max-w-[400px]"
      style={{ width: 400, height: 480 }}
    />
  );
}
