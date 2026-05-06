"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import rough from "roughjs";
import { Button } from "@/components/ui/button";
import { switchTheme, subscribeToThemeChange, getThemeSnapshot } from "@/lib/theme";

type WiringMode = "series" | "parallel";

function applyThemeFromCircuit(output: boolean) {
  const theme = output ? "light" : "dark";
  if (document.documentElement.dataset.theme !== theme) {
    switchTheme(theme);
  }
}

function getInitialSwitchState() {
  return false;
}

function getHintFill() {
  return "light-dark(var(--accent), var(--ds-color-paper))";
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="toggle"
      size="lg"
      aria-pressed={active}
      onClick={onClick}
      className="h-14 flex-1 select-none text-base"
    >
      {children}
    </Button>
  );
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
      <rect
        x={x - 42}
        y={y - 44}
        width="84"
        height="80"
        fill="transparent"
        stroke="none"
        pointerEvents="all"
      />
      {showHint ? (
        <>
          <circle
            cx={x - 6}
            cy={y}
            r="10"
            fill={hintFill}
            stroke="none"
            opacity="0.18"
          >
            <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.04;0.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle
            cx={x + 18}
            cy={y}
            r="10"
            fill={hintFill}
            stroke="none"
            opacity="0.18"
          >
            <animate attributeName="r" values="9;15;9" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.04;0.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </>
      ) : null}
    </g>
  );
}

