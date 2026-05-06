"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Gate = "AND" | "OR" | "NOT";

interface PresetCircuit {
  name: string;
  description: string;
  inputs: string[];
  gates: { id: string; type: Gate; inputIds: string[] }[];
  outputId: string;
}

const PRESETS: PresetCircuit[] = [
  {
    name: "AND gate",
    description: "Both must be on",
    inputs: ["A", "B"],
    gates: [{ id: "g1", type: "AND", inputIds: ["A", "B"] }],
    outputId: "g1",
  },
  {
    name: "OR gate",
    description: "Either will do",
    inputs: ["A", "B"],
    gates: [{ id: "g1", type: "OR", inputIds: ["A", "B"] }],
    outputId: "g1",
  },
  {
    name: "NOT gate",
    description: "Flips the signal",
    inputs: ["A"],
    gates: [{ id: "g1", type: "NOT", inputIds: ["A"] }],
    outputId: "g1",
  },
  {
    name: "NAND",
    description: "AND, then flipped",
    inputs: ["A", "B"],
    gates: [
      { id: "g1", type: "AND", inputIds: ["A", "B"] },
      { id: "g2", type: "NOT", inputIds: ["g1"] },
    ],
    outputId: "g2",
  },
  {
    name: "NOR",
    description: "OR, then flipped",
    inputs: ["A", "B"],
    gates: [
      { id: "g1", type: "OR", inputIds: ["A", "B"] },
      { id: "g2", type: "NOT", inputIds: ["g1"] },
    ],
    outputId: "g2",
  },
  {
    name: "A AND NOT B",
    description: "A is on, B is off",
    inputs: ["A", "B"],
    gates: [
      { id: "g1", type: "NOT", inputIds: ["B"] },
      { id: "g2", type: "AND", inputIds: ["A", "g1"] },
    ],
    outputId: "g2",
  },
];

function evaluateCircuit(
  preset: PresetCircuit,
  inputValues: Record<string, boolean>
): Record<string, boolean> {
  const values: Record<string, boolean> = { ...inputValues };
  for (const gate of preset.gates) {
    const [x, y] = gate.inputIds;
    const a = values[x] ?? false;
    const b = y !== undefined ? (values[y] ?? false) : false;
    if (gate.type === "AND") values[gate.id] = a && b;
    else if (gate.type === "OR") values[gate.id] = a || b;
    else values[gate.id] = !a;
  }
  return values;
}

function Toggle({ on, label, onToggle }: { on: boolean; label: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Input ${label}: ${on ? "1" : "0"}`}
      aria-pressed={on}
      className="flex flex-col items-center gap-1.5"
    >
      <span className="font-mono text-xs font-semibold text-foreground/50">{label}</span>
      <div
        className="relative h-7 w-12 rounded-pill transition-colors duration-150"
        style={{
          background: on ? "var(--accent)" : "color-mix(in srgb, var(--foreground) 15%, transparent)",
        }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="absolute top-1 h-5 w-5 rounded-full bg-background shadow"
          style={{ left: on ? "calc(100% - 1.5rem)" : "0.25rem" }}
        />
      </div>
      <span
        className="font-mono text-sm font-bold transition-colors duration-150"
        style={{ color: on ? "var(--accent)" : "var(--foreground)", opacity: on ? 1 : 0.4 }}
      >
        {on ? "1" : "0"}
      </span>
    </button>
  );
}

function GatePill({
  type,
  inputLabels,
  outputValue,
}: {
  type: Gate;
  inputLabels: string[];
  outputValue: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-surface border border-foreground/12 px-3 py-2 text-sm"
      style={{ background: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}
    >
      <span className="font-mono text-xs font-semibold text-foreground/40">
        {inputLabels.join(", ")} →
      </span>
      <span
        className="rounded px-1.5 py-0.5 font-mono text-xs font-bold"
        style={{
          background: "color-mix(in srgb, var(--foreground) 8%, transparent)",
        }}
      >
        {type}
      </span>
      <span className="font-mono text-xs text-foreground/40">→</span>
      <span
        className="font-mono text-sm font-bold transition-colors duration-150"
        style={{ color: outputValue ? "var(--accent)" : "var(--foreground)", opacity: outputValue ? 1 : 0.4 }}
      >
        {outputValue ? "1" : "0"}
      </span>
    </div>
  );
}

function CircuitPanel({ preset }: { preset: PresetCircuit }) {
  const [inputValues, setInputValues] = useState<Record<string, boolean>>(
    Object.fromEntries(preset.inputs.map((id) => [id, false]))
  );

  const values = evaluateCircuit(preset, inputValues);
  const output = values[preset.outputId] ?? false;

  const toggle = (id: string) =>
    setInputValues((prev) => ({ ...prev, [id]: !prev[id] }));

  // Build a label map for gate inputs
  const gateInputLabels = preset.gates.map((gate) =>
    gate.inputIds.map((id) => {
      const prevGate = preset.gates.find((g) => g.id === id);
      return prevGate ? `${prevGate.type}(${prevGate.inputIds.join(",")})` : id;
    })
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Inputs */}
      <div className="flex flex-wrap gap-4">
        {preset.inputs.map((id) => (
          <Toggle
            key={id}
            on={inputValues[id] ?? false}
            label={id}
            onToggle={() => toggle(id)}
          />
        ))}
      </div>

      {/* Gate chain */}
      <div className="flex flex-col gap-2">
        {preset.gates.map((gate, i) => (
          <GatePill
            key={gate.id}
            type={gate.type}
            inputLabels={gateInputLabels[i]}
            outputValue={values[gate.id] ?? false}
          />
        ))}
      </div>

      {/* Final output */}
      <div className="flex items-center gap-3 border-t border-foreground/10 pt-3">
        <span className="text-sm text-foreground/50">Output:</span>
        <motion.span
          key={String(output)}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 30 }}
          className="font-mono text-2xl font-bold"
          style={{ color: output ? "var(--accent)" : "var(--foreground)", opacity: output ? 1 : 0.35 }}
        >
          {output ? "1" : "0"}
        </motion.span>
        <span className="text-sm text-foreground/40">{output ? "on" : "off"}</span>
      </div>
    </div>
  );
}

export function LogicGatePlayground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const preset = PRESETS[activeIndex];

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Preset selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="rounded-control border px-3 py-1.5 text-sm font-semibold transition-colors duration-100"
            style={
              i === activeIndex
                ? { borderColor: "var(--accent)", color: "var(--accent)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }
                : { borderColor: "color-mix(in srgb, var(--foreground) 15%, transparent)", color: "var(--foreground)", opacity: 0.7 }
            }
            aria-pressed={i === activeIndex}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Active circuit */}
      <div
        className="rounded-surface border border-foreground/12 p-6"
        style={{ background: "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}
      >
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground">{preset.name}</p>
          <p className="text-sm text-foreground/50">{preset.description}</p>
        </div>

        <CircuitPanel key={preset.name} preset={preset} />
      </div>

      <p className="mt-4 text-sm text-foreground/40">
        Select a circuit above, then flip the inputs. See how AND, OR, and NOT combine.
      </p>
    </div>
  );
}
