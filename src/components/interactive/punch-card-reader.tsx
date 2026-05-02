"use client";

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const WORD = "HELLO";
const BIT_COUNT = 8;
const STEP_COUNT = WORD.length * BIT_COUNT;

// SVG layout: rows = letters, cols = bits
const COL_SPACING = 52;   // horizontal spacing between bits
const ROW_SPACING = 52;   // vertical spacing between letters
const FIRST_COL_X = 80;   // x of bit 0
const FIRST_ROW_Y = 80;   // y of letter 0
const CARD_PAD_H = 36;
const CARD_PAD_V = 28;
const CARD_LEFT = FIRST_COL_X - CARD_PAD_H;
const CARD_TOP = FIRST_ROW_Y - CARD_PAD_V;
const CARD_RIGHT = FIRST_COL_X + (BIT_COUNT - 1) * COL_SPACING + CARD_PAD_H;
const CARD_BOTTOM = FIRST_ROW_Y + (WORD.length - 1) * ROW_SPACING + CARD_PAD_V;
const SVG_WIDTH = CARD_RIGHT + 24;
const SVG_HEIGHT = CARD_BOTTOM + 24;

type LetterRow = {
  character: string;
  bits: boolean[];
  binary: string;
};

function characterToBits(character: string) {
  const code = character.charCodeAt(0);
  return Array.from({ length: BIT_COUNT }, (_, i) => ((code >> (BIT_COUNT - 1 - i)) & 1) === 1);
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function handleChange() { setReducedMotion(query.matches); }
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return reducedMotion;
}

function ControlButton({
  children,
  disabled = false,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center border border-foreground/18 bg-background text-foreground transition-[border-color,color,transform] duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:scale-[0.96] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:border-foreground/18 disabled:hover:text-foreground"
    >
      {children}
    </button>
  );
}

