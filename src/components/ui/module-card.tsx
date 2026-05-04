import type { Module } from "@/lib/content";
import { LinkButton } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";

type ModuleCardProps = {
  module: Module;
};

export function ModuleCard({ module }: ModuleCardProps) {
  const firstSlide = module.slides[0];

  return (
    <article className="border-t border-foreground/12 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text variant="caption" className="font-semibold text-muted">
            {module.number}
          </Text>
          <Heading as="h2" variant="title" className="mt-2">
            {module.title}
          </Heading>
          <Text variant="muted" className="mt-2 max-w-xl text-base leading-7">
            {module.theme}
          </Text>
        </div>
        {firstSlide ? (
          <LinkButton href={firstSlide.href} variant="ghost" size="md">
            Open module
          </LinkButton>
        ) : (
          <span className="inline-flex h-11 shrink-0 items-center justify-center border border-foreground/15 px-4 text-sm text-muted">
            Planned
          </span>
        )}
      </div>
    </article>
  );
}
