import type { ReactNode } from "react";
import { Heading, Text } from "@/components/ui/typography";

type ChapterCoverSlideProps = {
  eyebrow: string;
  chapterLabel: string;
  title: string;
  prose?: ReactNode;
  outline?: ReactNode;
};

export function ChapterCoverSlide({
  eyebrow,
  chapterLabel,
  title,
  prose,
  outline,
}: ChapterCoverSlideProps) {
  return (
    <article className="flex min-h-[78svh] w-full max-w-5xl items-start justify-center rounded-surface border border-foreground/10 px-ds-8 py-ds-8">
      <div className="w-full text-center">
        <Text as="p" variant="caption" className="font-semibold uppercase tracking-[var(--ds-tracking-label)] text-foreground/28">
          {eyebrow}
        </Text>
        <div className="mt-ds-4">
          <p className="font-serif text-[clamp(4.5rem,14vw,10rem)] font-semibold leading-none text-foreground/12">
            {chapterLabel}
          </p>
          <Heading as="h1" variant="display" className="mx-auto mt-ds-6 max-w-[16ch] text-foreground/86">
            {title}
          </Heading>
        </div>
        {(prose || outline) ? (
          <div className="mx-auto mt-[100px] w-full max-w-4xl text-left">
            {outline ? (
              <p className="mb-ds-4 font-sans text-xs font-semibold uppercase tracking-[var(--ds-tracking-label)] text-foreground/28">
                In this chapter
              </p>
            ) : null}
            <div className="grid gap-x-ds-10 text-body md:grid-cols-2">
              <div className="[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_li]:font-serif [&_li]:leading-7 [&_.outline-item-label]:text-foreground/72 [&_.outline-item-label]:after:content-[':'] [&_.outline-item-label]:after:mr-1 [&_.outline-item-desc]:text-foreground/36">
                {outline}
              </div>
              <div className="mt-ds-8 font-serif leading-7 text-foreground/54 md:mt-0 [&>p+p]:mt-ds-4">
                {prose}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
