import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slideComponents, interactiveComponents } from "@/lib/slide-components";

export type SlideType = "text" | "interactive" | "visual";

export type Slide = {
  title: string;
  module: string;
  concept: string;
  order: number;
  type: SlideType;
  cols: 1 | 2;
  hideTitle: boolean;
  hideNavNext: boolean;
  flipCols: boolean;
  component: string | null;
  questionId: string | null;
  skipHref: string | null;
  backHref: string | null;
  redirectHref: string | null;
  plainText: string;
  html: string;
  moduleSlug: string;
  conceptSlug: string;
  subConceptSlug: string | null;
  slideSlug: string;
  href: string;
  key: string;
};

export type Module = {
  slug: string;
  number: string;
  title: string;
  theme: string;
  accent: string;
  slides: Slide[];
};

export const modules: Omit<Module, "slides">[] = [
  { slug: "01-the-machine",           number: "01", title: "01: The Machine",              theme: "What a computer actually is. Binary, logic, the first mechanical calculators.", accent: "#8E8E8E" },
  { slug: "02-can-machines-think",    number: "02", title: "02: Can Machines Think?",      theme: "Turing's question, the 1956 Dartmouth workshop, the birth of the word \"AI\".", accent: "#9A7B6D" },
  { slug: "03-the-long-winter",       number: "03", title: "03: The Long Winter",          theme: "When AI failed. The AI winters, what went wrong, and why.", accent: "#A57F68" },
  { slug: "04-learning-from-data",    number: "04", title: "04: Learning from Data",       theme: "Neural networks, backpropagation, the shift from rules to patterns.", accent: "#B27A5F" },
  { slug: "05-going-deeper",          number: "05", title: "05: Going Deeper",             theme: "Deep learning, GPUs, ImageNet 2012, the moment everything changed.", accent: "#BE744F" },
  { slug: "06-the-meaning-of-words",  number: "06", title: "06: The Meaning of Words",     theme: "How computers deal with language. Word embeddings, tokens, the problem of meaning.", accent: "#C66B45" },
  { slug: "07-paying-attention",      number: "07", title: "07: Paying Attention",         theme: "The transformer. \"Attention Is All You Need\" (2017). Why it changed everything.", accent: "#D06439" },
  { slug: "08-scale",                 number: "08", title: "08: Scale",                    theme: "What happens when you make a model very, very large. Emergent behavior.", accent: "#D85A30" },
  { slug: "09-what-it-actually-does", number: "09", title: "09: What It Actually Does",    theme: "How an LLM generates a response. Tokens, probabilities, the live tokenizer.", accent: "#D85A30" },
  { slug: "10-the-honest-questions",  number: "10", title: "10: The Honest Questions",     theme: "What AI can and can't do. Hallucinations, bias, what to actually worry about.", accent: "#D85A30" },
];

const contentRoot = path.join(process.cwd(), "content");

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return readMdxFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".mdx") ? [fullPath] : [];
    })
    .sort();
}

