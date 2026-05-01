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

  return (
    <>
      {/* Trigger — fixed top-left */}
      <button
        id="toc-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open table of contents"
        className="fixed left-4 top-4 z-40 flex items-center gap-2 rounded-[8px] bg-background px-3 py-2 text-xs font-medium text-foreground/50 shadow-sm ring-1 ring-foreground/10 transition-colors hover:text-foreground"
      >
        <span className="font-semibold tabular-nums text-accent">
          {currentModule?.number ?? "—"}
        </span>
        <span className="max-w-[140px] truncate text-foreground/50">
          {currentSlide?.title ?? "Contents"}
        </span>
      </button>

      {/* Floating panel — vertically centered, fixed size */}
      <div
        className={[
          "fixed left-4 top-1/2 z-50 flex h-[70svh] w-72 -translate-y-1/2 flex-col rounded-[8px] bg-background shadow-lg ring-1 ring-foreground/10 transition-opacity duration-150",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        id="toc-panel"
        aria-modal
        role="dialog"
        aria-label="Table of contents"
      >
        {/* Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-foreground/10 px-4">
          {openModule ? (
            <button
              onClick={() => setOpenModule(null)}
              className="flex items-center gap-1.5 text-xs text-foreground/36 transition-colors hover:text-foreground"
            >
              <span aria-hidden>←</span>
              All chapters
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-[8px] text-foreground/36 transition-colors hover:bg-foreground/6 hover:text-foreground"
          >
            <X size={14} />
          </button>
        </div>

        {/* Module list / slide list */}
        <nav className="flex flex-1 flex-col overflow-hidden">
          {openModule ? (() => {
            const module = modules.find((m) => m.slug === openModule);
            if (!module) return null;
            return (
              <>
                <div className="flex-1 overflow-y-auto px-2 py-3">
                  <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/30">
                    {module.number} — {module.title}
                  </p>
                  <ol>
                    {module.slides.length > 0 ? (
                      module.slides.map((slide) => {
                        const isActive = slide.key === currentSlideKey;
                        return (
                          <li key={slide.key}>
                            <Link
                              href={slide.href}
                              onClick={() => setOpen(false)}
                              className={[
                                "block rounded-[8px] px-3 py-2 text-xs leading-5 transition-colors",
                                isActive
                                  ? "font-medium text-accent"
                                  : "text-foreground/44 hover:bg-foreground/4 hover:text-foreground/80",
                              ].join(" ")}
                            >
                              {slide.title}
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-3 py-2 text-xs italic text-foreground/24">
                        Coming soon
                      </li>
                    )}
                  </ol>
                </div>
              </>
            );
          })() : (
            <ol className="flex-1 overflow-y-auto px-2 py-3">
              {modules.map((module) => {
                const hasActive = module.slides.some((s) => s.key === currentSlideKey);
                return (
                  <li key={module.slug}>
                    <button
                      onClick={() => setOpenModule(module.slug)}
                      className={[
                        "flex w-full items-baseline gap-3 rounded-[8px] px-3 py-2.5 text-left transition-colors",
                        hasActive ? "text-foreground" : "text-foreground/44 hover:bg-foreground/4 hover:text-foreground/80",
                      ].join(" ")}
                    >
                      <span className={[
                        "shrink-0 text-[10px] font-semibold tabular-nums",
                        hasActive ? "text-accent" : "text-foreground/28",
                      ].join(" ")}>
                        {module.number}
                      </span>
                      <span className="text-xs font-medium leading-5">
                        {module.title}
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
