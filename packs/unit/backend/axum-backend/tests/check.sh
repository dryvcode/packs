#!/usr/bin/env bash
set -euo pipefail
cargo clippy --manifest-path server/Cargo.toml -- -D warnings
