---
status: draft
updated: 2026-10-06
scope: research-only
---

# Agent pack-engineering mental model

This document is intended to become the basis for instructions given to AI agents that design or extend Dryv packs.

## Core rule

> Do not start by writing templates.

A template is the last implementation step. Before creating it, the agent must prove why the artifact exists, what semantic meaning drives it, how the target ecosystem expects that responsibility to be implemented, what other artifacts it depends on, and how generated output will be verified.

## The mental model

```text
Runtime IR meaning
     │
     ├─ what does the software mean?
     │
     ▼
Target implementation architecture
     │
     ├─ how does this ecosystem normally realize that meaning?
     │
     ▼
Artifact responsibility graph
     │
     ├─ which implementation responsibilities/files/config/tests exist?
     │
     ▼
Dryv selection + partition design
     │
     ├─ what semantic fact causes each artifact invocation?
     │
     ▼
Context + dependency design
     │
     ├─ what facts does rendering need, and what should be prederived?
     │
     ▼
Templates / static resources
     │
     ▼
Native verification
```

## Phase 0 — read Dryv before reading the framework

The agent must know:

- the current selectable subjects;
- roles/facets/kinds available for each subject;
- current selection scopes;
- documented context shape for every subject used;
- current provides/needs/binding capabilities;
- template filesystem rules;
- ownership rules;
- plan/trace behavior;
- the canonical sample IR.

Never assume a remembered Dryv capability exists.

## Phase 1 — define the pack target precisely

Bad target:

```text
Spring backend
```

Good target:

```text
Spring Boot 4 REST backend
Java
feature/domain-oriented package structure
Spring MVC controllers
Spring Data JPA supplied by a separate persistence pack
JUnit integration tests
Maven or Gradle chosen by pack option/project pack
```

For ecosystems with several legitimate styles, the pack must either:

1. choose and document one style; or
2. expose an explicit pack option if both styles are worth maintaining.

Do not make templates silently guess architecture.

## Phase 2 — authoritative framework research

Use this evidence order:

1. official framework architecture/style guide;
2. official framework CLI/generator behavior;
3. official testing guidance;
4. official example/reference application;
5. only then mature community conventions if official guidance is intentionally silent.

For every target framework record:

- recommended organization boundary;
- generated/scaffolded artifact types;
- registration/composition mechanisms;
- dependency-injection/service boundaries;
- configuration/build manifests;
- test types and locations;
- source ownership expectations;
- alternative supported architectures.

Do not infer architecture from one random GitHub project.

## Phase 3 — build a semantic-to-implementation matrix

Before template work, create a table like:

| Runtime meaning | Implementation responsibility | Artifact(s) | Reason |
| --- | --- | --- | --- |
| Feature + HTTP Operations | expose HTTP capability | controller | framework mapping |
| same Feature | injectable application boundary | provider/service contract | pack architecture |
| same Feature | composition | module | framework composition |
| HTTP Operation | request validation | DTO/schema adapter | bound capability |
| HTTP Operation | endpoint verification | E2E test | canonical transport contract |

Important: the middle column is allowed to contain framework implementation concepts. The left column must remain canonical Dryv meaning.

## Phase 4 — classify every required fact

When the implementation needs a fact, classify it before hacking:

### A. Already canonical

Example: HTTP method/path, schema fields, Operation failures.

Use documented context.

### B. Derivable from canonical meaning

Example: effective path, operations referenced by a View, whether an Operation has failures.

Propose Engine derived context/classifier if repeated and useful.

### C. Pack implementation choice

Example: controller vs minimal endpoint, Riverpod vs ChangeNotifier, module naming.

Keep in pack design/options.

### D. Generated representation fact

Example: validation provider produces a runtime schema object vs annotated DTO.

Use/refine provides-needs composition or generation-plane metadata.

### E. Missing software meaning

Example: exact user-facing route address, uploaded file value.

Stop and record a Runtime IR research gap. Do not encode it in a tag or naming convention.

### F. Workspace/application concern

Example: patch handwritten file, execute formatter, install dependencies.

Keep out of Engine semantic interpretation.

## Phase 5 — design artifact families

Do not assume one subject means one file.

Explicitly enumerate:

```text
managed source
scaffold source
test source
manifest/config
registration aggregate
barrels/indexes
fixtures/fakes
documentation
static resources
actions
```

For each artifact decide:

- one per subject?
- one per Feature?
- one per Group?
- one global?
- one per nested semantic item?
- one per pack option/platform target?

## Phase 6 — design selections

For every selection, write a sentence:

> This selection exists because ______ canonical semantic fact means the pack needs ______ implementation responsibility.

Example:

> This selection matches HTTP Operations and partitions them by Feature because this Nest pack implements each feature's HTTP Operations in one feature controller/module boundary.

If the sentence names a framework fact on the left side, the selection is probably wrong.

### Selection checklist

- correct subject?
- smallest sufficient semantic filter?
- role filter only when role is truly required?
- facet filter when reachability matters?
- `each` vs aggregate scope chosen intentionally?
- group-owned subjects handled intentionally?
- zero-match behavior acceptable?
- no template expected to emit empty output?

