#!/usr/bin/env bash
set -euo pipefail

bun install --silent
bunx tsc -p tsconfig.json

test -f out/forms/create-user-form.tsx
test -f out/forms/update-user-form.tsx
test ! -f out/forms/get-user-form.tsx

grep -q 'type="email"' out/forms/create-user-form.tsx
grep -q 'minLength={2}' out/forms/create-user-form.tsx
grep -q 'maxLength={80}' out/forms/create-user-form.tsx
grep -q 'type="number"' out/forms/create-user-form.tsx
grep -q 'min={18}' out/forms/create-user-form.tsx
grep -q 'max={120}' out/forms/create-user-form.tsx
grep -q '<select' out/forms/create-user-form.tsx
grep -q 'type="checkbox"' out/forms/create-user-form.tsx
grep -q 'CreateUserRequest' out/forms/create-user-form.tsx
grep -q 'createUser' out/forms/create-user-form.tsx
grep -q 'UpdateUserRequest' out/forms/update-user-form.tsx
grep -q 'updateUser' out/forms/update-user-form.tsx
