import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slideComponents } from "@/lib/slide-components";

export type SlideType = "text" | "interactive" | "visual";

export type Slide = {
  title: string;
  module: string;
  concept: string;
  order: number;
  type: SlideType;
  moduleSlug: string;
  conceptSlug: string;
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
  { slug: "01-the-machine",           number: "01", title: "Chapter 1",  theme: "", accent: "#8E8E8E" },
  { slug: "02-can-machines-think",    number: "02", title: "Chapter 2",  theme: "", accent: "#9A7B6D" },
  { slug: "03-the-long-winter",       number: "03", title: "Chapter 3",  theme: "", accent: "#A57F68" },
  { slug: "04-learning-from-data",    number: "04", title: "Chapter 4",  theme: "", accent: "#B27A5F" },
  { slug: "05-going-deeper",          number: "05", title: "Chapter 5",  theme: "", accent: "#BE744F" },
  { slug: "06-the-meaning-of-words",  number: "06", title: "Chapter 6",  theme: "", accent: "#C66B45" },
  { slug: "07-paying-attention",      number: "07", title: "Chapter 7",  theme: "", accent: "#D06439" },
  { slug: "08-scale",                 number: "08", title: "Chapter 8",  theme: "", accent: "#D85A30" },
  { slug: "09-what-it-actually-does", number: "09", title: "Chapter 9",  theme: "", accent: "#D85A30" },
  { slug: "10-the-honest-questions",  number: "10", title: "Chapter 10", theme: "", accent: "#D85A30" },
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

function toSlide(filePath: string): Slide {
  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);
  const relative = path.relative(contentRoot, filePath);
  const [moduleSlug, conceptSlug, fileName] = relative.split(path.sep);
  const slideSlug = fileName.replace(/\.mdx$/, "");
  const key = `${moduleSlug}/${conceptSlug}/${slideSlug}`;

  return {
    title: String(data.title),
    module: String(data.module),
    concept: String(data.concept),
    order: Number(data.order),
    type: data.type as SlideType,
    moduleSlug,
    conceptSlug,
    slideSlug,
    key,
    href: `/learn/${moduleSlug}/${conceptSlug}/${slideSlug}`,
  };
}

export function getSlides(): Slide[] {
  return readMdxFiles(contentRoot)
    .map(toSlide)
    .filter((slide) => slide.key in slideComponents)
    .sort((a, b) => {
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

export function getAdjacentSlides(current: Slide) {
  const slides = getSlides();
  const index = slides.findIndex((slide) => slide.key === current.key);

  return {
    previous: index > 0 ? slides[index - 1] : undefined,
    next: index >= 0 && index < slides.length - 1 ? slides[index + 1] : undefined,
  };
}
