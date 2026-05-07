"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function getAccent() {
  if (typeof document === "undefined") return "#4a9e8e";
  return getComputedStyle(document.documentElement).getPropertyValue("--accent-canvas").trim() || "#4a9e8e";
}

// SVG layout constants
// Inputs at x=40 (A at y=90, B at y=190)
// Wires branch right to gate inputs at x=200
// XOR box: y=60–120, AND box: y=160–220
// Output wires from x=280 to x=360
// Output nodes at x=370

const AY = 90;
const BY = 190;
const GATE_X = 200;
const GATE_W = 80;
const GATE_H = 56;
const XOR_Y = AY - 16;        // top of XOR box: 74
const AND_Y = BY - 16;        // top of AND box: 174
const XOR_MID = XOR_Y + GATE_H / 2;  // 102 ≈ midpoint
const AND_MID = AND_Y + GATE_H / 2;  // 202 ≈ midpoint
const OUT_X = GATE_X + GATE_W + 80;

function wire(x1: number, y1: number, x2: number, y2: number, active: boolean, accent: string) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={active ? accent : "var(--foreground)"}
      strokeWidth={active ? 2.4 : 1.8}
      strokeOpacity={active ? 0.9 : 0.28}
      strokeLinecap="round"
    />
  );
}

function GateBox({ x, y, w, h, label, active, accent }: {
  x: number; y: number; w: number; h: number; label: string; active: boolean; accent: string;
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="6"
        fill={active ? `color-mix(in srgb, ${accent} 12%, transparent)` : "color-mix(in srgb, var(--foreground) 5%, transparent)"}
        stroke={active ? accent : "var(--foreground)"}
        strokeWidth={active ? 2 : 1.5}
        strokeOpacity={active ? 0.9 : 0.4}
      />
      <text
        x={x + w / 2} y={y + h / 2 + 5}
        textAnchor="middle"
        fontFamily="var(--font-mono, monospace)"
        fontSize="13"
        fontWeight="600"
        fill={active ? accent : "var(--foreground)"}
        fillOpacity={active ? 0.9 : 0.45}
      >
        {label}
      </text>
    </g>
  );
}

function OutputNode({ x, y, label, active, accent }: {
  x: number; y: number; label: string; active: boolean; accent: string;
}) {
  return (
    <g>
      <circle
        cx={x} cy={y} r="10"
        fill={active ? `color-mix(in srgb, ${accent} 22%, transparent)` : "transparent"}
        stroke={active ? accent : "var(--foreground)"}
        strokeWidth={active ? 2.2 : 1.5}
        strokeOpacity={active ? 1 : 0.3}
      />
      <text
        x={x + 16} y={y + 5}
        fontFamily="var(--font-mono, monospace)"
        fontSize="11"
        fontWeight="600"
        fill="var(--foreground)"
        fillOpacity="0.4"
      >
        {label}
      </text>
    </g>
  );
}

function BinaryDigit({
  value,
  label,
  active,
  accent,
}: {
  value: "0" | "1";
  label: string;
  active: boolean;
  accent: string;
}) {
  return (
    <span className="relative inline-flex items-center">
      <span
        className="font-mono text-5xl font-bold leading-none"
        style={{ color: active ? accent : "var(--foreground)", opacity: active ? 1 : 0.42 }}
      >
        {value}
      </span>
      <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground/42">
        {label}
      </span>
    </span>
  );
}

function LeverSwitch({ cx, cy, on, accent }: { cx: number; cy: number; on: boolean; accent: string }) {
  const color = on ? accent : "var(--foreground)";
  const opacity = on ? 1 : 0.55;
  const tipX = on ? cx + 44 : cx + 22;
  const tipY = on ? cy : cy - 28;
  return (
    <g strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      {/* Left wire stub */}
      <line x1={cx - 24} y1={cy} x2={cx - 8} y2={cy} stroke={color} strokeWidth="2.2" />
      {/* Left post */}
      <line x1={cx - 8} y1={cy - 12} x2={cx - 8} y2={cy + 12} stroke={color} strokeWidth="2.2" />
      {/* Pivot dot */}
      <circle cx={cx - 8} cy={cy} r="4" fill={color} stroke="none" />
      {/* Lever */}
      <line x1={cx - 8} y1={cy} x2={tipX} y2={tipY} stroke={color} strokeWidth="2.8" />
      {/* Lever tip */}
      <circle cx={tipX} cy={tipY} r="4" fill="none" stroke={color} strokeWidth="2.2" />
      {/* Right post */}
      <line x1={cx + 44} y1={cy - 12} x2={cx + 44} y2={cy + 12} stroke={color} strokeWidth="2.2" />
    </g>
  );
}

