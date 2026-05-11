import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Sources",
    items: [
      {
        title: "ELIZA: A Computer Program for the Study of Natural Language Communication Between Man and Machine",
        kind: "Paper",
        href: "https://dl.acm.org/doi/10.1145/365153.365168",
        author: "Joseph Weizenbaum",
        year: "1966",
        note: "The original ELIZA paper, useful for separating convincing conversation from understanding.",
      },
      {
        title: "Artificial Intelligence: A General Survey",
        kind: "Report",
        href: "https://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm",
        author: "James Lighthill",
        year: "1973",
        note: "The report associated with the first major collapse of UK AI funding.",
      },
    ],
  },
];
