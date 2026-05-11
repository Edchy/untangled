import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Sources",
    items: [
      {
        title: "Perceptrons",
        kind: "Book",
        href: "https://mitpress.mit.edu/9780262631112/perceptrons/",
        author: "Marvin Minsky and Seymour Papert",
        note: "A key text in the story of connectionism's setbacks and later return.",
      },
      {
        title: "Parallel Distributed Processing",
        kind: "Book",
        href: "https://mitpress.mit.edu/9780262680530/parallel-distributed-processing/",
        author: "David E. Rumelhart, James L. McClelland, and the PDP Research Group",
        note: "One of the works that helped revive neural-network thinking after the symbolic era.",
      },
    ],
  },
];
