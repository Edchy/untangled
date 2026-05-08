import { existsSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import { createElement } from "react";
import { BookSidebar } from "@/components/ui/book-sidebar";
import { ChapterCoverSlide } from "@/components/ui/chapter-cover-slide";
import { Heading } from "@/components/ui/typography";
import { RevealAnswer } from "@/components/ui/reveal-answer";
import { SlideColumns, SlideShell } from "@/components/ui/slide-shell";
import { SlideTransition } from "@/components/ui/slide-transition";
import { DevToolbar } from "@/components/ui/dev-toolbar";
import { SlideProgressMarker } from "@/components/ui/slide-progress-marker";
import {
  getAdjacentSlides,
  getInteractiveComponent,
  getModuleList,
  getSlide,
  getSlideComponent,
  getSlides,
} from "@/lib/content";

const REVEAL_RE = /<reveal-answer data-answer="([^"]*)"><\/reveal-answer>/g;
const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function renderHtml(html: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  REVEAL_RE.lastIndex = 0;
  while ((match = REVEAL_RE.exec(html)) !== null) {
    if (match.index > last) {
      parts.push(<section key={i++} dangerouslySetInnerHTML={{ __html: html.slice(last, match.index) }} />);
    }
    parts.push(<RevealAnswer key={i++} answer={match[1].replace(/&quot;/g, '"')} />);
    last = match.index + match[0].length;
  }
  if (last < html.length) {
    parts.push(<section key={i++} dangerouslySetInnerHTML={{ __html: html.slice(last) }} />);
  }
  return <>{parts}</>;
}

type SlidePageProps = {
  params: Promise<{
    module: string;
    concept: string;
    slide: string;
  }>;
};

export function generateStaticParams() {
  return getSlides().map((slide) => ({
    module: slide.moduleSlug,
    concept: slide.conceptSlug,
    slide: slide.slideSlug,
  }));
}

export async function generateMetadata({ params }: SlidePageProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);
  return {
    title: current ? `${current.title} | Untangled` : "Untangled",
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);

  if (!current) notFound();

  const SlideContent = getSlideComponent(current.key);

  const modules = getModuleList();
  const moduleInfo = modules.find((item) => item.slug === current.moduleSlug);
  const InteractiveContent = current.component
    ? getInteractiveComponent(current.component)
    : null;
  const { next } = getAdjacentSlides(current);
  const renderedSlideContent = SlideContent
    ? createElement(SlideContent)
    : renderHtml(current.html);
  const textColumnClassName = "relative z-10 max-w-prose mx-auto lg:mx-0";

  const interactiveProps: Record<string, unknown> = {};
  if (current.componentVariant) interactiveProps.variant = current.componentVariant;
  if (current.questionId) interactiveProps.questionId = current.questionId;
  if (current.component === "chapter-sources") {
    interactiveProps.moduleSlug = current.moduleSlug;
    interactiveProps.conceptSlug = current.conceptSlug;
  }
  if (next) interactiveProps.nextHref = next.href;
  if (current.component === "free-form-question") interactiveProps.bodyHtml = current.html;
  if (current.isLastQuestion) interactiveProps.isLastQuestion = true;
  if (current.skipHref) interactiveProps.skipHref = current.skipHref;
  if (current.redirectHref) interactiveProps.redirectHref = current.redirectHref;

  if (current.type === "cover") {
    const chapterNumber = Number(current.conceptSlug.match(/^\d+/)?.[0] ?? 0);
    const moduleTitle = moduleInfo?.title.replace(/^\d+:\s*/, "") ?? current.module;
    const eyebrow = moduleTitle;
    const chapterLabel = chapterNumber > 0
      ? `Chapter ${ROMAN_NUMERALS[chapterNumber] ?? chapterNumber}`
      : "Chapter";

    const ulMatch = current.html.match(/<ul[\s\S]*?<\/ul>/);
    const ulHtml = ulMatch ? ulMatch[0] : null;
    const proseHtml = current.html.replace(/<ul[\s\S]*?<\/ul>/, "").trim();

    const coverProse = proseHtml
      ? <div dangerouslySetInnerHTML={{ __html: proseHtml }} />
      : null;
    const coverOutline = ulHtml
      ? <div dangerouslySetInnerHTML={{ __html: ulHtml }} />
      : null;

    const audioSlug = current.conceptSlug.replace(/^\d+-/, "");
    const audioFile = join(process.cwd(), "public", "audio", `${audioSlug}.mp3`);
    const voiceoverSrc = existsSync(audioFile) ? `/audio/${audioSlug}.mp3` : undefined;

    return (
      <SlideShell>
        <BookSidebar modules={modules} currentSlideKey={current.key} />
        <SlideTransition>
          <ChapterCoverSlide
            eyebrow={eyebrow}
            moduleNumber={ROMAN_NUMERALS[Number(moduleInfo?.number ?? 0)] ?? moduleInfo?.number}
            chapterLabel={chapterLabel}
            title={current.title}
            prose={coverProse}
            outline={coverOutline}
            voiceoverSrc={voiceoverSrc}
          />
        </SlideTransition>
        <SlideProgressMarker slideKey={current.key} />
        <DevToolbar conceptSlug={concept} />
      </SlideShell>
    );
  }

  const slideBody = current.cols === 1 ? (
    <div className={`flex w-full flex-col items-center ${InteractiveContent ? "max-w-5xl" : "max-w-2xl"}`}>
      {InteractiveContent ? (
        createElement(InteractiveContent, interactiveProps)
      ) : (
        <div className={textColumnClassName}>
          {!current.hideTitle && (
            <Heading as="h1" variant="headline" className="mb-heading-after">
              {current.title}
            </Heading>
          )}
          {renderedSlideContent}
        </div>
      )}
    </div>
  ) : (
    <SlideColumns>
      {current.flipCols ? (
        <>
          <div className={textColumnClassName}>
            {!current.hideTitle && (
              <Heading as="h1" variant="headline" className="mb-heading-after">
                {current.title}
              </Heading>
            )}
            {renderedSlideContent}
          </div>
          <div className="flex items-center justify-center">
            {InteractiveContent && createElement(InteractiveContent, interactiveProps)}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            {InteractiveContent && createElement(InteractiveContent, interactiveProps)}
          </div>
          <div className={textColumnClassName}>
            {!current.hideTitle && (
              <Heading as="h1" variant="headline" className="mb-heading-after">
                {current.title}
              </Heading>
            )}
            {renderedSlideContent}
          </div>
        </>
      )}
    </SlideColumns>
  );

  return (
    <SlideShell>
      <BookSidebar modules={modules} currentSlideKey={current.key} />
      <SlideTransition>{slideBody}</SlideTransition>
      <SlideProgressMarker slideKey={current.key} />
      <DevToolbar conceptSlug={concept} />
    </SlideShell>
  );
}
