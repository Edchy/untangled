"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rough from "roughjs";

type Gate = "AND" | "OR" | "NOT";

function evaluate(gate: Gate, a: boolean, b: boolean): boolean {
  if (gate === "AND") return a && b;
  if (gate === "OR") return a || b;
  return !a;
}

const TRUTH_TABLES: Record<Gate, { a: boolean; b?: boolean; out: boolean }[]> = {
  AND: [
    { a: false, b: false, out: false },
    { a: false, b: true,  out: false },
    { a: true,  b: false, out: false },
    { a: true,  b: true,  out: true  },
  ],
  OR: [
    { a: false, b: false, out: false },
    { a: false, b: true,  out: true  },
    { a: true,  b: false, out: true  },
    { a: true,  b: true,  out: true  },
  ],
  NOT: [
    { a: false, out: true  },
    { a: true,  out: false },
  ],
};

// Physical pill toggle switch
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

// Output bulb indicator
function OutputBulb({ on }: { on: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="font-mono text-xs font-semibold text-foreground/50">Out</span>
      <motion.div
        animate={{ opacity: on ? 1 : 0.25, scale: on ? 1.05 : 1 }}
        transition={{ duration: 0.15 }}
        className="h-7 w-7 rounded-full border-2"
        style={{
          borderColor: on ? "var(--accent)" : "var(--foreground)",
          background: on ? "color-mix(in srgb, var(--accent) 20%, transparent)" : "transparent",
        }}
      />
      <span
        className="font-mono text-sm font-bold transition-colors duration-150"
        style={{ color: on ? "var(--accent)" : "var(--foreground)", opacity: on ? 1 : 0.4 }}
      >
        {on ? "1" : "0"}
      </span>
    </div>
  );
}

function GateCanvas({ gate, a, b, output }: { gate: Gate; a: boolean; b: boolean; output: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 340, H = 180;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const rc = rough.canvas(canvas);
    const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#0a0a0a";
    const accent = "#d85a30";

    const wire = (x1: number, y1: number, x2: number, y2: number, active: boolean) => {
      ctx.globalAlpha = active ? 0.9 : 0.28;
      rc.line(x1, y1, x2, y2, {
        stroke: active ? accent : fg,
        strokeWidth: active ? 2.2 : 1.5,
        roughness: 0.85,
        bowing: 0.4,
      });
      ctx.globalAlpha = 1;
    };

    if (gate === "NOT") {
      // Single input: left wire → triangle → bubble → right wire
      const midY = H / 2;
      // input wire
      wire(20, midY, 110, midY, a);
      // triangle body
      rc.polygon([[110, midY - 32], [110, midY + 32], [175, midY]], {
        stroke: fg, strokeWidth: 1.5, roughness: 0.85, seed: 42,
      });
      // inversion bubble
      rc.circle(183, midY, 16, { stroke: fg, strokeWidth: 1.5, roughness: 0.75, seed: 7 });
      // output wire
      wire(191, midY, 320, midY, output);
      // input node
      rc.circle(20, midY, 8, {
        stroke: a ? accent : fg,
        strokeWidth: a ? 2 : 1.5,
        fill: a ? "rgba(216,90,48,0.18)" : "transparent",
        roughness: 1.2,
        seed: 11,
      });
      // output node
      rc.circle(320, midY, 8, {
        stroke: output ? accent : fg,
        strokeWidth: output ? 2.2 : 1.5,
        fill: output ? "rgba(216,90,48,0.18)" : "transparent",
        roughness: 1.2,
        seed: 13,
      });
    } else {
      // Two-input gates (AND / OR)
      const aY = H / 3, bY = (2 * H) / 3;
      const gateX = 120, gateW = 80;

      // input wires
      wire(20, aY, gateX, aY, a);
      wire(20, bY, gateX, bY, b);
      // output wire
      wire(gateX + gateW, H / 2, 320, H / 2, output);

      if (gate === "AND") {
        // Flat back, rounded D front
        rc.path(
          `M ${gateX} ${aY} L ${gateX} ${bY} C ${gateX + gateW * 1.7} ${bY}, ${gateX + gateW * 1.7} ${aY}, ${gateX} ${aY}`,
          { stroke: fg, strokeWidth: 1.5, roughness: 0.85, seed: 22 }
        );
      } else {
        // OR gate: curved back and shield front
        rc.path(
          `M ${gateX} ${aY} Q ${gateX + 20} ${H / 2}, ${gateX} ${bY} C ${gateX + gateW * 1.65} ${bY}, ${gateX + gateW * 1.65} ${aY}, ${gateX} ${aY}`,
          { stroke: fg, strokeWidth: 1.5, roughness: 0.85, seed: 33 }
        );
        // curved indent on back
        rc.path(
          `M ${gateX} ${aY} Q ${gateX + 20} ${H / 2}, ${gateX} ${bY}`,
          { stroke: fg, strokeWidth: 1.5, roughness: 0.75, seed: 34 }
        );
      }

      // input nodes
      rc.circle(20, aY, 8, {
        stroke: a ? accent : fg,
        strokeWidth: a ? 2 : 1.5,
        fill: a ? "rgba(216,90,48,0.18)" : "transparent",
        roughness: 1.2, seed: 11,
      });
      rc.circle(20, bY, 8, {
        stroke: b ? accent : fg,
        strokeWidth: b ? 2 : 1.5,
        fill: b ? "rgba(216,90,48,0.18)" : "transparent",
        roughness: 1.2, seed: 12,
      });
      // output node
      rc.circle(320, H / 2, 8, {
        stroke: output ? accent : fg,
        strokeWidth: output ? 2.2 : 1.5,
        fill: output ? "rgba(216,90,48,0.18)" : "transparent",
        roughness: 1.2, seed: 13,
      });

      // gate label
      ctx.font = "600 13px var(--font-sans, sans-serif)";
      ctx.fillStyle = fg;
      ctx.globalAlpha = 0.55;
      ctx.textAlign = "center";
      ctx.fillText(gate, gateX + gateW / 2 + 10, H / 2 + 5);
      ctx.globalAlpha = 1;
    }
  }, [gate, a, b, output]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="block"
      style={{ width: 340, height: 180 }}
    />
  );
}

