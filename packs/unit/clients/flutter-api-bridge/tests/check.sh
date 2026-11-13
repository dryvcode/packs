#!/usr/bin/env bash
# Resolve the generated package against flutter_api_bridge, generate the json_serializable code,
# analyze it, and run unit tests over models, endpoints and the facade.
set -euo pipefail
if ! command -v flutter >/dev/null; then
  echo "flutter is not installed; skipping" >&2
  exit 0
fi
cp pubspec_overrides.yaml out/
cp -r test out/
cd out
flutter pub get >/dev/null
dart run build_runner build --delete-conflicting-outputs >/dev/null
flutter analyze --no-fatal-infos
flutter test
