"use client";

import { useState } from "react";

function Switch({
  on,
  label,
  seed,
  onToggle,
}: {
  on: boolean;
  label: string;
  seed: number;
  onToggle: () => void;
}) {
  const ink = "var(--foreground)";
  const accent = "var(--accent)";
  const color = on ? accent : ink;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${label}: ${on ? "on" : "off"}`}
      aria-pressed={on}
      className="flex cursor-pointer flex-col items-center gap-3 border-0 bg-transparent p-0"
    >
      <svg
        viewBox="0 0 120 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20"
        aria-hidden
      >
        <defs>
          <filter id={`roughen-${label}`} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="4"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter={`url(#roughen-${label})`} strokeLinecap="round" strokeLinejoin="round">
          {/* Left wire */}
          <line x1="8" y1="48" x2="38" y2="48" stroke={color} strokeWidth="2.2" />
          {/* Left post */}
          <line x1="38" y1="36" x2="38" y2="60" stroke={color} strokeWidth="2.2" />
          {/* Right post */}
          <line x1="82" y1="36" x2="82" y2="60" stroke={color} strokeWidth="2.2" />
          {/* Right wire */}
          <line x1="82" y1="48" x2="112" y2="48" stroke={color} strokeWidth="2.2" />
          {/* Pivot dot */}
          <circle cx="38" cy="48" r="4" fill={color} stroke="none" />
          {/* Lever */}
          <line
            x1="38" y1="48"
            x2={on ? 82 : 70}
            y2={on ? 48 : 22}
            stroke={color}
            strokeWidth="2.5"
          />
          {/* Lever tip */}
          <circle
            cx={on ? 82 : 70}
            cy={on ? 48 : 22}
            r="4"
            fill="none"
            stroke={color}
            strokeWidth="2.2"
          />
        </g>
      </svg>

      <span
        className="font-mono text-sm font-semibold transition-colors duration-150"
        style={{ color: on ? accent : ink, opacity: on ? 1 : 0.4 }}
      >
        {on ? "1" : "0"}
      </span>
    </button>
  );
}

export function BinarySwitches3() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const decimal = (a ? 4 : 0) + (b ? 2 : 0) + (c ? 1 : 0);
  const any = a || b || c;

  return (
    <div className="flex flex-col items-center gap-10 opacity-75 transition-opacity duration-200 hover:opacity-100">
      <div className="flex items-end gap-8">
        <Switch on={a} label="A3" seed={7} onToggle={() => setA((v) => !v)} />
        <Switch on={b} label="B3" seed={13} onToggle={() => setB((v) => !v)} />
        <Switch on={c} label="C3" seed={19} onToggle={() => setC((v) => !v)} />
      </div>
      <span
        className="font-mono text-6xl font-semibold transition-colors duration-150"
        style={{ color: any ? "var(--accent)" : "var(--foreground)", opacity: any ? 1 : 0.45 }}
      >
        {decimal}
      </span>
    </div>
  );
}

export function BinarySwitches() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const decimal = (a ? 2 : 0) + (b ? 1 : 0);

  return (
    <div className="flex flex-col items-center gap-10 opacity-75 transition-opacity duration-200 hover:opacity-100">
      <div className="flex items-end gap-12">
        <Switch on={a} label="A" seed={7} onToggle={() => setA((v) => !v)} />
        <Switch on={b} label="B" seed={13} onToggle={() => setB((v) => !v)} />
      </div>

      <span
        className="font-mono text-6xl font-semibold transition-colors duration-150"
        style={{ color: a || b ? "var(--accent)" : "var(--foreground)", opacity: a || b ? 1 : 0.45 }}
      >
        {decimal}
      </span>

    </div>
  );
}
