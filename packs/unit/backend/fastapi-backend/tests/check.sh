#!/usr/bin/env bash
# Run the fixture app (generated models and routers, handwritten services) and its tests.
set -euo pipefail
uv run --quiet pytest -q
