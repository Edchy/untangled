function RoughSvg({
  children,
  viewBox = "0 0 520 380",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <div className="flex w-full items-center justify-center" aria-hidden>
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg overflow-visible text-foreground"
      >
        <defs>
          <filter id="chapter-one-roughen" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.034"
              numOctaves="4"
              seed="31"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern id="chapter-one-sloppy-blue" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(58)">
            <path d="M-6 6 C4 2 14 4 34 0 M-6 16 C8 12 20 16 34 10 M-6 26 C8 20 22 26 34 20" stroke="rgba(108, 108, 245, 0.72)" strokeWidth="4" />
          </pattern>
          <pattern id="chapter-one-sloppy-clay" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
            <path d="M0 5 H30 M0 20 H30" stroke="rgba(255, 110, 94, 0.7)" strokeWidth="5" />
            <path d="M6 0 V30 M22 0 V30" stroke="rgba(255, 110, 94, 0.58)" strokeWidth="5" />
          </pattern>
          <pattern id="chapter-one-sloppy-ink" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
            <path d="M0 3 H14 M0 10 H14 M3 0 V14 M10 0 V14" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.5" />
          </pattern>
          <pattern id="chapter-one-sloppy-grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 0 H18 M0 9 H18 M0 18 H18 M0 0 V18 M9 0 V18 M18 0 V18" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" />
          </pattern>
        </defs>
        <g filter="url(#chapter-one-roughen)" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </g>
      </svg>
    </div>
  );
}

const fill = {
  amber: "rgba(215, 162, 63, 0.36)",
  blue: "rgba(82, 128, 176, 0.34)",
  clay: "rgba(216, 90, 48, 0.32)",
  rose: "rgba(190, 92, 124, 0.3)",
  sage: "rgba(106, 142, 96, 0.34)",
} as const;

function MiniSwitch({ x, y, active = false }: { x: number; y: number; active?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="0" y1="26" x2="34" y2="26" stroke={active ? "var(--accent)" : "currentColor"} strokeOpacity={active ? 0.8 : 0.5} strokeWidth="2" />
      <line x1="86" y1="26" x2="124" y2="26" stroke={active ? "var(--accent)" : "currentColor"} strokeOpacity={active ? 0.8 : 0.5} strokeWidth="2" />
      <line x1="34" y1="14" x2="34" y2="38" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      <line x1="86" y1="14" x2="86" y2="38" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      <line x1="34" y1="26" x2={active ? 86 : 72} y2={active ? 26 : 2} stroke={active ? "var(--accent)" : "currentColor"} strokeOpacity={active ? 0.85 : 0.5} strokeWidth="2.6" />
      <circle cx="34" cy="26" r="5" fill={active ? "var(--accent)" : "currentColor"} fillOpacity={active ? 0.75 : 0.42} />
    </g>
  );
}

export function WhatJustHappenedIllustration() {
  return (
    <RoughSvg>
      <rect x="48" y="134" width="126" height="112" rx="12" fill="url(#chapter-one-sloppy-blue)" stroke="currentColor" strokeWidth="2" />
      <line x1="80" y1="192" x2="136" y2="192" stroke="var(--accent)" strokeOpacity="0.74" strokeWidth="3" />
      <circle cx="108" cy="218" r="6" fill="currentColor" fillOpacity="0.28" />
      <path
        d="M176 190 C232 150 284 150 340 190"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.78"
        strokeWidth="2.8"
      />
      <circle cx="402" cy="190" r="58" fill="url(#chapter-one-sloppy-clay)" stroke="currentColor" strokeWidth="2" />
      <path d="M376 190 C394 166 426 166 444 190" fill="none" stroke="var(--accent)" strokeOpacity="0.78" strokeWidth="2.8" />
      <path d="M398 102 V72 M442 112 L466 88 M462 154 L496 144" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1.8" />
    </RoughSvg>
  );
}

export function EverydayObjectsIllustration() {
  return (
    <RoughSvg viewBox="0 0 560 420">
      <path d="M42 190 C142 212 230 210 302 190 S432 166 518 190" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.6" />
      <path d="M42 294 C146 324 236 318 306 294 S426 266 518 294" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.6" />

      <g transform="translate(56 58)">
        <rect x="10" y="4" width="64" height="104" rx="7" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <line x1="26" y1="52" x2="58" y2="52" stroke="var(--accent)" strokeOpacity="0.74" strokeWidth="2.8" />
        <circle cx="42" cy="22" r="5" fill="currentColor" fillOpacity="0.25" />
        <path d="M42 108 V142 M20 142 H64 M28 160 H56" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M26 132 C34 122 50 122 58 132" fill="none" stroke="var(--accent)" strokeOpacity="0.34" strokeWidth="1.7" />
      </g>

      <g transform="translate(214 52)">
        <rect x="20" y="4" width="72" height="122" rx="13" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <circle cx="56" cy="106" r="5" fill="var(--accent)" fillOpacity="0.75" />
        <path d="M38 34 H74 M38 58 H74 M38 82 H58" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.4" />
        <path d="M56 126 V158 M20 158 C36 144 76 144 92 158" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M38 150 L74 150 M44 166 L68 166" stroke="var(--accent)" strokeOpacity="0.32" strokeWidth="1.6" />
      </g>

      <g transform="translate(374 70)">
        <path d="M6 72 L28 20 H92 L116 72 Z" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="78" r="13" fill="var(--background)" stroke="currentColor" strokeOpacity="0.56" strokeWidth="1.7" />
        <circle cx="96" cy="78" r="13" fill="var(--background)" stroke="currentColor" strokeOpacity="0.56" strokeWidth="1.7" />
        <path d="M56 48 H82" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="2.5" />
        <path d="M62 92 V134 M32 134 H104 M48 150 H88" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M54 124 C62 112 78 112 86 124" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1.6" />
      </g>

      <g transform="translate(66 252)">
        <path d="M16 34 H76 V72 C76 102 56 118 34 108 C18 100 16 84 16 72 Z" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <path d="M22 34 C30 16 62 16 74 34" fill="none" stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.8" />
        <path d="M70 24 H94" stroke="var(--accent)" strokeOpacity="0.72" strokeWidth="2.6" />
        <path d="M46 108 V140 M22 140 H78 M30 156 H70" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
      </g>

      <g transform="translate(222 258)">
        <path d="M8 26 C28 6 72 8 92 30 C112 56 82 84 48 78 L18 98 L28 72 C4 62 -8 42 8 26 Z" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <path d="M32 42 H74 M30 58 H60" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="2.2" />
        <path d="M50 82 V122 M22 122 H88 M34 138 H76" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
      </g>

      <g transform="translate(386 252)">
        <path d="M24 52 C12 50 6 40 12 28 C18 16 32 18 38 26 C46 8 74 8 82 28 C100 26 112 40 104 56 C96 72 66 66 54 66 C42 66 34 58 24 52 Z" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <path d="M54 66 V102 M22 102 H90 M34 118 H78 M44 134 H68" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
        <path d="M34 42 H82" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="2.4" />
      </g>
    </RoughSvg>
  );
}

