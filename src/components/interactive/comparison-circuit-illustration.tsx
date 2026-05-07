type ComparisonVariant = "setup" | "flip" | "stack" | "breath";

type ComparisonCircuitIllustrationProps = {
  variant?: ComparisonVariant;
};

const descriptions: Record<ComparisonVariant, string> = {
  setup: "Two input wires enter an unfinished circuit, waiting to become a rule.",
  flip: "Input B passes through a NOT gate before A and NOT B meet at an AND gate.",
  stack: "One small comparison circuit becomes one block in a larger field of rules.",
  breath: "A quiet sunset over simple hills, giving the learner a pause.",
};

export function ComparisonCircuitIllustration({ variant = "setup" }: ComparisonCircuitIllustrationProps) {
  const selectedVariant: ComparisonVariant = ["setup", "flip", "stack", "breath"].includes(variant)
    ? variant
    : "setup";

  return (
    <svg
      viewBox="0 0 560 420"
      role="img"
      aria-labelledby={`comparison-${selectedVariant}-title comparison-${selectedVariant}-desc`}
      className="w-full max-w-[560px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`comparison-${selectedVariant}-title`}>Comparison circuit illustration</title>
      <desc id={`comparison-${selectedVariant}-desc`}>{descriptions[selectedVariant]}</desc>

      <defs>
        <filter id={`comparison-roughen-${selectedVariant}`} x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="31" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g
        filter={`url(#comparison-roughen-${selectedVariant})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {selectedVariant === "setup" && <SetupVariant />}
        {selectedVariant === "flip" && <FlipVariant />}
        {selectedVariant === "stack" && <StackVariant />}
        {selectedVariant === "breath" && <BreathVariant />}
      </g>
    </svg>
  );
}

function SetupVariant() {
  return (
    <>
      <InputBit x={70} y={145} label="A" value="1" active />
      <InputBit x={70} y={275} label="B" value="0" />

      <Wire d="M122 145 H210" active />
      <Wire d="M122 275 H210" />

      <UnknownCircuit x={230} y={92} />

      <Wire d="M350 210 H430" />
      <Bulb x={462} y={210} active={false} label="OUT" />

      <path
        d="M212 110 C184 112 166 126 166 146 M212 310 C184 308 166 294 166 274"
        stroke="var(--foreground)"
        strokeOpacity="0.2"
        strokeWidth="1.4"
      />
    </>
  );
}

function FlipVariant() {
  return (
    <>
      <InputBit x={56} y={130} label="A" value="1" active />
      <InputBit x={56} y={286} label="B" value="0" />

      <Wire d="M108 130 H284" active />
      <Wire d="M108 286 H172" />
      <NotGate x={184} y={256} active />
      <Wire d="M246 286 C266 286 270 250 288 250" active />

      <AndGate x={300} y={96} active />
      <Wire d="M410 172 H456" active />
      <Bulb x={488} y={172} active label="OUT" />

      <path
        d="M148 316 C188 350 260 352 306 318"
        stroke="var(--accent)"
        strokeOpacity="0.26"
        strokeWidth="2"
      />
    </>
  );
}

function StackVariant() {
  const blocks = [
    { x: 70, y: 82, active: false, opacity: 0.32 },
    { x: 250, y: 62, active: false, opacity: 0.24 },
    { x: 344, y: 176, active: false, opacity: 0.2 },
    { x: 96, y: 250, active: false, opacity: 0.22 },
    { x: 264, y: 272, active: false, opacity: 0.28 },
  ];

  return (
    <>
      {blocks.map((block) => (
        <g key={`${block.x}-${block.y}`} opacity={block.opacity}>
          <MiniCircuit x={block.x} y={block.y} active={block.active} />
        </g>
      ))}

      <g>
        <MiniCircuit x={158} y={146} active />
      </g>

      <path
        d="M290 214 C326 218 344 236 366 260 C394 290 424 304 486 306"
        stroke="var(--accent)"
        strokeOpacity="0.78"
        strokeWidth="2.8"
      />
      <Bulb x={506} y={306} active label="OUT" />
    </>
  );
}

function BreathVariant() {
  return (
    <>
      <path
        d="M58 86 C146 54 238 58 310 86 C390 118 462 104 520 76"
        stroke="var(--ds-color-pink)"
        strokeOpacity="0.34"
        strokeWidth="16"
      />
      <path
        d="M66 128 C144 102 218 112 292 132 C366 152 438 144 502 116"
        stroke="var(--ds-color-peach)"
        strokeOpacity="0.34"
        strokeWidth="18"
      />
      <circle
        cx="280"
        cy="168"
        r="82"
        fill="var(--ds-color-banana)"
        fillOpacity="0.72"
        stroke="var(--ds-color-peach)"
        strokeOpacity="0.86"
        strokeWidth="2"
      />
      <circle cx="280" cy="168" r="52" fill="var(--ds-color-peach)" fillOpacity="0.38" stroke="none" />
      <circle cx="280" cy="168" r="28" fill="var(--accent)" fillOpacity="0.16" stroke="none" />
      <path
        d="M54 252 C112 218 164 220 218 252 C276 286 334 282 390 250 C438 224 486 224 526 252"
        fill="var(--ds-color-lavender)"
        fillOpacity="0.26"
        stroke="var(--ds-color-purple)"
        strokeOpacity="0.36"
        strokeWidth="1.8"
      />
      <path
        d="M42 302 C112 254 176 256 238 302 C304 350 374 340 430 300 C474 268 512 274 540 302"
        fill="var(--ds-color-purple)"
        fillOpacity="0.18"
        stroke="var(--foreground)"
        strokeOpacity="0.36"
        strokeWidth="2"
      />
      <path
        d="M46 350 C128 318 204 328 280 350 C360 374 442 366 520 350"
        stroke="var(--ds-color-lavender)"
        strokeOpacity="0.42"
        strokeWidth="1.5"
      />
      <path
        d="M82 190 C132 178 174 178 222 190 M338 190 C386 178 430 178 478 190"
        stroke="var(--ds-color-peach)"
        strokeOpacity="0.42"
        strokeWidth="1.4"
      />
    </>
  );
}

function MiniCircuit({
  x,
  y,
  active,
  small = false,
}: {
  x: number;
  y: number;
  active: boolean;
  small?: boolean;
}) {
  const scale = small ? 0.62 : 0.82;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <Wire d="M0 34 H72" active={active} />
      <Wire d="M0 104 H44" />
      <NotGate x={54} y={74} active={active} compact />
      <Wire d="M104 104 C122 104 124 78 140 78" active={active} />
      <AndGate x={150} y={0} active={active} compact />
      <Wire d="M240 52 H286" active={active} />
      <Bulb x={306} y={52} active={active} />
    </g>
  );
}

function InputBit({
  x,
  y,
  label,
  value,
  active = false,
}: {
  x: number;
  y: number;
  label: string;
  value: "0" | "1";
  active?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        cx="0"
        cy="0"
        r="30"
        fill="var(--background)"
        stroke={active ? "var(--accent)" : "var(--foreground)"}
        strokeOpacity={active ? 0.9 : 0.46}
        strokeWidth={active ? 2.2 : 1.6}
      />
      <text
        x="0"
        y="-7"
        textAnchor="middle"
        fill="var(--foreground)"
        fillOpacity="0.62"
        fontSize="14"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x="0"
        y="15"
        textAnchor="middle"
        fill={active ? "var(--accent)" : "var(--foreground)"}
        fillOpacity={active ? 1 : 0.7}
        fontSize="22"
        fontWeight="700"
      >
        {value}
      </text>
    </g>
  );
}

function UnknownCircuit({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="0"
        y="0"
        width="116"
        height="236"
        rx="4"
        fill="var(--background)"
        stroke="var(--accent)"
        strokeOpacity="0.68"
        strokeWidth="2.2"
        strokeDasharray="9 11"
      />
      <path d="M28 72 C52 42 78 42 92 72 C70 102 44 102 28 72 Z" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="1.4" />
      <path d="M28 154 L76 118 L76 190 Z" stroke="var(--foreground)" strokeOpacity="0.18" strokeWidth="1.4" />
      <circle cx="87" cy="154" r="8" stroke="var(--foreground)" strokeOpacity="0.18" strokeWidth="1.4" />
      <text x="58" y="126" textAnchor="middle" fill="var(--accent)" fillOpacity="0.78" fontSize="40" fontWeight="600">
        ?
      </text>
    </g>
  );
}

function NotGate({
  x,
  y,
  active = false,
  compact = false,
}: {
  x: number;
  y: number;
  active?: boolean;
  compact?: boolean;
}) {
  const stroke = active ? "var(--accent)" : "var(--foreground)";
  const opacity = active ? 0.9 : 0.42;
  const width = compact ? 38 : 52;
  const height = compact ? 48 : 62;

  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M0 0 L0 ${height} L${width} ${height / 2} Z`}
        fill="var(--background)"
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth={active ? 2.2 : 1.6}
      />
      <circle
        cx={width + 8}
        cy={height / 2}
        r={compact ? 7 : 9}
        fill="var(--background)"
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth={active ? 2 : 1.5}
      />
      {!compact && (
        <text x={width / 2} y={height / 2 + 5} textAnchor="middle" fill={stroke} fillOpacity={opacity} fontSize="11" fontWeight="600">
          NOT
        </text>
      )}
    </g>
  );
}

