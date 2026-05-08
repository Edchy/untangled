"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function VoiceoverButton({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
      />
      <button
        onClick={toggle}
        className="mb-ds-6 inline-flex items-center gap-2 font-sans text-label font-semibold uppercase tracking-[var(--ds-tracking-label)] text-accent transition-opacity hover:opacity-70"
        aria-label={playing ? "Pause narration" : "Play narration"}
      >
        {playing ? <Pause size={14} strokeWidth={2.5} /> : <Play size={14} strokeWidth={2.5} />}
        {playing ? "Pause" : "Listen"}
      </button>
    </>
  );
}
