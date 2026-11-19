#!/usr/bin/env bash
# Typecheck the generated DTOs against class-validator, validate real samples, then run the
# generated contract specs (each DTO accepts its example and rejects every violation).
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test dtos.test.ts
bunx vitest run out --reporter=dot
