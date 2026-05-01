import type { ComponentType } from "react";

import TheProblem      from "../../content/01-the-machine/01-what-is-a-computer/01-the-problem.mdx";
import Instructions    from "../../content/01-the-machine/01-what-is-a-computer/02-instructions.mdx";
import Binary          from "../../content/01-the-machine/01-what-is-a-computer/03-binary.mdx";
import Anything        from "../../content/01-the-machine/01-what-is-a-computer/04-anything.mdx";
import TinySwitches    from "../../content/01-the-machine/01-what-is-a-computer/05-tiny-switches.mdx";
import Compute         from "../../content/01-the-machine/01-what-is-a-computer/06-compute.mdx";
import FastCalculation from "../../content/01-the-machine/01-what-is-a-computer/07-fast-calculation.mdx";

import { SwitchIllustration } from "@/components/interactive/switch-illustration";
import { LightSwitch } from "@/components/interactive/light-switch";

export const slideComponents: Record<string, ComponentType> = {
  "01-the-machine/01-what-is-a-computer/01-the-problem":      TheProblem,
  "01-the-machine/01-what-is-a-computer/02-instructions":     Instructions,
  "01-the-machine/01-what-is-a-computer/03-binary":           Binary,
  "01-the-machine/01-what-is-a-computer/04-anything":         Anything,
  "01-the-machine/01-what-is-a-computer/05-tiny-switches":    TinySwitches,
  "01-the-machine/01-what-is-a-computer/06-compute":          Compute,
  "01-the-machine/01-what-is-a-computer/07-fast-calculation": FastCalculation,
};

export const interactiveComponents: Record<string, ComponentType> = {
  "switch-illustration": SwitchIllustration,
  "light-switch": LightSwitch,
};
