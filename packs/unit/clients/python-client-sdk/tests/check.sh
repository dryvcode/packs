#!/usr/bin/env bash
set -euo pipefail
uv run --project sdk --with ./sdk python test_sdk.py
