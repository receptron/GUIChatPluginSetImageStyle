# @gui-chat-plugin/set-image-style

[![npm version](https://badge.fury.io/js/%40gui-chat-plugin%2Fset-image-style.svg)](https://www.npmjs.com/package/@gui-chat-plugin/set-image-style)

A set-image-style plugin for [MulmoChat](https://github.com/receptron/MulmoChat).

## Overview

This plugin allows users to configure the image generation style (realistic, anime, cartoon, etc.) that will be used by the image generation plugin.

## Installation

```bash
yarn add @gui-chat-plugin/set-image-style
```

## Usage

### Vue Implementation (for MulmoChat)

```typescript
// In src/tools/index.ts
import SetImageStylePlugin from "@gui-chat-plugin/set-image-style/vue";

const pluginList = [
  // ... other plugins
  SetImageStylePlugin,
];

// In src/main.ts
import "@gui-chat-plugin/set-image-style/style.css";
```

### Core Only (Framework-agnostic)

```typescript
import { pluginCore, TOOL_NAME } from "@gui-chat-plugin/set-image-style";
```

## Package Exports

| Export | Description |
|--------|-------------|
| `@gui-chat-plugin/set-image-style` | Core (framework-agnostic) |
| `@gui-chat-plugin/set-image-style/vue` | Vue implementation |
| `@gui-chat-plugin/set-image-style/style.css` | Tailwind CSS styles |

## Test Prompts

1. "Set the image style to anime"
2. "Change the image generation style to realistic"
3. "I want cartoon-style images"
4. "Use photorealistic style for images"

## Development

```bash
yarn install
yarn dev        # Start dev server
yarn build      # Build
yarn typecheck  # Type check
yarn lint       # Lint
```

## License

MIT
