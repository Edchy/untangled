"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rough from "roughjs";

function evaluate(a: boolean, b: boolean) {
  return {
    sum: a !== b,    // XOR
    carry: a && b,   // AND
  };
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

function OutputNode({ on, label }: { on: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="font-mono text-xs font-semibold text-foreground/50">{label}</span>
      <motion.div
        key={String(on)}
        initial={{ scale: 0.85, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18, type: "spring", stiffness: 400, damping: 30 }}
        className="h-7 w-7 rounded-full border-2"
        style={{
          borderColor: on ? "var(--accent)" : "var(--foreground)",
          background: on ? "color-mix(in srgb, var(--accent) 22%, transparent)" : "transparent",
          opacity: on ? 1 : 0.3,
        }}
      />
      <span
        className="font-mono text-sm font-bold"
        style={{ color: on ? "var(--accent)" : "var(--foreground)", opacity: on ? 1 : 0.4 }}
      >
        {on ? "1" : "0"}
      </span>
    </div>
  );
}

function AdderCanvas({ a, b, sum, carry }: { a: boolean; b: boolean; sum: boolean; carry: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 380, H = 220;
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

    // Layout: inputs at x=30, two gates at x=120-220, outputs at x=340
    const aY = 75, bY = 145;
    const xorTop = 60, andTop = 130;
    const gateW = 76, gateH = 56;
    const xorMidY = xorTop + gateH / 2; // 88
    const andMidY = andTop + gateH / 2; // 158

    // Input wires → XOR gate
    wire(30, aY, 120, aY, a);
    wire(30, bY, 120, bY, b);

    // Input wires → AND gate (branch down)
    wire(60, aY, 60, andTop, a);
    wire(60, andTop, 120, andTop, a);
    wire(80, bY, 80, andTop + gateH, b);
    wire(80, andTop + gateH, 120, andTop + gateH, b);

    // XOR gate: curved shield shape
    rc.path(
      `M 120 ${xorTop} Q 136 ${xorMidY}, 120 ${xorTop + gateH} C ${120 + gateW * 1.6} ${xorTop + gateH}, ${120 + gateW * 1.6} ${xorTop}, 120 ${xorTop}`,
      { stroke: fg, strokeWidth: 1.5, roughness: 0.85, seed: 55 }
    );
    // XOR second curved line (distinguishing mark)
    rc.path(
      `M 115 ${xorTop} Q 130 ${xorMidY}, 115 ${xorTop + gateH}`,
      { stroke: fg, strokeWidth: 1.5, roughness: 0.75, seed: 56 }
    );

    // AND gate: flat back, D-shape
    rc.path(
      `M 120 ${andTop} L 120 ${andTop + gateH} C ${120 + gateW * 1.65} ${andTop + gateH}, ${120 + gateW * 1.65} ${andTop}, 120 ${andTop}`,
      { stroke: fg, strokeWidth: 1.5, roughness: 0.85, seed: 44 }
    );

    // Gate labels
    ctx.font = "600 11px var(--font-sans, sans-serif)";
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.45;
    ctx.textAlign = "center";
    ctx.fillText("XOR", 152, xorMidY + 4);
    ctx.fillText("AND", 152, andMidY + 4);
    ctx.globalAlpha = 1;

    // Output wires
    wire(120 + gateW + 5, xorMidY, 340, xorMidY, sum);
    wire(120 + gateW + 5, andMidY, 340, andMidY, carry);

    // Input nodes
    rc.circle(30, aY, 8, {
      stroke: a ? accent : fg, strokeWidth: a ? 2 : 1.5,
      fill: a ? "rgba(216,90,48,0.18)" : "transparent", roughness: 1.1, seed: 1,
    });
    rc.circle(30, bY, 8, {
      stroke: b ? accent : fg, strokeWidth: b ? 2 : 1.5,
      fill: b ? "rgba(216,90,48,0.18)" : "transparent", roughness: 1.1, seed: 2,
    });

    // Output nodes
    rc.circle(340, xorMidY, 8, {
      stroke: sum ? accent : fg, strokeWidth: sum ? 2.2 : 1.5,
      fill: sum ? "rgba(216,90,48,0.18)" : "transparent", roughness: 1.1, seed: 3,
    });
    rc.circle(340, andMidY, 8, {
      stroke: carry ? accent : fg, strokeWidth: carry ? 2.2 : 1.5,
      fill: carry ? "rgba(216,90,48,0.18)" : "transparent", roughness: 1.1, seed: 4,
    });

    // Output labels
    ctx.font = "600 11px var(--font-sans, sans-serif)";
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.4;
    ctx.textAlign = "left";
    ctx.fillText("Sum", 352, xorMidY + 4);
    ctx.fillText("Carry", 352, andMidY + 4);
    ctx.globalAlpha = 1;

  }, [a, b, sum, carry]);

  return <canvas ref={canvasRef} aria-hidden style={{ width: 380, height: 220 }} />;
}

export function HalfAdderDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const { sum, carry } = evaluate(a, b);
  const decimal = (carry ? 2 : 0) + (sum ? 1 : 0);

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Circuit */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 rounded-surface border border-foreground/10 p-4"
        style={{ background: "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}
      >
        <div className="flex flex-col gap-4">
          <Toggle on={a} label="A" onToggle={() => setA((v) => !v)} />
          <Toggle on={b} label="B" onToggle={() => setB((v) => !v)} />
        </div>

        <div className="overflow-x-auto">
          <AdderCanvas a={a} b={b} sum={sum} carry={carry} />
        </div>

        <div className="flex flex-col gap-4">
          <OutputNode on={sum} label="Sum" />
          <OutputNode on={carry} label="Carry" />
        </div>
      </div>

      {/* Readout */}
      <div className="rounded-surface border border-foreground/10 p-4">
        <motion.div
          key={`${a}-${b}`}
          initial={{ opacity: 0.5, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-wrap items-baseline gap-3"
        >
          <span className="font-mono text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {a ? "1" : "0"} + {b ? "1" : "0"}
          </span>
          <span className="font-mono text-2xl text-foreground/40">=</span>
          <span className="font-mono text-2xl font-bold" style={{ color: sum || carry ? "var(--accent)" : "var(--foreground)", opacity: sum || carry ? 1 : 0.6 }}>
            {carry ? "1" : "0"}{sum ? "1" : "0"}
          </span>
          <span className="text-sm text-foreground/40">(binary)</span>
          <span className="ml-2 font-mono text-xl text-foreground/50">= {decimal} decimal</span>
        </motion.div>

        <div className="mt-3 flex gap-6 text-sm text-foreground/50">
          <span>
            <span className="font-mono font-semibold" style={{ color: sum ? "var(--accent)" : undefined }}>Sum bit</span>
            {" "}= {sum ? "1" : "0"}
          </span>
          <span>
            <span className="font-mono font-semibold" style={{ color: carry ? "var(--accent)" : undefined }}>Carry bit</span>
            {" "}= {carry ? "1" : "0"} (worth 2)
          </span>
        </div>
      </div>
    </div>
  );
}