export function HalfAdderDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const sum = a !== b;
  const carry = a && b;
  const decimal = (carry ? 2 : 0) + (sum ? 1 : 0);
  const accent = getAccent();

  // Branch point x for wires splitting to both gates
  const branchX = 140;

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="w-full overflow-x-auto rounded-surface border border-foreground/10 p-4"
        style={{ background: "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}
      >
        <svg
          viewBox="0 0 460 290"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[460px]"
        >
          <defs>
            <filter id="ha-roughen" x="-4%" y="-4%" width="108%" height="108%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Roughened visuals */}
          <g filter="url(#ha-roughen)">
            <LeverSwitch cx={40} cy={AY} on={a} accent={accent} />
            <LeverSwitch cx={40} cy={BY} on={b} accent={accent} />

            <text x="16" y={AY - 22} textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="12" fontWeight="700" fill="var(--foreground)" fillOpacity={a ? 1 : 0.4}>A</text>
            <text x="16" y={BY - 22} textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="12" fontWeight="700" fill="var(--foreground)" fillOpacity={b ? 1 : 0.4}>B</text>

            {wire(84, AY, branchX, AY, a, accent)}
            {wire(84, BY, branchX, BY, b, accent)}

            {wire(branchX, AY, branchX, XOR_MID, a, accent)}
            {wire(branchX, XOR_MID, GATE_X, XOR_MID, a, accent)}
            {wire(branchX, AY, branchX, AND_MID - 8, a, accent)}
            {wire(branchX, AND_MID - 8, GATE_X, AND_MID - 8, a, accent)}

            {wire(branchX + 16, BY, branchX + 16, XOR_MID + 8, b, accent)}
            {wire(branchX + 16, XOR_MID + 8, GATE_X, XOR_MID + 8, b, accent)}
            {wire(branchX + 16, BY, branchX + 16, AND_MID, b, accent)}
            {wire(branchX + 16, AND_MID, GATE_X, AND_MID, b, accent)}

            <GateBox x={GATE_X} y={XOR_Y} w={GATE_W} h={GATE_H} label="XOR" active={sum} accent={accent} />
            <GateBox x={GATE_X} y={AND_Y} w={GATE_W} h={GATE_H} label="AND" active={carry} accent={accent} />

            {wire(GATE_X + GATE_W, XOR_MID, OUT_X, XOR_MID, sum, accent)}
            {wire(GATE_X + GATE_W, AND_MID, OUT_X, AND_MID, carry, accent)}

            <OutputNode x={OUT_X} y={XOR_MID} label="sum" active={sum} accent={accent} />
            <OutputNode x={OUT_X} y={AND_MID} label="carry" active={carry} accent={accent} />
          </g>

          {/* Transparent hit targets outside filter so they're not displaced */}
          <rect x="0" y={AY - 36} width="100" height="56" fill="transparent" style={{ cursor: "pointer" }} onClick={() => setA((v) => !v)} />
          <rect x="0" y={BY - 36} width="100" height="56" fill="transparent" style={{ cursor: "pointer" }} onClick={() => setB((v) => !v)} />
        </svg>
      </div>

      {/* Readout */}
      <motion.div
        key={`${a}-${b}`}
        initial={{ opacity: 0.5, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex flex-wrap items-end gap-x-5 gap-y-6 px-1 pb-5"
      >
        <span className="font-mono text-3xl font-bold leading-none" style={{ color: "var(--foreground)" }}>
          {a ? "1" : "0"} + {b ? "1" : "0"} =
        </span>
        <span className="inline-flex items-end gap-1" aria-label={`binary result ${carry ? "1" : "0"}${sum ? "1" : "0"}, carry ${carry ? "1" : "0"}, sum ${sum ? "1" : "0"}`}>
          <BinaryDigit value={carry ? "1" : "0"} label="carry" active={carry} accent={accent} />
          <BinaryDigit value={sum ? "1" : "0"} label="sum" active={sum} accent={accent} />
        </span>
        <span className="font-mono text-lg leading-7 text-foreground/42">
          (same as {decimal})
        </span>
      </motion.div>
    </div>
  );
}
