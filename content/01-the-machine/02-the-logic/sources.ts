import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Further reading",
    items: [
      {
        title: "Code: The Hidden Language of Computer Hardware and Software",
        kind: "Book",
        href: "https://www.microsoftpressstore.com/store/code-the-hidden-language-of-computer-hardware-and-software-9780137909100",
        author: "Charles Petzold",
        note: "A friendly, concrete path from simple signals to real computers.",
      },
      {
        title: "Nand2Tetris",
        kind: "Video",
        href: "https://www.nand2tetris.org/",
        author: "Noam Nisan and Shimon Schocken",
        note: "For readers who want to build the logic stack themselves, step by step.",
      },
    ],
  },
];
