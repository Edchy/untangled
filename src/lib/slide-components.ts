import type { ComponentType } from "react";

import { SwitchIllustration } from "@/components/interactive/switch-illustration";
import { LightSwitch } from "@/components/interactive/light-switch";
import { IcebergIllustration } from "@/components/interactive/iceberg-illustration";
import { AbstractionIllustration } from "@/components/interactive/abstraction-illustration";
import {
  AdaLovelaceIllustration,
  BinaryToEverythingIllustration,
  ChairIllustration,
  CharacterMappingIllustration,
  ComplexityDissolvesIllustration,
  ComputerStackIllustration,
  EniacIllustration,
  EverydayObjectsIllustration,
  HumanComputersIllustration,
  HumanStackIllustration,
  LayersIllustration,
  WhatJustHappenedIllustration,
} from "@/components/interactive/chapter-one-illustrations";
import { TransistorZoom } from "@/components/interactive/transistor-zoom";
import { BinarySwitches, BinarySwitches3 } from "@/components/interactive/binary-switches";
import { BinaryExplorer } from "@/components/interactive/binary-explorer";
import { PunchCardReader } from "@/components/interactive/punch-card-reader";
import { PunchCardIllustration } from "@/components/interactive/punch-card-illustration";

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
  "character-mapping-illustration": CharacterMappingIllustration,
  "transistor-zoom": TransistorZoom,
  "binary-switches": BinarySwitches,
  "binary-switches-3": BinarySwitches3,
  "binary-explorer": BinaryExplorer,
  "human-computers-illustration": HumanComputersIllustration,
  "ada-lovelace-illustration": AdaLovelaceIllustration,
  "punch-card-illustration": PunchCardReader,
  "punch-card-static": PunchCardIllustration,
  "eniac-illustration": EniacIllustration,
};
