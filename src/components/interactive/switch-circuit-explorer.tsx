"use client";

import { useEffect, useState } from "react";
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
  return typeof document !== "undefined" && document.documentElement.dataset.theme === "light";
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

function InputSwitch({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={`Switch ${label}: ${on ? "on" : "off"}`}
      onClick={onToggle}
      className="flex flex-col items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span className="font-mono text-xs font-semibold text-foreground/50">Switch {label}</span>
      <span
        className="relative h-7 w-12 rounded-pill transition-colors duration-150"
        style={{
          background: on ? "var(--accent)" : "color-mix(in srgb, var(--foreground) 15%, transparent)",
        }}
        aria-hidden
      >
        <span
          className="absolute top-1 h-5 w-5 rounded-pill bg-background transition-transform duration-150"
          style={{ transform: on ? "translateX(1.5rem)" : "translateX(0.25rem)" }}
        />
      </span>
      <span
        className="font-mono text-sm font-bold tabular-nums transition-colors duration-150"
        style={{ color: on ? "var(--accent)" : "var(--foreground)", opacity: on ? 1 : 0.4 }}
      >
        {on ? "on" : "off"}
      </span>
    </button>
  );
}

function DrawSwitch({
  x,
  y,
  label,
  on,
}: {
  x: number;
  y: number;
  label: string;
  on: boolean;
}) {
  const stroke = on ? "var(--accent)" : "var(--foreground)";
  const opacity = on ? 1 : 0.42;

  return (
    <g stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={opacity}>
      <text
        x={x}
        y={y - 26}
        fill="var(--foreground)"
        opacity="0.54"
        stroke="none"
        textAnchor="middle"
        className="font-mono text-[12px] font-semibold"
      >
        {label}
      </text>
      <line x1={x - 24} y1={y} x2={x - 6} y2={y} strokeWidth="3" />
      <line x1={x + 18} y1={y} x2={x + 34} y2={y} strokeWidth="3" />
      <circle cx={x - 6} cy={y} r="4" fill={stroke} stroke="none" opacity={opacity} />
      <circle cx={x + 18} cy={y} r="4" fill="none" strokeWidth="2.5" />
      <line
        x1={x - 6}
        y1={y}
        x2={on ? x + 18 : x + 10}
        y2={on ? y : y - 20}
        strokeWidth="3"
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
            cy="76"
            r="42"
            fill="color-mix(in srgb, var(--accent) 12%, transparent)"
          />
          <circle
            cx="400"
            cy="76"
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
        <path d="M390 98 C390 90, 380 84, 380 72 C380 60, 389 51, 400 51 C411 51, 420 60, 420 72 C420 84, 410 90, 410 98 Z" />
        <path d="M389 106 H411" fill="none" />
        <path d="M393 114 H407" fill="none" />
        <path d="M392 98 H408" fill="none" />
        <path d="M394 69 C397 66, 403 66, 406 69" fill="none" strokeOpacity={on ? 0.9 : 0.2} />
      </g>
    </g>
  );
}

function SeriesCircuit({ a, b }: { a: boolean; b: boolean }) {
  const output = a && b;
  const dim = "color-mix(in srgb, var(--foreground) 24%, transparent)";
  const active = "var(--accent)";

  return (
    <svg viewBox="0 0 450 160" className="h-auto w-full" role="img" aria-label={`In a row circuit, light is ${output ? "on" : "off"}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M38 80 H116" stroke={a ? active : dim} />
        <path d="M178 80 H256" stroke={a && b ? active : dim} />
        <path d="M318 80 H366" stroke={output ? active : dim} />
      </g>
      <DrawSwitch x={148} y={80} label="A" on={a} />
      <DrawSwitch x={288} y={80} label="B" on={b} />
      <Bulb on={output} />
    </svg>
  );
}

function ParallelCircuit({ a, b }: { a: boolean; b: boolean }) {
  const output = a || b;
  const dim = "color-mix(in srgb, var(--foreground) 24%, transparent)";
  const active = "var(--accent)";

  return (
    <svg viewBox="0 0 450 180" className="h-auto w-full" role="img" aria-label={`Side by side circuit, light is ${output ? "on" : "off"}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M38 90 H88" stroke={output ? active : dim} />
        <path d="M88 90 V54 H116" stroke={a ? active : dim} />
        <path d="M88 90 V126 H116" stroke={b ? active : dim} />
        <path d="M178 54 H308 V90" stroke={a ? active : dim} />
        <path d="M178 126 H308 V90" stroke={b ? active : dim} />
        <path d="M308 90 H366" stroke={output ? active : dim} />
      </g>
      <DrawSwitch x={148} y={54} label="A" on={a} />
      <DrawSwitch x={148} y={126} label="B" on={b} />
      <Bulb on={output} />
    </svg>
  );
}

export function SwitchCircuitExplorer() {
  const [a, setA] = useState(getInitialSwitchState);
  const [b, setB] = useState(getInitialSwitchState);
  const [mode, setMode] = useState<WiringMode>("series");
  const output = mode === "series" ? a && b : a || b;

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

      <div className="w-full max-w-[520px]">
        {mode === "series" ? <SeriesCircuit a={a} b={b} /> : <ParallelCircuit a={a} b={b} />}
      </div>

      <div className="flex gap-ds-8">
        <InputSwitch label="A" on={a} onToggle={() => setA((value) => !value)} />
        <InputSwitch label="B" on={b} onToggle={() => setB((value) => !value)} />
      </div>
    </div>
  );
}
