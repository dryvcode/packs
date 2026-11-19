#!/usr/bin/env bash
set -euo pipefail

bun install --silent
bunx tsc -p tsconfig.json

test -f out/forms/form-create-user-form.tsx
test -f out/forms/form-update-user-form.tsx
test ! -f out/forms/form-get-user-form.tsx
test -f out/forms/index.ts
grep -q 'FormCreateUserForm' out/forms/index.ts
grep -q 'FormUpdateUserForm' out/forms/index.ts

grep -q 'type="email"' out/forms/form-create-user-form.tsx
grep -q 'minLength={2}' out/forms/form-create-user-form.tsx
grep -q 'maxLength={80}' out/forms/form-create-user-form.tsx
grep -q 'type="number"' out/forms/form-create-user-form.tsx
grep -q 'min={18}' out/forms/form-create-user-form.tsx
grep -q 'max={120}' out/forms/form-create-user-form.tsx
grep -q '<select' out/forms/form-create-user-form.tsx
grep -q 'type="checkbox"' out/forms/form-create-user-form.tsx
grep -q 'FormCreateUserRequest' out/forms/form-create-user-form.tsx
grep -q 'formCreateUser' out/forms/form-create-user-form.tsx
grep -q 'FormUpdateUserRequest' out/forms/form-update-user-form.tsx
grep -q 'formUpdateUser' out/forms/form-update-user-form.tsx
