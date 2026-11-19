#!/usr/bin/env bash
# Typecheck the generated entities against the real typeorm, check the metadata they register,
# then run the generated integrity spec (schema sync into pg-mem plus contract mapping checks).
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test entities.test.ts
bunx vitest run out --reporter=dot