export function LayersIllustration() {
  const layerFills = [fill.clay, fill.blue, fill.sage, fill.amber];

  return (
    <RoughSvg>
      {[0, 1, 2, 3].map((layer) => (
        <g key={layer} transform={`translate(${layer * 18} ${layer * 24})`}>
          <path
            d="M96 92 C168 74 288 76 414 94 L382 164 C272 148 168 148 72 166 Z"
            fill={layerFills[layer]}
            stroke={layer === 0 ? "var(--accent)" : "currentColor"}
            strokeOpacity={layer === 0 ? 0.72 : 0.5}
            strokeWidth={layer === 0 ? 2.2 : 1.7}
          />
          <path d="M128 118 C202 104 282 106 358 120" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.3" />
        </g>
      ))}
      <path d="M114 280 C184 312 328 312 414 268" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.6" />
    </RoughSvg>
  );
}

export function ComplexityDissolvesIllustration() {
  return (
    <RoughSvg viewBox="0 0 560 420">
      <g opacity="0.9">
        <circle cx="138" cy="202" r="86" fill="var(--background)" stroke="currentColor" strokeOpacity="0.46" strokeWidth="2" />
        <path d="M80 170 C126 74 196 296 250 154 M76 218 C138 318 184 80 252 238 M94 256 C128 138 214 146 222 268 M68 194 C148 246 190 126 254 192" fill="none" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.8" />
        <path d="M88 230 C126 176 164 172 196 202 C218 224 232 224 254 204" fill="none" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="2.7" />
      </g>

      <path d="M248 204 C292 184 306 164 330 130" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.4" />
      <path d="M252 204 C300 204 312 204 340 204" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.4" />
      <path d="M248 204 C292 224 306 244 330 278" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.4" />

      <g transform="translate(330 80)">
        <path d="M0 36 C44 22 108 22 160 36 L146 86 C98 76 46 76 0 88 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.62" strokeWidth="1.8" />
        <path d="M30 58 C62 50 98 50 130 58" fill="none" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="2.2" />
        <path d="M18 74 C54 66 98 66 140 74" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.4" />
      </g>
      <g transform="translate(342 166)">
        <path d="M0 34 C42 22 102 22 150 34 L136 82 C92 74 44 74 0 84 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.56" strokeWidth="1.8" />
        <path d="M28 56 H120" stroke="var(--accent)" strokeOpacity="0.64" strokeWidth="2.2" />
        <path d="M22 70 H132" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.4" />
      </g>
      <g transform="translate(330 250)">
        <path d="M0 34 C44 22 108 22 160 34 L146 84 C96 74 44 74 0 86 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" />
        <path d="M34 54 C60 68 100 68 126 54" fill="none" stroke="var(--accent)" strokeOpacity="0.64" strokeWidth="2.2" />
        <path d="M20 70 C56 78 104 78 142 70" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.4" />
      </g>

      <path d="M354 58 C394 40 456 40 502 58" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M322 342 C378 370 454 368 512 338" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
    </RoughSvg>
  );
}

export function HumanStackIllustration() {
  const platformFills = [fill.sage, fill.amber, fill.blue, fill.clay];

  return (
    <RoughSvg>
      {[0, 1, 2, 3].map((level) => (
        <g key={level} transform={`translate(${78 + level * 54} ${270 - level * 46})`}>
          <path d="M0 18 H252 L228 48 H-20 Z" fill={platformFills[level]} stroke={level === 3 ? "var(--accent)" : "currentColor"} strokeOpacity={level === 3 ? 0.65 : 0.42} strokeWidth="1.7" />
          <path d="M38 10 L58 10 M78 10 L112 10 M134 10 L174 10" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.4" />
        </g>
      ))}
      <path d="M180 82 L210 60 L244 82 M212 62 V126" fill="none" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.7" />
      <path d="M286 64 L328 84 L292 100 Z" fill={fill.rose} stroke="var(--accent)" strokeOpacity="0.66" strokeWidth="1.8" />
      <path d="M300 88 L320 142" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
    </RoughSvg>
  );
}

