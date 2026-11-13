#!/usr/bin/env bash
# Install the generated Expo app (with the generated client as a file dependency) and typecheck it.
set -euo pipefail
cd out/app
bun install --silent
bunx tsc --noEmit -p tsconfig.json
