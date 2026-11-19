# Shared portable assets

This directory owns canonical sources for repeated generation-time content that must still exist inside individual pack folders.

Packs must remain portable and independently releasable. They therefore **must not** import or reference files from this directory at generation time.

There are two synchronization forms.

## Whole files

For an identical template/support file:

1. define the canonical file under `shared/`;
2. map it to pack-local targets in `shared/assets.json`;
3. run `bun run shared:sync`;
4. commit the synchronized pack-local copies.

Examples include the common TypeScript enum and export-index templates.

## Manifest fragments

Some `dryv.pack.yaml` sections are repository-wide policy but every released pack still needs a complete standalone manifest. Examples are the standard JavaScript package-manager choice and shared TypeScript format/install actions.

Canonical fragments live under `shared/manifests/`.

`shared/fragments.json` maps each canonical fragment to:

- a stable marker name;
- every complete `dryv.pack.yaml` that contains the synchronized copy.

Targets contain explicit markers:

```yaml
# shared:<marker>:start
...
# shared:<marker>:end
```

`bun run shared:sync` updates the marked regions. `bun run shared:check` fails if a file or marked manifest region drifts.

## Rules

Use sharing only when content represents the **same reusable contract or repository policy**.

Do not centralize code merely because it looks similar. Framework-specific mappings, generated APIs and pack-specific behavior remain inside their packs.

The synchronized copies inside pack folders are intentional portability artifacts, not independent sources of truth.

Test data belongs in `fixtures/`, not here.
