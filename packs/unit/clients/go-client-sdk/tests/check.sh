#!/usr/bin/env bash
# Compile and exercise the generated Go SDK against real httptest servers.
set -euo pipefail

cd out
go test ./...
