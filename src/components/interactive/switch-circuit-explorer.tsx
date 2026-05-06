"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type WiringMode = "series" | "parallel";

const THEME_CHANGE_EVENT = "untangled-themechange";

function applyThemeFromCircuit(output: boolean) {
  const theme = output ? "light" : "dark";

  if (document.documentElement.dataset.theme !== theme) {
    document.documentElement.dataset.theme = theme;
  }

  localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function getInitialSwitchState() {
  return false;
}

function getHintFill() {
  return "light-dark(var(--accent), var(--ds-color-paper))";
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "light";
}

function subscribeToThemeChange(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
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
      className="h-14 flex-1 text-base"
    >
      {children}
    </Button>
  );
}

function DrawSwitch({
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
  const stroke = on ? "var(--accent)" : "var(--foreground)";
  const opacity = on ? 1 : 0.42;
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
      className="group/switch cursor-pointer outline-none"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={opacity}
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
            opacity="0.28"
          >
            <animate attributeName="r" values="10;18;10" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.32;0.08;0.32" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle
            cx={x + 18}
            cy={y}
            r="10"
            fill={hintFill}
            stroke="none"
            opacity="0.28"
          >
            <animate attributeName="r" values="10;18;10" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.32;0.08;0.32" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </>
      ) : null}
      <line x1={x - 24} y1={y} x2={x - 6} y2={y} strokeWidth="3.2" />
      <line x1={x + 18} y1={y} x2={x + 34} y2={y} strokeWidth="3.2" />
      <circle cx={x - 6} cy={y} r="5" fill={stroke} stroke="none" opacity={opacity} />
      <circle cx={x + 18} cy={y} r="5" fill="var(--background)" strokeWidth="2.7" />
      <line
        x1={x - 6}
        y1={y}
        x2={on ? x + 18 : x + 10}
        y2={on ? y : y - 20}
        strokeWidth="3.6"
        className="transition-opacity duration-150 group-hover/switch:opacity-100 group-focus/switch:opacity-100"
      />
    </g>
  );
}

function Bulb({ on }: { on: boolean }) {
  return (
    <g>
      {on ? (
        <>
          <circle
            cx="400"
            cy="90"
            r="42"
            fill="color-mix(in srgb, var(--accent) 12%, transparent)"
          />
          <circle
            cx="400"
            cy="90"
            r="28"
            fill="color-mix(in srgb, var(--accent) 22%, transparent)"
          />
        </>
      ) : null}
      <g
        fill={on ? "color-mix(in srgb, var(--accent) 10%, var(--background))" : "var(--background)"}
        stroke={on ? "var(--accent)" : "var(--foreground)"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={on ? 1 : 0.34}
        strokeWidth="2.8"
      >
        <path d="M390 112 C390 104, 380 98, 380 86 C380 74, 389 65, 400 65 C411 65, 420 74, 420 86 C420 98, 410 104, 410 112 Z" />
        <path d="M389 120 H411" fill="none" />
        <path d="M393 128 H407" fill="none" />
        <path d="M392 112 H408" fill="none" />
        <path d="M394 83 C397 80, 403 80, 406 83" fill="none" strokeOpacity={on ? 0.9 : 0.2} />
      </g>
    </g>
  );
}

function ElectricitySource() {
  return (
    <g aria-hidden>
      <foreignObject x="7" y="76" width="28" height="28">
        <div className="flex h-7 w-7 items-center justify-center text-foreground/54">
          <Zap className="h-5 w-5" strokeWidth={2.2} />
        </div>
      </foreignObject>
    </g>
  );
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
  const output = a && b;
  const dim = "color-mix(in srgb, var(--foreground) 24%, transparent)";
  const active = "var(--accent)";

  return (
    <svg viewBox="0 0 450 180" className="h-full w-full" role="group" aria-label={`In a row circuit, light is ${output ? "on" : "off"}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M38 90 H116" stroke={a ? active : dim} />
        <path d="M178 90 H256" stroke={a && b ? active : dim} />
        <path d="M318 90 H366" stroke={output ? active : dim} />
      </g>
      <ElectricitySource />
      <DrawSwitch x={148} y={90} label="A" on={a} onToggle={onToggleA} showHint={showHintA} />
      <DrawSwitch x={288} y={90} label="B" on={b} onToggle={onToggleB} showHint={showHintB} />
      <Bulb on={output} />
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
  const output = a || b;
  const dim = "color-mix(in srgb, var(--foreground) 24%, transparent)";
  const active = "var(--accent)";

  return (
    <svg viewBox="0 0 450 180" className="h-full w-full" role="group" aria-label={`Side by side circuit, light is ${output ? "on" : "off"}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M38 90 H88" stroke={output ? active : dim} />
        <path d="M88 90 V54 H116" stroke={a ? active : dim} />
        <path d="M88 90 V126 H116" stroke={b ? active : dim} />
        <path d="M178 54 H308 V90" stroke={a ? active : dim} />
        <path d="M178 126 H308 V90" stroke={b ? active : dim} />
        <path d="M308 90 H366" stroke={output ? active : dim} />
      </g>
      <ElectricitySource />
      <DrawSwitch x={148} y={54} label="A" on={a} onToggle={onToggleA} showHint={showHintA} />
      <DrawSwitch x={148} y={126} label="B" on={b} onToggle={onToggleB} showHint={showHintB} />
      <Bulb on={output} />
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

  useEffect(() => {
    applyThemeFromCircuit(output);
  }, [output]);

  return (
    <div className="flex w-full flex-col items-center gap-ds-6">
      <div className="flex w-full max-w-[440px] gap-ds-3">
        <ModeButton active={mode === "series"} onClick={() => setMode("series")}>
          In a row
        </ModeButton>
        <ModeButton active={mode === "parallel"} onClick={() => setMode("parallel")}>
          Side by side
        </ModeButton>
      </div>

      <div className="h-[208px] w-full max-w-[520px]">
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
    </div>
  );
}
