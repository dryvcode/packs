#!/usr/bin/env bash
# Typecheck the NestJS controllers against the real framework and both bound validation
# packs (class-validator with TypeORM entities, and zod), then boot them and send requests.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test server.test.ts