function TruthTable({ gate, a, b }: { gate: Gate; a: boolean; b: boolean }) {
  const rows = TRUTH_TABLES[gate];

  return (
    <table className="w-full border-collapse text-sm font-mono">
      <thead>
        <tr className="border-b border-foreground/10">
          <th className="py-1.5 pr-4 text-left text-xs font-semibold uppercase tracking-widest text-foreground/40">A</th>
          {gate !== "NOT" && (
            <th className="py-1.5 pr-4 text-left text-xs font-semibold uppercase tracking-widest text-foreground/40">B</th>
          )}
          <th className="py-1.5 text-left text-xs font-semibold uppercase tracking-widest text-foreground/40">Out</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const isActive =
            gate === "NOT"
              ? row.a === a
              : row.a === a && row.b === b;
          return (
            <tr
              key={i}
              className="border-b border-foreground/6 transition-colors duration-100"
              style={isActive ? { background: "color-mix(in srgb, var(--accent) 10%, transparent)" } : {}}
            >
              <td className="py-1.5 pr-4" style={{ color: isActive ? "var(--accent)" : undefined, opacity: isActive ? 1 : 0.5 }}>
                {row.a ? "1" : "0"}
              </td>
              {gate !== "NOT" && (
                <td className="py-1.5 pr-4" style={{ color: isActive ? "var(--accent)" : undefined, opacity: isActive ? 1 : 0.5 }}>
                  {row.b ? "1" : "0"}
                </td>
              )}
              <td className="py-1.5 font-bold" style={{ color: isActive ? "var(--accent)" : undefined, opacity: isActive ? 1 : 0.5 }}>
                {row.out ? "1" : "0"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function GateDemoAND() {
  return <GateDemo gate="AND" />;
}

export function GateDemoOR() {
  return <GateDemo gate="OR" />;
}

export function GateDemoNOT() {
  return <GateDemo gate="NOT" />;
}

function GateDemo({ gate }: { gate: Gate }) {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const output = evaluate(gate, a, b);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Circuit diagram */}
      <div
        className="flex items-center justify-between gap-4 rounded-surface border border-foreground/10 p-4"
        style={{ background: "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}
      >
        <div className="flex flex-col gap-4">
          <Toggle on={a} label="A" onToggle={() => setA((v) => !v)} />
          {gate !== "NOT" && (
            <Toggle on={b} label="B" onToggle={() => setB((v) => !v)} />
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <GateCanvas gate={gate} a={a} b={b} output={output} />
        </div>

        <OutputBulb on={output} />
      </div>

      {/* Truth table */}
      <div className="rounded-surface border border-foreground/10 p-4">
        <TruthTable gate={gate} a={a} b={b} />
      </div>
    </div>
  );
}
