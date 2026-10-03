#!/usr/bin/env bash
# Analyze the generated Dart client with strict casts and inference.
set -euo pipefail
if ! command -v dart >/dev/null; then
  echo "dart is not installed; skipping" >&2
  exit 0
fi
cd out
dart pub get >/dev/null
dart analyze
