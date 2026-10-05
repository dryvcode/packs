# Shared portable assets

This directory owns canonical sources for repeated files that must still exist inside individual pack folders.

Packs must remain portable and independently releasable. They therefore **must not** import or reference files from this directory at generation time.

Instead:

1. define the canonical file once under `shared/`;
2. map it to every required pack-local target in `shared/assets.json`;
3. run `bun scripts/sync-shared.ts`;
4. commit the synchronized pack-local copies.

`bun scripts/sync-shared.ts --check` fails when a mapped target drifts from its canonical source.

Use this only for genuinely identical assets. Similar framework-specific code should remain separate.

Test data belongs in `fixtures/`, not here.
