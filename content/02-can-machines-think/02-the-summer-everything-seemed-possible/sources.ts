import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Sources",
    items: [
      {
        title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
        kind: "Archive",
        href: "http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf",
        author: "John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon",
        year: "1955",
        note: "The founding proposal that named artificial intelligence as a research field.",
      },
      {
        title: "The Logic Theory Machine",
        kind: "Paper",
        href: "https://www.rand.org/pubs/papers/P868.html",
        author: "Allen Newell and Herbert A. Simon",
        year: "1956",
        note: "A primary source around one of the early programs that made symbolic AI feel possible.",
      },
    ],
  },
  {
    title: "Further reading",
    items: [
      {
        title: "The Quest for Artificial Intelligence",
        kind: "Book",
        href: "https://www.cambridge.org/core/product/identifier/9780511819346/type/book",
        author: "Nils J. Nilsson",
        note: "A readable history of early AI from someone inside the field.",
      },
    ],
  },
];
