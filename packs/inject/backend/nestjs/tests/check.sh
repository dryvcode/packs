#!/usr/bin/env bash
# Typecheck the NestJS controllers against the real framework and both bound validation
# packs (class-validator with TypeORM entities, and zod), boot them and send requests, then
# run every generated Vitest spec (DTO contracts, entity integrity, feature and app e2e).
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test server.test.ts
bunx vitest run --root out --config app/vitest.config.ts --reporter=dot
