/**
 * SetImageStyle Plugin - Vue Implementation
 */

import "../style.css";

import type { ToolPlugin } from "gui-chat-protocol/vue";
import type {
  SetImageStyleArgs,
  SetImageStyleData,
  SetImageStyleJsonData,
} from "../core/types";
import { pluginCore } from "../core/plugin";
import Preview from "./Preview.vue";

export const plugin: ToolPlugin<
  SetImageStyleData,
  SetImageStyleJsonData,
  SetImageStyleArgs
> = {
  ...pluginCore,
  previewComponent: Preview,
  // No viewComponent - this plugin only has a preview
};

// Re-export types
export type {
  SetImageStyleArgs,
  SetImageStyleData,
  SetImageStyleJsonData,
  ImageGenerationConfig,
} from "../core/types";

// Re-export utilities
export {
  TOOL_NAME,
  TOOL_DEFINITION,
  executeSetImageStyle,
  pluginCore,
} from "../core/plugin";

export { Preview };

// Default export for MulmoChat compatibility
export default { plugin };
