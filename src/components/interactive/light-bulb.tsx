"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import rough from "roughjs";

const W = 120;
const H = 200;

function withAlpha(color: string, alpha: number) {
  const value = color.trim();
  if (value.startsWith("#") && (value.length === 7 || value.length === 4)) {
    const hex =
      value.length === 4
        ? value.slice(1).split("").map((c) => c + c).join("")
        : value.slice(1);
    const n = Number.parseInt(hex, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  return value;
}

type LightBulbProps = {
  on: boolean;
};

export function LightBulb({ on }: LightBulbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = W * scale;
    canvas.height = H * scale;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground").trim();
    const accent = styles.getPropertyValue("--accent").trim();
    const rc = rough.canvas(canvas);

    const stroke = on ? accent : ink;
    const strokeW = on ? 2.0 : 1.5;

    // Cord from top down to cap
    rc.line(W / 2, 0, W / 2, 52, {
      stroke: ink,
      strokeWidth: 1.5,
      roughness: 0.9,
      bowing: 0.3,
      seed: 11,
    });

    // Cap (threaded base) — two horizontal lines
    rc.line(W / 2 - 13, 68, W / 2 + 13, 68, {
      stroke: stroke,
      strokeWidth: strokeW,
      roughness: 0.75,
      seed: 21,
    });
    rc.line(W / 2 - 11, 74, W / 2 + 11, 74, {
      stroke: stroke,
      strokeWidth: 1.2,
      roughness: 0.75,
      seed: 22,
    });

    // Neck rectangle (the threaded collar)
    rc.rectangle(W / 2 - 13, 52, 26, 18, {
      stroke: stroke,
      strokeWidth: strokeW,
      roughness: 0.85,
      bowing: 0.3,
      fill: withAlpha(on ? accent : ink, on ? 0.06 : 0.04),
      fillStyle: "hachure",
      hachureGap: 5,
      hachureAngle: 0,
      seed: 31,
    });

    // Globe — draw as an arc/ellipse approximation using a circle
    // Bulb globe center around (W/2, 118), radius ~38
    rc.circle(W / 2, 118, 76, {
      stroke: stroke,
      strokeWidth: strokeW,
      roughness: 0.85,
      bowing: 0.4,
      fill: on
        ? withAlpha(accent, 0.12)
        : withAlpha(ink, 0.03),
      fillStyle: "hachure",
      hachureGap: on ? 10 : 18,
      hachureAngle: -35,
      seed: 41,
    });

    // Filament — two small lines inside the globe when on
    if (on) {
      rc.line(W / 2 - 8, 112, W / 2 - 2, 120, {
        stroke: accent,
        strokeWidth: 1.8,
        roughness: 0.9,
        seed: 51,
      });
      rc.line(W / 2 - 2, 120, W / 2 + 6, 110, {
        stroke: accent,
        strokeWidth: 1.8,
        roughness: 0.9,
        seed: 52,
      });
    } else {
      rc.line(W / 2 - 8, 112, W / 2 - 2, 120, {
        stroke: withAlpha(ink, 0.28),
        strokeWidth: 1.2,
        roughness: 0.9,
        seed: 51,
      });
      rc.line(W / 2 - 2, 120, W / 2 + 6, 110, {
        stroke: withAlpha(ink, 0.28),
        strokeWidth: 1.2,
        roughness: 0.9,
        seed: 52,
      });
    }
  }, [on]);

  return (
    <div className="relative flex items-start justify-center" aria-hidden>
      {/* Ambient glow behind bulb when on */}
      <motion.span
        className="pointer-events-none absolute rounded-full"
        style={{ width: 160, height: 160, top: 38, left: "50%", x: "-50%" }}
        animate={{
          opacity: on ? 1 : 0,
          scale: on ? 1 : 0.6,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span
          className="block h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent) 0%, color-mix(in srgb, var(--accent) 14%, transparent) 45%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </motion.span>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="relative block"
        style={{ width: W, height: H }}
      />
    </div>
  );
}
