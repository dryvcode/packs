#!/usr/bin/env bash
# Typecheck the generated client, then exercise its calls against a mocked fetch.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test client.test.ts