export function ComputerStackIllustration() {
  return (
    <RoughSvg viewBox="0 0 560 420">
      <g opacity="0.42">
        <MiniSwitch x={218} y={322} active />
        <path d="M204 356 H356" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.4" />
      </g>

      <path d="M112 276 C180 254 374 254 448 276 L418 340 C312 318 214 318 92 342 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.8" />
      <path d="M152 304 C218 292 330 292 394 304" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.4" />

      <path d="M96 222 C176 196 386 196 468 222 L438 286 C326 262 218 262 76 288 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.8" />
      <path d="M146 250 C218 236 340 236 410 250" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.4" />

      <path d="M84 166 C176 136 398 136 482 166 L452 232 C336 206 216 206 64 234 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.54" strokeWidth="1.9" />
      <path d="M144 194 C226 178 354 178 426 194" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />

      <path d="M70 108 C174 74 408 74 498 108 L466 178 C342 148 214 148 48 180 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.66" strokeWidth="2" />
      <path d="M158 136 C238 118 360 118 432 136" fill="none" stroke="var(--accent)" strokeOpacity="0.42" strokeWidth="2" />

      <g>
        <path d="M170 54 H390 L424 92 C338 72 222 72 136 92 Z" fill="var(--background)" stroke="currentColor" strokeWidth="2.1" />
        <path d="M224 74 H336" stroke="var(--accent)" strokeOpacity="0.76" strokeWidth="2.8" />
        <path d="M208 42 L202 26 M250 34 L248 18 M352 42 L360 26 M392 68 L412 56" stroke="var(--accent)" strokeOpacity="0.38" strokeWidth="1.7" />
        <circle cx="320" cy="36" r="4" fill="var(--accent)" fillOpacity="0.34" />
      </g>

      <path d="M280 98 V326" fill="none" stroke="var(--accent)" strokeOpacity="0.52" strokeWidth="2.4" strokeDasharray="4 10" />
      <path d="M268 314 L280 330 L292 314" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.4" />
      <path d="M78 360 C180 394 382 394 482 356" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.6" />
    </RoughSvg>
  );
}

export function ChairIllustration() {
  return (
    <RoughSvg>
      <path
        d="M184 88 C230 72 300 72 344 90 L326 202 C286 190 236 190 202 204 Z"
        fill="url(#chapter-one-sloppy-clay)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M176 208 C224 190 300 190 354 208 L332 252 C288 240 238 240 198 252 Z"
        fill="url(#chapter-one-sloppy-blue)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M198 252 L178 326 M332 252 L360 326 M230 248 L226 312 M304 248 L314 312" fill="none" stroke="currentColor" strokeOpacity="0.62" strokeWidth="2" />
      <path d="M202 204 C240 218 288 218 326 202" fill="none" stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="2.4" />
      <path d="M126 326 C200 342 326 342 400 324" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.6" />
    </RoughSvg>
  );
}

export function BinaryToEverythingIllustration() {
  const bits = ["01001000", "01100101", "11100110", "00101101"];

  return (
    <RoughSvg viewBox="0 0 560 420">
      <g className="font-mono">
        <rect x="154" y="36" width="252" height="104" rx="6" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <text x="280" y="66" textAnchor="middle" className="text-[13px] font-semibold uppercase" fill="currentColor" fillOpacity="0.42">
          same bits
        </text>
        {bits.map((bitLine, index) => (
          <text
            key={bitLine}
            x="280"
            y={92 + index * 16}
            textAnchor="middle"
            className="text-[14px] font-semibold"
            fill={index === 1 ? "var(--accent)" : "currentColor"}
            fillOpacity={index === 1 ? 0.82 : 0.54}
          >
            {bitLine}
          </text>
        ))}
      </g>

      <path d="M280 140 V182" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="2.4" />
      <path d="M280 182 C160 176 108 208 108 248" fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M280 182 C250 210 248 230 248 248" fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M280 182 C316 210 318 230 318 248" fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M280 182 C400 176 452 208 452 248" fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="2" />

      <g className="font-mono">
        <g transform="translate(34 248)">
          <rect width="148" height="116" rx="6" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <text x="74" y="28" textAnchor="middle" className="text-[13px] font-semibold uppercase" fill="currentColor" fillOpacity="0.42">
            text
          </text>
          <text x="74" y="78" textAnchor="middle" className="text-[46px] font-semibold" fill="var(--accent)" fillOpacity="0.82">
            Hi
          </text>
        </g>

        <g transform="translate(204 248)">
          <rect width="88" height="116" rx="6" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <text x="44" y="28" textAnchor="middle" className="text-[13px] font-semibold uppercase" fill="currentColor" fillOpacity="0.42">
            color
          </text>
          <rect x="28" y="48" width="32" height="32" rx="3" fill="var(--accent)" fillOpacity="0.58" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
          <text x="44" y="94" textAnchor="middle" className="text-[12px] font-semibold" fill="currentColor" fillOpacity="0.46">
            RGB
          </text>
        </g>

        <g transform="translate(310 248)">
          <rect width="88" height="116" rx="6" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <text x="44" y="28" textAnchor="middle" className="text-[13px] font-semibold uppercase" fill="currentColor" fillOpacity="0.42">
            video
          </text>
          {[0, 1, 2].map((frame) => (
            <rect
              key={frame}
              x={18 + frame * 10}
              y={48 + frame * 6}
              width="38"
              height="28"
              rx="2"
              fill={frame === 2 ? "var(--background)" : fill.blue}
              stroke={frame === 2 ? "var(--accent)" : "currentColor"}
              strokeOpacity={frame === 2 ? 0.72 : 0.38}
              strokeWidth="1.2"
            />
          ))}
        </g>

        <g transform="translate(420 248)">
          <rect width="106" height="116" rx="6" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <text x="53" y="28" textAnchor="middle" className="text-[13px] font-semibold uppercase" fill="currentColor" fillOpacity="0.42">
            sound
          </text>
          <path d="M18 70 C30 38 42 102 54 70 S78 38 90 70" fill="none" stroke="var(--accent)" strokeOpacity="0.74" strokeWidth="2.2" />
          <path d="M18 88 H90" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.2" />
        </g>
      </g>
    </RoughSvg>
  );
}

