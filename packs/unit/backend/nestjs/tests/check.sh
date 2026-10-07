#!/usr/bin/env bash
set -euo pipefail
cd app
bun install --silent
bunx tsc --noEmit -p tsconfig.json
bun test test/app.e2e-spec.ts
