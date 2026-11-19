#!/usr/bin/env bash
# Typecheck every generated declaration, then exercise representative ones.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test types.test.ts
