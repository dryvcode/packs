# 04 — NestJS inject pack

Status: **blocked by Task 03**

Target:

```text
packs/inject/backend/nestjs
```

## Goal

Make the main NestJS inject pack a reference-quality implementation pack whose generated artifacts and filesystem match the researched NestJS feature architecture.

## Responsibility

The inject pack contributes feature-level NestJS implementation into an owning unit.

It must not own root application bootstrap/configuration.

Expected responsibilities should be validated by Task 03, but likely include:

- controller;
- provider/service boundary;
- feature module/registration artifact;
- Nest-specific adapters;
- appropriate generated tests.

## Audit

Inspect:

- `dryv.pack.yaml`;
- all selections;
- template keys;
- template filesystem;
- output defaults;
- imports/exports;
- `provides`;
- `needs`;
- dependencies;
- actions;
- tests;
- generated fixture output.

Identify templates that currently combine independent implementation responsibilities.

## Pack manifest

Bring the manifest fully to current Dryv contracts.

Requirements include:

- `layout: inject`;
- layout-aware key;
- current `info`;
- keyed `needs`;
- real `provides` refs;
- no stale placement syntax;
- portable semantic/local pack output defaults;
- intrinsic dependencies remain in the pack;
- no project setup UX in the pack manifest.

## Template quality

Prefer independently meaningful artifacts where that improves:

- planning;
- output placement;
- tracing;
- imports;
- testing;
- unit composition.

Templates render framework implementation; they must not rediscover Runtime IR structure or branch on raw provider pack IDs when a capability/representation fact should exist.

## Output structure

Generated defaults must be NestJS-native and still portable.

Project-specific root structure belongs in Usage/example overrides.

## Completion

Do not mark complete until generated output is ready to participate in Task 07 native Nest verification.
