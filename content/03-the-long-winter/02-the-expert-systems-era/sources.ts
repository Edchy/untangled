import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Sources",
    items: [
      {
        title: "Rule-Based Expert Systems: The MYCIN Experiments of the Stanford Heuristic Programming Project",
        kind: "Book",
        href: "https://shortliffe.net/Buchanan-Shortliffe-1984/MYCIN%20Book.htm",
        author: "Bruce G. Buchanan and Edward H. Shortliffe",
        note: "A detailed account of MYCIN and the expert-systems approach.",
      },
      {
        title: "The Fifth Generation: Artificial Intelligence and Japan's Computer Challenge to the World",
        kind: "Book",
        href: "https://openlibrary.org/works/OL2998833W/The_Fifth_Generation",
        author: "Edward A. Feigenbaum and Pamela McCorduck",
        note: "Context for the optimism and pressure around expert systems and dedicated AI hardware.",
      },
    ],
  },
];
