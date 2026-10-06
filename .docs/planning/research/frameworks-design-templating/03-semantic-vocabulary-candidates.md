---
status: draft
updated: 2026-10-06
scope: research-only
---

# Semantic vocabulary candidates

This document asks where Runtime IR may actually be too small for the code we want packs to generate. It does **not** propose importing framework nouns into canonical meaning.

## Admission rule

A candidate belongs in Runtime IR only if all are true:

1. it describes the software independent of a chosen framework;
2. it can be authored and validated without knowing generated files;
3. at least two materially different implementation ecosystems can realize it;
4. changing implementation technology should not erase the fact;
5. packs need the fact to generate materially different correct behavior, not merely prettier code;
6. the fact has one clear semantic owner.

Failure of this test sends the concept to packs/planning instead.

## Candidate A — interaction navigation / addressability

### Current state

Views can bind to Surfaces through local presentations, but current IR explicitly has no canonical navigation or routing meaning. The Flutter and Next.js project packs therefore invent routes from Group/View names.

### External evidence

- Next.js uses route segments, dynamic segments, route groups, layouts, parallel slots and intercepting routes.
- Flutter views commonly have routes, and Flutter's architecture guidance recommends a navigation solution such as go_router.
- Web, mobile, desktop and CLI surfaces all need a way for a user or system to reach an interaction, although their concrete address forms differ.

### Semantic core

The durable meaning is not `page.tsx`, `GoRoute`, or `@Get`. It is closer to:

```text
this View is addressable in this presentation/surface
this address has named semantic parameters
this interaction can navigate to another address
```

### Candidate direction

Research a **View-presentation-owned interaction address** rather than resurrecting the old root Presentation registry.

Possible shape for study only:

```yaml
views:
  orders.OrderDetails:
    presentations:
      web:
        surface: { $ref: '#/surfaces/web' }
        address:
          kind: path
          pattern: /orders/{orderId}
          bindings:
            orderId:
              $ref: '#/views/orders.OrderDetails'
              context: orderId
```

For CLI a future surface-specific address could be a command path rather than a web path. The exact schema is intentionally undecided.

### Confidence

**High that a gap exists; medium on the owning shape.**

## Candidate B — binary/file/media value meaning

### Current state

String formats currently include `file-path` and `file-name`, which describe strings. They do not describe a file/blob/byte-stream value.

The existing generated k6 and HTTP smoke-test templates explicitly skip multipart file parts with the comment that Runtime IR has no first-class file-part semantics.

### Why this is semantic

A value representing an uploaded image, byte stream, document, audio payload or downloadable file remains that kind of value whether it is implemented with Nest, Spring, FastAPI or ASP.NET.

HTTP multipart is only one transport mapping. The value itself should not become `multipart`.

### Candidate direction

Research a reusable binary/media Property family or another canonical value representation capable of expressing at least:

- opaque bytes/blob;
- optional media/content type constraints;
- optional size constraints;
- semantic file name metadata only where meaningful;
- streaming vs materialized value only if proven to be software meaning.

Then HTTP multipart/form mappings can bind that value without inventing its meaning.

### Confidence

**High.** This is supported by an existing pack limitation and is implementation-independent.

## Candidate C — callable CLI exposure

### Current state

Runtime IR has `surface.kind: cli`, but Operation facets currently cover HTTP, WebSocket and schedule. A CLI Surface does not currently make an Operation callable as a command.

### Semantic core

`deploy project --environment production` and an HTTP endpoint can invoke the same underlying Operation while having different callable interface mappings. Command name, named options/arguments, flags and standard input/output are interface semantics, not a particular CLI framework's classes.

### Candidate direction

Research `operation.facets.cli` as a sibling of HTTP/WebSocket/schedule rather than treating commands as Views or tags.

Potential meanings to investigate:

- command path/name;
- positional argument bindings;
- option/flag bindings;
- environment/stdin bindings where they are stable interface semantics;
- exit/failure mapping.

Do **not** model Cobra commands, Click decorators, argparse parsers, Commander.js objects or Spring Shell annotations.

### Confidence

**Medium-high**, but requires dedicated CLI-framework research before schema work.

## Candidate D — authored executable scenarios/examples

### Current state

Schemas can carry examples, but Operations do not currently own example invocations with expected outcomes. Testing packs therefore synthesize placeholders such as `test@example.com`, UUID constants and `1` from type shape.

That is useful for smoke scaffolding but does not prove business behavior.

### Semantic core

An authored statement such as:

```text
given this valid operation input
when CreateOrder executes
then it succeeds with this semantic output
```

is not inherently a Jest, JUnit, pytest or Playwright test. It is executable behavioral evidence/documentation.

### Candidate direction

Research a reusable **scenario/example** semantic contract that may target an Operation or Workflow and can express:

- named input values;
- expected successful output;
- expected Failure;
- expected emitted Events;
- optional preconditions/context where deterministic.

