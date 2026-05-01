"use client";

import { useEffect, useRef, useState } from "react";

export function LightSwitch() {
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
    <div className="flex items-center justify-center">
      {/* Housing plate — sits behind the button via z-index -1 on its pseudo, so we fake it with a wrapper */}
      <div
        style={{
          position: "relative",
          padding: "20px 25px",
          background: "linear-gradient(#ddd, #bbb)",
          borderRadius: 5,
          border: "1px solid #bbb",
          boxShadow:
            "0 0 5px 1px rgba(0,0,0,0.15), 0 3px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Top screw */}
        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            top: 7,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#666",
            borderRadius: "50%",
            boxShadow: "0 1px 0 white",
          }}
        />
        {/* Bottom screw */}
        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            bottom: 7,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#666",
            borderRadius: "50%",
            boxShadow: "0 1px 0 white",
          }}
        />

        {/* The button itself */}
        <button
          type="button"
          onClick={toggle}
          aria-label={on ? "Switch to dark mode" : "Switch to light mode"}
          aria-pressed={on}
          style={{
            display: "block",
            width: 50,
            height: 100,
            border: "none",
            cursor: "pointer",
            borderRadius: 5,
            background: on ? "#d2cbc3" : "#cbc7bc",
            boxShadow: on
              ? `inset 0 1px 0 white,
                 0 0 0 1px #999,
                 0 0 3px 1px rgba(0,0,0,0.15),
                 inset 0 -10px 0 #aaa,
                 inset 0 45px 3px #e0e0e0`
              : `inset 0 1px 0 white,
                 0 0 0 1px #999,
                 0 0 3px 1px rgba(0,0,0,0.15),
                 0 2px 0 rgba(255,255,255,0.6),
                 inset 0 10px 1px #e5e5e5,
                 inset 0 11px 0 rgba(255,255,255,0.5),
                 inset 0 -45px 3px #ddd`,
            transition: "box-shadow 80ms ease, background 80ms ease",
            padding: 0,
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
