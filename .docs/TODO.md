# Public packs TODO

Status: **active work index**

Detailed execution is tracked under [tasks/pack-modernization](tasks/pack-modernization/README.md).

## Current work

### Stage A — repository identity

- [ ] [01 — Repository identity and naming audit](tasks/pack-modernization/01-repository-layout-and-naming.md)
- [ ] [02 — Repository rename/move and identity verification](tasks/pack-modernization/02-repository-move-and-verification.md)

Manifest layouts, layout-aware keys and repository helpers now follow the `inject | unit` contract, and the NestJS slice is renamed. The remaining structural pass shortens the other terminal names, updates their references, and corrects any pack whose actual ownership role is wrong.

### Stage B — NestJS reference-quality proof

- [x] [03 — NestJS framework baseline](tasks/pack-modernization/03-nestjs-framework-baseline.md)
- [x] [04 — NestJS inject pack](tasks/pack-modernization/04-nestjs-inject-pack.md)
- [x] [05 — NestJS unit pack](tasks/pack-modernization/05-nestjs-unit-pack.md)
- [x] [06 — NestJS composition and example](tasks/pack-modernization/06-nestjs-composition-and-example.md)
- [x] [07 — NestJS native verification](tasks/pack-modernization/07-nestjs-native-verification.md)

Do not start another framework-quality pass until these tasks are complete.

## Later work

Broader ecosystem coverage/research remains under [ecosystems](ecosystems/).

Those files are research/candidate coverage, not the current execution queue.

## Repository rules

- [x] Work only on `develop`.
- [x] Keep contracts on `v1alpha1`.
- [x] Keep Runtime IR as the only semantic authority.
- [x] Keep framework-specific realization inside packs.
- [x] Use the shared Runtime IR fixture at `shared/fixtures/dryv.ir.yaml`.
- [x] Derive catalogue entries from `dryv.pack.yaml`.
- [x] Validate structural work with `bun run shared:check` and `bun run catalog:check`.
- [ ] Validate packs with `bun run test:packs` when the current Engine is ready.
- [ ] Use native framework tooling for framework-quality completion.