Do not call the canonical concept `test case`. Packs decide whether the scenario becomes unit, contract, integration, E2E, documentation example or fixture.

### Confidence

**Medium.** Strong value for generated verification, but risk of turning IR into a testing DSL must be controlled.

## Candidate E — richer surface/view interaction semantics

### Current state

View Parts deliberately stay small: present, collect and invoke. This is a good anti-framework boundary.

However, current project templates infer implementation behavior such as:

- load-on-open when a Present Part has no associated Collect Part;
- store an invocation result when another Part presents the same Operation;
- construct forms from collected schema fields;
- choose screen/widget composition.

### Recommendation

Do **not** immediately add `form`, `table`, `button`, `modal`, `screen`, `view-model`, `state`, or `component` vocabulary.

Instead research whether missing facts are already expressible as:

- explicit interaction sequencing/workflow;
- navigation;
- View context;
- Operation execution semantics;
- semantic data selection;
- Policy/conditional meaning.

Only add a new View semantic when a pack currently has to invent user-visible behavior that survives framework replacement.

### Confidence

**Low for new Part kinds today.** Preserve the current neutral Part model until concrete cross-framework failures accumulate.

## Candidate F — message/delivery exposures for Events

### Current state

Events describe occurrences and listeners while explicitly excluding brokers, topics, queues, consumer groups and delivery products.

This boundary is correct. However, producing Kafka/NATS/SQS/PubSub adapters may eventually require authored external message-interface contracts analogous to HTTP transport mappings.

### Candidate direction

Do not add `topic` or `queue` merely because packs need names. First research whether there is a framework-neutral **message exposure/delivery facet** with stable semantics:

- externally published vs internal-only;
- message address/channel;
- payload mapping;
- delivery guarantees only if they are genuine contract requirements;
- consumer binding.

Broker products and client libraries remain pack choices.

### Confidence

**Low-medium; future research.** No change should be made from current framework evidence alone.

## Candidate G — nested semantic subjects

Some canonical nested elements have stable local identity and may become useful selection subjects.

### `view.presentation`

A View can have multiple presentations on different Surfaces. Generating one artifact per presentation is plausible and framework-neutral. This resembles the already-selectable `view.part` model.

**Candidate confidence: medium-high.**

### `workflow.step`

Workflow steps have names and typed meaning. Worker/orchestrator packs may reasonably generate one handler/test/registration artifact per step.

**Candidate confidence: medium.**

### `schema.field`

Fields have rich meaning, but most packs consume them inside a schema/view artifact. One-file-per-field is less common. Prefer context until multiple real packs need independent selection.

**Candidate confidence: low today.**

### HTTP bindings/failure mappings

They are semantically meaningful subordinate mappings, but one-operation templates can already iterate them. Independent selection should require concrete artifact-level use cases before adding subjects.

**Candidate confidence: low today.**

## Candidate H — classifier vocabulary derived from existing meaning

Not every selector improvement needs new Runtime IR fields.

The Engine can derive closed classifier facts from meaning already present. Examples worth researching:

### Operation traits

```text
has-input
has-output
declares-failures
emits-events
requires-authentication
requires-policies
idempotent
transactional
cached
retrying
http-body
http-form
http-multipart
```

### Schema traits

```text
has-relations
has-invariants
has-examples
persisted
```

### View traits

```text
has-present
has-collect
has-invoke
presented-on-web
presented-on-mobile
```

These should be closed, subject-specific derived classifiers if adopted. They should **not** be arbitrary dot-path queries.

### Confidence

**High that derived classifiers are useful; exact vocabulary must be proven by pack use cases.**

## Concepts that should stay out of Runtime IR

The research currently rejects canonicalizing:

| Concept | Why |
| --- | --- |
| controller / resolver / route handler | framework implementation |
| service / repository | architecture pattern, not stable semantic meaning |
| module / package / namespace | implementation structure |
| view model / provider / hook / state store | UI implementation strategy |
| DTO / entity / ORM model | representation choice |
| decorator / annotation / middleware / guard / interceptor / pipe | framework mechanism |
| Jest/JUnit/Vitest/Playwright test | verification implementation |
| package.json / pubspec / pom.xml / csproj | project artifact |
| source directory / route folder | generated filesystem |
| dependency-injection token | implementation wiring |

## Vocabulary expansion priority

Recommended research order:

1. binary/file/media value meaning — concrete current blocker;
2. navigation/address meaning — concrete project-pack correctness gap;
3. derived subject traits for selectors — broad pack-design leverage with no new authored meaning;
4. `view.presentation` and `workflow.step` selectability — nested semantic artifact drivers;
5. executable scenarios/examples — generated testing quality;
6. CLI callable facet — broaden callable interface coverage;
7. message/delivery exposure — only after dedicated messaging research.

The goal is not a bigger IR. The goal is the **smallest semantic vocabulary that prevents packs from inventing software meaning**.