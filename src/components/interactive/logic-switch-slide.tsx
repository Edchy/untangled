"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function LogicSwitchSlide() {
  const [on, setOn] = useState(false);
  const accent = "#d85a30";
  const color = on ? accent : "var(--foreground)";

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-label={on ? "Turn switch off" : "Turn switch on"}
        aria-pressed={on}
        className="group flex cursor-pointer flex-col items-center gap-4 border-0 bg-transparent p-0"
      >
        <svg
          viewBox="0 0 280 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[280px]"
          aria-hidden
        >
          <defs>
            <filter id="logic-switch-roughen" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="9" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <g filter="url(#logic-switch-roughen)" strokeLinecap="round" strokeLinejoin="round">
            {/* Left wire */}
            <line x1="16" y1="118" x2="88" y2="118" stroke={color} strokeWidth="2.2" />
            {/* Left post */}
            <line x1="88" y1="100" x2="88" y2="136" stroke={color} strokeWidth="2.2" />
            {/* Pivot dot */}
            <circle cx="88" cy="118" r="5" fill={color} stroke="none" />
            {/* Lever */}
            <line
              x1="88" y1="118"
              x2={on ? 192 : 158}
              y2={on ? 118 : 70}
              stroke={color}
              strokeWidth="2.8"
            />
            {/* Lever tip */}
            <circle
              cx={on ? 192 : 158}
              cy={on ? 118 : 70}
              r="5"
              fill="none"
              stroke={color}
              strokeWidth="2.2"
            />
            {/* Right post */}
            <line x1="192" y1="100" x2="192" y2="136" stroke={color} strokeWidth="2.2" />
            {/* Right wire */}
            <line x1="192" y1="118" x2="264" y2="118" stroke={color} strokeWidth="2.2" />
          </g>
        </svg>

        {/* 0 / 1 label */}
        <motion.div
          key={String(on)}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28, duration: 0.18 }}
          className="font-mono text-7xl font-bold leading-none"
          style={{ color: on ? accent : "var(--foreground)", opacity: on ? 1 : 0.38 }}
        >
          {on ? "1" : "0"}
        </motion.div>
      </button>

      {/* Labels */}
      <div className="flex w-full max-w-[200px] justify-between text-xs font-semibold uppercase tracking-widest text-foreground/40">
        <span>Off</span>
        <span>On</span>
      </div>
    </div>
  );
}
