import type { ComponentType } from "react";

import { SwitchIllustration } from "@/components/interactive/switch-illustration";
import { LightSwitchScene } from "@/components/interactive/light-switch-scene";
import { IcebergIllustration } from "@/components/interactive/iceberg-illustration";
import { AbstractionIllustration } from "@/components/interactive/abstraction-illustration";
import {
  AdaLovelaceIllustration,
  BitsRainIllustration,
  BinaryToEverythingIllustration,
  ChairIllustration,
  CharacterMappingIllustration,
  ComplexityDissolvesIllustration,
  ComputerExplodedIllustration,
  ComputerStackIllustration,
  CpuIllustration,
  EniacIllustration,
  EverydayObjectsIllustration,
  GpuIllustration,
  HumanComputersIllustration,
  HumanStackIllustration,
  LayersIllustration,
  RamIllustration,
  StorageIllustration,
  TransistorScaleIllustration,
  WhatJustHappenedIllustration,
} from "@/components/interactive/chapter-one-illustrations";
import { TransistorZoom } from "@/components/interactive/transistor-zoom";
import { BinarySwitches, BinarySwitches3 } from "@/components/interactive/binary-switches";
import { BinaryExplorer } from "@/components/interactive/binary-explorer";
import { PunchCardReader } from "@/components/interactive/punch-card-reader";
import { PunchCardIllustration } from "@/components/interactive/punch-card-illustration";
import { InstructionsBody } from "@/components/interactive/instructions-body";
import { FreeFormQuestion } from "@/components/interactive/free-form-question";
import { QuestionResponse } from "@/components/interactive/question-response";
import { QuizGate } from "@/components/interactive/quiz-gate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const slideComponents: Record<string, ComponentType<any>> = {
  "01-the-machine/01-what-is-a-computer/11-instructions": InstructionsBody,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const interactiveComponents: Record<string, ComponentType<any>> = {
  "switch-illustration": SwitchIllustration,
  "light-switch": LightSwitchScene,
  "iceberg-illustration": IcebergIllustration,
  "abstraction-illustration": AbstractionIllustration,
  "what-just-happened-illustration": WhatJustHappenedIllustration,
  "everyday-objects-illustration": EverydayObjectsIllustration,
  "layers-illustration": LayersIllustration,
  "complexity-dissolves-illustration": ComplexityDissolvesIllustration,
  "human-stack-illustration": HumanStackIllustration,
  "computer-stack-illustration": ComputerStackIllustration,
  "computer-exploded-illustration": ComputerExplodedIllustration,
  "cpu-illustration": CpuIllustration,
  "gpu-illustration": GpuIllustration,
  "ram-illustration": RamIllustration,
  "storage-illustration": StorageIllustration,
  "bits-rain-illustration": BitsRainIllustration,
  "chair-illustration": ChairIllustration,
  "binary-to-everything-illustration": BinaryToEverythingIllustration,
  "character-mapping-illustration": CharacterMappingIllustration,
  "transistor-scale-illustration": TransistorScaleIllustration,
  "transistor-zoom": TransistorZoom,
  "binary-switches": BinarySwitches,
  "binary-switches-3": BinarySwitches3,
  "binary-explorer": BinaryExplorer,
  "human-computers-illustration": HumanComputersIllustration,
  "ada-lovelace-illustration": AdaLovelaceIllustration,
  "punch-card-illustration": PunchCardReader,
  "punch-card-static": PunchCardIllustration,
  "eniac-illustration": EniacIllustration,
  "free-form-question": FreeFormQuestion,
  "question-response": QuestionResponse,
  "quiz-gate": QuizGate,
};
