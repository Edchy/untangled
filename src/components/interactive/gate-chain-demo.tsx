"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import rough from "roughjs";

function SwitchHitTarget({
  x,
  y,
  label,
  on,
  onToggle,
  showHint,
}: {
  x: number;
  y: number;
  label: string;
  on: boolean;
  onToggle: () => void;
  showHint: boolean;
}) {
  function handleKeyDown(e: React.KeyboardEvent<SVGGElement>) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onToggle();
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={`Switch ${label}: ${on ? "on" : "off"}`}
      className="cursor-pointer select-none outline-none"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      <rect x={x - 42} y={y - 44} width="84" height="80" fill="transparent" stroke="none" pointerEvents="all" />
      {showHint && (
        <>
          <circle cx={x - 6} cy={y} r="10" fill="var(--accent)" stroke="none" opacity="0.18">
            <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.04;0.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={x + 18} cy={y} r="10" fill="var(--accent)" stroke="none" opacity="0.18">
            <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.04;0.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </g>
  );
}

function GateChainCanvas({ a, b }: { a: boolean; b: boolean }) {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mid = a && b;   // AND output
  const out = !mid;     // NOT output

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 450, H = 180;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground-canvas").trim() || "#0a0a0a";
    const paper = styles.getPropertyValue("--background-canvas").trim() || "#fafafa";
    const accent = styles.getPropertyValue("--accent-canvas").trim() || "#4a9e8e";
    const rc = rough.canvas(canvas);

    function wire(x1: number, y1: number, x2: number, y2: number, active: boolean, seed: number) {
      ctx.globalAlpha = active ? 0.9 : 0.28;
      rc.line(x1, y1, x2, y2, {
        stroke: active ? accent : ink,
        strokeWidth: active ? 2.8 : 1.8,
        roughness: 0.85,
        bowing: 0.45,
        seed,
      });
      ctx.globalAlpha = 1;
    }

    function switchSketch(x: number, y: number, on: boolean, seed: number) {
      const stroke = on ? accent : ink;
      ctx.globalAlpha = on ? 1 : 0.42;
      rc.line(x - 24, y, x - 6, y, { stroke, strokeWidth: 2.8, roughness: 0.8, bowing: 0.35, seed });
      rc.line(x + 18, y, x + 34, y, { stroke, strokeWidth: 2.8, roughness: 0.8, bowing: 0.35, seed: seed + 1 });
      rc.circle(x - 6, y, 10, { stroke, strokeWidth: 1.5, fill: stroke, fillStyle: "solid", roughness: 0.8, seed: seed + 2 });
      rc.circle(x + 18, y, 10, { stroke, strokeWidth: 2, fill: paper, fillStyle: "solid", roughness: 0.85, seed: seed + 3 });
      rc.line(x - 6, y, on ? x + 18 : x + 10, on ? y : y - 20, { stroke, strokeWidth: 3.2, roughness: 0.75, bowing: 0.35, seed: seed + 4 });
      ctx.globalAlpha = 1;
    }

    function andGate(x: number, yTop: number, yBot: number, w: number, active: boolean) {
      const midY = (yTop + yBot) / 2;
      ctx.globalAlpha = active ? 0.9 : 0.55;
      rc.path(
        `M ${x} ${yTop} L ${x} ${yBot} C ${x + w * 1.7} ${yBot}, ${x + w * 1.7} ${yTop}, ${x} ${yTop}`,
        { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.85, seed: 22 }
      );
      ctx.font = "500 10px var(--font-sans, sans-serif)";
      ctx.fillStyle = active ? accent : ink;
      ctx.globalAlpha = active ? 0.7 : 0.3;
      ctx.textAlign = "center";
      ctx.fillText("AND", x + w * 0.5, midY + 4);
      ctx.globalAlpha = 1;
    }

    function notGate(x: number, midY: number, active: boolean) {
      ctx.globalAlpha = active ? 0.9 : 0.55;
      rc.polygon(
        [[x, midY - 26], [x, midY + 26], [x + 44, midY]],
        { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.85, seed: 55 }
      );
      rc.circle(x + 50, midY, 12, {
        stroke: active ? accent : ink,
        strokeWidth: active ? 2 : 1.5,
        roughness: 0.75,
        seed: 56,
      });
      ctx.font = "500 10px var(--font-sans, sans-serif)";
      ctx.fillStyle = active ? accent : ink;
      ctx.globalAlpha = active ? 0.7 : 0.3;
      ctx.textAlign = "center";
      ctx.fillText("NOT", x + 22, midY + 4);
      ctx.globalAlpha = 1;
    }

    function bulbSketch(on: boolean) {
      if (on) {
        ctx.globalAlpha = 0.52;
        rc.line(400, 42, 400, 26, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 76 });
        rc.line(430, 56, 444, 42, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 77 });
        rc.line(438, 90, 456, 90, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 78 });
        rc.line(430, 124, 444, 138, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 79 });
        ctx.globalAlpha = 0.18;
        rc.circle(400, 90, 84, { stroke: accent, strokeWidth: 1.2, fill: accent, fillStyle: "solid", roughness: 0.9, seed: 80 });
        ctx.globalAlpha = 0.24;
        rc.circle(400, 90, 56, { stroke: accent, strokeWidth: 1.2, fill: accent, fillStyle: "solid", roughness: 0.9, seed: 81 });
      }
      ctx.globalAlpha = on ? 1 : 0.34;
      rc.path("M390 112 C390 104, 380 98, 380 86 C380 74, 389 65, 400 65 C411 65, 420 74, 420 86 C420 98, 410 104, 410 112 Z", {
        stroke: on ? accent : ink,
        strokeWidth: 2,
        fill: on ? accent : paper,
        fillStyle: "hachure",
        hachureGap: 12,
        hachureAngle: -35,
        roughness: 0.85,
        seed: 82,
      });
      rc.line(389, 120, 411, 120, { stroke: on ? accent : ink, strokeWidth: 2.2, roughness: 0.75, seed: 83 });
      rc.line(393, 128, 407, 128, { stroke: on ? accent : ink, strokeWidth: 2.2, roughness: 0.75, seed: 84 });
      rc.line(392, 112, 408, 112, { stroke: on ? accent : ink, strokeWidth: 1.5, roughness: 0.7, seed: 85 });
      rc.path("M394 83 C397 80, 403 80, 406 83", { stroke: on ? accent : ink, strokeWidth: 1.6, roughness: 0.75, seed: 86 });
      ctx.globalAlpha = 1;
    }

    function sourceSketch() {
      ctx.globalAlpha = 0.54;
      rc.path("M24 72 L13 93 H24 L18 111 L35 85 H24 Z", {
        stroke: ink, strokeWidth: 1.8, fill: ink, fillStyle: "solid", roughness: 0.9, bowing: 0.45, seed: 90,
      });
      ctx.globalAlpha = 1;
    }

    // Layout: source (left) → 2 switches (series) → AND gate → connecting wire → NOT gate → bulb
    // Switches at y=54 (A) and y=126 (B), series wired so AND needs both
    const aY = 54, bY = 126, midY = 90;
    // AND gate: x=175..245 (width=70)
    const andX = 175, andW = 50;
    const andOutX = andX + andW;
    // NOT gate: x=295
    const notX = 295;
    const notOutX = notX + 56;

    // Source → split
    wire(38, midY, 70, midY, a || b, 1);
    wire(70, midY, 70, aY, a, 2);
    wire(70, midY, 70, bY, b, 3);

    // Wires to switches
    wire(70, aY, 96, aY, a, 4);
    wire(70, bY, 96, bY, b, 5);

    // Switches
    switchSketch(120, aY, a, 10);
    switchSketch(120, bY, b, 20);

    // Switches → AND gate inputs
    wire(144, aY, andX, aY, a, 6);
    wire(144, bY, andX, bY, b, 7);

    // AND gate
    andGate(andX, aY, bY, andW, mid);

    // AND output → rejoin to midY → NOT gate
    wire(andOutX, midY, notX, midY, mid, 8);

    // NOT gate
    notGate(notX, midY, out);

    // NOT output → bulb
    wire(notOutX, midY, 366, midY, out, 9);

    sourceSketch();
    bulbSketch(out);
  }, [a, b, mid, out, theme]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

export function GateChainDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [touchedA, setTouchedA] = useState(false);
  const [touchedB, setTouchedB] = useState(false);
  const mid = a && b;
  const out = !mid;

  return (
    <div className="flex w-full flex-col items-center gap-ds-6">
      <div
        className="relative h-[208px] w-full max-w-[520px]"
        role="group"
        aria-label={`Chained AND-NOT gates: light is ${out ? "on" : "off"}`}
      >
        <GateChainCanvas a={a} b={b} />
        <svg viewBox="0 0 450 180" className="absolute inset-0 h-full w-full">
          <SwitchHitTarget
            x={120} y={54} label="A" on={a}
            onToggle={() => { setTouchedA(true); setA((v) => !v); }}
            showHint={!touchedA}
          />
          <SwitchHitTarget
            x={120} y={126} label="B" on={b}
            onToggle={() => { setTouchedB(true); setB((v) => !v); }}
            showHint={!touchedB}
          />
        </svg>
      </div>

      <p className="max-w-[440px] text-center text-sm leading-relaxed text-foreground/50">
        The AND gate feeds into a NOT gate. The output of one becomes the input of the next.
        {" "}That connecting wire is the whole idea.
      </p>
    </div>
  );
}
