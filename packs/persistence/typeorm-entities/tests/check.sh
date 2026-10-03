#!/usr/bin/env bash
# Typecheck the generated entities against the real typeorm, then check the metadata
# they register: tables, typed columns, checks, indexes and relations.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test entities.test.ts
