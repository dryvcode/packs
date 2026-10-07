# 05 — NestJS unit pack

Status: **blocked by Tasks 03 and 04**

Target:

```text
packs/unit/backend/nestjs
```

## Goal

Make the NestJS unit pack own only the runnable/root Nest application responsibilities and assemble bound implementation artifacts from the inject pack.

## Unit responsibility

The unit establishes the generated NestJS application root.

It should own framework-native root artifacts verified in Task 03, such as:

- bootstrap/main entrypoint;
- root application module;
- Nest/TypeScript configuration;
- package/project manifest when appropriate;
- root test/e2e setup where appropriate.

It must not duplicate feature controllers/services/modules already produced by `inject/backend/nestjs`.

## Composition

Target capability graph:

```text
unit/backend/nestjs
    needs operation.server
              │
              ▼
inject/backend/nestjs
    needs schema.validation
    needs schema.persistence
```

Usage chooses concrete providers.

The unit never silently activates a sibling pack.

## Aggregate registration

The root application module must consume the public representation exposed by the bound `operation.server` provider.

Do not solve root assembly by:

- scanning generated directories;
- deriving module symbols from filenames;
- hardcoding `inject/backend/nestjs` paths;
- duplicating feature modules.

If current Dryv cannot aggregate provider artifacts correctly, record/fix the generic composition gap.

## Pack manifest

Bring `dryv.pack.yaml` fully current:

- `layout: unit`;
- key `unit.backend.nestjs`;
- current info metadata;
- keyed needs;
- correct templates;
- correct dependencies;
- only intrinsic actions;
- package metadata only when genuinely needed.

## Completion

The unit must be thin, explicit and framework-native.

It is complete only when it can assemble the inject pack into a runnable NestJS application without duplicated implementation.
