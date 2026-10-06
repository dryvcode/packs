---
status: draft
updated: 2026-10-06
scope: research-only
---

# Research conclusions and experiments

This document turns the evidence into staged investigations. It intentionally avoids committing Dryv to new contracts before proof.

## Conclusion 1 — framework-neutral does not mean architecture-neutral packs

Runtime IR must remain framework-neutral.

Packs should **not** be architecture-neutral. A good pack deliberately chooses a valid implementation architecture for its target ecosystem and explains that choice.

Therefore:

```text
Dryv-wide consistency = same semantic/planning contracts
not
Dryv-wide consistency = same generated folder/file architecture
```

## Conclusion 2 — separate semantic vocabulary from generation vocabulary

We need two research tracks:

### Semantic track

Facts describing the authored software:

- binary/file/media values;
- interaction address/navigation;
- possible CLI callable mappings;
- possible authored behavioral scenarios;
- future external message delivery semantics if proven.

### Generation/planning track

Facts describing implementation output:

- artifact category;
- ownership managed/scaffold;
- provider representation capabilities;
- assembly/contribution;
- safe arbitrary paths;
- static/binary artifact metadata;
- verification action intent.

Never solve a generation-plane problem by polluting Runtime IR.

## Conclusion 3 — selection needs semantic expressiveness, not arbitrary expressiveness

The current closed classifier model is a strength.

Likely improvement direction:

```text
more selectable semantic subjects where justified
+
more closed derived subject classifiers
+
possibly more canonical partition axes
```

Not:

```text
arbitrary expressions over serialized Runtime IR
```

## Conclusion 4 — aggregation/composition is more important than more renderer power

Framework generators show that useful code generation repeatedly requires registration:

```text
child implementations
   ↓
aggregate module/router/manifest/registry
```

Jinja and Handlebars can already render complex code when context is rich. The harder Dryv problem is giving packs deterministic artifact dependencies and aggregate ownership without hidden workspace mutation.

## Conclusion 5 — tests are a normal artifact family

Tests should be designed alongside implementation artifacts.

Dryv already proves this with HTTP/Postman/k6 packs. Framework evidence shows test placement and test type are part of ecosystem architecture.

However, generated business-behavior tests need authored behavioral evidence; type-derived placeholders are only smoke scaffolding.

## Conclusion 6 — 'any file structure / any format' needs a precise capability claim

Target claim:

> A pack can describe any deterministic, safe relative artifact tree required by a programming ecosystem, using rendered text artifacts and opaque static artifacts, without the Engine understanding the ecosystem's path or file semantics.

Before claiming this is solved, test:

- arbitrary punctuation-heavy path segments;
- package/namespace-expanded paths;
- dynamic nested paths;
- dotfiles/extensionless files;
- binary static files;
- executable scripts/file modes;
- collisions after dynamic interpolation;
- Windows/Linux path portability boundaries.

## Experiment 1 — NestJS architecture-quality pack

Purpose: prove artifact-family design, composition and generated tests.

Build a research branch/proof pack design with separate responsibilities:

```text
feature service boundary
feature controller
feature module
root module registration
unit/adapter tests
HTTP E2E tests
```

Questions:

- Can current selections trigger each cleanly?
- Can current imports/exports wire the family without hardcoded paths?
- Can root registration be generated without new assembly vocabulary?
- Can `schema.types` + `schema.validation` remove provider pack-key branching?
- Which semantic traits would improve test selection?

Native proof:

```text
nest build
unit tests
e2e tests
```

## Experiment 2 — Spring Boot + Modulith pack design

Purpose: prove that Group/Feature meaning can map to module/package boundaries without becoming filesystem semantics.

Generate:

```text
root application
feature/module package
HTTP adapter
service/application boundary
persistence adapter binding
module verification test
module integration test
```

Questions:

- Should Feature map to package directly or through pack option?
- Can inter-feature semantic references become module dependencies cleanly in context?
- Can generated module verification expose bad pack architecture?
- Does Java root namespace require richer path derivation?

## Experiment 3 — Flutter architecture pack

Purpose: compare current generated Riverpod screen/provider design against current official Flutter architecture.

Prototype official-guidance-oriented artifact families:

```text
View
ViewModel
Repository interface/implementation
Service adapter
routing
unit tests
widget tests
integration test for one critical scenario
```

Do not assume every schema requires a repository. Determine what canonical relationship actually justifies a data source/repository.

Questions:

