import type { ComponentType } from "react";

import { SwitchIllustration } from "@/components/interactive/switch-illustration";
import { LightSwitchScene } from "@/components/interactive/light-switch-scene";
import { OpeningLightSwitchCopy } from "@/components/interactive/opening-light-switch-copy";
import { IcebergIllustration } from "@/components/interactive/iceberg-illustration";
import { AbstractionIllustration } from "@/components/interactive/abstraction-illustration";
import {
  AdaLovelaceIllustration,
  BitsRainIllustration,
  BinaryToEverythingIllustration,
  ChairIllustration,
  CharacterMappingIllustration,
  ChefIllustration,
  ComplexityDissolvesIllustration,
  ComputerExplodedIllustration,
  ComputerStackIllustration,
  ConductorIllustration,
  CpuIllustration,
  DeskIllustration,
  EniacIllustration,
  EverydayObjectsIllustration,
  FilingCabinetIllustration,
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
import { GateDemoAND, GateDemoOR, GateDemoNOT } from "@/components/interactive/gate-demo";
import { AndGateExplorer } from "@/components/interactive/and-gate-explorer";
import { OrGateExplorer } from "@/components/interactive/or-gate-explorer";
import { NotGateExplorer } from "@/components/interactive/not-gate-explorer";
import { BridgeGateIllustration } from "@/components/interactive/bridge-gate-illustration";
import { HalfAdderDemo } from "@/components/interactive/half-adder-demo";
import { LogicSwitchSlide } from "@/components/interactive/logic-switch-slide";
import { SwitchCircuitExplorer } from "@/components/interactive/switch-circuit-explorer";
import { TransistorFieldIllustration } from "@/components/interactive/transistor-field-illustration";
import { GateChainDemo } from "@/components/interactive/gate-chain-demo";
import { GateBuilder } from "@/components/interactive/gate-builder";
import { GateFieldIllustration } from "@/components/interactive/gate-field-illustration";
import { ComparisonCircuitIllustration } from "@/components/interactive/comparison-circuit-illustration";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const slideComponents: Record<string, ComponentType<any>> = {
  "01-the-machine/01-what-is-a-computer/01-try-it": OpeningLightSwitchCopy,
  "01-the-machine/01-what-is-a-computer/13-instructions": InstructionsBody,
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
  "chef-illustration": ChefIllustration,
  "conductor-illustration": ConductorIllustration,
  "computer-exploded-illustration": ComputerExplodedIllustration,
  "cpu-illustration": CpuIllustration,
  "desk-illustration": DeskIllustration,
  "filing-cabinet-illustration": FilingCabinetIllustration,
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
  "and-gate-explorer": AndGateExplorer,
  "or-gate-explorer": OrGateExplorer,
  "not-gate-explorer": NotGateExplorer,
  "bridge-gate-illustration": BridgeGateIllustration,
  "gate-demo-and": GateDemoAND,
  "gate-demo-or": GateDemoOR,
  "gate-demo-not": GateDemoNOT,
  "half-adder-demo": HalfAdderDemo,
  "logic-switch-slide": LogicSwitchSlide,
  "switch-circuit-explorer": SwitchCircuitExplorer,
  "transistor-field-illustration": TransistorFieldIllustration,
  "gate-chain-demo": GateChainDemo,
  "gate-builder": GateBuilder,
  "gate-field-illustration": GateFieldIllustration,
  "comparison-circuit-illustration": ComparisonCircuitIllustration,
};