export function PunchCardReader() {
  const rows = useMemo<LetterRow[]>(
    () =>
      Array.from(WORD).map((character) => {
        const bits = characterToBits(character);
        return { character, bits, binary: bits.map((b) => (b ? "1" : "0")).join("") };
      }),
    [],
  );

  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const isPlaying = playing && !reducedMotion;

  const rowIndex = Math.floor(step / BIT_COUNT);   // which letter row
  const bitIndex = step % BIT_COUNT;               // which bit within the row
  const currentRow = rows[rowIndex];
  const currentBit = currentRow.bits[bitIndex];
  const partialBits = currentRow.binary.slice(0, bitIndex + 1);
  const missingBits = BIT_COUNT - partialBits.length;
  const decodedLetters = rows.slice(0, rowIndex).map((r) => r.character).join("");
  const currentLetter = bitIndex === BIT_COUNT - 1 ? currentRow.character : null;
  const sensedMaterial = currentBit ? "hole" : "no hole";

  // Reader bar sits to the left of the card, at the active row's y
  const readerY = FIRST_ROW_Y + rowIndex * ROW_SPACING;
  // Sensor moves horizontally across the bits
  const sensorX = FIRST_COL_X + bitIndex * COL_SPACING;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % STEP_COUNT);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  function previousRead() { setPlaying(false); setStep((s) => (s - 1 + STEP_COUNT) % STEP_COUNT); }
  function nextRead() { setPlaying(false); setStep((s) => (s + 1) % STEP_COUNT); }
  function reset() { setPlaying(false); setStep(0); }
  function togglePlaying() { if (!reducedMotion) setPlaying((p) => !p); }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-5">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="block w-full text-foreground"
      >
        <title>Punch card reader scanning bits left to right, one letter row at a time</title>
        <defs>
          <filter id="pcr-roughen" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="4" seed="43" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <pattern id="pcr-hachure" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
            <path d="M0 5 H16 M0 13 H16" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1.2" />
          </pattern>
        </defs>

        <g filter="url(#pcr-roughen)" strokeLinecap="round" strokeLinejoin="round">

          {/* Card body */}
          <rect
            x={CARD_LEFT} y={CARD_TOP}
            width={CARD_RIGHT - CARD_LEFT} height={CARD_BOTTOM - CARD_TOP}
            fill="url(#pcr-hachure)"
            stroke="currentColor" strokeWidth="1.6"
          />

          {/* Bit column guides */}
          {Array.from({ length: BIT_COUNT }, (_, bitIdx) => (
            <line
              key={bitIdx}
              x1={FIRST_COL_X + bitIdx * COL_SPACING} y1={CARD_TOP + 8}
              x2={FIRST_COL_X + bitIdx * COL_SPACING} y2={CARD_BOTTOM - 8}
              stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"
            />
          ))}

          {/* Holes and solid markers for each letter row */}
          {rows.map((row, rIdx) => {
            const y = FIRST_ROW_Y + rIdx * ROW_SPACING;
            const isActiveRow = rIdx === rowIndex;
            const isPastRow = rIdx < rowIndex;

            return row.bits.map((bit, bIdx) => {
              const x = FIRST_COL_X + bIdx * COL_SPACING;
              const isActiveCell = isActiveRow && bIdx === bitIndex;
              const isPastCell = isPastRow || (isActiveRow && bIdx < bitIndex);
              const dimmed = !isActiveRow && !isPastRow;

              if (bit) {
                return (
                  <circle
                    key={`${rIdx}-${bIdx}`}
                    cx={x} cy={y}
                    r={isActiveCell ? 14 : 10}
                    fill="var(--background)"
                    stroke={isActiveCell ? "var(--accent)" : "currentColor"}
                    strokeOpacity={isActiveCell ? 1 : dimmed ? 0.3 : isPastCell ? 0.45 : 0.6}
                    strokeWidth={isActiveCell ? 2.4 : 1.4}
                  />
                );
              } else {
                return (
                  <circle
                    key={`${rIdx}-${bIdx}`}
                    cx={x} cy={y}
                    r={isActiveCell ? 5 : 3}
                    fill={isActiveCell ? "var(--accent)" : "currentColor"}
                    fillOpacity={isActiveCell ? 0.85 : dimmed ? 0.12 : isPastCell ? 0.2 : 0.3}
                  />
                );
              }
            });
          })}

          {/* Reader — a horizontal bar on the left that slides down to the active row */}
          <g
            style={{
              transform: `translateY(${rowIndex * ROW_SPACING}px)`,
              transition: reducedMotion ? "none" : "transform 500ms ease-in-out",
            }}
          >
            {/* Bracket on the left */}
            <path
              d={`M${CARD_LEFT - 6} ${FIRST_ROW_Y - 18} H${CARD_LEFT - 18} V${FIRST_ROW_Y + 18} H${CARD_LEFT - 6}`}
              fill="none"
              stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="2"
            />
          </g>

        </g>
      </svg>

      {/* Info box */}
      <div className="w-full border border-foreground/14 px-4 py-4 font-mono">
        <div className="grid gap-4 sm:grid-cols-3" aria-live="polite">
          <div>
            <div className="text-sm font-semibold uppercase text-foreground/42">Sees</div>
            <div className="mt-1 text-3xl font-semibold text-accent">{sensedMaterial}</div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase text-foreground/42">Writes</div>
            <div className="mt-1 text-3xl font-semibold text-accent">{currentBit ? "1" : "0"}</div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase text-foreground/42">Byte</div>
            <div className="mt-1 flex items-baseline gap-2 font-semibold [font-variant-numeric:tabular-nums]">
              <span className="text-2xl">
                <span className="text-foreground">{partialBits}</span>
                {missingBits > 0 && <span className="text-foreground/18">{"_".repeat(missingBits)}</span>}
              </span>
              {currentLetter && (
                <span className="text-lg text-accent">= {currentLetter}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-sm text-foreground/50">
            bit {bitIndex + 1} of {BIT_COUNT} · decoded:{" "}
            <span className="font-semibold text-accent">{decodedLetters}</span>
            <span className="font-semibold text-foreground/32">{currentLetter ?? "_"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <ControlButton label="Previous read" onClick={previousRead}>
              <SkipBack size={18} strokeWidth={1.8} aria-hidden />
            </ControlButton>
            <ControlButton disabled={reducedMotion} label={isPlaying ? "Pause reader" : "Play reader"} onClick={togglePlaying}>
              {isPlaying ? <Pause size={18} strokeWidth={1.8} aria-hidden /> : <Play size={18} strokeWidth={1.8} aria-hidden />}
            </ControlButton>
            <ControlButton label="Next read" onClick={nextRead}>
              <SkipForward size={18} strokeWidth={1.8} aria-hidden />
            </ControlButton>
            <ControlButton label="Reset reader" onClick={reset}>
              <RotateCcw size={18} strokeWidth={1.8} aria-hidden />
            </ControlButton>
          </div>
        </div>
      </div>
    </div>
  );
}