export function CharacterMappingIllustration() {
  const characters = [
    { symbol: "A", bits: "01000001", active: false },
    { symbol: "B", bits: "01000010", active: false },
    { symbol: "?", bits: "00111111", active: true },
    { symbol: "#", bits: "00100011", active: false },
  ];

  return (
    <RoughSvg viewBox="0 0 560 380">
      <g className="font-mono">
        {characters.map((character, index) => {
          const x = 62 + (index % 2) * 248;
          const y = 70 + Math.floor(index / 2) * 136;

          return (
            <g key={character.symbol} transform={`translate(${x} ${y})`}>
              <rect
                x="0"
                y="0"
                width="188"
                height="92"
                rx="6"
                fill="var(--background)"
                stroke={character.active ? "var(--accent)" : "currentColor"}
                strokeOpacity={character.active ? 0.82 : 0.44}
                strokeWidth={character.active ? 2.1 : 1.5}
              />
              <text
                x="30"
                y="58"
                className="text-[48px] font-semibold"
                fill={character.active ? "var(--accent)" : "currentColor"}
                fillOpacity={character.active ? 0.92 : 0.72}
              >
                {character.symbol}
              </text>
              <text x="84" y="34" className="text-[13px] font-semibold" fill="currentColor" fillOpacity="0.36">
                maps to
              </text>
              <text
                x="84"
                y="62"
                className="text-[16px] font-semibold"
                fill={character.active ? "var(--accent)" : "currentColor"}
                fillOpacity={character.active ? 0.86 : 0.58}
              >
                {character.bits}
              </text>
            </g>
          );
        })}
      </g>
      <path
        d="M126 310 C182 338 378 338 434 310"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
    </RoughSvg>
  );
}

export function HumanComputersIllustration() {
  const desks = [
    { x: 96, y: 138, fill: fill.blue, active: false },
    { x: 238, y: 118, fill: fill.amber, active: true },
    { x: 380, y: 146, fill: fill.sage, active: false },
  ];

  return (
    <RoughSvg viewBox="0 0 560 390">
      <path d="M58 82 H502 V304 H58 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.5" />
      <path d="M80 112 H480 M80 304 H480" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.2" />

      <g className="font-mono">
        <g transform="translate(32 180)">
          <path d="M0 0 H74 V92 H0 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.5" />
          <path d="M14 22 H58 M14 38 H52 M14 54 H60" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" />
        </g>

        <path d="M112 226 C138 226 150 220 174 214" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.1" />

        {desks.map((desk, index) => (
          <g key={index} transform={`translate(${desk.x} ${desk.y})`}>
            <circle
              cx="44"
              cy="24"
              r="16"
              fill="var(--background)"
              stroke={desk.active ? "var(--accent)" : "currentColor"}
              strokeOpacity={desk.active ? 0.82 : 0.48}
              strokeWidth={desk.active ? 2 : 1.5}
            />
            <path d="M22 66 C34 48 56 48 68 66" fill="none" stroke="currentColor" strokeOpacity="0.46" strokeWidth="1.5" />
            <path
              d="M-12 90 H112 L94 130 H-28 Z"
              fill={desk.fill}
              stroke={desk.active ? "var(--accent)" : "currentColor"}
              strokeOpacity={desk.active ? 0.72 : 0.48}
              strokeWidth={desk.active ? 1.9 : 1.5}
            />
            <path d="M22 103 H74 M16 116 H66" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1.2" />
            <path d="M68 80 L90 68 M72 86 L94 74" stroke="var(--accent)" strokeOpacity={desk.active ? 0.72 : 0.28} strokeWidth="1.6" />
            {desk.active && <path d="M18 -8 C34 -22 58 -22 72 -8" fill="none" stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="1.7" />}
          </g>
        ))}

        <path d="M344 216 C376 218 398 224 430 232" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.1" />

        <g transform="translate(438 196)">
          <path d="M0 0 H86 V76 H0 Z" fill="var(--background)" stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.5" />
          <path d="M16 22 H70 M16 38 H64" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" />
          <path d="M18 56 H68" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="1.8" />
        </g>
      </g>
    </RoughSvg>
  );
}

export function AdaLovelaceIllustration() {
  return (
    <RoughSvg>
      <path d="M86 82 H232 V306 H86 Z" fill={fill.amber} stroke="currentColor" strokeWidth="1.8" />
      <path d="M112 126 H204 M112 158 H188 M112 190 H210 M112 222 H176" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
      <path d="M112 254 H198" stroke="var(--accent)" strokeOpacity="0.65" strokeWidth="2" />
      <circle cx="334" cy="164" r="54" fill={fill.blue} stroke="currentColor" strokeWidth="1.8" />
      <circle cx="334" cy="164" r="18" fill={fill.rose} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M334 98 V122 M334 206 V230 M268 164 H292 M376 164 H400 M288 118 L306 136 M362 192 L380 210 M288 210 L306 192 M362 136 L380 118" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.5" />
      <path d="M236 256 C280 230 326 232 380 256" fill="none" stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="2.2" />
      <rect x="372" y="246" width="58" height="86" rx="4" fill={fill.sage} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.6" />
      <path d="M390 266 H412 M390 286 H410 M390 306 H414" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="1.6" />
    </RoughSvg>
  );
}

export function PunchCardIllustration() {
  const holes = [
    [130, 132], [184, 132], [292, 132], [346, 132],
    [130, 184], [238, 184], [292, 184],
    [184, 236], [346, 236],
  ];

  return (
    <RoughSvg>
      <path d="M90 84 H430 V292 H90 Z" fill={fill.amber} stroke="currentColor" strokeWidth="2" />
      <path d="M112 106 H408 M112 266 H408" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.4" />
      {holes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="15" fill={fill.rose} stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.8" />
      ))}
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.2">
        {[130, 184, 238, 292, 346, 400].map((x) => <line key={x} x1={x} y1="112" x2={x} y2="264" />)}
        {[132, 184, 236].map((y) => <line key={y} x1="112" y1={y} x2="408" y2={y} />)}
      </g>
      <text x="118" y="330" className="font-mono text-[18px] font-semibold" fill="currentColor" fillOpacity="0.5">1 0 1 0 1</text>
    </RoughSvg>
  );
}

