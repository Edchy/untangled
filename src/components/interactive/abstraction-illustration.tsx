"use client";

import { StandaloneLightSwitch } from "@/components/interactive/light-switch";

export function AbstractionIllustration() {
  return (
    <div className="relative isolate flex h-[360px] w-full min-w-0 items-center justify-center bg-background">
      <svg
        viewBox="0 0 920 360"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 h-full w-full text-foreground"
        aria-hidden
      >
        <defs>
          <filter id="wi-roughen" x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="17" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Veil: fade edges so nothing bleeds hard */}
          <radialGradient id="wi-veil" cx="46%" cy="50%" r="58%">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="70%" stopColor="var(--background)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0.82" />
          </radialGradient>
          {/* Right-side fade so illustration doesn't compete with text column */}
          <linearGradient id="wi-right-fade" x1="0" y1="0" x2="920" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="55%" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="82%" stopColor="var(--background)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="1" />
          </linearGradient>
        </defs>

        <g filter="url(#wi-roughen)">

          {/* ── Breaker panel (far left, very faint) ── */}
          <rect x="28" y="108" width="52" height="144" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.4" />
          {/* Panel slots */}
          {[0,1,2,3,4,5].map(i => (
            <rect key={i} x="36" y={118 + i * 20} width="36" height="11" rx="1"
              fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
          ))}
          {/* Panel label line */}
          <line x1="28" y1="108" x2="80" y2="108" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />

          {/* ── Conduit from panel running right through wall ── */}
          {/* Outer conduit tube (two parallel lines) */}
          <path d="M80 176 C140 174 200 172 270 172" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="6" strokeLinecap="round" />
          <path d="M80 184 C140 183 200 182 270 182" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="6" strokeLinecap="round" />

          {/* ── Individual wires inside conduit, fanning out ── */}
          {/* Wire 1 — neutral, grey */}
          <path d="M80 178 C180 176 240 175 300 175 C340 175 370 174 400 174"
            fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.3" />
          {/* Wire 2 — ground */}
          <path d="M80 180 C180 179 240 178 300 179 C340 180 370 180 400 180"
            fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.3" />
          {/* Wire 3 — live, accent */}
          <path d="M80 182 C180 182 240 181 300 183 C340 185 370 183 400 183"
            fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.5" />

          {/* ── Junction / back-box behind the switch ── */}
          {/* Back box outline */}
          <rect x="390" y="128" width="106" height="104" fill="none"
            stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
          {/* Back box inner wall studs */}
          <line x1="390" y1="148" x2="496" y2="148" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="390" y1="212" x2="496" y2="212" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />

          {/* ── Wire stubs from back-box to switch terminals ── */}
          {/* Neutral */}
          <path d="M400 175 C404 175 408 172 414 170" fill="none" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1.3" />
          {/* Ground */}
          <path d="M400 180 C404 180 408 180 414 180" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.3" />
          {/* Live */}
          <path d="M400 183 C404 183 408 186 414 188" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />

          {/* Terminal screws on back-box left side */}
          <circle cx="394" cy="170" r="3" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
          <circle cx="394" cy="180" r="3" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
          <circle cx="394" cy="190" r="3" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.2" />

          {/* ── Cable run going up inside wall ── */}
          <path d="M443 128 C441 100 440 72 438 44 C437 28 436 16 434 4"
            fill="none" stroke="currentColor" strokeOpacity="0.13" strokeWidth="4" strokeLinecap="round" />
          <path d="M451 128 C450 100 450 72 449 44 C448 28 448 16 447 4"
            fill="none" stroke="currentColor" strokeOpacity="0.13" strokeWidth="4" strokeLinecap="round" />
          {/* Individual wires in up-run */}
          <path d="M441 128 L439 4" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.2" />
          <path d="M445 128 L444 4" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.2" />
          <path d="M449 128 L448 4" fill="none" stroke="var(--accent)" strokeOpacity="0.28" strokeWidth="1.4" />

          {/* ── Cable run going down to floor ── */}
          <path d="M443 232 C441 258 440 286 438 316 C437 332 436 344 434 356"
            fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="4" strokeLinecap="round" />
          <path d="M451 232 C450 258 450 286 449 316 C448 332 448 344 447 356"
            fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="4" strokeLinecap="round" />
          <path d="M441 232 L439 356" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.2" />
          <path d="M445 232 L444 356" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.2" />
          <path d="M449 232 L448 356" fill="none" stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="1.4" />

          {/* ── Wall stud lines (framing context) ── */}
          <line x1="340" y1="0" x2="340" y2="360" stroke="currentColor" strokeOpacity="0.07" strokeWidth="8" strokeLinecap="round" />
          <line x1="560" y1="0" x2="560" y2="360" stroke="currentColor" strokeOpacity="0.06" strokeWidth="8" strokeLinecap="round" />
          <line x1="200" y1="0" x2="200" y2="360" stroke="currentColor" strokeOpacity="0.05" strokeWidth="6" strokeLinecap="round" />

          {/* ── Drywall plate suggestion (the "wall face") ── */}
          <rect x="388" y="126" width="110" height="108" rx="2"
            fill="var(--background)" fillOpacity="0.0" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />

          {/* ── Outlet box to the right, very faint ── */}
          <rect x="620" y="150" width="56" height="60" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.2" />
          <circle cx="648" cy="168" r="5" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <circle cx="648" cy="184" r="5" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          {/* cable to outlet */}
          <path d="M560 178 C580 178 598 176 620 174" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3" strokeLinecap="round" />

        </g>

        {/* Radial veil */}
        <rect x="0" y="0" width="920" height="360" fill="url(#wi-veil)" />
        {/* Right-side fade to protect text column */}
        <rect x="0" y="0" width="920" height="360" fill="url(#wi-right-fade)" />
      </svg>

      <div className="relative z-10">
        <StandaloneLightSwitch />
      </div>
    </div>
  );
}
