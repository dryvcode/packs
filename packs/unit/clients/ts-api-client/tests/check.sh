#!/usr/bin/env bash
# Typecheck the generated client, then exercise its calls against a mocked fetch.
set -euo pipefail
bun install --silent
bun -e 'if (JSON.parse(await Bun.file("out/package.json").text()).name !== "@fixture/api-client") throw new Error("package_name was not applied to the generated manifest")'
bun -e 'if (JSON.parse(await Bun.file("out/package.json").text()).exports["./*"] !== "./src/*.ts") throw new Error("source wildcard export is missing")'
mkdir -p node_modules/@fixture
ln -sfn "../../out" node_modules/@fixture/api-client
bunx tsc -p tsconfig.json
bun test client.test.ts
