# 07 — NestJS native verification

Status: **blocked by Tasks 04–06**

## Goal

Prove that the updated NestJS inject+unit composition generates a project that is structurally and technically normal for NestJS.

Snapshot success alone is insufficient.

## Generate a real fixture

Use the shared Runtime IR and a realistic Usage/example materialization to generate an application containing multiple features/operations.

The fixture must exercise:

- multiple feature modules;
- controllers;
- service/provider boundaries;
- root module assembly;
- validation binding;
- persistence binding when applicable;
- generated imports;
- output overrides/root placement where appropriate;
- tests.

## Inspect filesystem

Compare the generated project to the framework baseline from Task 03.

Verify:

- file names;
- folder hierarchy;
- module boundaries;
- root files;
- test placement;
- configuration files;
- package scripts/dependencies;
- imports.

A NestJS developer should recognize it as a conventional NestJS application.

## Native verification

Use the generated project's own ecosystem tooling.

At minimum, where configured:

```text
dependency install
formatter/linter
TypeScript typecheck
Nest build
unit tests
e2e tests
```

Use the actual package scripts produced by the unit pack.

## Dryv verification

Also prove:

- plan is deterministic;
- trace points from IR selection to generated artifacts;
- output overrides are reflected before dependency/import planning;
- root module aggregation uses declared provider representations;
- no template scans sibling outputs;
- no duplicate artifact ownership;
- no hidden pack activation.

## Result

Record:

- exact generated tree;
- native commands run;
- pass/fail results;
- Dryv gaps discovered;
- pack fixes made;
- Engine fixes required.

Only after this task is green should another framework receive a full quality pass.
