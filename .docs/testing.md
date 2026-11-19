# Pack testing

Public packs use one reusable fixture model.

## One canonical Runtime IR fixture

All pack tests use:

`shared/fixtures/dryv.ir.yaml`

The harness copies that file into the temporary project as `dryv.ir.yaml`.

Do not add `dryv.ir.yaml` inside a pack's `tests/fixture/` directory. The harness rejects it.

Why:

- Runtime IR is one canonical contract;
- pack examples should not silently drift into different semantic dialects;
- a context or contract change should be updated once;
- all ecosystems should prove themselves against the same semantic source;
- bugs caused by stale private fixtures should not recur.

If a new pack needs semantics the shared fixture does not cover, extend the root fixture canonically. Do not add framework-specific fields to make a fixture easier for one pack.

## Reusable non-IR fixture files

Shared environment/test files belong under `shared/fixtures/`.

Reusable mappings are declared centrally in `shared/fixtures/manifest.json`:

```json
{
  "packs": {
    "unit/clients/example-client": {
      "<temporary-project-path>": "<path-under-fixtures>"
    }
  }
}
```

This keeps reusable files centralized while allowing each pack's own `tests/fixture/` to remain specific to its toolchain and assertions.

## Pack-local files

Keep a file pack-local when its content really belongs to that pack, for example:

- `dryv.yaml` activation wiring;
- package/toolchain manifests with pack-specific dependencies;
- pack-specific assertions;
- test source files;
- compiler/typechecker configuration that genuinely differs.

Do not centralize files merely because they currently look similar. Centralize them when they represent one shared source of truth.


## Portable shared template/support assets

Reusable generation-time assets are different from test fixtures.

If several packs need the exact same template/support file, its canonical editable source belongs under `shared/`. `shared/assets.json` maps whole-file copies. Repeated manifest policy blocks live under `shared/manifests/` and are mapped through `shared/fragments.json` into explicitly marked regions of complete standalone pack manifests.

Run:

```bash
bun run shared:sync
bun run shared:check
```

The first command synchronizes pack-local portable copies. The second verifies synchronization and runs the unmanaged-duplication audit.

Do not make a pack reference `shared/` at generation time. Release archives contain the pack directory, so synchronized copies are intentional portability artifacts rather than independent sources of truth.

The duplication audit targets risky generated/template/test assets. Pack-owned history such as changelogs may naturally contain identical text and is not treated as shared behavior.

## Inspectable temporary runs

Pack test projects are created under:

`/tmp/dryv/<layout>/<purpose>/<name>/run-<id>/`

For example:

`/tmp/dryv/unit/frontend/react-native-app/run-a1b2c3/`

Open the whole test workspace tree in VS Code with:

`code /tmp/dryv/`

Behavior:

- failed runs are always preserved;
- successful runs are removed by default;
- `--keep` preserves successful runs too;
- `--clean` removes all previous Dryv pack-test runs before starting;
- `--clean-only` removes old runs and exits;
- `DRYV_TMP_ROOT` overrides `/tmp/dryv` when another root is desired.

Useful commands:

```bash
# Fresh full suite; keep only failures.
bun scripts/test-pack.ts --clean --all

# Fresh full suite; preserve every generated project for inspection.
bun scripts/test-pack.ts --clean --keep --all

# Remove old runs without running tests.
bun scripts/test-pack.ts --clean-only
```

## Test workflow

The AI implementation agent does not run pack fixture tests.

The user runs:

`bun scripts/test-pack.ts --keep <layout>/<purpose>/<pack>`

When testing against an unpublished/current local Dryv CLI:

`DRYV_CLI="bun ../dryv/source/apps/cli/bin/dryv.ts" bun scripts/test-pack.ts --keep <pack>`

A pack is not marked complete until the user reports a passing generation and toolchain test.
