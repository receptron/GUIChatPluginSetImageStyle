import type { ImageGenerationConfig } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

export const isImageGenerationConfig = (
  value: unknown,
): value is ImageGenerationConfig =>
  isRecord(value) &&
  typeof value["backend"] === "string" &&
  isOptionalString(value["styleModifier"]);
