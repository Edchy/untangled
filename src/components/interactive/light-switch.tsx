"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import rough from "roughjs";

const WIDTH = 132;
const HEIGHT = 196;
const DRAG_RANGE = 36;
const SNAP_THRESHOLD = 0.18;
const THEME_CHANGE_EVENT = "untangled-themechange";

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "light";
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToThemeChange(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

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

function setupCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return null;
  const scale = window.devicePixelRatio || 1;
  canvas.width = WIDTH * scale;
  canvas.height = HEIGHT * scale;
  canvas.style.width = `${WIDTH}px`;
  canvas.style.height = `${HEIGHT}px`;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.clearRect(0, 0, WIDTH, HEIGHT);
  return context;
}

type LightSwitchProps = {
  on: boolean;
  onToggle: (nextOn: boolean) => void;
};

export function LightSwitch({ on, onToggle }: LightSwitchProps) {
  const plateCanvasRef = useRef<HTMLCanvasElement>(null);
  const rockerCanvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const [screwJitter, setScrewJitter] = useState({ top: 0, bottom: 0 });
  const [flicker, setFlicker] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const flipCountRef = useRef(0);
  const lastFlipAtRef = useRef(0);

  // tilt: -1 = up (off/dark), +1 = down (on/light).
  const tilt = useMotionValue(on ? 1 : -1);
  const draggingRef = useRef(false);
  const dragStartTiltRef = useRef(0);
  const dragStartYRef = useRef(0);

  const rockerRotate = useTransform(tilt, (t) => t * 14);
  const rockerY = useTransform(tilt, (t) => t * 1.2);
  const glowOpacity = useTransform(tilt, (t) => Math.max(0, (t + 1) / 2));
  const glowScale = useTransform(tilt, (t) => 0.85 + Math.max(0, (t + 1) / 2) * 0.4);

  // Plate layer: only redraws when seed or theme changes (theme via on flips).
  useEffect(() => {
    const canvas = plateCanvasRef.current;
    if (!canvas) return;
    const context = setupCanvas(canvas);
    if (!context) return;

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground").trim();
    const muted = withAlpha(ink, 0.36);
    const quiet = withAlpha(ink, 0.18);
    const rc = rough.canvas(canvas);

    rc.rectangle(18, 10, 96, 176, {
      stroke: ink,
      strokeWidth: 1.5,
      roughness: 0.85,
      bowing: 0.45,
      fill: withAlpha(ink, 0.018),
      fillStyle: "hachure",
      hachureGap: 18,
      hachureAngle: -35,
      seed,
    });
    rc.line(40, 52, 92, 52, {
      stroke: quiet,
      strokeWidth: 1.2,
      roughness: 0.8,
      seed: seed + 1,
    });
    rc.line(40, 144, 92, 144, {
      stroke: quiet,
      strokeWidth: 1.2,
      roughness: 0.8,
      seed: seed + 2,
    });
    rc.circle(66, 30, 9, {
      stroke: muted,
      strokeWidth: 1.4,
      roughness: 0.9,
      fill: withAlpha(ink, 0.06),
      fillStyle: "hachure",
      hachureGap: 6,
      seed: seed + 3,
    });
    rc.circle(66, 166, 9, {
      stroke: muted,
      strokeWidth: 1.4,
      roughness: 0.9,
      fill: withAlpha(ink, 0.06),
      fillStyle: "hachure",
      hachureGap: 6,
      seed: seed + 4,
    });
    rc.line(62, 30, 70, 30, {
      stroke: muted,
      strokeWidth: 1.2,
      roughness: 0.75,
      seed: seed + 5,
    });
    rc.line(62, 166, 70, 166, {
      stroke: muted,
      strokeWidth: 1.2,
      roughness: 0.75,
      seed: seed + 6,
    });
  }, [seed, on]);

  // Rocker sketch layer: redraws on snap (on/seed change). During drag, the
  // wrapping motion.span tilts both the colored rocker shell and this canvas
  // together via CSS transform, so the sketched ridges follow the rocker.
  useEffect(() => {
    const canvas = rockerCanvasRef.current;
    if (!canvas) return;
    const context = setupCanvas(canvas);
    if (!context) return;

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground").trim();
    const accent = styles.getPropertyValue("--accent").trim();
    const rc = rough.canvas(canvas);

    const topInset = on ? 3 : 0;
    const bottomInset = on ? 0 : 3;
    rc.polygon(
      [
        [43 + topInset, 55],
        [89 - topInset, 55],
        [89 - bottomInset, 141],
        [43 + bottomInset, 141],
      ],
      {
        stroke: on ? accent : ink,
        strokeWidth: on ? 2.2 : 1.7,
        roughness: 0.95,
        bowing: 0.55,
        seed: seed + 7,
      },
    );

    const ridgeY = on ? 70 : 126;
    rc.line(50, ridgeY, 82, ridgeY + (on ? 5 : -5), {
      stroke: on ? accent : ink,
      strokeWidth: 2.2,
      roughness: 0.75,
      seed: seed + 8,
    });
    rc.line(51, ridgeY + (on ? 13 : -13), 81, ridgeY + (on ? 17 : -17), {
      stroke: on ? accent : ink,
      strokeWidth: 1.3,
      roughness: 0.75,
      seed: seed + 9,
    });
  }, [on, seed]);

  function ensureAudio() {
    if (!audioCtxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (Ctor) audioCtxRef.current = new Ctor();
    }
    return audioCtxRef.current;
  }

  function playThock() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const bufferSize = Math.floor(ctx.sampleRate * 0.012);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.18));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 700 + Math.random() * 120;
    const gain = ctx.createGain();
    gain.gain.value = 0.09;
    source.connect(lp);
    lp.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  function playClick() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const bufferSize = Math.floor(ctx.sampleRate * 0.004);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1800 + Math.random() * 400;
    const gain = ctx.createGain();
    gain.gain.value = 0.18;
    source.connect(hp);
    hp.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  function jostleScrews() {
    setScrewJitter({
      top: (Math.random() - 0.5) * 12,
      bottom: (Math.random() - 0.5) * 12,
    });
  }

  function commitFlip(nextOn: boolean) {
    const now = performance.now();
    if (now - lastFlipAtRef.current < 220) {
      flipCountRef.current += 1;
    } else {
      flipCountRef.current = 1;
    }
    lastFlipAtRef.current = now;

    onToggle(nextOn);
    setSeed((s) => s + 17);
    jostleScrews();
    playClick();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(8);
    }
    if (nextOn) {
      setFlicker(true);
      window.setTimeout(() => setFlicker(false), 140);
    }
  }

  function snapTo(target: 1 | -1) {
    animate(tilt, target, {
      type: "spring",
      stiffness: 520,
      damping: 22,
      mass: 0.6,
      velocity: tilt.getVelocity(),
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    (event.currentTarget as HTMLButtonElement).setPointerCapture(event.pointerId);
    draggingRef.current = true;
    dragStartTiltRef.current = tilt.get();
    dragStartYRef.current = event.clientY;
    playThock();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!draggingRef.current) return;
    const dy = event.clientY - dragStartYRef.current;
    const next = Math.max(
      -1,
      Math.min(1, dragStartTiltRef.current + dy / DRAG_RANGE),
    );
    tilt.set(next);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (event.currentTarget as HTMLButtonElement).releasePointerCapture(event.pointerId);
    } catch {}

    const moved = Math.abs(tilt.get() - dragStartTiltRef.current);
    const startedOn = dragStartTiltRef.current > 0;

    if (moved < SNAP_THRESHOLD) {
      const nextOn = !startedOn;
      commitFlip(nextOn);
      snapTo(nextOn ? 1 : -1);
      return;
    }

    const v = tilt.get();
    const nextOn = v > 0;
    if (nextOn !== startedOn) {
      commitFlip(nextOn);
    }
    snapTo(nextOn ? 1 : -1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      const nextOn = !on;
      commitFlip(nextOn);
      snapTo(nextOn ? 1 : -1);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 opacity-75 transition-opacity duration-200 hover:opacity-100">
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        aria-label={on ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={on}
        className="group relative h-[196px] w-[132px] cursor-pointer touch-none select-none border-0 bg-transparent p-0 active:translate-y-[1px]"
      >
        <span
          aria-hidden
          className="absolute left-[20px] top-3 h-[172px] w-[92px] border border-foreground/18"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--background) 92%, var(--foreground)), color-mix(in srgb, var(--background) 78%, var(--foreground)))",
          }}
        />

        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: glowOpacity,
            scale: glowScale,
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent) 0%, color-mix(in srgb, var(--accent) 18%, transparent) 38%, transparent 70%)",
            filter: flicker ? "brightness(1.25) blur(2px)" : "blur(6px)",
            transition: "filter 120ms ease-out",
          }}
        />

        <canvas
          ref={plateCanvasRef}
          width={WIDTH}
          height={HEIGHT}
          aria-hidden
          className="pointer-events-none absolute inset-0 block h-[196px] w-[132px]"
        />

        <motion.span
          aria-hidden
          className="absolute left-1/2 top-[26px] h-2 w-2 -translate-x-1/2 rounded-full bg-foreground/28"
          animate={{ rotate: screwJitter.top }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
        />
        <motion.span
          aria-hidden
          className="absolute bottom-[26px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-foreground/28"
          animate={{ rotate: screwJitter.bottom }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
        />

        {/* Rocker group — colored shell + sketched overlay tilt together. */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 block will-change-transform"
          style={{
            y: rockerY,
            rotateX: rockerRotate,
            transformPerspective: 220,
            transformOrigin: "66px 98px",
          }}
        >
          <span
            className="absolute left-[44px] top-[56px] h-[84px] w-11 border border-foreground/24"
            style={{
              background: on
                ? "linear-gradient(180deg, color-mix(in srgb, var(--accent) 20%, var(--background)) 0%, color-mix(in srgb, var(--background) 82%, var(--foreground)) 48%, color-mix(in srgb, var(--background) 66%, var(--foreground)) 100%)"
                : "linear-gradient(180deg, color-mix(in srgb, var(--background) 78%, var(--foreground)) 0%, color-mix(in srgb, var(--background) 88%, var(--foreground)) 52%, color-mix(in srgb, var(--background) 62%, var(--foreground)) 100%)",
              boxShadow: on
                ? "inset 0 34px 0 color-mix(in srgb, var(--background) 68%, transparent), inset 0 -14px 0 color-mix(in srgb, var(--foreground) 18%, transparent), 0 0 18px color-mix(in srgb, var(--accent) 35%, transparent)"
                : "inset 0 14px 0 color-mix(in srgb, var(--background) 78%, transparent), inset 0 -34px 0 color-mix(in srgb, var(--foreground) 14%, transparent)",
            }}
          />
          <canvas
            ref={rockerCanvasRef}
            width={WIDTH}
            height={HEIGHT}
            aria-hidden
            className="absolute inset-0 block h-[196px] w-[132px]"
          />
        </motion.span>
      </button>
    </div>
  );
}

export function StandaloneLightSwitch() {
  const on = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function handleToggle(nextOn: boolean) {
    const theme = nextOn ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return <LightSwitch on={on} onToggle={handleToggle} />;
}
