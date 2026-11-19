#!/usr/bin/env bash
set -euo pipefail

reference=generated/reference/reference
test -s "$reference/index.md"
test -s "$reference/operations.md"
test -s "$reference/schemas.md"
rg -q '^\| Field \| Type \| Presence \|' "$reference/operations.md"
rg -q '^## Create User$' "$reference/operations.md"
