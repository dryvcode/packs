---
status: draft
updated: 2026-10-06
scope: research-only
---

# Current Dryv baseline and gap audit

This audit compares the current Engine/pack contracts with representative packs on `develop`. It distinguishes real missing capability from cases where the pack should simply make a better implementation choice.

## Current selection model

Current selectable subjects are:

```text
property.primitive
property.enum
property.composite
property.literal
property.union
property.record
property.tuple
property.generic
property.temporal
schema
expression
policy
failure
event
operation
view
view.part
workflow
surface
```

Selection membership is intentionally narrow. Current classifiers are:

- `tags` on semantic metadata;
- `role` where the canonical subject defines roles;
- `facet` for schema storage and operation HTTP/WebSocket/schedule facets;
- `kind` for Surface.

Current scopes are:

```text
each
all
collects.feature
collects.group
```

This is a strong deterministic baseline. The selector does not accept names, IDs, arbitrary paths, JSONPath, count comparisons or structural expressions. That constraint is valuable: a pack cannot accidentally become coupled to serialized IR layout.

## What already works well

### 1. Semantic subject identity

Selections operate on canonical subject classes rather than framework artifacts. This correctly prevents `controller`, `widget`, `repository`, etc. from becoming semantic subjects.

### 2. Orthogonal membership and partitioning

Current code separates:

```text
Does the subject match?       filter
How do matches invoke?        scope
```

This is cleaner than selectors whose grouping behavior is hidden inside predicates.

### 3. Feature/group aggregation

`collects.feature` and `collects.group` are already enough for many framework constructs:

- Nest controller/module per feature;
- FastAPI router per feature;
- ASP.NET endpoint group per feature;
- aggregate documentation per semantic group.

### 4. Derived template context

Operation context already exposes rich derived HTTP information such as effective paths, normalized input groups, bindings and value flags. This is exactly the right direction: renderers should consume stable semantic projections rather than parse Runtime IR storage structure.

### 5. Explicit cross-pack capabilities

`provides`, `needs` and usage bindings allow one pack's generated representation to satisfy another pack without implicit dependencies. This is critical to framework-neutral composition.

### 6. Static + rendered resource filesystem

Current pack resources can combine static files, rendered files, registry markers and dynamic output segments. This already supports far more than 'one template = one source file'.

## Evidence from existing packs

### NestJS backend

Current selection:

```yaml
controllers:
  subject: operation
  filter:
    all: { facet: http }
  scope: collects.feature
```

One generated source currently contains:

- an abstract feature service contract;
- a Nest controller;
- a Nest dynamic module;
- optional TypeORM registration;
- validation-provider-specific handling.

This proves the current model can generate sophisticated implementation code. It also reveals two ergonomic issues:

1. one template is acting as several independently meaningful implementation artifacts;
2. the template inspects `dependency.pack` string identities to decide how Zod/Joi/class-validator should be adapted.

The second issue is **not** missing Runtime IR semantics. It is a pack composition/context ergonomics issue. A consumer should ideally depend on declared representation capabilities/facts rather than knowing provider pack keys.

### Flutter project

The Flutter pack maps Views into:

- scaffolded editable screens;
- generated provider/state files;
- feature router fragments;
- application router aggregation;
- shared widgets/configuration;
- pubspec/project resources.

This is good evidence for one semantic subject producing an artifact family. It also exposes a canonical gap: routing is currently invented by the pack from Group/View names because View semantics intentionally have no navigation/address model.

That is acceptable for a starter convention, but it is not enough if the authored software needs exact route addresses, route parameters, nested navigation, redirects or navigation relationships.

### Next.js project

The current pack writes pages under a pack-chosen route shape:

```text
app/<generated page>/page.tsx
```

Current Next.js supports route groups, dynamic segments, parallel slots, intercepting routes, layouts, loading/error/default files and other filesystem semantics. The current View model does not express most of those meanings, and current path interpolation is much simpler than the space of possible Next route trees.

Two gaps must not be conflated:

- **semantic gap:** authored navigation/address meaning is absent;
- **artifact-path gap:** planner/template path expressions may need richer safe dynamic segments.

### HTTP testing packs

`http-smoke-tests`, Postman and k6 already prove that tests/verification are ordinary Dryv artifacts.

The k6 and `.http` templates derive:

- effective HTTP method/path;
- path/query/header/cookie/body/form bindings;
- example scalar values;
- declared success statuses.

They also contain an explicit limitation for multipart input:

```text
Dryv Runtime IR does not yet expose first-class file-part semantics.
```

This is high-value evidence because the pack cannot fix it by choosing a different framework implementation. The underlying communicated value meaning is missing.

