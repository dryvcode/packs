#!/usr/bin/env bash
# Typecheck the generated zod schemas, then parse real samples.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test schemas.test.ts