## Phase 7 — design template context

Templates should **render**, not rediscover Dryv.

Before coding a Jinja/Handlebars loop, ask:

- Is this semantic relationship already present in context?
- Would several templates repeat this lookup?
- Is the template parsing IDs/refs or serialized IR paths?
- Is it inferring ownership by name?
- Is it branching on provider pack key?
- Is it deduplicating semantic relationships manually?

If yes, investigate a derived context or composition improvement.

Pack-owned macros are appropriate for implementation formatting such as:

- language type rendering;
- framework annotation syntax;
- naming a provider method;
- transforming `{id}` to a framework route token;
- framework-specific import style.

They should not determine semantic truth.

## Phase 8 — design artifact dependencies and assembly

Draw the generated graph.

Example:

```text
validation/schema representation ─┐
persistence/entity representation ├─> feature controller/module
                                  │
feature controller/module ────────┼─> root registration
                                  │
HTTP semantic contract ───────────┴─> E2E tests
```

Every import/export/binding should have a reason.

Prefer:

- explicit `needs`/`provides`;
- planner-known imports/exports;
- one owner for aggregate output.

Avoid:

- hardcoded relative imports to another pack's guessed path;
- implicit sibling-pack discovery;
- post-render source patching;
- last-writer-wins files.

## Phase 9 — design filesystem topology

Reproduce the target ecosystem's native conventions. Do not reshape it to resemble another Dryv pack.

Checklist:

- project root files;
- source roots;
- feature/package folders;
- test roots;
- generated indexes/registries;
- special filename syntax;
- platform-specific trees;
- assets/config/docs;
- package/namespace mapping;
- hidden and extensionless files.

Dryv consistency means **consistent contracts**, not identical generated folder layouts.

## Phase 10 — design generated tests

For each implementation responsibility ask:

- What canonical claim does it realize?
- Can that claim be tested without fabricated business assumptions?
- What test level fits the framework?
- What test data is available?
- Does the test need a fake service/repository/provider?
- Is this test generated output or only pack-conformance harness code?

Do not generate meaningless assertions solely to increase test count.

## Phase 11 — implement templates

Only now create template files.

### Template standards

- consume documented context only;
- keep semantic discovery out of renderer logic;
- prefer small macros for language/framework formatting;
- avoid pack-key branching when capability binding can express the dependency;
- no host filesystem reads;
- no process execution;
- no network access;
- deterministic output for identical context/options;
- comments must distinguish scaffold placeholders from semantic truth.

## Phase 12 — prove output natively

A pack is not 'done' because rendering succeeded.

Proof should include as appropriate:

```text
Dryv validate
Dryv plan
Dryv generate into isolated temp output
native formatter
native analyzer/linter
native type checker/compiler
native unit tests
native integration/e2e tests
native build
```

Generated code should be inspected as code a real ecosystem user would accept.

## Mandatory artifact matrix

Every serious pack should maintain a compact design matrix:

| Artifact | Trigger | Scope | Ownership | Dependencies | Verification |
| --- | --- | --- | --- | --- | --- |
| controller | HTTP operation | feature | managed | validation/types | compile + endpoint test |
| service implementation stub | feature | feature | scaffold | domain-specific | compile |
| E2E test | HTTP operation | feature/app | managed | server test harness | native test |

This prevents 'template accumulation' without architecture.

## Mandatory gap log

If an agent cannot produce correct code, it must log the blocker under one of:

```text
IR semantic gap
selection gap
context gap
composition/capability gap
artifact/filesystem gap
renderer limitation
pack implementation bug
native toolchain issue
```

Do not hide the gap with:

- magic tags;
- name prefixes;
- implicit template conventions;
- parsing raw refs;
- pack-key conditionals;
- untracked generated patches.

## Questions an agent must answer before declaring a pack complete

1. What official architecture is this pack implementing?
2. Which alternatives did it intentionally not implement?
3. What canonical subjects trigger every artifact?
4. Why is every selection filtered and partitioned that way?
5. What is managed and what is scaffolded?
6. Which cross-pack capabilities are required/provided?
7. Which aggregate files register generated artifacts?
8. Which tests are generated and what semantic claims do they verify?
9. Which native commands prove the output is valid?
10. Did the pack expose any missing Dryv semantic/context/selection capability?

## Reviewer red flags

Reject or investigate a pack when:

- it has many templates but no artifact matrix;
- every Operation is selected and templates filter internally;
- folder names are copied from another framework's pack;
- tags carry important undeclared semantics;
- templates parse canonical ref strings;
- templates branch on raw provider pack names unnecessarily;
- generated files import paths that the Planner does not know;
- the pack writes a route/module/manifest by patching after render;
- generated tests only assert `true` or construction;
- a project pack omits the native framework's standard verification surface;
- source compiles only because abstract/stub behavior is never exercised;
- a framework recommendation is stated without an official source.

## Desired agent behavior

The agent should behave less like a code-completion model and more like a compiler/backend engineer:

```text
understand semantics
→ understand target ABI/framework conventions
→ design lowering
→ define artifact graph
→ render
→ verify
```

That is the mental model that makes Dryv packs reliable at scale.