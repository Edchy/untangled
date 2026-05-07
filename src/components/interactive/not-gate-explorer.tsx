"use client";

import { useState, type KeyboardEvent } from "react";

function getHintFill() {
  return "light-dark(var(--accent), var(--ds-color-paper))";
}

function SwitchHitTarget({
  x,
  y,
  on,
  onToggle,
  showHint,
}: {
  x: number;
  y: number;
  on: boolean;
  onToggle: () => void;
  showHint: boolean;
}) {
  const hintFill = getHintFill();

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onToggle();
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={`Switch A: ${on ? "on" : "off"}`}
      className="cursor-pointer select-none outline-none"
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

function CircuitLine({
  x1,
  y1,
  x2,
  y2,
  active,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "var(--accent)" : "var(--foreground)"}
      strokeOpacity={active ? 0.9 : 0.28}
      strokeWidth={active ? 2.8 : 1.8}
    />
  );
}

function SwitchSketch({ x, y, on }: { x: number; y: number; on: boolean }) {
  const stroke = on ? "var(--accent)" : "var(--foreground)";
  const opacity = on ? 1 : 0.42;

  return (
    <g aria-hidden stroke={stroke} strokeOpacity={opacity}>
      <line x1={x - 24} y1={y} x2={x - 6} y2={y} strokeWidth="2.8" />
      <line x1={x + 18} y1={y} x2={x + 34} y2={y} strokeWidth="2.8" />
      <circle cx={x - 6} cy={y} r="5" fill={stroke} stroke="none" />
      <circle cx={x + 18} cy={y} r="7" fill="var(--background)" strokeWidth="2" />
      <line x1={x - 6} y1={y} x2={on ? x + 18 : x + 10} y2={on ? y : y - 20} strokeWidth="3.2" />
    </g>
  );
}

function SourceSketch() {
  return (
    <path
      aria-hidden
      d="M24 72 L13 93 H24 L18 111 L35 85 H24 Z"
      stroke="var(--foreground)"
      fill="var(--foreground)"
      opacity="0.54"
      strokeWidth="1.8"
    />
  );
}

function BulbSketch({ on }: { on: boolean }) {
  return (
    <g aria-hidden stroke={on ? "var(--accent)" : "var(--foreground)"} fill={on ? "var(--accent)" : "var(--background)"}>
      {on ? (
        <g opacity="0.52">
          <line x1="400" y1="42" x2="400" y2="26" strokeWidth="2" />
          <line x1="430" y1="56" x2="444" y2="42" strokeWidth="2" />
          <line x1="438" y1="90" x2="456" y2="90" strokeWidth="2" />
          <line x1="430" y1="124" x2="444" y2="138" strokeWidth="2" />
          <circle cx="400" cy="90" r="42" fill="var(--accent)" fillOpacity="0.16" strokeOpacity="0.2" />
        </g>
      ) : null}
      <path
        d="M390 112 C390 104, 380 98, 380 86 C380 74, 389 65, 400 65 C411 65, 420 74, 420 86 C420 98, 410 104, 410 112 Z"
        strokeWidth="2"
        fillOpacity={on ? 0.72 : 1}
        opacity={on ? 1 : 0.34}
      />
      <line x1="389" y1="120" x2="411" y2="120" strokeWidth="2.2" opacity={on ? 1 : 0.34} />
      <line x1="393" y1="128" x2="407" y2="128" strokeWidth="2.2" opacity={on ? 1 : 0.34} />
      <line x1="392" y1="112" x2="408" y2="112" strokeWidth="1.5" opacity={on ? 1 : 0.34} />
      <path d="M394 83 C397 80, 403 80, 406 83" strokeWidth="1.6" fill="none" opacity={on ? 1 : 0.34} />
    </g>
  );
}

function InverterLinkage({ x, y, input }: { x: number; y: number; input: boolean }) {
  return (
    <g aria-hidden stroke="var(--foreground)" fill="var(--background)">
      <circle cx={x} cy={y} r="18" strokeOpacity="0.34" strokeWidth="1.5" />
      <line x1={x - 24} y1={y} x2={x - 12} y2={y} strokeOpacity="0.34" strokeWidth="1.8" />
      <line x1={x + 12} y1={y} x2={x + 24} y2={y} strokeOpacity="0.34" strokeWidth="1.8" />
      <path
        d={input ? `M${x - 9} ${y - 9} L${x + 9} ${y + 9}` : `M${x - 9} ${y + 9} L${x + 9} ${y - 9}`}
        stroke="var(--accent)"
        strokeOpacity="0.72"
        strokeWidth="2.4"
      />
      <path
        d={input ? `M${x - 7} ${y + 9} L${x + 7} ${y - 9}` : `M${x - 7} ${y - 9} L${x + 7} ${y + 9}`}
        strokeOpacity="0.24"
        strokeWidth="1.8"
      />
    </g>
  );
}

function NotGateDiagram({ input }: { input: boolean }) {
  const output = !input;

  return (
    <svg
      viewBox="0 0 450 180"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={`NOT gate: switch is ${input ? "on" : "off"}, light is ${output ? "on" : "off"}`}
    >
      <defs>
        <filter id="not-gate-roughen" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="31" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter="url(#not-gate-roughen)" strokeLinecap="round" strokeLinejoin="round">
        <CircuitLine x1={38} y1={90} x2={124} y2={90} active={input} />
        <CircuitLine x1={172} y1={90} x2={236} y2={90} active={input} />
        <CircuitLine x1={284} y1={90} x2={366} y2={90} active={output} />
        <SwitchSketch x={148} y={90} on={input} />
        <InverterLinkage x={260} y={90} input={input} />
        <SourceSketch />
        <BulbSketch on={output} />
      </g>
    </svg>
  );
}

export function NotGateExplorer() {
  const [input, setInput] = useState(false);
  const [touched, setTouched] = useState(false);
  const output = !input;

  return (
    <div className="flex w-full flex-col items-center gap-ds-6">
      <div
        className="relative h-[208px] w-full max-w-[520px]"
        role="group"
        aria-label={`NOT gate: light is ${output ? "on" : "off"}`}
      >
        <NotGateDiagram input={input} />
        <svg viewBox="0 0 450 180" className="absolute inset-0 h-full w-full">
          <SwitchHitTarget
            x={148}
            y={90}
            on={input}
            onToggle={() => {
              setTouched(true);
              setInput((value) => !value);
            }}
            showHint={!touched}
          />
        </svg>
      </div>

      <p className="max-w-[440px] text-center text-sm leading-relaxed text-foreground/50">
        This is a <strong className="font-semibold text-foreground/90">NOT gate</strong>.
        {" "}The output is the opposite of the input.
        {" "}On becomes off. Off becomes on.
      </p>
    </div>
  );
}
