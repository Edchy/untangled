"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import rough from "roughjs";

// Circuit: NOT( (A AND B) OR C )
// Switches A, B, C → AND(A,B) → OR(and_out, C) → NOT(or_out) → bulb

function SwitchHitTarget({
  x, y, label, on, onToggle, showHint,
}: {
  x: number; y: number; label: string; on: boolean; onToggle: () => void; showHint: boolean;
}) {
  function handleKeyDown(e: React.KeyboardEvent<SVGGElement>) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onToggle();
  }
  return (
    <g
      role="button" tabIndex={0} aria-pressed={on}
      aria-label={`Switch ${label}: ${on ? "on" : "off"}`}
      className="cursor-pointer select-none outline-none"
      onClick={onToggle} onKeyDown={handleKeyDown}
    >
      <rect x={x - 44} y={y - 44} width="88" height="80" fill="transparent" stroke="none" pointerEvents="all" />
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

const W = 500, H = 220;

function CircuitCanvas({ a, b, c }: { a: boolean; b: boolean; c: boolean }) {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const andOut = a && b;
  const orOut = andOut || c;
  const notOut = !orOut;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
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
      ctx.globalAlpha = active ? 0.9 : 0.25;
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

    // AND gate: flat back, D-curve front
    // x = left edge, yTop/yBot = input rail heights, w = gate width
    function andGate(x: number, yTop: number, yBot: number, w: number, active: boolean) {
      const mY = (yTop + yBot) / 2;
      ctx.globalAlpha = active ? 0.9 : 0.52;
      rc.path(
        `M ${x} ${yTop} L ${x} ${yBot} C ${x + w * 1.7} ${yBot}, ${x + w * 1.7} ${yTop}, ${x} ${yTop}`,
        { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.85, seed: 22 }
      );
      ctx.font = "500 10px var(--font-sans, sans-serif)";
      ctx.fillStyle = active ? accent : ink;
      ctx.globalAlpha = active ? 0.75 : 0.3;
      ctx.textAlign = "center";
      ctx.fillText("AND", x + w * 0.5, mY + 4);
      ctx.globalAlpha = 1;
    }

    // OR gate: curved back, shield front
    function orGate(x: number, yTop: number, yBot: number, w: number, active: boolean) {
      const mY = (yTop + yBot) / 2;
      ctx.globalAlpha = active ? 0.9 : 0.52;
      rc.path(
        `M ${x} ${yTop} Q ${x + 14} ${mY}, ${x} ${yBot} C ${x + w * 1.65} ${yBot}, ${x + w * 1.65} ${yTop}, ${x} ${yTop}`,
        { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.85, seed: 33 }
      );
      rc.path(
        `M ${x} ${yTop} Q ${x + 14} ${mY}, ${x} ${yBot}`,
        { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.75, seed: 34 }
      );
      ctx.font = "500 10px var(--font-sans, sans-serif)";
      ctx.fillStyle = active ? accent : ink;
      ctx.globalAlpha = active ? 0.75 : 0.3;
      ctx.textAlign = "center";
      ctx.fillText("OR", x + w * 0.55, mY + 4);
      ctx.globalAlpha = 1;
    }

    // NOT gate: triangle + bubble
    function notGate(x: number, mY: number, active: boolean) {
      ctx.globalAlpha = active ? 0.9 : 0.52;
      rc.polygon(
        [[x, mY - 26], [x, mY + 26], [x + 44, mY]],
        { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.85, seed: 55 }
      );
      rc.circle(x + 50, mY, 12, { stroke: active ? accent : ink, strokeWidth: active ? 2 : 1.5, roughness: 0.75, seed: 56 });
      ctx.font = "500 10px var(--font-sans, sans-serif)";
      ctx.fillStyle = active ? accent : ink;
      ctx.globalAlpha = active ? 0.75 : 0.3;
      ctx.textAlign = "center";
      ctx.fillText("NOT", x + 22, mY + 4);
      ctx.globalAlpha = 1;
    }

    function bulbSketch(on: boolean) {
      const bx = 452, by = H / 2;
      if (on) {
        ctx.globalAlpha = 0.5;
        rc.line(bx, by - 48, bx, by - 64, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 76 });
        rc.line(bx + 30, by - 34, bx + 44, by - 48, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 77 });
        rc.line(bx + 38, by, bx + 56, by, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 78 });
        rc.line(bx + 30, by + 34, bx + 44, by + 48, { stroke: accent, strokeWidth: 2, roughness: 0.8, bowing: 0.35, seed: 79 });
        ctx.globalAlpha = 0.15;
        rc.circle(bx, by, 80, { stroke: accent, strokeWidth: 1.2, fill: accent, fillStyle: "solid", roughness: 0.9, seed: 80 });
        ctx.globalAlpha = 0.22;
        rc.circle(bx, by, 52, { stroke: accent, strokeWidth: 1.2, fill: accent, fillStyle: "solid", roughness: 0.9, seed: 81 });
      }
      ctx.globalAlpha = on ? 1 : 0.32;
      rc.path(`M${bx - 10} ${by + 22} C${bx - 10} ${by + 14}, ${bx - 20} ${by + 8}, ${bx - 20} ${by - 4} C${bx - 20} ${by - 16}, ${bx - 11} ${by - 25}, ${bx} ${by - 25} C${bx + 11} ${by - 25}, ${bx + 20} ${by - 16}, ${bx + 20} ${by - 4} C${bx + 20} ${by + 8}, ${bx + 10} ${by + 14}, ${bx + 10} ${by + 22} Z`, {
        stroke: on ? accent : ink, strokeWidth: 2,
        fill: on ? accent : paper, fillStyle: "hachure", hachureGap: 12, hachureAngle: -35,
        roughness: 0.85, seed: 82,
      });
      rc.line(bx - 11, by + 30, bx + 11, by + 30, { stroke: on ? accent : ink, strokeWidth: 2.2, roughness: 0.75, seed: 83 });
      rc.line(bx - 7, by + 38, bx + 7, by + 38, { stroke: on ? accent : ink, strokeWidth: 2.2, roughness: 0.75, seed: 84 });
      rc.line(bx - 10, by + 22, bx + 10, by + 22, { stroke: on ? accent : ink, strokeWidth: 1.5, roughness: 0.7, seed: 85 });
      rc.path(`M${bx - 6} ${by - 7} C${bx - 3} ${by - 10}, ${bx + 3} ${by - 10}, ${bx + 6} ${by - 7}`, { stroke: on ? accent : ink, strokeWidth: 1.6, roughness: 0.75, seed: 86 });
      ctx.globalAlpha = 1;
    }

    function sourceSketch(y: number) {
      ctx.globalAlpha = 0.5;
      rc.path(`M24 ${y - 18} L13 ${y + 3} H24 L18 ${y + 21} L35 ${y - 5} H24 Z`, {
        stroke: ink, strokeWidth: 1.8, fill: ink, fillStyle: "solid", roughness: 0.9, bowing: 0.45, seed: 90,
      });
      ctx.globalAlpha = 1;
    }

    // ── Layout ──────────────────────────────────────────────────────────────────
    //
    //  A switch ──────────────────────────┐
    //                                   AND ──┐
    //  B switch ──────────────────────────┘   OR ── NOT ── bulb
    //                                         │
    //  C switch ──────────────────────────────┘
    //
    // Y positions of the three input rails
    const aY = 55, bY = 110, cY = 165;

    // Switch x centers
    const swX = 108;

    // AND gate: inputs at aY and bY, gate left edge at x=200
    const andX = 200, andW = 44;
    const andOutY = (aY + bY) / 2;   // 82.5
    const andOutX = andX + andW;

    // OR gate: inputs at andOutY and cY, gate left edge at x=295
    const orTopY = andOutY, orBotY = cY;
    const orX = 295, orW = 44;
    const orOutY = (orTopY + orBotY) / 2;  // midpoint of and-out and cY
    const orOutX = orX + orW;

    // NOT gate: centered on orOutY, left edge at x=368
    const notX = 368;
    const notOutX = notX + 56;

    // Source: three separate power symbols, one per rail
    sourceSketch(aY);
    sourceSketch(bY);
    sourceSketch(cY);

    // A: source → switch
    wire(38, aY, swX - 24, aY, a, 1);
    switchSketch(swX, aY, a, 10);
    // B: source → switch
    wire(38, bY, swX - 24, bY, b, 2);
    switchSketch(swX, bY, b, 20);
    // C: source → switch
    wire(38, cY, swX - 24, cY, c, 3);
    switchSketch(swX, cY, c, 30);

    // A switch out → AND top input
    wire(swX + 34, aY, andX, aY, a, 4);
    // B switch out → AND bottom input
    wire(swX + 34, bY, andX, bY, b, 5);

    // AND gate
    andGate(andX, aY, bY, andW, andOut);

    // AND output wire → OR top input (with vertical drop if needed)
    wire(andOutX, andOutY, orX, orTopY, andOut, 6);

    // C switch out → OR bottom input
    wire(swX + 34, cY, orX, orBotY, c, 7);

    // OR gate
    orGate(orX, orTopY, orBotY, orW, orOut);

    // OR output → NOT input
    wire(orOutX, orOutY, notX, orOutY, orOut, 8);

    // NOT gate
    notGate(notX, orOutY, notOut);

    // NOT output → bulb
    wire(notOutX, orOutY, 442, orOutY, notOut, 9);
    // Vertical from orOutY to bulb center if they differ
    if (Math.abs(orOutY - H / 2) > 2) {
      wire(442, orOutY, 442, H / 2, notOut, 10);
      wire(442, H / 2, 442, H / 2, notOut, 11);
    }

    bulbSketch(notOut);
  }, [a, b, c, andOut, orOut, notOut, theme]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

