"use client";

import { useState } from "react";

export function SwitchIllustration() {
  const [on, setOn] = useState(false);

  const inkColor = "var(--foreground)";
  const accentColor = "#d85a30";
  const color = on ? accentColor : inkColor;

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-label={on ? "Turn switch off" : "Turn switch on"}
        className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
      >
        <svg
          viewBox="0 0 400 180"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-sm"
          aria-hidden
        >
          <defs>
            <filter id="roughen" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="4"
                seed="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          <g filter="url(#roughen)" strokeLinecap="round" strokeLinejoin="round">
            {/* Left wire */}
            <line
              x1="20" y1="110"
              x2="110" y2="110"
              stroke={color}
              strokeWidth="2.5"
            />

            {/* Left contact post */}
            <line
              x1="110" y1="95"
              x2="110" y2="125"
              stroke={color}
              strokeWidth="2.5"
            />

            {/* Right contact post */}
            <line
              x1="270" y1="95"
              x2="270" y2="125"
              stroke={color}
              strokeWidth="2.5"
            />

            {/* Right wire */}
            <line
              x1="270" y1="110"
              x2="370" y2="110"
              stroke={color}
              strokeWidth="2.5"
            />

            {/* Pivot base circle */}
            <circle
              cx="110" cy="110"
              r="6"
              fill={color}
              stroke="none"
            />

            {/* Lever — rotates between closed (horizontal) and open (angled up) */}
            <line
              x1="110" y1="110"
              x2={on ? 270 : 230}
              y2={on ? 110 : 62}
              stroke={color}
              strokeWidth="3"
            />

            {/* Lever tip circle */}
            <circle
              cx={on ? 270 : 230}
              cy={on ? 110 : 62}
              r="5"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
            />
          </g>
        </svg>

        {/* State label */}
        <p
          className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200"
          style={{ color: on ? accentColor : "var(--foreground)", opacity: on ? 1 : 0.36 }}
        >
          {on ? "On — 1" : "Off — 0"}
        </p>
      </button>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/28">
        Click to toggle
      </p>
    </div>
  );
}