export function EniacIllustration() {
  const cabinetX = [132, 224, 316, 408];
  const patchPanels = [138, 230, 322, 414];
  const tubeBanks = [154, 258, 362, 462];

  return (
    <RoughSvg viewBox="0 0 600 420">
      <path d="M122 54 H520 V328 H122 Z" fill={fill.rose} stroke="currentColor" strokeWidth="2" />
      <path d="M114 318 H544 V354 H114 Z" fill={fill.amber} stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.5" />
      <path d="M120 336 H542 M120 346 H542" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.3" />

      {cabinetX.map((x, index) => (
        <g key={x}>
          <rect x={x} y="62" width="84" height="170" fill={index === 1 ? fill.sage : fill.blue} stroke="currentColor" strokeOpacity="0.58" strokeWidth="1.5" />
          <path d={`M${x + 8} 72 H${x + 76} V214 H${x + 8} Z`} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
          <rect x={x - 4} y="48" width="8" height="252" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" />
          {index === 1 ? (
            <>
              {Array.from({ length: 9 }).map((_, row) =>
                Array.from({ length: 8 }).map((__, col) => (
                  <circle key={`${row}-${col}`} cx={x + 16 + col * 8} cy={82 + row * 8} r="2.3" fill="var(--background)" stroke="currentColor" strokeOpacity="0.42" strokeWidth="0.9" />
                )),
              )}
              <rect x={x + 24} y="146" width="42" height="24" fill="var(--background)" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
            </>
          ) : (
            <>
              <rect x={x + 28} y={index === 2 ? 116 : 136} width="42" height="8" fill="var(--background)" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
              <path d={`M${x + 28} ${index === 3 ? 154 : 166} H${x + 66}`} stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.4" />
              <path d={`M${x + 47} ${index === 2 ? 168 : 126} c-9 13 -9 21 0 29 c9 -8 9 -16 0 -29 Z`} fill={fill.amber} stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.2" />
            </>
          )}
        </g>
      ))}
      <rect x="516" y="62" width="8" height="238" fill="var(--background)" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.4" />

      <g>
        <path d="M32 176 H116 V330 H32 Z" fill={fill.sage} stroke="currentColor" strokeWidth="1.8" />
        <circle cx="56" cy="214" r="10" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" />
        <circle cx="90" cy="214" r="10" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" />
        <circle cx="73" cy="236" r="5" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <rect x="54" y="252" width="44" height="14" fill="var(--background)" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.1" />
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((__, col) => (
            <circle key={`${row}-${col}`} cx={48 + col * 14} cy={284 + row * 10} r="3" fill="var(--background)" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1" />
          )),
        )}
      </g>

      {patchPanels.map((x, panelIndex) => (
        <g key={x}>
          <rect x={x} y="238" width="76" height="68" fill={fill.clay} stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.5" />
          {Array.from({ length: 3 }).map((_, row) =>
            Array.from({ length: 7 }).map((__, col) => (
              <circle key={`${row}-${col}`} cx={x + 12 + col * 9} cy={252 + row * 15} r="2.8" fill="var(--background)" stroke={row === panelIndex % 3 ? "var(--accent)" : "currentColor"} strokeOpacity={row === panelIndex % 3 ? 0.6 : 0.3} strokeWidth="1" />
            )),
          )}
          <path d={`M${x + 8} 298 H${x + 68}`} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" />
        </g>
      ))}

      <g fill="none" stroke="var(--accent)" strokeLinecap="round" strokeOpacity="0.58" strokeWidth="2">
        <path d="M116 260 C134 224 152 224 168 250" />
        <path d="M188 236 C206 284 242 280 258 248" />
        <path d="M280 238 C304 292 356 292 374 252" />
        <path d="M386 238 C418 316 454 318 486 250" />
        <path d="M60 326 C84 380 152 366 164 306" />
      </g>
      <g stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.3">
        {[150, 170, 190, 248, 268, 288, 350, 370, 390, 456, 476, 496].map((x) => (
          <path key={x} d={`M${x} 306 C${x - 18} 340 ${x + 14} 362 ${x - 4} 386`} fill="none" />
        ))}
      </g>

      {tubeBanks.map((x) => (
        <g key={x}>
          <rect x={x} y="340" width="66" height="48" fill={fill.blue} stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" />
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 6 }).map((__, col) => (
              <circle key={`${row}-${col}`} cx={x + 8 + col * 10} cy={348 + row * 8} r="2.5" fill="var(--background)" stroke="currentColor" strokeOpacity="0.34" strokeWidth="0.9" />
            )),
          )}
        </g>
      ))}
      <path d="M46 392 H544" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.4" />
    </RoughSvg>
  );
}

