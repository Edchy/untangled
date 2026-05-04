import { ArrowRight } from "lucide-react";
import { getSlides } from "@/lib/content";
import { LinkButton } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";

export default function Home() {
  const firstSlide = getSlides()[0];

  return (
    <main className="min-h-svh bg-background px-8 py-24 sm:px-16 sm:py-32">
      <div className="mx-auto max-w-[52ch]">
        <Text variant="label" className="text-[11px]">
          Untangled
        </Text>

        <Heading as="h1" variant="display" className="mt-10">
          AI, from the beginning. Byte-sized micro-lessons.
        </Heading>

        <div className="mt-12 space-y-5 text-body leading-[var(--ds-leading-body)] text-foreground/68">
          <p>
            Untangled is a free, self-paced journey through artificial
            intelligence — not the hype, but the real thing. No technical
            background required. No jargon left unexplained.
          </p>
          <p>
            It&apos;s for curious people who want to actually understand
            what&apos;s happening, not just have an opinion about it.
          </p>
          <p>
            We start at the beginning. Not because it&apos;s easy, but because
            it&apos;s the only way to make sense of where we are now. The story
            of AI begins with the origin story of computers themselves — and
            once you see that thread, everything else clicks into place.
          </p>
          <p>
            Each chapter builds on the last. Starting from the beginning
            isn&apos;t a detour — it&apos;s the whole point.
          </p>
        </div>

        {firstSlide && (
          <LinkButton
            href={firstSlide.href}
            variant="ghost"
            size="lg"
            className="group mt-14 gap-2.5"
          >
            Begin from the start
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </LinkButton>
        )}
      </div>
    </main>
  );
}
