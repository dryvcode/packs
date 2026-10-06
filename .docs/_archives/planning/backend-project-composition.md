# Archived: Backend project composition gap

Status: **archived / superseded**

Archived on: **2026-10-06**

This document predates the current backend/project-pack state and the later pack-layout redesign. It is retained only as historical context and must not be used as active implementation guidance.

Current structural work is tracked in:
- `.docs/planning/pack-layout-refactor.md`
- `.docs/plan.md`
- `.docs/TODO.md`

---

# Backend project composition gap

Status: **open capability-contract gap**.

The repository now has backend package/inject baselines across TypeScript, Python, Go, Rust, Java, .NET, PHP, Swift, Kotlin, Ruby, Elixir and C++.

That breadth is enough evidence to identify a real composition gap without solving it through framework-specific convention.

## Current closed slot catalogue

Dryv decision 0014 currently defines:

- `schema.types`
- `schema.validation`
- `schema.persistence`
- `property.enum.types`
- `operation.client`

There is no server-side operation representation slot.

## Why this blocks generic backend project shells

A project pack can explicitly bind validation, persistence and client representations, but it cannot say:

> use this activated backend pack as the server-side implementation of these operations.

Without a slot, a project shell would have to do one of the prohibited things:

- duplicate controller/router generation already owned by the backend pack;
- infer a backend pack from its framework/catalog metadata;
- import generated files by folder/path convention;
- activate another pack implicitly;
- use a schema slot to smuggle operation artifacts;
- depend on install order or sibling pack names.

All of those violate explicit composition and explainability.

## Evidence from existing backend packs

The concrete generated representation differs by ecosystem:

- NestJS: controller/module/service contract;
- FastAPI: router/service boundary;
- Go: ServeMux registration + service interface;
- Axum: router + service trait;
- Jakarta REST: resource + service interface;
- ASP.NET Core: endpoint registration + service interface;
- Symfony: controller + service interface;
- Vapor/Ktor/Phoenix/Crow/Sinatra: route/controller registration + service boundary.

The common semantic fact is not a framework class name. It is:

> a generated server-side representation of one or more canonical operations.

That is the level at which a future capability slot should be evaluated.

## Candidate contract

A future Engine decision may introduce a neutral operation-subject slot, for example:

- `operation.server`; or
- another name chosen by the capability audit.

Do **not** add it to pack YAML alone. The slot catalogue is closed and owned by the Engine contract.

A viable slot must answer:

1. What exactly is the provider obligation per operation?
2. May one collected feature artifact represent several operations?
3. Which primary symbol does a provider expose when a file also has named service/register/controller symbols?
4. How does a project-level aggregate registration file deduplicate collected feature artifacts?
5. How do root/global project resources discover bound server packages without parsing generated paths?
6. Does same-unit injection differ from cross-unit package binding, or can the existing binding graph cover both?
7. How are HTTP, WebSocket and scheduled operations distinguished without framework-specific slot names?

## Required guardrails

Any solution must preserve:

- Usage chooses every provider explicitly;
- no pack activates another pack;
- Engine owns binding/planning;
- Runtime IR remains semantic authority;
- framework-specific registration stays in packs;
- generated dependencies remain visible in plan/trace;
- no path/name convention substitutes for a capability binding.

## Current decision

Backend **package/inject** packs remain valid and reusable.

Generic backend **project** composition is intentionally deferred until the Engine capability contract represents server-side operation artifacts explicitly.

Do not work around this gap by cloning backend generation into project packs.
