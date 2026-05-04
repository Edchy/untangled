"use client";

import { StandaloneLightSwitch } from "@/components/interactive/light-switch";

export function AbstractionIllustration() {
  const cableRows = Array.from({ length: 18 }, (_, index) => {
    const depth = index / 17;
    const y = 26 + depth * depth * 314;
    const amplitude = 16 + depth * 30;
    const opacity = 0.06 + depth * 0.18;
    const strokeWidth = 1 + depth * 1.1;

    return { depth, y, amplitude, opacity, strokeWidth };
  });

  const nodes = Array.from({ length: 150 }, (_, index) => {
    const row = Math.floor(index / 15);
    const column = index % 15;
    const depth = row / 9;
    const spread = 210 + depth * depth * 560;

    return {
      x: 460 + (column / 14 - 0.5) * spread,
      y: 56 + depth * depth * 248 + (column % 2) * depth * 10,
      radius: 1.6 + depth * 2.8,
      opacity: 0.06 + depth * 0.2,
    };
  });

  return (
    <div className="relative isolate flex h-[360px] w-full min-w-0 items-center justify-center overflow-visible">
      <svg
        viewBox="0 0 920 360"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 scale-[1.5] overflow-visible text-foreground sm:scale-[1.7] lg:scale-[1.95]"
        aria-hidden
      >
        <defs>
          <filter id="switch-cords-roughen" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.031"
              numOctaves="4"
              seed="43"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern id="switch-cords-pin-field" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="3" r="0.8" fill="currentColor" fillOpacity="0.18" />
            <circle cx="12" cy="8" r="0.55" fill="currentColor" fillOpacity="0.1" />
            <circle cx="6" cy="15" r="0.5" fill="currentColor" fillOpacity="0.08" />
          </pattern>
          <radialGradient id="switch-cords-veil" cx="50%" cy="50%" r="64%">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="72%" stopColor="var(--background)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0.58" />
          </radialGradient>
        </defs>

        <g filter="url(#switch-cords-roughen)" strokeLinecap="round" strokeLinejoin="round">
          <path d="M88 40 H832 L906 318 H14 Z" fill="url(#switch-cords-pin-field)" opacity="0.45" />

          {cableRows.map((row, index) => {
            const edge = 42 + row.depth * row.depth * 210;
            const centerPull = 82 - row.depth * 28;
            const y = row.y;

            return (
              <g key={row.y}>
                <path
                  d={`M${edge - 250} ${y - row.amplitude} C${edge + 90} ${y + row.amplitude} ${460 - centerPull} ${y - row.amplitude} 460 ${178 - row.depth * 18}`}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={row.opacity}
                  strokeWidth={row.strokeWidth}
                />
                <path
                  d={`M${920 - edge + 250} ${y + row.amplitude} C${920 - edge - 90} ${y - row.amplitude} ${460 + centerPull} ${y + row.amplitude} 460 ${178 + row.depth * 18}`}
                  fill="none"
                  stroke={index % 5 === 2 ? "var(--accent)" : "currentColor"}
                  strokeOpacity={index % 5 === 2 ? 0.34 + row.depth * 0.28 : row.opacity}
                  strokeWidth={index % 5 === 2 ? row.strokeWidth + 0.6 : row.strokeWidth}
                />
              </g>
            );
          })}

          <path
            d="M-42 184 C126 120 266 140 364 170 C418 187 444 186 460 178 C478 168 506 164 568 188 C684 232 808 218 962 146"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.76"
            strokeWidth="3"
          />

          {nodes.map((node) => (
            <circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={node.radius}
              fill="var(--background)"
              stroke="currentColor"
              strokeOpacity={node.opacity}
              strokeWidth="1.2"
            />
          ))}

          <g stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.3">
            <path d="M212 62 L318 132 M262 286 L376 218 M642 72 L548 142 M704 292 L570 226" />
            <path d="M122 86 H238 M124 112 H282 M690 64 H820 M648 92 H776 M96 294 H232 M650 320 H842" />
          </g>

          <g stroke="var(--accent)" strokeOpacity="0.34" strokeWidth="1.5">
            <path d="M330 172 H448 M472 178 H586" />
            <path d="M444 162 L458 178 L444 194 M476 160 L462 178 L476 196" />
          </g>
        </g>

        <rect x="0" y="0" width="920" height="360" fill="url(#switch-cords-veil)" />
      </svg>

      <div className="relative z-10">
        <StandaloneLightSwitch />
      </div>
    </div>
  );
}
