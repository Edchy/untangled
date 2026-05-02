"use client";

import { useMemo, useState } from "react";

const BIT_VALUES = [128, 64, 32, 16, 8, 4, 2, 1] as const;
const ASCII_ROWS = Array.from({ length: 95 }, (_, index) => {
  const value = index + 32;

  return {
    binary: value.toString(2).padStart(8, "0"),
    character: value === 32 ? "space" : String.fromCharCode(value),
    value,
  };
});

function valueToBits(value: number) {
  return BIT_VALUES.map((bitValue) => (value & bitValue) !== 0);
}

function bitsToValue(bits: boolean[]) {
  return bits.reduce((total, bit, index) => total + (bit ? BIT_VALUES[index] : 0), 0);
}

function displayCharacter(value: number) {
  if (value >= 32 && value <= 126) {
    return String.fromCharCode(value);
  }

  return "?";
}

export function BinaryExplorer() {
  const [bits, setBits] = useState(() => valueToBits(65));
  const [typedCharacter, setTypedCharacter] = useState("A");
  const value = bitsToValue(bits);
  const binary = bits.map((bit) => (bit ? "1" : "0")).join("");
  const character = displayCharacter(value);
  const activeSum = useMemo(
    () => bits.map((bit, index) => (bit ? BIT_VALUES[index] : null)).filter((bitValue) => bitValue !== null),
    [bits],
  );

  function toggleBit(index: number) {
    setBits((current) => current.map((bit, bitIndex) => (bitIndex === index ? !bit : bit)));
    setTypedCharacter("");
  }

  function handleCharacterChange(value: string) {
    const nextCharacter = Array.from(value).at(-1) ?? "";
    setTypedCharacter(nextCharacter);

    if (nextCharacter) {
      setBits(valueToBits(nextCharacter.charCodeAt(0) % 256));
    }
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="grid w-full grid-cols-4 gap-3 sm:grid-cols-8">
        {bits.map((bit, index) => (
          <button
            key={BIT_VALUES[index]}
            type="button"
            aria-label={`Bit worth ${BIT_VALUES[index]} is ${bit ? "on" : "off"}`}
            aria-pressed={bit}
            onClick={() => toggleBit(index)}
            className="group flex min-h-28 cursor-pointer flex-col items-center justify-between border border-foreground/18 bg-background/40 px-2 py-3 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-foreground/36"
          >
            <span className="font-mono text-xs font-semibold text-foreground/38">{BIT_VALUES[index]}</span>
            <span
              className="relative h-12 w-8 border border-foreground/28 transition-colors duration-150"
              style={{
                background: bit
                  ? "color-mix(in srgb, var(--accent) 34%, var(--background))"
                  : "color-mix(in srgb, var(--foreground) 7%, var(--background))",
              }}
            >
              <span
                aria-hidden
                className="absolute left-1/2 h-5 w-5 -translate-x-1/2 border border-foreground/35 bg-background transition-transform duration-150"
                style={{ transform: `translate(-50%, ${bit ? "4px" : "24px"})` }}
              />
            </span>
            <span
              className="font-mono text-lg font-semibold"
              style={{ color: bit ? "var(--accent)" : "var(--foreground)", opacity: bit ? 1 : 0.35 }}
            >
              {bit ? "1" : "0"}
            </span>
          </button>
        ))}
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-3">
        <div className="border border-foreground/14 p-4">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/36">bits</div>
          <div className="mt-3 break-all font-mono text-2xl font-semibold text-foreground">{binary}</div>
        </div>
        <div className="border border-foreground/14 p-4">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/36">sum</div>
          <div className="mt-3 font-mono text-2xl font-semibold text-foreground">
            {activeSum.length > 0 ? activeSum.join(" + ") : "0"} = <span className="text-accent">{value}</span>
          </div>
        </div>
        <div className="border border-foreground/14 p-4">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/36">ascii</div>
          <div className="mt-3 font-serif text-5xl font-semibold text-accent">{character}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <label className="flex items-center gap-3 border border-foreground/18 px-4 py-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/42">
            character
          </span>
          <input
            type="text"
            value={typedCharacter}
            maxLength={1}
            aria-label="Character to convert to binary"
            onChange={(event) => handleCharacterChange(event.target.value)}
            className="h-10 w-12 border-0 bg-transparent text-center font-serif text-3xl font-semibold text-accent outline-none"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            setBits(valueToBits(0));
            setTypedCharacter("");
          }}
          className="border border-foreground/18 px-4 py-2 font-mono text-sm font-semibold text-foreground/62 transition-colors hover:border-foreground/42 hover:text-foreground"
        >
          clear
        </button>
      </div>

      <details className="w-full border border-foreground/14">
        <summary className="cursor-pointer px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/48 transition-colors hover:text-foreground/70">
          ascii table
        </summary>
        <div className="max-h-72 overflow-auto border-t border-foreground/14">
          <table className="w-full border-collapse font-mono text-sm">
            <thead className="sticky top-0 bg-background text-left text-xs uppercase tracking-[0.16em] text-foreground/40">
              <tr>
                <th className="border-b border-foreground/12 px-4 py-3 font-semibold">char</th>
                <th className="border-b border-foreground/12 px-4 py-3 font-semibold">dec</th>
                <th className="border-b border-foreground/12 px-4 py-3 font-semibold">binary</th>
              </tr>
            </thead>
            <tbody>
              {ASCII_ROWS.map((row) => {
                const active = row.value === value;

                return (
                  <tr
                    key={row.value}
                    className={active ? "bg-accent/10 text-accent" : "text-foreground/58"}
                  >
                    <td className="border-b border-foreground/8 px-4 py-2 font-semibold">{row.character}</td>
                    <td className="border-b border-foreground/8 px-4 py-2">{row.value}</td>
                    <td className="border-b border-foreground/8 px-4 py-2">{row.binary}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
