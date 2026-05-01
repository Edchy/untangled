import Link from "next/link";
import { getSlides } from "@/lib/content";

export default function Home() {
  const firstSlide = getSlides()[0];

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-8 py-16 text-center sm:px-16">
      <p className="text-xs font-medium tracking-[0.12em] text-foreground/40 uppercase">
        Untangled
      </p>

      <p className="mt-8 max-w-sm text-base leading-7 text-foreground/70">
        A free path through the history of AI. Where it came from, how it works,
        and what to actually make of it.
      </p>

      {firstSlide && (
        <Link
          href={firstSlide.href}
          className="mt-10 inline-flex h-10 items-center rounded-[8px] bg-accent px-5 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Start reading
        </Link>
      )}
    </main>
  );
}
