#!/usr/bin/env bash
# Generate the API package and the app bound to it, then resolve, analyze and test the app.
set -euo pipefail
if ! command -v flutter >/dev/null; then
  echo "flutter is not installed; skipping" >&2
  exit 0
fi
cp pubspec_overrides.yaml out/api/
cp pubspec_overrides.yaml out/app/
cp -r test out/app/
(cd out/api && flutter pub get >/dev/null && dart run build_runner build --delete-conflicting-outputs >/dev/null)
cd out/app
flutter pub get >/dev/null
flutter analyze --no-fatal-infos
flutter test
