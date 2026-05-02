import type { ComponentType } from "react";

import { SwitchIllustration } from "@/components/interactive/switch-illustration";
import { LightSwitch } from "@/components/interactive/light-switch";
import { IcebergIllustration } from "@/components/interactive/iceberg-illustration";
import { AbstractionIllustration } from "@/components/interactive/abstraction-illustration";
import {
  AdaLovelaceIllustration,
  BinaryToEverythingIllustration,
  ChairIllustration,
  ComplexityDissolvesIllustration,
  ComputerStackIllustration,
  EniacIllustration,
  EverydayObjectsIllustration,
  HumanComputersIllustration,
  HumanStackIllustration,
  LayersIllustration,
  PunchCardIllustration,
  WhatJustHappenedIllustration,
} from "@/components/interactive/chapter-one-illustrations";
import { TransistorZoom } from "@/components/interactive/transistor-zoom";

export const slideComponents: Record<string, ComponentType> = {};

export const interactiveComponents: Record<string, ComponentType> = {
  "switch-illustration": SwitchIllustration,
  "light-switch": LightSwitch,
  "iceberg-illustration": IcebergIllustration,
  "abstraction-illustration": AbstractionIllustration,
  "what-just-happened-illustration": WhatJustHappenedIllustration,
  "everyday-objects-illustration": EverydayObjectsIllustration,
  "layers-illustration": LayersIllustration,
  "complexity-dissolves-illustration": ComplexityDissolvesIllustration,
  "human-stack-illustration": HumanStackIllustration,
  "computer-stack-illustration": ComputerStackIllustration,
  "chair-illustration": ChairIllustration,
  "binary-to-everything-illustration": BinaryToEverythingIllustration,
  "transistor-zoom": TransistorZoom,
  "human-computers-illustration": HumanComputersIllustration,
  "ada-lovelace-illustration": AdaLovelaceIllustration,
  "punch-card-illustration": PunchCardIllustration,
  "eniac-illustration": EniacIllustration,
};