- Is current View/Part meaning sufficient for View + ViewModel generation?
- What meaning is missing for route addresses?
- Which Operation relationships justify service/repository methods?
- Can test fakes be generated from capability boundaries?

## Experiment 4 — Next.js filesystem stress pack

Purpose: prove arbitrary safe path topology independently of source rendering.

Attempt artifacts with:

```text
app/(marketing)/page.tsx
app/blog/[slug]/page.tsx
app/@modal/(..)photo/[id]/page.tsx
app/dashboard/loading.tsx
app/dashboard/error.tsx
```

These paths can initially be driven by pack inputs/test fixtures rather than new Runtime IR meaning.

Questions:

- Can output path syntax preserve these exact segments?
- Can dynamic semantic names appear inside bracket/parenthesis syntax?
- Can several artifacts intentionally share route segment directories?
- Does collision detection report final paths clearly?

This experiment tests the artifact system, not whether Runtime IR should model every Next feature.

## Experiment 5 — binary/static artifact proof

Purpose: verify 'any format'.

Create a test pack containing:

- UTF-8 rendered text;
- extensionless rendered file;
- dotfile;
- PNG or equivalent opaque binary fixture;
- executable shell script if mode metadata is supported;
- deeply nested arbitrary static resource.

Record exactly what survives template scanning, planning, transport/API and client application.

## Experiment 6 — selector trait prototype

Purpose: prove need before expanding pack schema.

Collect real desired selectors from at least five existing packs.

Candidate corpus:

```text
HTTP Operations requiring authentication
HTTP Operations with declared failures
Operations emitting Events
Views containing Collect Parts
Schemas with relations/invariants
Events with listeners
```

For each candidate record:

- number of packs that benefit;
- whether fact is canonical or derived;
- whether aggregate context alone is sufficient;
- whether selection improves artifact causality/trace;
- whether zero-match selection has useful meaning.

Only then propose a closed `trait` or subject-specific classifier contract.

## Experiment 7 — generated scenario proof

Purpose: determine whether canonical behavioral scenarios are worth IR expansion.

Use one small domain with:

- successful create operation;
- declared business Failure;
- emitted Event;
- two-step Workflow;
- View that invokes/presents the behavior.

Manually define implementation-neutral example scenarios outside Runtime IR first. Generate equivalent tests for:

```text
Nest/Supertest
Spring/JUnit
Flutter integration test or fake-backed widget test
HTTP/Postman
```

If the same scenario meaning cleanly survives all implementations, propose canonical vocabulary. If test assumptions are implementation/environment specific, keep them pack/usage-level.

## Experiment 8 — aggregate assembly proof

Purpose: decide whether current templates/imports/exports are enough.

Try three cases:

1. one project pack owns all child feature artifacts and root aggregate;
2. one project pack consumes symbols from bound inject packs and builds one aggregate;
3. several independent inject packs need to contribute to one root registry.

If cases 1-2 work cleanly and only case 3 fails, design the smallest explicit contribution/assembly mechanism for case 3.

Do not start with arbitrary source patching.

## Proposed documentation/agent policy after research validation

Eventually, pack authoring guidance should require:

```text
target architecture
official references
semantic → implementation matrix
artifact matrix
selection rationale
context requirements
composition graph
filesystem tree
managed/scaffold ownership
generated testing strategy
native verification commands
known Dryv gaps
```

## Suggested implementation order after experiments

Do not implement all candidates together.

Provisional order:

1. improve pack guidance/agent rules immediately — documentation only;
2. fix pack misuse of existing slots/context before adding contracts;
3. prove arbitrary-path/static-artifact limits;
4. prove closed selector traits;
5. research/implement binary value semantics if confirmed against authoring/IR;
6. research View-presentation address/navigation semantics;
7. prove aggregate composition need;
8. research generated scenario semantics;
9. expand CLI/messaging semantics only through dedicated cross-ecosystem research.

## Completion criteria for this research area

This research is not complete when documents exist. It is complete when we can answer:

- Can Dryv generate idiomatic projects for materially different frameworks without framework logic in the Engine?
- Can an agent explain why every planned artifact exists?
- Can selections express the semantic causes that matter without arbitrary structural querying?
- Can renderer templates stay mostly presentational/implementation-focused?
- Can the Planner represent every tested filesystem topology safely?
- Can packs generate meaningful tests at the right framework-native levels?
- Can we distinguish missing semantic meaning from missing generation mechanics reliably?

Until those questions are demonstrated by proof packs, these documents remain draft.