import { type ChapterSourceGroup } from "@/lib/chapter-sources/types";

export const sources: ChapterSourceGroup[] = [
  {
    title: "Sources",
    items: [
      {
        title: "Computing Machinery and Intelligence",
        kind: "Paper",
        href: "https://academic.oup.com/mind/article/LIX/236/433/986238",
        author: "Alan M. Turing",
        year: "1950",
        note: "The paper that introduces the imitation game and reframes the question of machine thought.",
      },
      {
        title: "Alan Turing: The Enigma",
        kind: "Book",
        href: "https://www.turing.org.uk/book/",
        author: "Andrew Hodges",
        note: "Biographical context for Turing's life, work, prosecution, and legacy.",
      },
      {
        title: "The Imitation Game",
        kind: "Video",
        href: "https://www.imdb.com/title/tt2084970/",
        author: "Morten Tyldum",
        year: "2014",
        note: "Dramatisation of Turing's life and wartime codebreaking work at Bletchley Park.",
      },
    ],
  },
];
