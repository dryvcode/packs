#!/usr/bin/env bash
# Typecheck the generated app against the real next and react, then exercise the API calls and
# render the generated page with a mocked API.
set -euo pipefail
bun install --silent
bunx tsc -p tsconfig.json
bun test app.test.tsx
