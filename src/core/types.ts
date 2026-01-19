/**
 * SetImageStyle Plugin Types
 */

/** Arguments passed to the setImageStyle tool */
export interface SetImageStyleArgs {
  styleModifier: string;
}

/** Data stored in result.data (displayed in UI) */
export interface SetImageStyleData {
  styleModifier: string;
  previousStyleModifier: string;
}

/** JSON data returned in result.jsonData (sent to LLM) */
export interface SetImageStyleJsonData {
  success: boolean;
  styleModifier?: string;
  previousStyleModifier?: string;
  backend?: string;
  error?: string;
}

/** Configuration value for image generation backend (from app layer) */
export interface ImageGenerationConfig {
  backend: string;
  styleModifier?: string;
}
