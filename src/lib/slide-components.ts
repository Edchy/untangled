import type { ComponentType } from "react";
import BinarySlide from "../../content/01-the-machine/01-what-is-a-computer/01-binary.mdx";
import ComputerSlide from "../../content/01-the-machine/01-what-is-a-computer/01-the-problem.mdx";
import PunchCardsSlide from "../../content/01-the-machine/01-what-is-a-computer/02-punch-cards.mdx";
import GatesSlide from "../../content/01-the-machine/02-logic-and-circuits/01-gates.mdx";
import DemoLogicSlide from "../../content/01-the-machine/02-logic-and-circuits/02-demo-logic.mdx";

export const slideComponents: Record<string, ComponentType> = {
  "01-the-machine/01-what-is-a-computer/01-the-problem": ComputerSlide,
  "01-the-machine/01-what-is-a-computer/02-punch-cards": PunchCardsSlide,
  "01-the-machine/01-what-is-a-computer/01-binary": BinarySlide,
  "01-the-machine/02-logic-and-circuits/01-gates": GatesSlide,
  "01-the-machine/02-logic-and-circuits/02-demo-logic": DemoLogicSlide,
};
