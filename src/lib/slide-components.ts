import type { ComponentType } from "react";

import { SwitchIllustration } from "@/components/interactive/switch-illustration";
import { LightSwitch } from "@/components/interactive/light-switch";
import { IcebergIllustration } from "@/components/interactive/iceberg-illustration";
import { AbstractionIllustration } from "@/components/interactive/abstraction-illustration";

export const slideComponents: Record<string, ComponentType> = {};

export const interactiveComponents: Record<string, ComponentType> = {
  "switch-illustration": SwitchIllustration,
  "light-switch": LightSwitch,
  "iceberg-illustration": IcebergIllustration,
  "abstraction-illustration": AbstractionIllustration,
};
