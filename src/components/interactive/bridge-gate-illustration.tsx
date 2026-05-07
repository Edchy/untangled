"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";

type BridgeId = "andA" | "andB" | "orTop" | "orBottom";

export function BridgeGateIllustration() {
  const [standingBridges, setStandingBridges] = useState<Record<BridgeId, boolean>>({
    andA: true,
    andB: true,
    orTop: true,
    orBottom: false,
  });

  const andPasses = standingBridges.andA && standingBridges.andB;
  const orPasses = standingBridges.orTop || standingBridges.orBottom;

  function toggleBridge(id: BridgeId) {
    setStandingBridges((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <svg
      viewBox="0 0 620 460"
      role="img"
      aria-labelledby="bridge-gate-title bridge-gate-desc"
      className="w-full max-w-[620px]"
      xmlns="http://www.w3.org/2000/svg"
      style={{ "--bridge-river": "var(--ds-color-lavender)" } as CSSProperties}
    >
      <title id="bridge-gate-title">AND and OR as bridge routes</title>
      <desc id="bridge-gate-desc">
        Toggle the bridges to compare two routes. The AND route only reaches town when both bridges are standing. The OR route reaches town when at least one bridge is standing.
      </desc>

      <defs>
        <filter id="bridge-roughen" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="23" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id="river-hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <line x1="0" y1="7" x2="14" y2="7" stroke="var(--background)" strokeOpacity="0.34" strokeWidth="1.2" />
        </pattern>
      </defs>

      <g filter="url(#bridge-roughen)" strokeLinecap="round" strokeLinejoin="round">
        <River x={198} from={52} to={186} />
        <River x={328} from={52} to={186} />
        <River x={263} from={282} to={438} />

        <Town x={548} y={66} lit={andPasses} />
        <Town x={548} y={292} lit={orPasses} />

        <Car x={58} y={100} active={andPasses} />
        <Car x={58} y={326} active={orPasses} />

        <RouteLabel x={48} y={36} label="AND route" />
        <RouteLabel x={48} y={262} label="OR route" />

        <path
          d="M92 132 H198 M232 132 H328 M362 132 H520"
          stroke={andPasses ? "var(--accent)" : "var(--foreground)"}
          strokeOpacity={andPasses ? 1 : 0.26}
          strokeWidth={andPasses ? 3 : 2}
        />
        <ToggleBridge
          x={198}
          y={132}
          standing={standingBridges.andA}
          active={andPasses}
          label="First AND bridge"
          onToggle={() => toggleBridge("andA")}
        />
        <ToggleBridge
          x={328}
          y={132}
          standing={standingBridges.andB}
          active={andPasses}
          label="Second AND bridge"
          onToggle={() => toggleBridge("andB")}
        />
        <StatusText x={292} y={88} text={andPasses ? "both bridges standing" : "one washed-out bridge stops the car"} />

        <BranchPath d="M92 358 C142 358 166 310 263 310" active={standingBridges.orTop} />
        <BranchPath d="M263 310 C380 310 438 358 520 358" active={standingBridges.orTop} />
        <ToggleBridge
          x={263}
          y={310}
          standing={standingBridges.orTop}
          active={standingBridges.orTop}
          label="Upper OR bridge"
          onToggle={() => toggleBridge("orTop")}
        />

        <BranchPath d="M92 358 C142 358 166 406 263 406" active={standingBridges.orBottom} />
        <BranchPath d="M263 406 C380 406 438 358 520 358" active={standingBridges.orBottom} />
        <ToggleBridge
          x={263}
          y={406}
          standing={standingBridges.orBottom}
          active={standingBridges.orBottom}
          label="Lower OR bridge"
          onToggle={() => toggleBridge("orBottom")}
        />
        <StatusText x={292} y={286} text={orPasses ? "one bridge is enough" : "both bridges washed out stop the car"} />
      </g>
    </svg>
  );
}

function BranchPath({ d, active }: { d: string; active: boolean }) {
  return (
    <path
      d={d}
      stroke={active ? "var(--accent)" : "var(--foreground)"}
      strokeOpacity={active ? 1 : 0.26}
      strokeWidth={active ? 3 : 2}
      fill="none"
    />
  );
}

function River({ x, from, to }: { x: number; from: number; to: number }) {
  const mid = (from + to) / 2;
  const d = `M${x - 16} ${from} C${x + 10} ${from + 34} ${x - 34} ${mid - 20} ${x - 4} ${mid} C${x + 24} ${mid + 28} ${x - 20} ${to - 32} ${x + 10} ${to}`;

  return (
    <g aria-hidden>
      <path d={d} stroke="var(--bridge-river)" strokeOpacity="0.32" strokeWidth="32" fill="none" />
      <path d={d} stroke="url(#river-hatch)" strokeWidth="30" fill="none" />
      <path d={d} stroke="var(--bridge-river)" strokeOpacity="0.62" strokeWidth="1.6" fill="none" />
    </g>
  );
}

function ToggleBridge({
  x,
  y,
  standing,
  active = false,
  label,
  onToggle,
}: {
  x: number;
  y: number;
  standing: boolean;
  active?: boolean;
  label: string;
  onToggle: () => void;
}) {
  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  }

  const stroke = active ? "var(--accent)" : "var(--foreground)";
  const opacity = active ? 1 : standing ? 0.62 : 0.38;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${label}, ${standing ? "standing" : "washed out"}`}
      aria-pressed={standing}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className="cursor-pointer outline-none focus-visible:[filter:drop-shadow(0_0_0.25rem_var(--accent))]"
      stroke={stroke}
      strokeOpacity={opacity}
      fill="var(--background)"
    >
      <rect x={x - 44} y={y - 34} width="88" height="68" fill="transparent" stroke="none" />
      <line x1={x - 14} y1={y - 18} x2={x - 14} y2={y + 18} strokeWidth="1.6" />
      <line x1={x + 14} y1={y - 18} x2={x + 14} y2={y + 18} strokeWidth="1.6" />
      {standing ? (
        <>
          <line x1={x - 36} y1={y} x2={x + 36} y2={y} strokeWidth="4" />
          <line x1={x - 26} y1={y - 10} x2={x - 26} y2={y + 10} strokeWidth="1.2" />
          <line x1={x} y1={y - 10} x2={x} y2={y + 10} strokeWidth="1.2" />
          <line x1={x + 26} y1={y - 10} x2={x + 26} y2={y + 10} strokeWidth="1.2" />
        </>
      ) : (
        <>
          <line x1={x - 14} y1={y} x2={x - 36} y2={y - 28} strokeWidth="3" />
          <line x1={x + 14} y1={y} x2={x + 36} y2={y - 28} strokeWidth="3" />
        </>
      )}
    </g>
  );
}

function Car({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <g
      aria-hidden
      transform={`translate(${x} ${y})`}
      stroke={active ? "var(--accent)" : "var(--foreground)"}
      fill="var(--background)"
      opacity={active ? 1 : 0.58}
    >
      <path d="M4 24 H54 L46 8 H18 Z" strokeWidth="1.7" />
      <path d="M20 8 L28 0 H39 L46 8" strokeWidth="1.4" />
      <circle cx="17" cy="26" r="5" strokeWidth="1.5" />
      <circle cx="43" cy="26" r="5" strokeWidth="1.5" />
    </g>
  );
}

function Town({ x, y, lit }: { x: number; y: number; lit: boolean }) {
  const accentOpacity = lit ? 0.18 : 0.04;

  return (
    <g aria-hidden transform={`translate(${x} ${y})`} stroke="var(--foreground)" fill="var(--background)" opacity="0.88">
      <path d="M-8 56 C18 48 56 48 88 56" fill="none" strokeOpacity="0.28" strokeWidth="1.3" />
      <path d="M2 48 V22 L20 6 L38 22 V48 Z" strokeWidth="1.6" fill="var(--background)" />
      <path d="M46 48 V26 L62 14 L78 26 V48 Z" strokeWidth="1.5" fill="var(--background)" />
      <path d="M28 48 V30 L42 18 L56 30 V48 Z" strokeWidth="1.4" fill="var(--background)" />
      <path d="M2 48 H84" strokeWidth="1.6" />
      <path d="M16 48 V35 H25 V48" strokeWidth="1.2" />
      <path d="M58 48 V37 H67 V48" strokeWidth="1.2" />
      <path d="M31 34 H38 M46 34 H53" strokeWidth="1.1" />
      <circle cx="20" cy="22" r="3" fill="var(--accent)" fillOpacity={accentOpacity} stroke="var(--accent)" strokeOpacity={accentOpacity + 0.18} />
      <circle cx="62" cy="31" r="3" fill="var(--accent)" fillOpacity={accentOpacity} stroke="var(--accent)" strokeOpacity={accentOpacity + 0.18} />
      <path d="M72 48 C74 39 82 39 84 48" fill="none" strokeOpacity="0.46" strokeWidth="1.1" />
    </g>
  );
}

function RouteLabel({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <text x={x} y={y} className="fill-foreground text-[15px] font-semibold uppercase tracking-[0.18em]">
      {label}
    </text>
  );
}

function StatusText({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" className="fill-foreground text-[13px] font-semibold uppercase tracking-[0.18em] opacity-45">
      {text}
    </text>
  );
}
