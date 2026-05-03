"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

const W = 120;
const H = 200;
const MAX_SWING = 34;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const REST_ANGLE = 0.002;
const REST_VELOCITY = 0.0015;

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function handleChange() {
      setReducedMotion(query.matches);
    }
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

export function LightBulb({ on }: LightBulbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameAtRef = useRef(0);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastDragRef = useRef({ angle: 0, time: 0 });
  const reducedMotion = useReducedMotion();
  const angle = useMotionValue(0);

  function stopSwing() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }

  function settleBulb() {
    stopSwing();
    angleRef.current = 0;
    velocityRef.current = 0;
    angle.set(0);
  }

  function swingFrame(now: number) {
    const elapsed = Math.min(now - lastFrameAtRef.current, 32);
    const dt = elapsed / 16.667;
    lastFrameAtRef.current = now;

    const gravity = 0.018;
    const damping = 0.992;
    velocityRef.current += -Math.sin(angleRef.current) * gravity * dt;
    velocityRef.current *= Math.pow(damping, dt);
    angleRef.current += velocityRef.current * dt;

    if (
      Math.abs(angleRef.current) < REST_ANGLE &&
      Math.abs(velocityRef.current) < REST_VELOCITY
    ) {
      settleBulb();
      return;
    }

    angle.set(angleRef.current * RAD_TO_DEG);
    frameRef.current = requestAnimationFrame(swingFrame);
  }

  function startSwing(initialVelocity = velocityRef.current) {
    if (reducedMotion) {
      settleBulb();
      return;
    }

    stopSwing();
    velocityRef.current = initialVelocity;
    lastFrameAtRef.current = performance.now();
    frameRef.current = requestAnimationFrame(swingFrame);
  }

  function pointerAngle(event: React.PointerEvent<HTMLButtonElement>) {
    const button = buttonRef.current;
    if (!button) return angleRef.current;

    const rect = button.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top + 2;
    const dx = event.clientX - anchorX;
    const dy = Math.max(36, event.clientY - anchorY);
    return clamp(Math.atan2(dx, dy), -MAX_SWING * DEG_TO_RAD, MAX_SWING * DEG_TO_RAD);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (reducedMotion) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    stopSwing();

    const nextAngle = pointerAngle(event);
    angleRef.current = nextAngle;
    velocityRef.current = 0;
    lastDragRef.current = { angle: nextAngle, time: performance.now() };
    angle.set(nextAngle * RAD_TO_DEG);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!draggingRef.current || reducedMotion) return;

    const now = performance.now();
    const nextAngle = pointerAngle(event);
    const elapsed = Math.max(now - lastDragRef.current.time, 16);
    velocityRef.current = ((nextAngle - lastDragRef.current.angle) / elapsed) * 16.667;
    angleRef.current = nextAngle;
    lastDragRef.current = { angle: nextAngle, time: now };
    angle.set(nextAngle * RAD_TO_DEG);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (!draggingRef.current) return;

    draggingRef.current = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}

    startSwing(velocityRef.current);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (reducedMotion) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const impulse = event.key === "ArrowLeft" ? -0.045 : 0.045;
    velocityRef.current += impulse;
    startSwing(velocityRef.current);
  }

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!reducedMotion) return;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    angleRef.current = 0;
    velocityRef.current = 0;
    angle.set(0);
  }, [angle, reducedMotion]);

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
    <button
      ref={buttonRef}
      type="button"
      aria-label="Drag the hanging bulb to make it swing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="-mt-8 h-[190px] w-[220px] cursor-grab touch-none select-none border-0 bg-transparent p-0 outline-offset-4 active:cursor-grabbing"
    >
      <motion.span
        className="relative mx-auto block h-[200px] w-[120px]"
        style={{ rotate: angle, transformOrigin: "60px 0px" }}
      >
        {/* Cord extending from far above down to the neck */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-visible"
          style={{ top: 0, width: W, height: H }}
          overflow="visible"
        >
          <line
            x1={W / 2}
            y1={-9999}
            x2={W / 2}
            y2={52}
            stroke="var(--foreground)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>

        {/* Ambient glow behind bulb when on */}
        <motion.span
          className="pointer-events-none absolute rounded-full"
          style={{ width: 210, height: 210, top: 20, left: "50%", x: "-50%" }}
          animate={{
            opacity: on ? 1 : 0,
            scale: on ? 1 : 0.62,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span
            className="block h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent) 52%, transparent) 0%, color-mix(in srgb, var(--accent) 22%, transparent) 42%, transparent 72%)",
              filter: "blur(12px)",
            }}
          />
        </motion.span>

        <motion.span
          className="pointer-events-none absolute left-1/2 top-[112px] h-[170px] w-[240px] -translate-x-1/2"
          animate={{ opacity: on ? 0.7 : 0, scaleY: on ? 1 : 0.82 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(ellipse at top, color-mix(in srgb, var(--accent) 24%, transparent) 0%, color-mix(in srgb, var(--accent) 9%, transparent) 42%, transparent 76%)",
            filter: "blur(14px)",
          }}
        />

        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-hidden
          className="relative block"
          style={{ width: W, height: H }}
        />
      </motion.span>
    </button>
  );
}
