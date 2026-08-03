/**
 * `context.app.getImageConfig` returns `unknown` since gui-chat-protocol
 * 2.0.0, so the plugin narrows it here instead of trusting the host's shape.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { isImageGenerationConfig } from "../src/core/hostResponse.js";

describe("isImageGenerationConfig", () => {
  test("accepts a config naming a backend", () => {
    assert.equal(isImageGenerationConfig({ backend: "gemini" }), true);
  });

  test("accepts a config that already carries a style modifier", () => {
    assert.equal(
      isImageGenerationConfig({ backend: "gemini", styleModifier: "watercolor" }),
      true,
    );
  });

  test("rejects a config without a backend", () => {
    assert.equal(isImageGenerationConfig({ styleModifier: "watercolor" }), false);
  });

  test("rejects a style modifier that is not a string", () => {
    assert.equal(
      isImageGenerationConfig({ backend: "gemini", styleModifier: 42 }),
      false,
    );
  });

  test("rejects values that are not a config object", () => {
    [null, undefined, "ok", 7].forEach((value) => {
      assert.equal(
        isImageGenerationConfig(value),
        false,
        `should reject ${JSON.stringify(value)}`,
      );
    });
  });
});
