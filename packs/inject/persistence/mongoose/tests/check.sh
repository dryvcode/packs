#!/usr/bin/env bash
# Typecheck the generated models against the real @nestjs/mongoose and mongoose, then check
# the schemas they build: collections, typed paths, validation, references, indexes, invariants.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test models.test.ts
