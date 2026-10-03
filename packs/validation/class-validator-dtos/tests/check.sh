#!/usr/bin/env bash
# Typecheck the generated DTOs against class-validator, then validate real samples.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test dtos.test.ts