## Current selector limitations that matter

The selector can currently answer questions such as:

```text
all HTTP operations
create or update operations
storage schemas
mobile surfaces
all Views per Feature
```

It cannot directly answer semantically useful questions such as:

```text
operations that declare failures
operations that require authentication
operations that emit events
operations whose execution is async
operations with a schedule
operations with body input
operations with multipart/file input
views presented on a web surface
views containing collect parts
events with listeners
workflows containing wait steps
schemas with relations
schemas with invariants
schemas with examples
```

Some of these may justify new **semantic classifiers/predicates**. Others should remain context-only and be handled by a selected aggregate template. The research recommendation is not 'add arbitrary field predicates'. The recommendation is to identify a small set of reusable semantic facts with proven cross-pack value.

## Current scope limitations that matter

Current scopes support subject, all, Feature and Group partitions. Real generators also commonly need:

- one artifact per parent View while selecting `view.part`;
- one artifact per Surface/presentation binding;
- one artifact per semantic relationship or binding;
- one artifact per workflow step or operation outcome;
- one artifact per package/module/namespace choice derived from pack configuration;
- matrix generation across subject × implementation target, such as platform-specific plugin files.

Do **not** respond by adding framework scopes like `collects.module` or `collects.controller`. Any new partition axis must be canonical or planning-owned and reusable.

## Current artifact topology limitations to investigate

### 1. Aggregate registration

Barrels/export templates solve symbol aggregation, but framework assembly is broader than source exports:

- Nest root/module registration;
- FastAPI router inclusion;
- Rails route table contribution;
- Django installed app / URL wiring;
- Gradle/Maven manifest entries;
- Flutter pubspec assets/plugins;
- Angular/Nx workspace configuration.

A fully generated project can simply regenerate its aggregate file from all selected inputs. An inject pack targeting a handwritten project is harder because Dryv intentionally avoids implicit workspace mutation.

This needs an explicit design, not template hacks.

### 2. Path expressiveness

Static physical template folders plus simple dynamic `output.path` handles many projects. Stress cases include:

- Java/Kotlin namespace path expansion;
- arbitrary nested Group hierarchy if a pack chooses to map it;
- Next.js `[id]`, `[...slug]`, `[[...slug]]`, `(group)`, `@slot`, `(.)` path syntax;
- generated package names split into path segments;
- platform matrices such as `android/src/main/...` and `ios/Classes/...`.

The planner should treat these as safe relative path segments, not framework concepts.

### 3. Non-source artifacts

Current packs already generate JSON, YAML, TOML-like manifests, HTTP request files and static resources. To make the claim 'any format' robust, the artifact model should be audited for:

- byte-preserving static files;
- non-UTF8/binary resources;
- executable file mode;
- symlinks if ever needed;
- empty directories if a target ecosystem actually requires them;
- line-ending/encoding policy;
- dotfiles and extensionless files.

These are planning/client concerns, not Runtime IR semantics.

## Anti-patterns found or likely

### Pack-key branching

A template that checks `dependency.pack == validation.zod-schemas` is coupled to a specific provider identity. Prefer a provider-declared representation fact/capability when the implementation difference matters.

### Template-side semantic discovery

Large loops that rediscover 'which operation is fed by this form?' or deduplicate operations by scanning all parts are deterministic but indicate context could expose a reusable derived relationship.

### Tags as missing schema

Do not use tags such as `file-upload`, `paginated`, `authenticated`, `background`, `route-detail` when the fact is stable software meaning that should be typed and validated.

### Universal framework artifact vocabulary

Do not add a canonical `service`, `controller`, `repository`, `module`, `view-model` or `component` concept merely because multiple frameworks use similar words. Their responsibilities differ too much.

### Arbitrary structural selectors

Do not solve selector gaps with generic expressions over serialized IR fields. That would make pack portability depend on storage shape and weaken explainability.

## The key design split

Every observed gap should first be classified:

| Gap kind | Example | Likely owner |
| --- | --- | --- |
| Missing software meaning | View navigation/address; file-valued input | Runtime IR research |
| Missing derived semantic fact | operation has failures; View uses operation X | Engine context/index |
| Missing implementation choice | controller vs minimal endpoint | pack input/design |
| Missing implementation metadata | provider supports decorator DTO vs schema object | capability/pack composition |
| Missing artifact topology | contribution to aggregate registry | pack/planner |
| Missing filesystem feature | binary/mode/safe dynamic segment | planner/client |
| Missing verification artifact | generated e2e/widget/integration suite | pack |

That table should become the default triage model for future pack failures.