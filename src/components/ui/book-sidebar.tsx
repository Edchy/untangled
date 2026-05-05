"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Module } from "@/lib/content";

type BookNavProps = {
  modules: Module[];
  currentSlideKey: string;
};

export function BookSidebar({ modules, currentSlideKey }: BookNavProps) {
  const [open, setOpen] = useState(false);
  const [openModule, setOpenModule] = useState<string | null>(() => {
    const current = modules.find((m) =>
      m.slides.some((s) => s.key === currentSlideKey)
    );
    return current?.slug ?? null;
  });

  // Close on Escape or click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onPointer = (e: PointerEvent) => {
      const panel = document.getElementById("toc-panel");
      const trigger = document.getElementById("toc-trigger");
      if (panel && !panel.contains(e.target as Node) && trigger && !trigger.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const currentModule = modules.find((m) =>
    m.slides.some((s) => s.key === currentSlideKey)
  );
  const currentSlide = currentModule?.slides.find((s) => s.key === currentSlideKey);
  const lessonIndex = currentModule?.slides.findIndex((s) => s.key === currentSlideKey) ?? -1;
  const lessonNumber = lessonIndex >= 0 ? String(lessonIndex + 1).padStart(2, "0") : null;

  return (
    <>
      {/* Home + Trigger — fixed top-left */}
      <div className="fixed left-4 top-4 sm:left-8 sm:top-6 z-40 flex items-stretch rounded-control border border-foreground/12 overflow-hidden transition-colors hover:border-accent/40">
        <Link
          href="/"
          aria-label="Go to home"
          className="flex items-center justify-center px-3 py-2"
        >
          <svg viewBox="0 0 89 97" className="h-5 w-5 fill-foreground" aria-hidden>
            <path d="M56.3745 17.3517C46.3359 17.3517 41.8185 25.5246 41.8185 35.0805V64H24V32.943C24 14.8369 34.666 0 56.3745 0C78.083 0 89 14.7112 89 32.943V64H71.1815V35.0805C71.1815 25.5246 66.5386 17.3517 56.3745 17.3517Z" />
            <path d="M32.627 79.28C42.1161 79.28 46.9257 70.96 46.9257 61.104V31.792H65.384V63.28C65.384 81.84 54.205 96.816 32.627 96.816C11.179 96.816 0 81.84 0 63.28V31.792H18.4583V61.232C18.4583 70.96 23.1379 79.28 32.627 79.28Z" />
          </svg>
        </Link>

        <div className="w-px self-stretch bg-foreground/10" aria-hidden />

        <button
          id="toc-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open table of contents"
          className="flex flex-col items-start px-3 py-2 text-left"
        >
          <span className="text-[10px] font-medium tabular-nums text-foreground/36">
            {currentModule?.title ?? "Contents"}
          </span>
          <span className="max-w-[160px] truncate text-xs font-medium text-foreground/70">
            {lessonNumber && <span className="tabular-nums text-accent">{lessonNumber} </span>}{currentSlide?.title ?? ""}
          </span>
        </button>
      </div>

      {/* Floating panel — vertically centered, fixed size */}
      <div
        className={[
          "fixed left-4 sm:left-8 top-1/2 z-50 flex h-[70svh] w-72 -translate-y-1/2 flex-col rounded-surface border border-foreground/12 bg-foreground/[0.03] overflow-hidden transition-opacity duration-150",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        id="toc-panel"
        aria-modal
        role="dialog"
        aria-label="Table of contents"
      >
        {/* Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-foreground/10 pl-5">
          {openModule ? (
            <button
              onClick={() => setOpenModule(null)}
              className="flex items-center gap-1.5 text-xs text-foreground/36 transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span>
              All chapters
            </button>
          ) : (
            <span className="text-xs font-semibold tracking-wide text-foreground/36">Chapters</span>
          )}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-control text-foreground/36 transition-colors hover:bg-foreground/6 hover:text-accent"
          >
            <X size={14} />
          </button>
        </div>

        {/* Module list / slide list */}
        <nav className="flex flex-1 flex-col overflow-hidden">
          {openModule ? (() => {
            const chapter = modules.find((m) => m.slug === openModule);
            if (!chapter) return null;
            return (
              <>
                <div className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3">
                  <p className="px-2.5 pb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/30 tabular-nums">
                    {chapter.title}
                  </p>
                  <ol>
                    {chapter.slides.length > 0 ? (
                      chapter.slides.map((slide, i) => {
                        const isActive = slide.key === currentSlideKey;
                        const conceptSlides = chapter.slides.filter((s) => s.subConceptSlug === slide.subConceptSlug && s.subConceptSlug !== null);
                        const isQuizLocked = slide.subConceptSlug?.includes("quiz") && slide.key !== conceptSlides[0]?.key;
                        return (
                          <li key={slide.key}>
                            {isQuizLocked ? (
                              <span className="flex cursor-default items-baseline gap-3 rounded-control px-2.5 py-2 text-xs leading-5 text-foreground/30 select-none">
                                <span className="shrink-0 text-[10px] tabular-nums">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                {slide.title}
                              </span>
                            ) : (
                            <Link
                              href={slide.href}
                              onClick={() => setOpen(false)}
                              className={[
                                "flex items-baseline gap-3 rounded-control px-2.5 py-2 text-xs leading-5 transition-colors",
                                isActive
                                  ? "font-medium text-accent"
                                  : "text-foreground/44 hover:bg-foreground/4 hover:text-accent",
                              ].join(" ")}
                            >
                              <span className={[
                                "shrink-0 text-[10px] tabular-nums",
                                isActive ? "text-accent" : "text-foreground/28",
                              ].join(" ")}>
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {slide.title}
                            </Link>
                            )}
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-2.5 py-2 text-xs italic text-foreground/24">
                        Coming soon
                      </li>
                    )}
                  </ol>
                </div>
              </>
            );
          })() : (
            <ol className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3">
              {modules.map((chapter) => {
                const hasActive = chapter.slides.some((s) => s.key === currentSlideKey);
                return (
                  <li key={chapter.slug}>
                    <button
                      onClick={() => setOpenModule(chapter.slug)}
                      className={[
                        "flex w-full items-baseline gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors",
                        hasActive ? "text-foreground" : "text-foreground/44 hover:bg-foreground/4 hover:text-accent",
                      ].join(" ")}
                    >
                      <span className="text-xs font-medium leading-5 tabular-nums">
                        {chapter.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </nav>
      </div>
    </>
  );
}