export function GateBuilder() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const [touchedA, setTouchedA] = useState(false);
  const [touchedB, setTouchedB] = useState(false);

  const andOut = a && b;
  const orOut = andOut || c;
  const notOut = !orOut;

  return (
    <div className="flex w-full flex-col items-center gap-ds-6">
      <div
        className="relative w-full"
        style={{ height: H, maxWidth: W }}
        role="group"
        aria-label={`Circuit: NOT of (A AND B) OR C — output is ${notOut ? "1" : "0"}`}
      >
        <CircuitCanvas a={a} b={b} c={c} />
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
          <SwitchHitTarget x={108} y={55} label="A" on={a}
            onToggle={() => { setTouchedA(true); setA(v => !v); }} showHint={!touchedA} />
          <SwitchHitTarget x={108} y={110} label="B" on={b}
            onToggle={() => { setTouchedB(true); setB(v => !v); }} showHint={!touchedB} />
          <SwitchHitTarget x={108} y={165} label="C" on={c}
            onToggle={() => setC(v => !v)} showHint={false} />
        </svg>
      </div>

      <p className="max-w-[440px] text-center text-sm leading-relaxed text-foreground/50">
        Three switches. Three gates. The signal passes through each one in turn.
        {" "}Try to find all the combinations that turn the light on.
      </p>
    </div>
  );
}
