import type { ReactNode } from "react";
import { VoiceoverButton } from "./voiceover-button";

type ChapterCoverSlideProps = {
  eyebrow: string;
  moduleNumber?: string;
  chapterLabel: string;
  title: string;
  prose?: ReactNode;
  outline?: ReactNode;
  voiceoverSrc?: string;
};

export function ChapterCoverSlide({
  eyebrow,
  moduleNumber,
  chapterLabel,
  title,
  prose,
  outline,
  voiceoverSrc,
}: ChapterCoverSlideProps) {
  return (
    <article className="flex min-h-[78svh] w-full max-w-6xl items-center px-ds-6 py-ds-16 md:px-ds-8">
      <div className="grid w-full gap-x-ds-10 gap-y-ds-10 py-ds-8 md:grid-cols-[1fr_2fr] lg:gap-x-ds-16 lg:py-ds-10">
        <section>
          <p className="font-sans text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-foreground/34">
            {moduleNumber ? `Module ${moduleNumber}` : "Module"}
          </p>
          <h2 className="max-w-[13ch] font-serif text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1] text-foreground/66 [text-wrap:balance]">
            {eyebrow}
          </h2>
        </section>

        <section>
          <p className="font-sans text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent">
            {chapterLabel}
          </p>
          <h1 className="max-w-[14ch] font-serif text-[clamp(3rem,6.8vw,6rem)] font-semibold leading-[0.94] text-foreground/90 [text-wrap:balance]">
            {title}
          </h1>
        </section>

        {outline ? (
          <aside>
            <p className="mb-ds-4 font-sans text-xs font-semibold uppercase tracking-[var(--ds-tracking-label)] text-foreground/28">
              In this chapter
            </p>
            <div className="[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_li]:font-serif [&_li]:leading-7 [&_.outline-item-label]:text-foreground/72 [&_.outline-item-label]:after:mr-1 [&_.outline-item-label]:after:content-[':'] [&_.outline-item-desc]:text-foreground/36">
              {outline}
            </div>
          </aside>
        ) : null}

        {(prose || voiceoverSrc) ? (
          <section>
            {voiceoverSrc ? <VoiceoverButton src={voiceoverSrc} /> : null}
            {prose ? (
              <div className="font-body leading-7 text-foreground/54 [&>p+p]:mt-ds-4 [&_p]:max-w-[60ch] [&_p]:font-body [&_p]:leading-7 [&_p]:text-foreground/54 [&_p]:[text-wrap:pretty]">
                {prose}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </article>
  );
}
