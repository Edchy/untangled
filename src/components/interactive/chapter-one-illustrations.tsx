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
  return (
    <RoughSvg>
      <path d="M54 190 C136 122 202 122 260 190 C318 258 388 258 466 190" fill="none" stroke="var(--accent)" strokeOpacity="0.68" strokeWidth="2.5" />
      <g className="font-mono text-[18px] font-semibold" fill="currentColor" fillOpacity="0.5">
        <text x="52" y="176">101001</text>
        <text x="72" y="210">010110</text>
        <text x="392" y="176">0110</text>
        <text x="380" y="214">1001</text>
      </g>
      <rect x="204" y="130" width="112" height="112" rx="8" fill={fill.blue} stroke="currentColor" strokeWidth="1.8" />
      <path d="M230 162 H288 M230 184 H272" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1.5" />
      <path d="M224 214 L246 194 L264 210 L278 200 L296 218" fill="none" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="2" />
      <circle cx="378" cy="112" r="18" fill={fill.amber} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M374 124 V164 C390 154 392 136 374 124 Z" fill={fill.amber} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M364 108 H392" stroke="var(--accent)" strokeOpacity="0.65" strokeWidth="1.7" />
      <path d="M132 266 L164 236 H222 L252 266 Z" fill={fill.sage} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" />
      <path d="M174 250 H218" stroke="var(--accent)" strokeOpacity="0.65" strokeWidth="1.7" />
    </RoughSvg>
  );
}

export function HumanComputersIllustration() {
  const deskFills = [fill.blue, fill.amber, fill.sage];

  return (
    <RoughSvg>
      {[0, 1, 2].map((desk) => (
        <g key={desk} transform={`translate(${72 + desk * 128} ${116 + (desk % 2) * 54})`}>
          <circle cx="38" cy="24" r="15" fill="var(--background)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M18 62 C28 46 52 46 62 62" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" />
          <path d="M0 84 H104 L88 124 H-16 Z" fill={deskFills[desk]} stroke="currentColor" strokeWidth="1.7" />
          <path d="M24 96 H76 M18 108 H66" stroke="var(--accent)" strokeOpacity="0.56" strokeWidth="1.6" />
        </g>
      ))}
      <path d="M82 76 H430 M72 310 H444" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
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
