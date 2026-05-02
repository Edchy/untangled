"use client";

import { useState } from "react";

export function TransistorZoom() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <button
        type="button"
        onClick={() => setOn((value) => !value)}
        aria-pressed={on}
        aria-label={on ? "Turn the tiny switch off" : "Turn the tiny switch on"}
        className="group w-full cursor-pointer border-0 bg-transparent p-0 text-left"
      >
        <svg
          viewBox="0 0 520 380"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-lg overflow-visible text-foreground"
          aria-hidden
        >
          <defs>
            <filter id="transistor-roughen" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.034"
                numOctaves="4"
                seed="49"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.7"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <pattern
              id="transistor-grid"
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 0 H26 M0 0 V26" stroke="currentColor" strokeOpacity="0.06" />
            </pattern>
          </defs>

          <g filter="url(#transistor-roughen)" strokeLinecap="round" strokeLinejoin="round">
            <rect x="58" y="76" width="162" height="224" rx="18" fill="var(--background)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.8" />
            <rect x="88" y="126" width="102" height="124" rx="8" fill="url(#transistor-grid)" stroke="currentColor" strokeOpacity="0.38" strokeWidth="1.5" />
            {Array.from({ length: 16 }).map((_, index) => {
              const x = 102 + (index % 4) * 24;
              const y = 142 + Math.floor(index / 4) * 24;
              const active = index === 10;

              return (
                <rect
                  key={index}
                  x={x}
                  y={y}
                  width="10"
                  height="10"
                  fill={active ? "var(--accent)" : "currentColor"}
                  fillOpacity={active ? 0.72 : 0.18}
                />
              );
            })}

            <path
              d="M196 212 C250 212 268 164 316 164"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.64"
              strokeWidth="2.3"
            />
            <circle cx="328" cy="164" r="36" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.56" strokeWidth="1.8" />
            <path
              d="M364 164 C402 164 418 164 456 164"
              fill="none"
              stroke={on ? "var(--accent)" : "currentColor"}
              strokeOpacity={on ? 0.82 : 0.24}
              strokeWidth={on ? 2.8 : 1.8}
            />
            <path
              d="M328 104 V138"
              fill="none"
              stroke={on ? "var(--accent)" : "currentColor"}
              strokeOpacity={on ? 0.82 : 0.28}
              strokeWidth={on ? 2.4 : 1.8}
            />
            <path
              d="M328 190 V226"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1.8"
            />
            <path
              d={on ? "M292 164 H364" : "M292 164 L356 132"}
              fill="none"
              stroke={on ? "var(--accent)" : "currentColor"}
              strokeOpacity={on ? 0.84 : 0.42}
              strokeWidth={on ? 3 : 2.2}
            />
            <circle cx="292" cy="164" r="5" fill={on ? "var(--accent)" : "currentColor"} fillOpacity={on ? 0.78 : 0.36} />
            <circle cx={on ? 364 : 356} cy={on ? 164 : 132} r="5" fill="var(--background)" stroke={on ? "var(--accent)" : "currentColor"} strokeOpacity={on ? 0.78 : 0.42} strokeWidth="1.8" />
            <path d="M458 140 L486 164 L458 188" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.6" />
          </g>
        </svg>
        <span
          className="mt-3 block text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
          style={{
            color: on ? "var(--accent)" : "var(--foreground)",
            opacity: on ? 1 : 0.36,
          }}
        >
          {on ? "On - current flows" : "Off - path open"}
        </span>
      </button>
      <span className="font-serif text-sm italic text-foreground/30">tap the tiny switch</span>
    </div>
  );
}
