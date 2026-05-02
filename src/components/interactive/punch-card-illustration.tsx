"use client";

// Simplified IBM-style punch card illustration.
// 20 columns × 12 rows. Holes sampled from a real HELLO encoding
// spread across the card to give it a realistic, lived-in feel.

const COLS = 20;
const ROWS = 12;
const COL_W = 18;
const ROW_H = 16;
const CARD_PAD_H = 22;
const CARD_PAD_TOP = 28;
const CARD_PAD_BOTTOM = 18;
const CARD_W = COLS * COL_W + CARD_PAD_H * 2;
const CARD_H = ROWS * ROW_H + CARD_PAD_TOP + CARD_PAD_BOTTOM;
const HOLE_W = 7;
const HOLE_H = 11;
const NOTCH = 14; // top-left corner cut

// Which [col, row] positions have holes (0-indexed).
// Loosely based on Hollerith encoding for a few characters,
// arranged to look like a real card without being too sparse or dense.
const HOLES = new Set([
  // col 1
  "1,0", "1,3",
  // col 2
  "2,1", "2,8",
  // col 3
  "3,0", "3,2", "3,6",
  // col 4
  "4,3", "4,9",
  // col 5
  "5,0", "5,1", "5,5",
  // col 6
  "6,2", "6,7",
  // col 7
  "7,0", "7,4", "7,10",
  // col 8
  "8,1", "8,8",
  // col 9
  "9,0", "9,3", "9,6",
  // col 10
  "10,2", "10,9",
  // col 11
  "11,0", "11,5",
  // col 12
  "12,1", "12,7", "12,11",
  // col 13
  "13,0", "13,4",
  // col 14
  "14,2", "14,8",
  // col 15
  "15,0", "15,1", "15,6",
  // col 16
  "16,3", "16,10",
  // col 17
  "17,0", "17,5", "17,9",
  // col 18
  "18,2", "18,7",
]);

const SVG_W = CARD_W + 8;
const SVG_H = CARD_H + 8;

export function PunchCardIllustration() {
  return (
    <div className="flex w-full items-center justify-center" aria-hidden>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg text-foreground"
      >
        <defs>
          <filter id="pc-roughen" x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="4"
              seed="17"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern id="pc-hachure" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <path d="M0 4.5 H14 M0 11.5 H14" stroke="currentColor" strokeOpacity="0.055" strokeWidth="1" />
          </pattern>
        </defs>

        <g filter="url(#pc-roughen)" strokeLinecap="round" strokeLinejoin="round">
          {/* Card body with notched top-left corner */}
          <path
            d={`
              M${4 + NOTCH} 4
              H${4 + CARD_W}
              V${4 + CARD_H}
              H4
              V${4 + NOTCH}
              Z
            `}
            fill="url(#pc-hachure)"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {/* Top row label band */}
          <line
            x1={4} y1={4 + CARD_PAD_TOP - 6}
            x2={4 + CARD_W} y2={4 + CARD_PAD_TOP - 6}
            stroke="currentColor" strokeOpacity="0.12" strokeWidth="1"
          />
          {/* Bottom row label band */}
          <line
            x1={4} y1={4 + CARD_PAD_TOP + ROWS * ROW_H + 4}
            x2={4 + CARD_W} y2={4 + CARD_PAD_TOP + ROWS * ROW_H + 4}
            stroke="currentColor" strokeOpacity="0.12" strokeWidth="1"
          />

          {/* Punch holes */}
          {Array.from({ length: COLS }, (_, col) =>
            Array.from({ length: ROWS }, (_, row) => {
              if (!HOLES.has(`${col},${row}`)) return null;
              const cx = 4 + CARD_PAD_H + col * COL_W + COL_W / 2;
              const cy = 4 + CARD_PAD_TOP + row * ROW_H + ROW_H / 2;
              return (
                <rect
                  key={`${col}-${row}`}
                  x={cx - HOLE_W / 2}
                  y={cy - HOLE_H / 2}
                  width={HOLE_W}
                  height={HOLE_H}
                  rx="1.5"
                  fill="var(--background)"
                  stroke="currentColor"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                />
              );
            })
          )}
        </g>
      </svg>
    </div>
  );
}
