/**
 * SetImageStyle Tool Definition (Schema)
 */

import type { ToolDefinition } from "gui-chat-protocol";

export const TOOL_NAME = "setImageStyle";

export const TOOL_DEFINITION: ToolDefinition = {
  type: "function",
  name: TOOL_NAME,
  description:
    "Set the image style modifier that will be automatically applied to all future image generation requests. This allows you to establish a consistent visual style for all generated images.",
  parameters: {
    type: "object",
    properties: {
      styleModifier: {
        type: "string",
        description:
          "The style description to append to all image generation prompts (e.g., 'ghibli-style anime', 'oil painting', 'cyberpunk', 'watercolor', 'minimalist line art'). Use an empty string to clear the current style.",
      },
    },
    required: ["styleModifier"],
  },
};
