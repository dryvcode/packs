# Shared pack fixtures

This directory owns reusable test fixtures for the public packs repository.

## Runtime IR

`dryv.ir.yaml` is the **one Runtime IR fixture used by every pack test**.

Pack-local copies are prohibited.

When a pack needs another semantic case, extend this shared fixture with a small, canonical example instead of creating another IR document. Use distinct semantic names so unrelated packs do not collide on generated paths or symbols.

The shared IR should remain broad enough to exercise reusable Dryv semantics across ecosystems:

- HTTP operations and bindings (HTTP operations are feature-owned, matching the current Runtime IR validator)
- schemas and enums
- create/update UI inputs
- validation constraints
- persistence/storage metadata
- relations
- indexes
- defaults
- invariants
- generated-value semantics
- groups/features and other canonical relationships

Framework-specific concepts do not belong in this fixture.

## Other reusable fixture files

Reusable non-IR fixture files also belong under this directory.

Reusable mappings are declared once in `fixtures/manifest.json`, keyed by canonical pack ID. Each mapping sends a destination inside the temporary fixture project to a path under this directory.

Example:

```json
{
  "packs": {
    "unit/clients/flutter-api-bridge": {
      "pubspec_overrides.yaml": "dart/pubspec_overrides.yaml"
    }
  }
}
```

The test harness rejects:

- pack-local `dryv.ir.yaml`
- missing shared fixture sources
- shared fixtures that overwrite a pack-local fixture
- non-portable or traversing shared fixture paths

Pack-local `tests/fixture/` should contain only files that genuinely belong to that pack's test project.
