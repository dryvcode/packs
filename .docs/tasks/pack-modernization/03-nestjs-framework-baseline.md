# 03 — NestJS framework baseline

Status: **blocked by Stage A**

## Goal

Establish the authoritative design target for:

```text
inject/backend/nestjs
unit/backend/nestjs
```

before editing their templates.

This is a framework-fidelity task, not a Dryv vocabulary expansion task.

## Research sources

Prioritize:

1. official NestJS architecture/module documentation;
2. official Nest CLI/generator behavior;
3. official testing guidance;
4. official TypeScript/Nest configuration guidance;
5. mature community patterns only where official guidance is intentionally open.

Record direct evidence for each structural decision.

## Questions to answer

### Feature organization

Determine the recommended relationship between:

```text
feature
controller
provider/service
module
tests
```

### Root application

Determine the expected root files/configuration, including as applicable:

```text
main.ts
app.module.ts
package.json
tsconfig.json
tsconfig.build.json
nest-cli.json
test/e2e configuration
```

### Tests

Determine what Nest's native generators/guidance expect for:

- unit tests;
- controller/service tests;
- e2e tests;
- file naming;
- test placement.

### Assembly

Determine how feature modules should be registered into the root application module.

Dryv must be able to express this deterministically without templates scanning output directories.

## Deliverable

Create a concise artifact matrix before touching templates.

Example structure:

| Canonical trigger | Implementation responsibility | Artifact | Scope | Owner |
| --- | --- | --- | --- | --- |
| Feature + HTTP operations | HTTP adapter | controller | feature | inject |
| Feature | application/provider boundary | service/provider | feature | inject |
| Feature | Nest composition | feature module | feature | inject |
| bound operation.server providers | root registration | app module | unit | unit |
| application | bootstrap | main | unit | unit |

Do not copy this table blindly. Verify it against current NestJS guidance.

## Engine-gap rule

If correct NestJS architecture cannot be expressed with current generic Dryv capabilities, document the generic gap.

Do not:

- hardcode NestJS logic in Engine;
- scan provider directories;
- parse generated sibling files;
- duplicate inject implementation in the unit pack.