function extractPlainText(mdxBody: string): string {
  return mdxBody
    .replace(/^import\s.+$/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toHtml(mdxBody: string): string {
  return mdxBody
    .replace(/^import\s.+$/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .trim()
    .split(/\n\n+/)
    .filter(Boolean)
    .map((para) => {
      const lines = para.split("\n");
      const isBlockquote = lines.every((line) => line.trim().startsWith(">"));

      if (isBlockquote) {
        const quoteLines = lines.map((line) => line.replace(/^>\s?/, "").trim());
        const body = quoteLines.slice(0, -1).join(" ");
        const citation = quoteLines.at(-1);

        return [
          '<blockquote class="max-w-3xl py-8 font-serif text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] text-foreground [text-wrap:balance]">',
          `<p>${renderInlineMarkdown(body)}</p>`,
          citation
            ? `<p class="mt-6 font-sans text-xs font-semibold uppercase leading-6 tracking-[0.18em] text-accent">${renderInlineMarkdown(citation)}</p>`
            : "",
          "</blockquote>",
        ].join("");
      }

      if (lines.length === 1 && lines[0].startsWith("?? ")) {
        const answer = renderInlineMarkdown(lines[0].slice(3).trim());
        return `<reveal-answer data-answer="${answer.replace(/"/g, "&quot;")}"></reveal-answer>`;
      }

      if (/^[01]{8}(?:\s+[01]{8})+$/.test(para.trim())) {
        const bytes = para.trim().split(/\s+/);
        return [
          '<p class="mt-prose-block max-w-[60ch] font-mono text-body font-semibold leading-[var(--ds-leading-body)] text-foreground/36 [font-variant-numeric:tabular-nums] first:mt-0">',
          bytes
            .map(
              (byte, byteIndex) =>
                `<span data-punch-card-byte="${byteIndex}" class="inline-block rounded-[4px] px-1 text-foreground/36 transition-[background-color,color,opacity] duration-200">${byte
                  .split("")
                  .map(
                    (bit, bitIndex) =>
                      `<span data-punch-card-bit="${bitIndex}" class="rounded-[3px] transition-[background-color,color,opacity] duration-150">${bit}</span>`,
                  )
                  .join("")}</span>`,
            )
            .join(" "),
          "</p>",
        ].join("");
      }

      const escaped = para.split("\n").map(renderInlineMarkdown).join("<br>");
      return `<p class="mt-prose-block max-w-[60ch] text-body leading-[var(--ds-leading-body)] text-foreground/68 [text-wrap:pretty] first:mt-0">${escaped}</p>`;
    })
    .join("\n");
}

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong class=\"font-semibold text-foreground/90\">$1</strong>")
    .replace(/__([^_]+)__/g, "<strong class=\"font-semibold text-foreground/90\">$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function toSlide(filePath: string): Slide {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const relative = path.relative(contentRoot, filePath);
  const segments = relative.split(path.sep);
  const [moduleSlug, conceptSlug] = segments;
  const fileName = segments.at(-1);

  if (!moduleSlug || !conceptSlug || !fileName) {
    throw new Error(`Invalid content path: ${relative}`);
  }

  const subConceptSlug = segments.length === 4 ? segments[2] : null;
  const slideSlug = fileName.replace(/\.mdx$/, "");
  const key = `${moduleSlug}/${conceptSlug}/${slideSlug}`;

  return {
    title: String(data.title),
    module: String(data.module),
    concept: String(data.concept),
    order: Number(data.order),
    type: data.type as SlideType,
    cols: data.cols === 1 ? 1 : 2,
    hideTitle: Boolean(data.hide_title),
    hideNavNext: Boolean(data.hide_nav),
    flipCols: Boolean(data.flip_cols),
    component: data.component ? String(data.component) : null,
    questionId: data.question_id ? String(data.question_id) : null,
    skipHref: data.skip_href ? String(data.skip_href) : null,
    backHref: data.back_href ? String(data.back_href) : null,
    redirectHref: data.redirect_href ? String(data.redirect_href) : null,
    plainText: extractPlainText(content),
    html: toHtml(content),
    moduleSlug,
    conceptSlug,
    subConceptSlug,
    slideSlug,
    key,
    href: `/${moduleSlug}/${conceptSlug}/${slideSlug}`,
  };
}

export function getSlides(): Slide[] {
  const seen = new Map<string, string>();
  const slides = readMdxFiles(contentRoot).map((filePath) => {
    const slide = toSlide(filePath);
    const previousPath = seen.get(slide.key);

    if (previousPath) {
      throw new Error(
        `Duplicate slide route "${slide.key}" found in ${previousPath} and ${filePath}`,
      );
    }

    seen.set(slide.key, filePath);
    return slide;
  });

  return slides.sort((a, b) => {
    if (a.moduleSlug !== b.moduleSlug) {
      return a.moduleSlug.localeCompare(b.moduleSlug);
    }
    if (a.conceptSlug !== b.conceptSlug) {
      return a.conceptSlug.localeCompare(b.conceptSlug);
    }
    return a.order - b.order;
  });
}

export function getModuleList(): Module[] {
  const slides = getSlides();

  return modules.map((module) => ({
    ...module,
    slides: slides.filter((slide) => slide.moduleSlug === module.slug),
  }));
}

export function getSlide(moduleSlug: string, conceptSlug: string, slideSlug: string) {
  return getSlides().find(
    (slide) =>
      slide.moduleSlug === moduleSlug &&
      slide.conceptSlug === conceptSlug &&
      slide.slideSlug === slideSlug,
  );
}

export function getSlideComponent(key: string) {
  return slideComponents[key];
}

export function getInteractiveComponent(componentKey: string) {
  return interactiveComponents[componentKey];
}

export function getAdjacentSlides(current: Slide) {
  const slides = getSlides();
  const index = slides.findIndex((slide) => slide.key === current.key);

  return {
    previous: index > 0 ? slides[index - 1] : undefined,
    next: index >= 0 && index < slides.length - 1 ? slides[index + 1] : undefined,
  };
}
