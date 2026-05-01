import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSlides } from "@/lib/content";

export default function Home() {
  const firstSlide = getSlides()[0];

  return (
    <main className="min-h-svh bg-[oklch(12%_0.008_38)] px-8 py-24 sm:px-16 sm:py-32">
      <div className="mx-auto max-w-[52ch]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(55%_0.17_38)]">
          Untangled
        </p>

        <h1
          className="mt-10 font-serif font-semibold leading-[0.95] text-[oklch(96%_0.005_38)] [text-wrap:balance]"
          style={{ fontSize: "clamp(3.5rem, 10vw, 6rem)" }}
        >
          AI, from the beginning. Byte-sized micro-lessons.
        </h1>

        <div className="mt-12 space-y-5 text-[1.0625rem] leading-[1.9] text-[oklch(68%_0.005_38)]">
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
          <Link
            href={firstSlide.href}
            className="group mt-14 inline-flex items-center gap-2.5 border border-[oklch(32%_0.005_38)] px-5 py-3 text-sm font-medium text-[oklch(72%_0.005_38)] transition-colors duration-150 hover:border-[oklch(55%_0.17_38)] hover:text-[oklch(55%_0.17_38)]"
          >
            Begin from the start
            <ArrowRight
              size={14}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>
    </main>
  );
}
