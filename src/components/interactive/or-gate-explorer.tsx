"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import rough from "roughjs";

function getHintFill() {
  return "light-dark(var(--accent), var(--ds-color-paper))";
}

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
  const hintFill = getHintFill();

  function handleKeyDown(event: React.KeyboardEvent<SVGGElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onToggle();
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={`Switch ${label}: ${on ? "on" : "off"}`}
      className="group/switch cursor-pointer select-none outline-none"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      <rect x={x - 42} y={y - 44} width="84" height="80" fill="transparent" stroke="none" pointerEvents="all" />
      {showHint ? (
        <>
          <circle cx={x - 6} cy={y} r="10" fill={hintFill} stroke="none" opacity="0.18">
            <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.04;0.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={x + 18} cy={y} r="10" fill={hintFill} stroke="none" opacity="0.18">
            <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.04;0.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </>
      ) : null}
    </g>
  );
}

function OrGateCanvas({ a, b }: { a: boolean; b: boolean }) {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const output = a || b;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 450;
    const height = 180;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground-canvas").trim() || "#1a1614";
    const paper = styles.getPropertyValue("--background-canvas").trim() || "#f5f0e8";
    const accent = styles.getPropertyValue("--accent-canvas").trim() || "#4a9e8e";
    const rc = rough.canvas(canvas);

    function line(x1: number, y1: number, x2: number, y2: number, active: boolean, seed: number) {
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
        bowing: 0.45,
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
        stroke: ink,
        strokeWidth: 1.8,
        fill: ink,
        fillStyle: "solid",
        roughness: 0.9,
        bowing: 0.45,
        seed: 90,
      });
      ctx.globalAlpha = 1;
    }

    // Parallel wiring: source → split → switch A (top) + switch B (bottom) → merge → bulb
    line(38, 90, 88, 90, output, 30);
    line(88, 90, 88, 54, a, 31);
    line(88, 54, 124, 54, a, 32);
    line(88, 90, 88, 126, b, 33);
    line(88, 126, 124, 126, b, 34);
    line(172, 54, 308, 54, a, 35);
    line(308, 54, 308, 90, a, 36);
    line(172, 126, 308, 126, b, 37);
    line(308, 126, 308, 90, b, 38);
    line(308, 90, 366, 90, output, 39);
    switchSketch(148, 54, a, 40);
    switchSketch(148, 126, b, 50);
    sourceSketch();
    bulbSketch(output);
  }, [a, b, output, theme]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

export function OrGateExplorer() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [touchedA, setTouchedA] = useState(false);
  const [touchedB, setTouchedB] = useState(false);
  const output = a || b;

  return (
    <div className="flex w-full flex-col items-center gap-ds-6">
      <div
        className="relative h-[208px] w-full max-w-[520px]"
        role="group"
        aria-label={`OR gate: light is ${output ? "on" : "off"}`}
      >
        <OrGateCanvas a={a} b={b} />
        <svg viewBox="0 0 450 180" className="absolute inset-0 h-full w-full">
          <SwitchHitTarget
            x={148} y={54} label="A" on={a}
            onToggle={() => { setTouchedA(true); setA((v) => !v); }}
            showHint={!touchedA}
          />
          <SwitchHitTarget
            x={148} y={126} label="B" on={b}
            onToggle={() => { setTouchedB(true); setB((v) => !v); }}
            showHint={!touchedB}
          />
        </svg>
      </div>

      <p className="max-w-[440px] text-center text-sm leading-relaxed text-foreground/50">
        This is an <strong className="font-semibold text-foreground/90">OR gate</strong>.
        {" "}Either switch is enough to turn the light on.
        {" "}Both at once works too.
      </p>
    </div>
  );
}