export function TransistorScaleIllustration() {
  const depthLayers = Array.from({ length: 22 }, (_, index) => {
    const depth = index / 21;
    const scale = 0.18 + depth * depth * 1.62;

    return {
      depth,
      y: 32 + depth * depth * 430,
      width: 176 + scale * 470,
      opacity: 0.05 + depth * 0.3,
      scale,
    };
  });

  const perspectiveDots = Array.from({ length: 56 * 44 }, (_, index) => ({
    column: index % 56,
    row: Math.floor(index / 56),
  }));

  return (
    <div className="relative flex w-full min-w-0 items-center justify-center overflow-visible" aria-hidden>
      <svg
        viewBox="0 0 760 620"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none w-full max-w-lg scale-[1.55] overflow-visible text-foreground sm:scale-[1.7] lg:scale-[1.85]"
      >
        <defs>
          <pattern id="transistor-scale-dot-field-tight" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="0.9" cy="0.9" r="0.42" fill="currentColor" fillOpacity="0.36" />
            <circle cx="3.4" cy="2.2" r="0.34" fill="currentColor" fillOpacity="0.22" />
            <circle cx="1.8" cy="4.2" r="0.3" fill="currentColor" fillOpacity="0.17" />
          </pattern>
          <pattern id="transistor-scale-dot-field-wide" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1.1" cy="1.2" r="0.56" fill="currentColor" fillOpacity="0.42" />
            <circle cx="5.7" cy="2.8" r="0.45" fill="currentColor" fillOpacity="0.25" />
            <circle cx="3.6" cy="6.2" r="0.4" fill="currentColor" fillOpacity="0.2" />
          </pattern>
          <radialGradient id="transistor-scale-vignette" cx="50%" cy="54%" r="68%">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="74%" stopColor="var(--background)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0.64" />
          </radialGradient>
        </defs>

        <g transform="translate(380 82)">
          {depthLayers.map((plane, index) => (
            <g key={plane.y} transform={`translate(${-plane.width / 2} ${plane.y}) scale(${plane.scale} 1)`}>
              <path
                d={`M${plane.width * 0.42} 0 H${plane.width * 0.58} L${plane.width} ${10 + plane.depth * 28} H0 Z`}
                fill={index < 11 ? "url(#transistor-scale-dot-field-tight)" : "url(#transistor-scale-dot-field-wide)"}
                opacity={plane.opacity}
              />
              <path
                d={`M${plane.width * 0.42} 0 H${plane.width * 0.58} L${plane.width} ${10 + plane.depth * 28} H0 Z`}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.018 + plane.depth * 0.07}
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>

        <g transform="translate(380 96)" opacity="0.74">
          {perspectiveDots.map((dot) => {
              const depth = dot.row / 43;
              const easedDepth = depth * depth * depth;
              const spread = 44 + easedDepth * 650;
              const x = (dot.column / 55 - 0.5) * spread;
              const y = depth * depth * 454;
              const stagger = dot.column % 2 === 0 ? depth * 5.2 : 0;
              const r = 0.22 + easedDepth * 1.28;
              const opacity = 0.045 + easedDepth * 0.42;

              return (
                <circle
                  key={`${dot.row}-${dot.column}`}
                  cx={x}
                  cy={y + stagger}
                  r={r}
                  fill="currentColor"
                  fillOpacity={opacity}
                />
              );
            })}
        </g>

        <path
          d="M58 536 C190 622 576 622 704 530"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1.5"
        />
        <rect x="0" y="0" width="760" height="620" fill="url(#transistor-scale-vignette)" />
      </svg>
    </div>
  );
}

export function ComputerExplodedIllustration() {
  return (
    <RoughSvg viewBox="0 0 560 400">
      <path
        d="M74 84 H486 V314 H74 Z"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1.8"
      />
      <path
        d="M96 108 H464 V290 H96 Z"
        fill="url(#chapter-one-sloppy-ink)"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.4"
      />

      <g className="font-mono">
        <g transform="translate(208 130)">
          <rect
            width="116"
            height="92"
            rx="7"
            fill={fill.amber}
            stroke="var(--accent)"
            strokeOpacity="0.78"
            strokeWidth="2.2"
          />
          <path d="M20 24 H96 M20 46 H78 M20 68 H90" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.4" />
          <text x="58" y="118" textAnchor="middle" className="text-[15px] font-semibold" fill="var(--accent)" fillOpacity="0.82">
            CPU
          </text>
        </g>

        <g transform="translate(348 142)">
          <rect width="84" height="68" rx="6" fill={fill.blue} stroke="currentColor" strokeOpacity="0.52" strokeWidth="1.6" />
          <circle cx="42" cy="34" r="18" fill="var(--background)" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.4" />
          <path d="M30 34 H54 M42 22 V46" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="1.8" />
          <text x="42" y="98" textAnchor="middle" className="text-[15px] font-semibold" fill="currentColor" fillOpacity="0.58">
            GPU
          </text>
        </g>

        <g transform="translate(128 126)">
          {[0, 1, 2].map((stick) => (
            <rect
              key={stick}
              x="0"
              y={stick * 30}
              width="48"
              height="18"
              rx="3"
              fill={fill.sage}
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.4"
            />
          ))}
          <path d="M8 9 H40 M8 39 H40 M8 69 H40" stroke="var(--accent)" strokeOpacity="0.46" strokeWidth="1.3" />
          <text x="24" y="118" textAnchor="middle" className="text-[15px] font-semibold" fill="currentColor" fillOpacity="0.58">
            RAM
          </text>
        </g>

        <g transform="translate(198 250)">
          <rect width="164" height="36" rx="5" fill={fill.rose} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="22" cy="18" r="7" fill="var(--background)" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.2" />
          <path d="M48 18 H142" stroke="var(--accent)" strokeOpacity="0.52" strokeWidth="1.7" />
          <text x="82" y="64" textAnchor="middle" className="text-[15px] font-semibold" fill="currentColor" fillOpacity="0.58">
            storage
          </text>
        </g>
      </g>

      <path d="M184 172 H208 M324 176 H348 M232 222 L218 250 M302 222 L336 250" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M266 130 V108 M266 222 V250 M208 176 H176 M324 176 H348" stroke="var(--accent)" strokeOpacity="0.32" strokeWidth="1.8" />
      <path d="M112 326 C180 348 386 348 456 324" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
    </RoughSvg>
  );
}

export function CpuIllustration() {
  const queued = ["01", "10", "11", "00"];
  const completed = ["01", "10"];

  return (
    <RoughSvg viewBox="0 0 560 400">
      <g transform="translate(64 136)">
        {queued.map((bits, index) => (
          <g key={bits} transform={`translate(${index * 52} ${index % 2 === 0 ? 0 : 10})`}>
            <rect width="38" height="42" rx="4" fill="var(--background)" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.3" />
            <path d="M8 14 H30 M8 27 H30" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.1" />
            <text x="19" y="63" textAnchor="middle" className="font-mono text-[13px] font-semibold" fill="currentColor" fillOpacity="0.42">
              {bits}
            </text>
          </g>
        ))}
      </g>

      <path d="M92 226 H218" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.4" />
      <path d="M210 184 C230 184 238 184 258 184" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.2" />

      <g transform="translate(250 90)">
        <rect width="130" height="190" rx="8" fill={fill.blue} stroke="currentColor" strokeOpacity="0.56" strokeWidth="1.7" />
        <rect x="28" y="54" width="74" height="64" rx="5" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.64" strokeWidth="1.8" />
        <path d="M42 76 H88 M42 96 H88" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.4" />
        <path d="M16 28 H114 M16 146 H114 M42 0 V-22 M66 0 V-22 M90 0 V-22 M42 190 V212 M66 190 V212 M90 190 V212" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.2" />
        <path d="M0 42 H-28 M0 74 H-28 M0 106 H-28 M0 138 H-28 M130 74 H158 M130 118 H158" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.3" />
        <text x="65" y="166" textAnchor="middle" className="font-mono text-[17px] font-semibold" fill="currentColor" fillOpacity="0.58">
          CPU
        </text>
      </g>

      <path d="M380 184 C404 184 414 184 436 184" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.2" />

      <g transform="translate(430 138)">
        {completed.map((bits, index) => (
          <g key={bits} transform={`translate(${index * 50} ${index % 2 === 0 ? 8 : 0})`}>
            <rect width="38" height="42" rx="4" fill={fill.sage} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.3" />
            <path d="M8 14 H30 M8 27 H30" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.1" />
          </g>
        ))}
      </g>

      <g transform="translate(216 168)">
        <rect width="44" height="34" rx="4" fill={fill.amber} stroke="var(--accent)" strokeOpacity="0.72" strokeWidth="1.6" />
        <path d="M10 12 H34 M10 23 H34" stroke="var(--accent)" strokeOpacity="0.46" strokeWidth="1.2" />
      </g>

      <path d="M118 94 C190 62 374 62 442 94 M112 318 C184 344 376 344 448 318" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M112 348 C184 370 374 370 448 348" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
    </RoughSvg>
  );
}

export function GpuIllustration() {
  const workers = [
    { x: 62, y: 118, angle: 8, active: false },
    { x: 108, y: 174, angle: -7, active: true },
    { x: 58, y: 254, angle: -12, active: false },
    { x: 172, y: 118, angle: 10, active: false },
    { x: 198, y: 286, angle: -5, active: true },
    { x: 288, y: 104, angle: 8, active: false },
    { x: 320, y: 286, angle: -8, active: false },
    { x: 438, y: 264, angle: 11, active: true },
  ];
  const stackAnts = [
    { x: 308, y: 282, angle: -7, active: false },
    { x: 358, y: 284, angle: 8, active: true },
    { x: 408, y: 280, angle: -5, active: false },
    { x: 458, y: 284, angle: 6, active: false },
    { x: 332, y: 240, angle: 10, active: false },
    { x: 382, y: 238, angle: -8, active: false },
    { x: 432, y: 240, angle: 7, active: true },
    { x: 356, y: 198, angle: -7, active: false },
    { x: 406, y: 198, angle: 8, active: false },
    { x: 380, y: 158, angle: 4, active: true },
  ];
  const carryBlocks = [
    { x: 78, y: 94 },
    { x: 124, y: 150 },
    { x: 214, y: 262 },
    { x: 454, y: 240 },
  ];

  function Ant({
    active,
  }: {
    active: boolean;
  }) {
    return (
      <>
        <ellipse cx="-16" cy="0" rx="11" ry="7" fill={active ? fill.clay : fill.sage} stroke={active ? "var(--accent)" : "currentColor"} strokeOpacity={active ? 0.66 : 0.4} strokeWidth="1.2" />
        <ellipse cx="2" cy="0" rx="13" ry="8" fill={active ? fill.amber : fill.sage} stroke={active ? "var(--accent)" : "currentColor"} strokeOpacity={active ? 0.64 : 0.42} strokeWidth="1.3" />
        <circle cx="20" cy="0" r="6" fill="var(--background)" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.1" />
        <path d="M17 -5 C18 -15 27 -18 34 -22 M17 5 C20 14 30 16 38 18" fill="none" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.1" />
        {[-6, 0, 6].map((y) => (
          <path key={y} d={`M${-9 + y / 4} ${y} L-24 ${y - 12} M${2 + y / 4} ${y} L-12 ${y + 14}`} stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.1" />
        ))}
      </>
    );
  }

  return (
    <RoughSvg viewBox="0 0 560 400">
      <path
        d="M46 324 C132 354 412 358 510 320"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1.4"
      />

      <path d="M286 306 C312 228 354 156 384 118 C418 160 468 232 492 306 Z" fill={fill.blue} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.3" />

      <g stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="1.5">
        <path d="M126 152 C206 104 288 112 364 158" fill="none" />
        <path d="M94 266 C186 304 274 292 338 240" fill="none" />
        <path d="M312 104 C338 114 362 132 382 158" fill="none" />
        <path d="M464 252 C448 240 436 236 414 240" fill="none" />
      </g>

      {stackAnts.map((ant, index) => (
        <g key={index} transform={`translate(${ant.x} ${ant.y}) rotate(${ant.angle})`}>
          <Ant active={ant.active} />
        </g>
      ))}

      {workers.map((ant, index) => (
        <g key={index} transform={`translate(${ant.x} ${ant.y}) rotate(${ant.angle})`}>
          <Ant active={ant.active} />
        </g>
      ))}

      {carryBlocks.map((block, index) => (
        <rect key={index} x={block.x} y={block.y} width="14" height="14" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.48" strokeWidth="1.1" />
      ))}

      <path
        d="M74 78 C164 46 268 50 342 94 M84 304 C172 332 276 330 338 304"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1.4"
      />
    </RoughSvg>
  );
}

export function RamIllustration() {
  return (
    <RoughSvg viewBox="0 0 560 400">
      <path d="M82 158 H478 L436 302 H44 Z" fill={fill.sage} stroke="currentColor" strokeOpacity="0.54" strokeWidth="1.8" />
      <path d="M104 182 H452 M76 302 H436" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.3" />

      <g className="font-mono">
        <g transform="translate(98 106) rotate(-5)">
          <rect width="112" height="82" rx="5" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="1.8" />
          <path d="M16 22 H96 M16 40 H72 M16 58 H88" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.3" />
          <text x="56" y="108" textAnchor="middle" className="text-[13px] font-semibold" fill="currentColor" fillOpacity="0.52">
            tab
          </text>
        </g>

        <g transform="translate(240 92) rotate(4)">
          <rect width="104" height="98" rx="6" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="28" cy="30" r="9" fill="var(--accent)" fillOpacity="0.48" />
          <path d="M48 28 H84 M20 58 H84 M20 76 H66" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.3" />
          <text x="52" y="124" textAnchor="middle" className="text-[13px] font-semibold" fill="currentColor" fillOpacity="0.52">
            app
          </text>
        </g>

        <g transform="translate(372 132) rotate(-3)">
          <rect width="86" height="62" rx="5" fill="var(--background)" stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.5" />
          <path d="M16 28 C28 12 44 44 58 28 S72 12 80 28" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="1.8" />
          <text x="43" y="88" textAnchor="middle" className="text-[13px] font-semibold" fill="currentColor" fillOpacity="0.52">
            video
          </text>
        </g>
      </g>

      <g transform="translate(208 212)">
        <rect width="124" height="42" rx="5" fill={fill.amber} stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.4" />
        <path d="M16 16 H108 M16 28 H86" stroke="var(--accent)" strokeOpacity="0.42" strokeWidth="1.4" />
      </g>
      <path d="M154 186 L130 302 M292 194 L278 302 M414 196 L384 302" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1.7" />
      <path d="M172 328 C222 352 342 352 392 328" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
      <path d="M224 328 L208 354 M338 328 L358 354" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.6" />
      <path d="M118 330 C190 354 374 354 444 330" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
    </RoughSvg>
  );
}

export function StorageIllustration() {
  return (
    <RoughSvg viewBox="0 0 560 400">
      <g transform="translate(134 58)">
        <path d="M0 0 H292 V292 H0 Z" fill={fill.amber} stroke="currentColor" strokeOpacity="0.58" strokeWidth="1.8" />
        <path d="M12 10 H280 V282 H12 Z" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.2" />
        {[0, 1, 2].map((drawer) => (
          <g key={drawer} transform={`translate(26 ${30 + drawer * 82})`}>
            <rect
              width="240"
              height="58"
              rx="5"
              fill="var(--background)"
              stroke={drawer === 1 ? "var(--accent)" : "currentColor"}
              strokeOpacity={drawer === 1 ? 0.66 : 0.42}
              strokeWidth={drawer === 1 ? 1.8 : 1.4}
            />
            <rect x="24" y="14" width="58" height="20" rx="3" fill={drawer === 1 ? fill.sage : fill.blue} stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <path d="M104 30 H166" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.5" />
            <circle cx="188" cy="30" r="4" fill="currentColor" fillOpacity="0.28" />
          </g>
        ))}
      </g>

      <g transform="translate(332 128) rotate(4)">
        <path d="M0 0 H138 V78 H0 Z" fill={fill.sage} stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="1.6" />
        <path d="M18 22 H118 M18 42 H92 M18 60 H108" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1.2" />
      </g>

      <g transform="translate(70 246) rotate(-7)">
        <rect width="68" height="52" rx="4" fill="var(--background)" stroke="currentColor" strokeOpacity="0.46" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="8" fill={fill.rose} stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" />
        <path d="M40 22 H56 M14 40 H56" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.2" />
      </g>

      <g transform="translate(86 110) rotate(6)">
        <rect width="58" height="76" rx="4" fill="var(--background)" stroke="currentColor" strokeOpacity="0.44" strokeWidth="1.4" />
        <path d="M16 16 H42 M16 30 H42 M16 44 H36 M16 58 H42" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.2" />
      </g>

      <g className="font-mono">
        <text x="280" y="58" textAnchor="middle" className="text-[14px] font-semibold" fill="currentColor" fillOpacity="0.48">
          files stay here
        </text>
      </g>

      <path d="M96 350 C174 374 388 374 466 348" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
    </RoughSvg>
  );
}

export function BitsRainIllustration() {
  const streams = [
    { x: 78, bits: "10100110", active: false },
    { x: 132, bits: "01011001", active: false },
    { x: 186, bits: "11100101", active: true },
    { x: 246, bits: "00101110", active: false },
    { x: 304, bits: "10110010", active: false },
    { x: 362, bits: "01101011", active: true },
    { x: 420, bits: "11001001", active: false },
    { x: 478, bits: "00110110", active: false },
  ];

  return (
    <RoughSvg viewBox="0 0 560 400">
      <g className="font-mono">
        {streams.map((stream, streamIndex) => (
          <g key={stream.x} transform={`translate(${stream.x} ${36 + (streamIndex % 3) * 18})`}>
            {stream.bits.split("").map((bit, bitIndex) => (
              <text
                key={`${stream.x}-${bitIndex}`}
                x="0"
                y={bitIndex * 36}
                textAnchor="middle"
                className="text-[24px] font-semibold"
                fill={stream.active && bitIndex === 3 ? "var(--accent)" : "currentColor"}
                fillOpacity={stream.active && bitIndex === 3 ? 0.82 : Math.max(0.16, 0.58 - bitIndex * 0.055)}
              >
                {bit}
              </text>
            ))}
          </g>
        ))}
      </g>

      <path
        d="M112 312 C164 284 222 284 278 312 S384 340 446 306"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.42"
        strokeWidth="2"
      />
      <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5">
        <path d="M110 312 H152 M194 312 H236 M278 312 H320 M362 312 H404 M446 312 H488" />
        <path d="M152 300 V324 M236 300 V324 M320 300 V324 M404 300 V324" />
      </g>
      <g fill="var(--background)" stroke="currentColor" strokeOpacity="0.36" strokeWidth="1.3">
        <circle cx="152" cy="312" r="8" />
        <circle cx="236" cy="312" r="8" />
        <circle cx="320" cy="312" r="8" />
        <circle cx="404" cy="312" r="8" />
      </g>
      <path d="M102 352 C178 374 382 374 458 350" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
    </RoughSvg>
  );
}
