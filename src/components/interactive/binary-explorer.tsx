"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

const BIT_VALUES = [128, 64, 32, 16, 8, 4, 2, 1] as const;
const SWITCH_WIDTH = 54;
const SWITCH_HEIGHT = 76;

function withAlpha(color: string, alpha: number) {
  const value = color.trim();

  if (value.startsWith("#") && (value.length === 7 || value.length === 4)) {
    const hex =
      value.length === 4
        ? value
            .slice(1)
            .split("")
            .map((character) => character + character)
            .join("")
        : value.slice(1);
    const number = Number.parseInt(hex, 16);
    const red = (number >> 16) & 255;
    const green = (number >> 8) & 255;
    const blue = number & 255;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  return value;
}

function valueToBits(value: number) {
  return BIT_VALUES.map((bitValue) => (value & bitValue) !== 0);
}

function bitsToValue(bits: boolean[], values: readonly number[]) {
  return bits.reduce((total, bit, index) => total + (bit ? values[index] : 0), 0);
}

function inputCharacter(value: number) {
  if (value >= 32) return String.fromCharCode(value);

  return "";
}

function BinarySwitch({
  bitValue,
  hasNextActive,
  index,
  on,
  onToggle,
}: {
  bitValue: number;
  hasNextActive: boolean;
  index: number;
  on: boolean;
  onToggle: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = SWITCH_WIDTH * scale;
    canvas.height = SWITCH_HEIGHT * scale;
    canvas.style.width = `${SWITCH_WIDTH}px`;
    canvas.style.height = `${SWITCH_HEIGHT}px`;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, SWITCH_WIDTH, SWITCH_HEIGHT);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground").trim();
    const accent = styles.getPropertyValue("--accent").trim();
    const muted = withAlpha(ink, 0.36);
    const color = on ? accent : ink;
    const seed = 20 + index * 10;
    const rc = rough.canvas(canvas);

    rc.rectangle(12, 6, 30, 64, {
      stroke: on ? accent : muted,
      strokeWidth: on ? 2.2 : 1.4,
      roughness: 0.85,
      bowing: 0.45,
      fill: withAlpha(on ? accent : ink, on ? 0.12 : 0.05),
      fillStyle: "hachure",
      hachureGap: 12,
      hachureAngle: -35,
      seed: seed + 1,
    });

    const knobY = on ? 13 : 39;
    rc.rectangle(17, knobY, 20, 20, {
      stroke: color,
      strokeWidth: on ? 2.2 : 1.5,
      roughness: 0.8,
      bowing: 0.4,
      fill: withAlpha(color, on ? 0.16 : 0.07),
      fillStyle: "hachure",
      hachureGap: 8,
      hachureAngle: -35,
      seed: seed + 2,
    });
    rc.line(21, knobY + 8, 33, knobY + 8, {
      stroke: color,
      strokeWidth: on ? 2 : 1.3,
      roughness: 0.75,
      bowing: 0.35,
      seed: seed + 3,
    });
    rc.line(21, knobY + 14, 33, knobY + 14, {
      stroke: on ? accent : muted,
      strokeWidth: 1.2,
      roughness: 0.75,
      bowing: 0.35,
      seed: seed + 4,
    });
  }, [index, on]);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch worth ${bitValue} is ${on ? "on" : "off"}`}
      aria-pressed={on}
      className="flex min-h-28 cursor-pointer flex-col items-center justify-between border-0 bg-transparent px-0.5 py-1 transition-[opacity,transform] duration-150 hover:-translate-y-0.5 active:translate-y-0"
      style={{ opacity: on ? 1 : 0.34 }}
    >
      <span
        className="min-h-4 font-mono text-xs font-semibold"
        style={{ color: on ? "var(--accent)" : "var(--foreground)" }}
      >
        {bitValue}
        {hasNextActive ? " +" : ""}
      </span>
      <canvas
        ref={canvasRef}
        width={SWITCH_WIDTH}
        height={SWITCH_HEIGHT}
        aria-hidden
        className="block aspect-[54/76] h-auto w-[clamp(2rem,10vw,3.375rem)]"
      />
    </button>
  );
}

export function BinaryExplorer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [bits, setBits] = useState(() => valueToBits(65));
  const [typedCharacter, setTypedCharacter] = useState("A");
  const value = bitsToValue(bits, BIT_VALUES);
  const binary = bits.map((bit) => (bit ? "1" : "0")).join("");

  function toggleBit(index: number) {
    setBits((current) => {
      const nextBits = current.map((bit, bitIndex) => (bitIndex === index ? !bit : bit));
      const nextValue = bitsToValue(nextBits, BIT_VALUES);

      setTypedCharacter(inputCharacter(nextValue));

      return nextBits;
    });
  }

  function handleCharacterChange(nextValue: string) {
    const nextCharacter = Array.from(nextValue).at(-1) ?? "";
    setTypedCharacter(nextCharacter);

    if (nextCharacter) {
      setBits(valueToBits(nextCharacter.charCodeAt(0) % 256));
    }
  }

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6">
      <div className="flex w-full flex-nowrap justify-center gap-x-1 sm:gap-x-3">
        {bits.map((bit, index) => (
          <BinarySwitch
            key={BIT_VALUES[index]}
            bitValue={BIT_VALUES[index]}
            hasNextActive={bit && bits.slice(index + 1).some(Boolean)}
            index={index}
            on={bit}
            onToggle={() => toggleBit(index)}
          />
        ))}
      </div>

      <div className="flex w-full flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-center font-mono [font-variant-numeric:tabular-nums]">
        <span className="break-all text-4xl font-semibold text-foreground">{binary}</span>
        <span className="text-2xl text-foreground/24">=</span>
        <span className="text-4xl font-semibold text-accent">{value}</span>
        <span className="text-2xl text-foreground/24">=</span>
        <input
          ref={inputRef}
          type="text"
          value={typedCharacter}
          maxLength={1}
          placeholder="?"
          aria-label="Character to convert to binary"
          autoFocus
          onBlur={() => inputRef.current?.focus()}
          onChange={(event) => handleCharacterChange(event.target.value)}
          className="h-12 w-12 border border-foreground/18 bg-background text-center font-mono text-4xl font-semibold text-accent outline-none placeholder:text-accent focus:border-accent"
        />
      </div>

      <div className="min-h-5">
        {value < 32 && (
          <div className="group relative font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/36">
            <button
              type="button"
              className="cursor-help border-b border-dotted border-foreground/36"
            >
              control code
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-64 -translate-x-1/2 border border-foreground/18 bg-background px-3 py-2 text-center text-[0.68rem] leading-5 tracking-[0.08em] text-foreground/58 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
              Values 0-31 are reserved for invisible instructions, not printed characters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
