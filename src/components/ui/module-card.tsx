import Link from "next/link";
import type { Module } from "@/lib/content";

type ModuleCardProps = {
  module: Module;
};

export function ModuleCard({ module }: ModuleCardProps) {
  const firstSlide = module.slides[0];

  return (
    <article className="border-t border-foreground/12 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-muted">{module.number}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
            {module.title}
          </h2>
          <p className="mt-2 max-w-xl text-base leading-7 text-foreground/70">
            {module.theme}
          </p>
        </div>
        {firstSlide ? (
          <Link
            href={firstSlide.href}
            className="inline-flex h-11 shrink-0 items-center justify-center border border-foreground px-4 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Open module
          </Link>
        ) : (
          <span className="inline-flex h-11 shrink-0 items-center justify-center border border-foreground/15 px-4 text-sm text-muted">
            Planned
          </span>
        )}
      </div>
    </article>
  );
}
