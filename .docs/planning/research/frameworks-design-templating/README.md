---
status: draft
updated: 2026-10-06
scope: research-only
---

# Framework design and templating research

This workspace studies how Dryv packs should translate canonical software meaning into real framework implementations without making Runtime IR framework-aware.

> This is research, not a contract. Nothing in this folder changes dryv.ir/v1alpha1, dryv.pack/v1alpha1, selector syntax, context contracts, or planner behavior until a separate design decision is approved.

## Research question

How can Dryv remain a framework-neutral compilation system while being expressive enough for packs to generate the architectures, file systems, tests, configuration, registration, and implementation details expected by real software ecosystems?

The investigation is deliberately broader than folder naming. It examines:

- what mainstream frameworks consider a meaningful architectural unit;
- what their official generators create, aggregate, register, update, or test;
- which facts are software meaning and therefore possible Runtime IR vocabulary;
- which facts are implementation choices and must stay inside packs;
- whether current selections can express *why* an artifact should exist;
- whether current template context is rich enough for simple renderers to produce sophisticated implementations;
- whether the Planner can represent every required artifact topology without understanding framework conventions;
- how generated tests can verify canonical meaning rather than merely compile;
- what an AI agent must understand before designing a pack.

## Documents

1. [Framework architecture evidence](01-framework-architecture-evidence.md)
2. [Current Dryv baseline and gap audit](02-current-dryv-gap-audit.md)
3. [Semantic vocabulary candidates](03-semantic-vocabulary-candidates.md)
4. [Selections, context, artifacts and composition](04-selection-context-artifact-model.md)
5. [Generated testing and verification](05-generated-testing.md)
6. [Agent pack-engineering mental model](06-agent-pack-engineering-model.md)
7. [Research conclusions and experiments](07-conclusions-and-experiments.md)
8. [Reference index](REFERENCES.md)

## Locked architectural boundary

```text
Authoring source
    ↓
Author compiler
    ↓
Canonical Runtime IR              software meaning
    ↓
Engine                             validation, selection, planning, context, trace
    ↓
Template pack                      implementation design and artifact realization
    ↓
Template server                    syntax analysis and rendering only
    ↓
Client                             filesystem/process/application
```

The research uses this test continuously:

| Question | Owner |
| --- | --- |
| Does this fact remain true if NestJS is replaced by Spring, Flutter by React, or SQLAlchemy by TypeORM? | Candidate semantic meaning |
| Does this fact describe how one implementation realizes that meaning? | Pack |
| Does this fact describe generated files, symbols, dependencies, ownership or composition? | Planner / pack contract |
| Does this fact describe Jinja/Handlebars syntax? | Template server |
| Does this require reading or modifying the host workspace? | Client |

## Strong preliminary finding

A production pack must not begin from templates. It should begin from an **implementation model**:

```text
canonical meaning
  → implementation responsibilities
  → artifact families
  → semantic selections
  → invocation/partition strategy
  → dependency/composition graph
  → template context
  → filesystem topology
  → rendered resources
  → native verification
```

The pack is allowed to add implementation detail. A Nest pack may decide that a feature is realized as a module/controller/provider family. A Flutter pack may decide that a View becomes a screen plus view model/state provider. A Rails pack may decide that a resource uses model/controller/routes/tests. Those are not new Runtime IR semantics.

Conversely, a pack must not invent missing software meaning merely to make generation convenient. When several unrelated ecosystems require the same missing concept and that concept survives implementation replacement, the gap should be investigated in Runtime IR instead of hidden in names, tags, pack keys or template conventions.

## Evidence standard

A proposed change is not justified by one framework or one template. This research uses four evidence classes:

1. **Canonical evidence** — the current Runtime IR and Engine contracts.
2. **Pack evidence** — current Dryv packs and places where templates are forced to infer or skip behavior.
3. **Framework evidence** — official architecture, style and testing guidance.
4. **Generator evidence** — official/native generators and how they create or modify project artifacts.

A candidate expansion should state all four where applicable.

## Non-goals

- Do not add controller, service, repository, component, hook, decorator, widget, annotation, module or similar framework vocabulary to Runtime IR.
- Do not turn Runtime IR into a programming-language AST.
- Do not add generic JSONPath/expression selectors merely to make selectors powerful.
- Do not make the Engine understand NestJS, Spring, Flutter, Next.js, Rails or another ecosystem.
- Do not add hidden project mutation or last-writer-wins behavior.
- Do not assume source code is the only generated artifact.

## Desired end state

Dryv should be able to compile the same canonical meaning into radically different realizations, including:

- feature-oriented, layer-oriented, package-oriented and file-system-routed source trees;
- code, manifests, configuration, schemas, documentation, test suites, migrations, fixtures and static assets;
- one-subject/one-file, one-subject/many-file, many-subject/one-file and many-subject/many-file outputs;
- whole generated projects, packages, inject packs and reusable fragments;
- generated implementation plus generated verification;
- arbitrary safe relative paths and arbitrary text/static artifact formats;
- explicit, traceable integration between artifacts without framework-specific Engine logic.
