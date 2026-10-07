#!/usr/bin/env bash
# Typecheck the generated Joi schemas, then validate real samples.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test joi.test.ts
