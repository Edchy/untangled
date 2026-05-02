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
    <RoughSvg>
      <circle cx="128" cy="148" r="54" fill="url(#chapter-one-sloppy-blue)" stroke="currentColor" strokeWidth="2" />
      <line x1="104" y1="148" x2="152" y2="148" stroke="var(--accent)" strokeOpacity="0.72" strokeWidth="2.8" />
      <rect x="238" y="94" width="74" height="118" rx="12" fill="url(#chapter-one-sloppy-ink)" stroke="currentColor" strokeWidth="2" />
      <circle cx="275" cy="186" r="5" fill="var(--accent)" fillOpacity="0.75" />
      <path d="M372 184 L390 128 H452 L474 184 Z" fill="url(#chapter-one-sloppy-clay)" stroke="currentColor" strokeWidth="2" />
      <circle cx="404" cy="190" r="12" fill="var(--background)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.6" />
      <circle cx="456" cy="190" r="12" fill="var(--background)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.6" />
      <path d="M86 280 C138 246 190 246 242 280 S346 314 434 270" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.6" />
      <circle cx="198" cy="282" r="16" fill={fill.amber} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="322" cy="284" r="16" fill={fill.sage} stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="1.7" />
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
    <RoughSvg>
      <circle cx="152" cy="186" r="86" fill="url(#chapter-one-sloppy-ink)" stroke="currentColor" strokeOpacity="0.52" strokeWidth="2" />
      <path d="M94 156 C148 82 198 258 252 150 M92 214 C144 300 194 104 252 226" fill="none" stroke="currentColor" strokeOpacity="0.42" strokeWidth="1.8" />
      <path d="M248 188 C286 188 302 188 340 188" fill="none" stroke="var(--accent)" strokeOpacity="0.58" strokeWidth="2.4" />
      <rect x="340" y="92" width="118" height="42" rx="4" fill="url(#chapter-one-sloppy-blue)" stroke="currentColor" strokeOpacity="0.62" strokeWidth="1.7" />
      <rect x="340" y="166" width="118" height="42" rx="4" fill="url(#chapter-one-sloppy-clay)" stroke="currentColor" strokeOpacity="0.62" strokeWidth="1.7" />
      <rect x="340" y="240" width="118" height="42" rx="4" fill="url(#chapter-one-sloppy-grid)" stroke="currentColor" strokeOpacity="0.62" strokeWidth="1.7" />
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
    <RoughSvg>
      <rect x="154" y="54" width="212" height="122" rx="10" fill="url(#chapter-one-sloppy-blue)" stroke="currentColor" strokeWidth="2" />
      <path d="M206 110 H314" stroke="var(--accent)" strokeOpacity="0.72" strokeWidth="2.6" />
      <path d="M238 176 L220 210 H302 L284 176" fill={fill.blue} stroke="currentColor" strokeOpacity="0.48" strokeWidth="1.6" />
      <rect x="116" y="230" width="288" height="42" rx="5" fill="url(#chapter-one-sloppy-grid)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.7" />
      <rect x="146" y="286" width="228" height="42" rx="5" fill="url(#chapter-one-sloppy-clay)" stroke="var(--accent)" strokeOpacity="0.66" strokeWidth="1.8" />
      <MiniSwitch x={198} y={316} active />
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
  const panelFills = [fill.blue, fill.sage, fill.amber];

  return (
    <RoughSvg>
      <path d="M42 84 H340 V280 H42 Z" fill={fill.rose} stroke="currentColor" strokeWidth="2" />
      {[0, 1, 2].map((col) => (
        <g key={col} transform={`translate(${70 + col * 86} 112)`}>
          <rect width="58" height="132" rx="4" fill={panelFills[col]} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((row) => (
            <circle key={row} cx="29" cy={22 + row * 28} r="7" fill="var(--background)" stroke={row === col ? "var(--accent)" : "currentColor"} strokeOpacity={row === col ? 0.7 : 0.32} strokeWidth="1.5" />
          ))}
        </g>
      ))}
      <path d="M342 184 C380 184 396 220 414 250" fill="none" stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="2.2" />
      <rect x="390" y="234" width="54" height="42" rx="5" fill={fill.blue} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M404 250 H430" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.4" />
      <rect x="456" y="214" width="32" height="62" rx="6" fill={fill.clay} stroke="var(--accent)" strokeOpacity="0.62" strokeWidth="1.6" />
      <circle cx="472" cy="264" r="3" fill="var(--accent)" fillOpacity="0.6" />
      <path d="M74 304 H468" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.4" />
    </RoughSvg>
  );
}
