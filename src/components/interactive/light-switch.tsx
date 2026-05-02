"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

const WIDTH = 132;
const HEIGHT = 196;

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

export function LightSwitch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.dataset.theme === "light";
  });
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const theme = on ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [on]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = WIDTH * scale;
    canvas.height = HEIGHT * scale;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, WIDTH, HEIGHT);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--foreground").trim();
    const accent = styles.getPropertyValue("--accent").trim();
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
    });

    rc.line(40, 52, 92, 52, {
      stroke: quiet,
      strokeWidth: 1.2,
      roughness: 0.8,
    });
    rc.line(40, 144, 92, 144, {
      stroke: quiet,
      strokeWidth: 1.2,
      roughness: 0.8,
    });
    rc.circle(66, 30, 9, {
      stroke: muted,
      strokeWidth: 1.4,
      roughness: 0.9,
      fill: withAlpha(ink, 0.06),
      fillStyle: "hachure",
      hachureGap: 6,
    });
    rc.circle(66, 166, 9, {
      stroke: muted,
      strokeWidth: 1.4,
      roughness: 0.9,
      fill: withAlpha(ink, 0.06),
      fillStyle: "hachure",
      hachureGap: 6,
    });

    rc.line(62, 30, 70, 30, {
      stroke: muted,
      strokeWidth: 1.2,
      roughness: 0.75,
    });
    rc.line(62, 166, 70, 166, {
      stroke: muted,
      strokeWidth: 1.2,
      roughness: 0.75,
    });

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
      },
    );

    const ridgeY = on ? 70 : 126;
    rc.line(50, ridgeY, 82, ridgeY + (on ? 5 : -5), {
      stroke: on ? accent : ink,
      strokeWidth: 2.2,
      roughness: 0.75,
    });
    rc.line(51, ridgeY + (on ? 13 : -13), 81, ridgeY + (on ? 17 : -17), {
      stroke: on ? accent : ink,
      strokeWidth: 1.3,
      roughness: 0.75,
    });
  }, [on]);

  function playClick() {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;
    const bufferSize = Math.floor(ctx.sampleRate * 0.003);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.15;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  function toggle() {
    playClick();
    setOn((v) => !v);
  }

  return (
    <div className="flex flex-col items-center gap-5 opacity-75 transition-opacity duration-200 hover:opacity-100">
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={on}
        className="group relative h-[196px] w-[132px] cursor-pointer border-0 bg-transparent p-0"
      >
        <span
          aria-hidden
          className="absolute left-[20px] top-3 h-[172px] w-[92px] border border-foreground/18"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--background) 92%, var(--foreground)), color-mix(in srgb, var(--background) 78%, var(--foreground)))",
          }}
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-[26px] h-2 w-2 -translate-x-1/2 rounded-full bg-foreground/28"
        />
        <span
          aria-hidden
          className="absolute bottom-[26px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-foreground/28"
        />
        <span
          aria-hidden
          className="absolute left-[44px] top-[56px] h-[84px] w-11 border border-foreground/24 transition-[background-color,box-shadow,transform] duration-100 ease-out"
          style={{
            background: on
              ? "linear-gradient(180deg, color-mix(in srgb, var(--accent) 20%, var(--background)) 0%, color-mix(in srgb, var(--background) 82%, var(--foreground)) 48%, color-mix(in srgb, var(--background) 66%, var(--foreground)) 100%)"
              : "linear-gradient(180deg, color-mix(in srgb, var(--background) 78%, var(--foreground)) 0%, color-mix(in srgb, var(--background) 88%, var(--foreground)) 52%, color-mix(in srgb, var(--background) 62%, var(--foreground)) 100%)",
            boxShadow: on
              ? "inset 0 34px 0 color-mix(in srgb, var(--background) 68%, transparent), inset 0 -14px 0 color-mix(in srgb, var(--foreground) 18%, transparent)"
              : "inset 0 14px 0 color-mix(in srgb, var(--background) 78%, transparent), inset 0 -34px 0 color-mix(in srgb, var(--foreground) 14%, transparent)",
            transform: `perspective(140px) rotateX(${on ? "-8deg" : "8deg"})`,
          }}
        />
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          aria-hidden
          className="pointer-events-none absolute inset-0 block h-[196px] w-[132px]"
        />
      </button>
    </div>
  );
}
