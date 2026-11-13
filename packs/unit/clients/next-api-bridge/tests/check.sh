#!/usr/bin/env bash
# Typecheck the generated actions against the real next and next-api-bridge, then exercise the
# actions, routes and form actions with the bridge's network client mocked.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test bridge.test.ts