function RoughCircuitCanvas({
  mode,
  a,
  b,
  themeIsLight,
}: {
  mode: WiringMode;
  a: boolean;
  b: boolean;
  themeIsLight: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const dpr = window.devicePixelRatio || 1;
    const width = 450;
    const height = 180;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground").trim() || "#1a1614";
    const paper = styles.getPropertyValue("--background").trim() || "#f5f0e8";
    const accent = styles.getPropertyValue("--accent").trim() || "#d85a30";
    const rc = rough.canvas(canvas);
    const output = mode === "series" ? a && b : a || b;

    function line(x1: number, y1: number, x2: number, y2: number, active: boolean, seed: number) {
      context.globalAlpha = active ? 0.9 : 0.28;
      rc.line(x1, y1, x2, y2, {
        stroke: active ? accent : ink,
        strokeWidth: active ? 2.8 : 1.8,
        roughness: 0.85,
        bowing: 0.45,
        seed,
      });
      context.globalAlpha = 1;
    }

    function switchSketch(x: number, y: number, on: boolean, seed: number) {
      const stroke = on ? accent : ink;
      context.globalAlpha = on ? 1 : 0.42;
      rc.line(x - 24, y, x - 6, y, {
        stroke,
        strokeWidth: 2.8,
        roughness: 0.8,
        bowing: 0.35,
        seed,
      });
      rc.line(x + 18, y, x + 34, y, {
        stroke,
        strokeWidth: 2.8,
        roughness: 0.8,
        bowing: 0.35,
        seed: seed + 1,
      });
      rc.circle(x - 6, y, 10, {
        stroke,
        strokeWidth: 1.5,
        fill: stroke,
        fillStyle: "solid",
        roughness: 0.8,
        seed: seed + 2,
      });
      rc.circle(x + 18, y, 10, {
        stroke,
        strokeWidth: 2,
        fill: paper,
        fillStyle: "solid",
        roughness: 0.85,
        seed: seed + 3,
      });
      rc.line(x - 6, y, on ? x + 18 : x + 10, on ? y : y - 20, {
        stroke,
        strokeWidth: 3.2,
        roughness: 0.75,
        bowing: 0.35,
        seed: seed + 4,
      });
      context.globalAlpha = 1;
    }

    function bulbSketch(on: boolean) {
      if (on) {
        context.globalAlpha = 0.52;
        rc.line(400, 42, 400, 26, {
          stroke: accent,
          strokeWidth: 2,
          roughness: 0.8,
          bowing: 0.35,
          seed: 76,
        });
        rc.line(430, 56, 444, 42, {
          stroke: accent,
          strokeWidth: 2,
          roughness: 0.8,
          bowing: 0.35,
          seed: 77,
        });
        rc.line(438, 90, 456, 90, {
          stroke: accent,
          strokeWidth: 2,
          roughness: 0.8,
          bowing: 0.35,
          seed: 78,
        });
        rc.line(430, 124, 444, 138, {
          stroke: accent,
          strokeWidth: 2,
          roughness: 0.8,
          bowing: 0.35,
          seed: 79,
        });
        context.globalAlpha = 0.18;
        rc.circle(400, 90, 84, {
          stroke: accent,
          strokeWidth: 1.2,
          fill: accent,
          fillStyle: "solid",
          roughness: 0.9,
          seed: 80,
        });
        context.globalAlpha = 0.24;
        rc.circle(400, 90, 56, {
          stroke: accent,
          strokeWidth: 1.2,
          fill: accent,
          fillStyle: "solid",
          roughness: 0.9,
          seed: 81,
        });
      }

      context.globalAlpha = on ? 1 : 0.34;
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
      rc.path("M394 83 C397 80, 403 80, 406 83", {
        stroke: on ? accent : ink,
        strokeWidth: 1.6,
        roughness: 0.75,
        seed: 86,
      });
      context.globalAlpha = 1;
    }

    function sourceSketch() {
      context.globalAlpha = 0.54;
      rc.path("M24 72 L13 93 H24 L18 111 L35 85 H24 Z", {
        stroke: ink,
        strokeWidth: 1.8,
        fill: ink,
        fillStyle: "solid",
        roughness: 0.9,
        bowing: 0.45,
        seed: 90,
      });
      context.globalAlpha = 1;
    }

    if (mode === "series") {
      line(38, 90, 124, 90, a, 1);
      line(172, 90, 264, 90, a && b, 2);
      line(312, 90, 366, 90, output, 3);
      switchSketch(148, 90, a, 10);
      switchSketch(288, 90, b, 20);
    } else {
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
    }

    sourceSketch();
    bulbSketch(output);
  }, [mode, a, b, themeIsLight]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

function SeriesCircuit({
  a,
  b,
  onToggleA,
  onToggleB,
  showHintA,
  showHintB,
}: {
  a: boolean;
  b: boolean;
  onToggleA: () => void;
  onToggleB: () => void;
  showHintA: boolean;
  showHintB: boolean;
}) {
  return (
    <svg viewBox="0 0 450 180" className="absolute inset-0 h-full w-full">
      <SwitchHitTarget x={148} y={90} label="A" on={a} onToggle={onToggleA} showHint={showHintA} />
      <SwitchHitTarget x={288} y={90} label="B" on={b} onToggle={onToggleB} showHint={showHintB} />
    </svg>
  );
}

function ParallelCircuit({
  a,
  b,
  onToggleA,
  onToggleB,
  showHintA,
  showHintB,
}: {
  a: boolean;
  b: boolean;
  onToggleA: () => void;
  onToggleB: () => void;
  showHintA: boolean;
  showHintB: boolean;
}) {
  return (
    <svg viewBox="0 0 450 180" className="absolute inset-0 h-full w-full">
      <SwitchHitTarget x={148} y={54} label="A" on={a} onToggle={onToggleA} showHint={showHintA} />
      <SwitchHitTarget x={148} y={126} label="B" on={b} onToggle={onToggleB} showHint={showHintB} />
    </svg>
  );
}

export function SwitchCircuitExplorer() {
  const themeIsLight = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getInitialSwitchState,
  );
  const [aOverride, setAOverride] = useState<boolean | null>(null);
  const [bOverride, setBOverride] = useState<boolean | null>(null);
  const [touchedA, setTouchedA] = useState(false);
  const [touchedB, setTouchedB] = useState(false);
  const [mode, setMode] = useState<WiringMode>("series");
  const a = aOverride ?? themeIsLight;
  const b = bOverride ?? themeIsLight;
  const output = mode === "series" ? a && b : a || b;
  const toggleA = () => {
    setTouchedA(true);
    setAOverride(!a);
  };
  const toggleB = () => {
    setTouchedB(true);
    setBOverride(!b);
  };

  const circuitDrivenRef = useRef(false);

  // When theme changes externally (not from this circuit), reset overrides so switches mirror the theme.
  useEffect(() => {
    if (circuitDrivenRef.current) {
      circuitDrivenRef.current = false;
      return;
    }
    setAOverride(null);
    setBOverride(null);
  }, [themeIsLight]);

  useEffect(() => {
    // Only drive the theme when the user has touched at least one circuit switch.
    if (aOverride === null && bOverride === null) return;
    circuitDrivenRef.current = true;
    applyThemeFromCircuit(output);
  }, [output, aOverride, bOverride]);

  return (
    <div className="flex w-full flex-col items-center gap-ds-6">
      <div
        className="relative h-[208px] w-full max-w-[520px]"
        role="group"
        aria-label={`${mode === "series" ? "In a row" : "Side by side"} circuit, light is ${output ? "on" : "off"}`}
      >
        <RoughCircuitCanvas mode={mode} a={a} b={b} themeIsLight={themeIsLight} />
        {mode === "series" ? (
          <SeriesCircuit
            a={a}
            b={b}
            onToggleA={toggleA}
            onToggleB={toggleB}
            showHintA={!touchedA}
            showHintB={!touchedB}
          />
        ) : (
          <ParallelCircuit
            a={a}
            b={b}
            onToggleA={toggleA}
            onToggleB={toggleB}
            showHintA={!touchedA}
            showHintB={!touchedB}
          />
        )}
      </div>

      <div className="flex w-full max-w-[440px] gap-ds-3">
        <ModeButton active={mode === "series"} onClick={() => setMode("series")}>
          In a row
        </ModeButton>
        <ModeButton active={mode === "parallel"} onClick={() => setMode("parallel")}>
          Side by side
        </ModeButton>
      </div>
    </div>
  );
}
