---
status: draft
updated: 2026-10-06
scope: research-only
---

# Selections, context, artifacts and composition

This document focuses on `dryv.pack.yaml` and Planner vocabulary rather than Runtime IR.

## 1. Separate five decisions

A pack design currently risks collapsing several decisions into 'the template'. They should be reasoned about separately:

```text
1. semantic eligibility    What canonical things justify generation?
2. partition              Which matches belong in one invocation?
3. artifact family        What implementation responsibilities are created?
4. context projection     What facts does each renderer receive?
5. artifact topology      Where/how do outputs relate and compose?
```

This separation is the foundation of the proposed agent mental model.

## 2. Selection should answer *why the artifact exists*

Good:

```yaml
http_operations:
  subject: operation
  filter:
    all: { facet: http }
  scope: collects.feature
```

This says the artifact exists because a feature has HTTP-reachable Operations.

Weaker design:

```text
select every Operation
then template checks if operation.facets.http exists
```

The second design hides selection reasoning inside renderer syntax, produces less useful plan traces, and can instantiate templates that emit nothing.

## 3. Keep selectors closed and semantic

Current `tags`, `role`, `facet`, `kind` classifiers are safe because the Engine defines exactly what each means.

Future selector power should follow the same rule.

### Recommended direction: subject-specific semantic classifiers

Research extending the classifier fact model rather than introducing generic structural expressions.

Conceptual example only:

```yaml
selections:
  authenticated_http:
    subject: operation
    filter:
      all:
        facet: http
        trait: requires-authentication
    scope: each
```

`trait` here would be a closed typed vocabulary derived by the Engine, not a user-defined string and not a path into serialized IR.

### Why not JSONPath / arbitrary expressions?

Because these would let a pack select on incidental storage shape:

```text
$.operations[*].facets.http.inputs[?...]
```

That creates a second informal semantic API, couples packs to IR serialization, weakens validation, and makes trace explanations harder.

## 4. Add selection subjects only for independent semantic identity

Use this test:

> Could several unrelated packs reasonably generate an independent artifact for this nested semantic item, and does it have stable semantic identity independent of serialization position?

`view.part` already passes this test.

Likely future candidates:

- `view.presentation`;
- `workflow.step`.

Do not automatically make every field, binding or list element selectable.

## 5. Scope is partitioning, not architecture

Current scopes are good because they use canonical ownership:

```text
each
all
collects.feature
collects.group
```

Never add:

```text
collects.controller
collects.module
collects.repository
collects.package
```

Those are implementation concepts.

Where new partitioning is needed, prefer one of:

1. a newly selectable nested semantic item;
2. a canonical ownership/relation axis;
3. pack-local configuration that affects output topology;
4. an aggregate template with richer derived context.

## 6. Artifact families are pack-local implementation design

Example: one set of HTTP Operations in one Feature.

Nest pack may choose:

```text
feature module
controller
service/provider contract
DTO adapters
unit tests
HTTP e2e tests
```

FastAPI pack may choose:

```text
router
service protocol
Pydantic/API adapters
router tests
```

ASP.NET minimal API pack may choose:

```text
endpoint mapping extension
service interface
request/response records
integration-test fixture
```

No global `artifact-family` schema needs to know these names. They can remain template keys and pack documentation.

However, planning can benefit from a small neutral artifact classification:

```text
source
test
configuration
manifest
documentation
migration
fixture
asset
script
```

This is **artifact metadata**, not software semantics. It could improve plan UI, filtering, actions and diagnostics without influencing selection meaning.

## 7. Context should remove renderer reasoning, not implementation choice

Correct derived context:

- effective HTTP path;
- normalized input binding groups;
- resolved semantic links;
- finite naming variants;
- reverse semantic references proven by the Engine;
- provider symbols/relative artifact paths;
- selected/partitioned subject arrays.

Incorrect hidden context:

- `nestjs_controller_name`;
- `flutter_repository_class`;
- `spring_annotation`;
- generated framework code snippets.

The Engine projects semantic/planning facts. The pack decides implementation.

## 8. Context gaps visible in current templates

### Dependency provider identity branching

Current Nest template branches on provider pack keys to decide whether validation is Zod, Joi or class-validator.

Before adding a new mechanism, first use the current capability model more correctly:

- `schema.types` should provide a generated type representation;
- `schema.validation` should provide validation behavior/representation;
- a provider may provide both;
- a consumer should bind exactly what it needs.

If consumers still need implementation characteristics, research **slot contract metadata** rather than raw pack-key branching.

Conceptual generation-plane metadata:

```text
schema.validation representation:
  runtime-validator
  decorator-validation
  schema-object

schema.types representation:
  nominal-type
  structural-type
```

This metadata must remain about generated representation, not become Runtime IR.

### Reverse interaction relationships

Current UI templates repeatedly scan View Parts to infer:

- which Operations are invoked by a View;
- whether an Operation result comes from a Collect Part;
- whether a Present Part repeats a previously loaded Operation.

Some loops are fine, but repeated cross-template logic suggests useful derived context such as:

```text
view.interactions.operations[]
operation.used_by.views[]
part.related_parts[]     only if semantically provable
```

Any such projection must be deterministic and documented, never a hidden template-server helper.

## 9. Artifact topology must support arbitrary project structures

The Engine does not need to know what these mean:

```text
src/main/java/com/acme/orders/
app/(admin)/orders/[id]/
lib/ui/orders/view_models/
Areas/Products/Controllers/
test/integration/
```

It needs to represent safe relative paths.

### Requirements to audit

- arbitrary UTF-8-safe path segment content permitted by Dryv's portability rules;
- dynamic segments with literal prefixes/suffixes, e.g. `[<name>]`, `(<group>)`, `@<slot>`;
- path segments derived from package/namespace input;
- repeated dynamic nesting;
- dotfiles and extensionless names;
- normalization and traversal protection;
- deterministic collision detection after interpolation.

The planner should not normalize away punctuation that frameworks use semantically.

## 10. Supporting any file format

Treat generated output as **artifacts**, not 'source code'.

At minimum there are two production modes:

```text
rendered text artifact
static/copy artifact
```

To substantiate 'any format', audit support for:

- arbitrary text extensions and extensionless text files;
- JSON/YAML/TOML/XML/SQL/GraphQL/Proto/Markdown/etc.;
- Dockerfile/Makefile/Procfile-style names;
- byte-preserving binary assets;
- file mode/executable bit;
- symlinks only if a real target ecosystem requires them;
- encoding and line-ending policy.

Template servers should only parse files assigned to their renderer syntax. Static resources should remain opaque bytes.

## 11. Aggregate files and registration are the hardest open issue

Official generators repeatedly update aggregate files:

- Nest modules;
- FastAPI router inclusion;
- Rails routes;
- Angular/Nx workspace manifests;
- Flutter pubspec;
- build files and project manifests.

Dryv should prefer generation from complete knowledge over patching.

### Strategy A — pack-owned aggregate (preferred)

A project/package pack owns the aggregate file and renders it from all selected subjects/dependencies.

```text
many feature artifacts
      ↓
generated app/module/router/manifest aggregate
```

This is deterministic, replayable and easy to trace.

### Strategy B — generated assembly/contribution contract (research)

When several packs must contribute to one generated aggregate, research an explicit planning concept:

```text
producer artifacts/symbols
      ↓ contribution
named assembly
      ↓
one owning aggregate artifact
```

The assembly should collect typed planning facts/symbols, not arbitrary source-text patches. One producer must still own the final file.

Potential uses:

- root module registrations;
- route registries;
- DI registrations;
- generated manifest sections;
- plugin registries.

### Strategy C — mutate handwritten files (last resort)

Angular Schematics, Rails and Nx prove that mainstream generators patch workspaces. Dryv must not copy their implicit mutation model into the Engine.

If handwritten-file augmentation is ever supported, it should be:

- explicitly declared;
- planned and previewable;
- traceable;
- conflict-aware;
- applied by the Client;
- based on a well-defined transformation contract;
- never a renderer secretly editing the workspace.

Research this only after generated assembly proves insufficient.

## 12. Generated ownership matters

The framework evidence strengthens the distinction between:

- **managed** artifacts: regenerated from semantic truth;
- **scaffold** artifacts: generated once and handed to developers.

Flutter screen UI, custom business service implementations, and hand-edited view markup are common scaffold candidates. Route registries, DTOs, client methods and schema adapters are common managed candidates.

Ownership should be visible in plan/trace and should not be inferred from filename conventions alone.

## 13. Planner trace should explain implementation causality

A useful plan explanation is:

```text
artifact: src/orders/orders.controller.ts
pack: backend.nestjs
template: feature-controller
selected because:
  selection: http_operations
  subject: operation
  facet: http
partitioned because:
  scope: collects.feature
  feature: orders.Orders
depends on:
  schema.types -> validation.class-validator-dtos
  schema.persistence -> persistence.typeorm-entities
ownership: managed
```

That is better than merely saying a template rendered.

## Proposed pack-plane vocabulary to research

These are generation/planning concepts, **not Runtime IR**:

| Candidate | Purpose |
| --- | --- |
| artifact category | source/test/config/manifest/docs/etc. plan metadata |
| representation capability | what kind of generated representation a slot provides |
| assembly/contribution | deterministic many-producer → one-owner aggregate composition |
| richer safe path segment formatting | arbitrary framework filesystem shapes |
| opaque static/binary resource mode | non-text artifacts |
| explicit artifact ownership | managed vs scaffold at planned-resource level |
| verification action category | build/test/analyze/typecheck intent for harnesses |

Each requires a separate proposal and proof pack before contract changes.