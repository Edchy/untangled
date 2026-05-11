import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Sources",
    items: [
      {
        title: "Minds, Brains, and Programs",
        kind: "Paper",
        href: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/minds-brains-and-programs/DC644B47A4299C637C89772FACC2706A",
        author: "John R. Searle",
        year: "1980",
        note: "The original Chinese room argument, central to the chapter's understanding question.",
      },
      {
        title: "The Society of Mind",
        kind: "Book",
        href: "https://www.simonandschuster.com/books/The-Society-of-Mind/Marvin-Minsky/9780671657130",
        author: "Marvin Minsky",
        note: "A contrasting view of mind as many small processes working together.",
      },
    ],
  },
];
