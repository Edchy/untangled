"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

type Gate = "AND" | "OR" | "XOR";

const gateDescriptions: Record<Gate, string> = {
  AND: "On only when both inputs are on.",
  OR: "On when at least one input is on.",
  XOR: "On when the inputs are different.",
};

function evaluateGate(gate: Gate, a: boolean, b: boolean) {
  if (gate === "AND") return a && b;
  if (gate === "OR") return a || b;
  return a !== b;
}

export function LogicGateDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gate, setGate] = useState<Gate>("AND");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const output = evaluateGate(gate, a, b);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = 720 * scale;
    canvas.height = 300 * scale;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    context.scale(scale, scale);
    context.clearRect(0, 0, 720, 300);

    const roughCanvas = rough.canvas(canvas);
    const ink = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground-canvas")
      .trim();
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-canvas")
      .trim();
    const muted = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || "#737373";

    const lineOptions = { stroke: ink, strokeWidth: 2, roughness: 1.2 };
    const activeOptions = { stroke: accent, strokeWidth: 3, roughness: 1.1 };

    roughCanvas.line(70, 92, 260, 92, a ? activeOptions : lineOptions);
    roughCanvas.line(70, 205, 260, 205, b ? activeOptions : lineOptions);
    roughCanvas.line(455, 150, 640, 150, output ? activeOptions : lineOptions);
    roughCanvas.rectangle(260, 58, 195, 184, {
      stroke: ink,
      strokeWidth: 2,
      roughness: 1.6,
      fill: output ? "rgba(74, 158, 142, 0.10)" : "transparent",
      fillStyle: "hachure",
    });
    roughCanvas.circle(70, 92, 32, {
      stroke: a ? accent : muted,
      strokeWidth: a ? 3 : 2,
      fill: a ? "rgba(74, 158, 142, 0.12)" : "transparent",
      roughness: 1.4,
    });
    roughCanvas.circle(70, 205, 32, {
      stroke: b ? accent : muted,
      strokeWidth: b ? 3 : 2,
      fill: b ? "rgba(74, 158, 142, 0.12)" : "transparent",
      roughness: 1.4,
    });
    roughCanvas.circle(650, 150, 38, {
      stroke: output ? accent : muted,
      strokeWidth: output ? 3 : 2,
      fill: output ? "rgba(74, 158, 142, 0.16)" : "transparent",
      roughness: 1.4,
    });

    context.font = "600 18px var(--font-sans)";
    context.fillStyle = ink;
    context.fillText("A", 64, 99);
    context.fillText("B", 64, 212);
    context.font = "700 34px var(--font-sans)";
    context.fillText(gate, gate === "XOR" ? 320 : 326, 162);
    context.font = "600 16px var(--font-sans)";
    context.fillText(output ? "1" : "0", 646, 156);
  }, [a, b, gate, output]);

  return (
    <section className="my-10 max-w-3xl border border-foreground/12 bg-background p-4 shadow-[8px_8px_0_color-mix(in_srgb,var(--foreground)_10%,transparent)]">
      <div className="flex flex-col gap-5">
        <canvas
          ref={canvasRef}
          aria-label={`${gate} gate diagram`}
          className="aspect-[12/5] w-full"
        />
        <div className="flex flex-col gap-4 border-t border-foreground/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{gate}</p>
            <p className="text-sm leading-6 text-foreground/68">
              {gateDescriptions[gate]}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["AND", "OR", "XOR"] as Gate[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setGate(option)}
                className={`h-10 border px-3 text-sm font-semibold transition ${
                  gate === option
                    ? "border-accent bg-accent text-white"
                    : "border-foreground/18 hover:border-foreground"
                }`}
              >
                {option}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setA((value) => !value)}
              className="h-10 border border-foreground/18 px-3 text-sm font-semibold transition hover:border-foreground"
            >
              A: {a ? "1" : "0"}
            </button>
            <button
              type="button"
              onClick={() => setB((value) => !value)}
              className="h-10 border border-foreground/18 px-3 text-sm font-semibold transition hover:border-foreground"
            >
              B: {b ? "1" : "0"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
