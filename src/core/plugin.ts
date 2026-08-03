/**
 * SetImageStyle Plugin Core (Framework-agnostic)
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type {
  SetImageStyleArgs,
  SetImageStyleData,
  SetImageStyleJsonData,
  ImageGenerationConfig,
} from "./types";
import { isImageGenerationConfig } from "./hostResponse";
import { TOOL_DEFINITION } from "./definition";

// Re-export for convenience
export { TOOL_NAME, TOOL_DEFINITION } from "./definition";

/**
 * Execute the setImageStyle function
 * Updates the image generation config to include a style modifier
 */
// context is nullable on purpose: hosts that run the plugin without client-side
// state (MulmoClaude's server bridge) pass an empty or missing context, and
// reading through it unguarded threw a TypeError instead of returning a result.
export const executeSetImageStyle = async (
  context: ToolContext | null | undefined,
  args: SetImageStyleArgs,
): Promise<ToolResult<SetImageStyleData, SetImageStyleJsonData>> => {
  const { styleModifier } = args;

  const app = context?.app;

  if (typeof app?.["getImageConfig"] !== "function") {
    return {
      message: "getImageConfig function not available",
      jsonData: {
        success: false,
        error: "getImageConfig function not available",
      },
    };
  }

  try {
    const config = app["getImageConfig"]();

    if (!isImageGenerationConfig(config)) {
      return {
        message: "getImageConfig returned an unrecognized config",
        jsonData: {
          success: false,
          error: "getImageConfig returned an unrecognized config",
        },
      };
    }

    const previousStyleModifier = config.styleModifier || "";

    // Update the config with new style modifier
    const newConfig: ImageGenerationConfig = {
      ...config,
      styleModifier: styleModifier.trim(),
    };

    // Update config via setConfig
    app.setConfig?.("imageGenerationBackend", newConfig);

    const isClearing = styleModifier.trim() === "";
    const message = isClearing
      ? "Image style cleared"
      : `Image style set to: ${styleModifier.trim()}`;

    const instructions = isClearing
      ? "Acknowledge that the image style has been cleared. All future images will be generated without a consistent style modifier."
      : `Acknowledge that all future images will now be generated with the style: "${styleModifier.trim()}". This style will be automatically applied to every image generation request until changed.`;

    return {
      message,
      data: {
        styleModifier: styleModifier.trim(),
        previousStyleModifier,
      },
      jsonData: {
        success: true,
        styleModifier: styleModifier.trim(),
        previousStyleModifier,
        backend: config.backend,
      },
      instructions,
      instructionsRequired: true,
    };
  } catch (error) {
    console.error("ERR: exception in setImageStyle", error);
    return {
      message: `Failed to set image style: ${error instanceof Error ? error.message : "Unknown error"}`,
      jsonData: {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      instructions:
        "Acknowledge that there was an error setting the image style and ask the user to try again.",
    };
  }
};

// Core Plugin (without UI components)
export const pluginCore: ToolPluginCore<
  SetImageStyleData,
  SetImageStyleJsonData,
  SetImageStyleArgs
> = {
  toolDefinition: TOOL_DEFINITION,
  execute: executeSetImageStyle,
  generatingMessage: "Setting image style...",
  isEnabled: () => true,
  backends: ["imageGen"],
};
