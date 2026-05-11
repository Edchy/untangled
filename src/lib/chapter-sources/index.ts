import { sources as foundationSources } from "../../../content/01-the-machine/01-the-foundation/sources";
import { sources as logicSources } from "../../../content/01-the-machine/02-the-logic/sources";
import { sources as turingQuestionSources } from "../../../content/02-can-machines-think/01-the-question/sources";
import { sources as dartmouthSources } from "../../../content/02-can-machines-think/02-the-summer-everything-seemed-possible/sources";
import { sources as understandingSources } from "../../../content/02-can-machines-think/03-what-understanding-actually-is/sources";
import { sources as promiseCrashSources } from "../../../content/03-the-long-winter/01-the-promise-and-the-crash/sources";
import { sources as expertSystemsSources } from "../../../content/03-the-long-winter/02-the-expert-systems-era/sources";
import { sources as coldLessonsSources } from "../../../content/03-the-long-winter/03-what-the-cold-taught-us/sources";
import { type ChapterSourceGroup } from "./types";

export type { ChapterSource, ChapterSourceGroup, ChapterSourceKind } from "./types";

// Slide-specific citation URLs live in MDX frontmatter as `sources`.
// This chapter-level list is for broader further reading and useful extras.
const chapterSources: Record<string, ChapterSourceGroup[]> = {
  "01-the-machine/01-the-foundation": foundationSources,
  "01-the-machine/02-the-logic": logicSources,
  "02-can-machines-think/01-the-question": turingQuestionSources,
  "02-can-machines-think/02-the-summer-everything-seemed-possible": dartmouthSources,
  "02-can-machines-think/03-what-understanding-actually-is": understandingSources,
  "03-the-long-winter/01-the-promise-and-the-crash": promiseCrashSources,
  "03-the-long-winter/02-the-expert-systems-era": expertSystemsSources,
  "03-the-long-winter/03-what-the-cold-taught-us": coldLessonsSources,
};

export function getChapterSources(moduleSlug: string, conceptSlug: string) {
  return chapterSources[`${moduleSlug}/${conceptSlug}`] ?? [];
}