function AndGate({
  x,
  y,
  active = false,
  compact = false,
}: {
  x: number;
  y: number;
  active?: boolean;
  compact?: boolean;
}) {
  const stroke = active ? "var(--accent)" : "var(--foreground)";
  const opacity = active ? 0.9 : 0.42;
  const width = compact ? 70 : 96;
  const top = compact ? 20 : 34;
  const bottom = compact ? 84 : 132;

  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M0 ${top} L0 ${bottom} C${width * 1.45} ${bottom}, ${width * 1.45} ${top}, 0 ${top}`}
        fill="var(--background)"
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth={active ? 2.2 : 1.6}
      />
      {!compact && (
        <text x={width * 0.48} y={(top + bottom) / 2 + 5} textAnchor="middle" fill={stroke} fillOpacity={opacity} fontSize="12" fontWeight="600">
          AND
        </text>
      )}
    </g>
  );
}

function Bulb({
  x,
  y,
  active,
  label,
}: {
  x: number;
  y: number;
  active: boolean;
  label?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {active && (
        <>
          <circle cx="0" cy="0" r="42" fill="var(--accent)" opacity="0.1" stroke="none" />
          <circle cx="0" cy="0" r="27" fill="var(--accent)" opacity="0.16" stroke="none" />
        </>
      )}
      <path
        d="M-14 6 C-14 -6 -8 -16 0 -16 C8 -16 14 -6 14 6 C14 14 8 18 8 26 H-8 C-8 18 -14 14 -14 6 Z"
        fill={active ? "var(--accent)" : "var(--background)"}
        fillOpacity={active ? 0.22 : 1}
        stroke={active ? "var(--accent)" : "var(--foreground)"}
        strokeOpacity={active ? 0.9 : 0.42}
        strokeWidth={active ? 2.2 : 1.6}
      />
      <path
        d="M-10 32 H10 M-7 38 H7"
        stroke={active ? "var(--accent)" : "var(--foreground)"}
        strokeOpacity={active ? 0.9 : 0.42}
        strokeWidth="1.8"
      />
      {label && (
        <text x="0" y="62" textAnchor="middle" fill="var(--foreground)" fillOpacity="0.46" fontSize="12" fontWeight="600">
          {label}
        </text>
      )}
    </g>
  );
}

function Wire({ d, active = false }: { d: string; active?: boolean }) {
  return (
    <path
      d={d}
      stroke={active ? "var(--accent)" : "var(--foreground)"}
      strokeOpacity={active ? 0.84 : 0.28}
      strokeWidth={active ? 2.8 : 1.8}
    />
  );
}
