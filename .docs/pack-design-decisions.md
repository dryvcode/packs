# Pack repository design decisions

Status: **locked by the project owner unless explicitly reopened**

This document records the current architectural decisions for the Dryv packs
repository.

It is not a substitute for architectural reasoning.

Future contributors and AI agents must read this document before changing pack
structure, licensing, discovery, composition, source handling, generated-file
ownership, or reproducibility behaviour.

## How AI agents must use this document

These decisions represent the owner's current intent. Do **not** silently
reinterpret, replace, or weaken them.

At the same time, do not blindly assume every statement in this document will
remain correct forever.

When working in this area, an AI agent must:

1. use its own software-architecture knowledge and inspect the current Dryv
   contracts before proposing or implementing changes;
2. identify contradictions, scalability problems, security concerns,
   reproducibility problems, licensing concerns, or better alternatives when
   they are discovered;
3. explain those concerns to the user instead of blindly implementing a
   questionable design;
4. ask the user for confirmation before changing any decision marked locked;
5. prefer explicit behaviour over hidden conventions or inferred relationships;
6. preserve Dryv's architectural boundaries:
   - Authoring defines software meaning;
   - Runtime IR is the only semantic authority;
   - Packs define code emission;
   - the Engine validates, selects, binds, plans, builds context and trace;
   - Template Servers only analyse and render their own template syntax;
   - Clients own workspace I/O, Git/process execution, approvals and applying
     output;
7. never introduce a new semantic authority inside packs, the catalogue, folder
   names, the CLI, or a Template Server.

"Locked" means **do not change without asking the owner**. It does not mean
"never question this decision."

---

# 1. Repository grouping

## Decision

Global packs are grouped by their **primary purpose**, not by emitted language,
template language, package manager, or framework.

The repository shape is:

```text
packs/<purpose>/<pack-name>
```

Examples:

```text
packs/
├── backend/
│   ├── nestjs-backend/
│   └── fastapi-backend/
├── frontend/
│   ├── nextjs-app/
│   └── react-app/
├── persistence/
│   ├── typeorm-entities/
│   ├── mongoose-models/
│   └── prisma-models/
├── validation/
│   ├── zod-schemas/
│   └── pydantic-models/
├── api/
│   ├── nestjs-rest/
│   └── graphql-api/
├── contracts/
│   └── openapi-spec/
├── clients/
│   ├── dart-client-sdk/
│   ├── typescript-client-sdk/
│   └── python-client-sdk/
└── documentation/
    └── api-reference/
```

The initial purpose vocabulary should remain small. New top-level purposes are
added only when real packs require them.

Possible future purposes include:

```text
testing/
configuration/
infrastructure/
messaging/
```

They are examples, not pre-approved folders.

## Why

The previous structure:

```text
packs/<language>/<template-language>/<name>
```

made implementation details part of public pack identity.

A pack can change from Jinja to another Template Server without changing what
the pack means or provides. Its public identity should therefore not depend on
the template implementation.

A flat `packs/<name>` structure was rejected because the repository may
eventually contain a very large number of packs and must remain human-browsable.

Purpose-based grouping gives humans useful navigation without making renderer
or language implementation details part of pack identity.

## Important rule: folders carry no runtime semantics

A pack living under:

```text
packs/persistence/typeorm-entities
```

does **not** automatically provide persistence.

Folder names exist for repository organization and discovery only.

The pack must explicitly declare its behaviour in `dryv.pack.yaml`, for
example:

```yaml
provides:
  - schema.persistence
```

The Engine must never infer capabilities, selection behaviour, dependencies,
language, frameworks, output paths, or bindings from repository folders.

## Primary purpose versus metadata

A pack has one primary repository purpose so it has one stable home.

It may belong to many searchable categories.

For example:

```yaml
catalog:
  purpose: persistence
  languages:
    - typescript
  frameworks:
    - typeorm
  tags:
    - entities
    - database
    - orm
```

The catalogue may expose many dimensions. The filesystem hierarchy exposes only
the primary purpose.

---

# 2. Licensing

## Decision

Use:

- **Apache License 2.0** for the repository, pack definitions, tooling, scripts,
  tests and other Dryv-owned pack infrastructure;
- **0BSD** for code-emitting template material whose contents may be copied into
  generated user source code.

Generated application code must be usable under the consuming project's chosen
license.

## Intended boundary

```text
Dryv pack infrastructure / definitions
        Apache-2.0

Code-emitting templates
        0BSD

Generated project source
        consuming project's chosen license
```

## Why

Dryv is intended to be usable by open-source, internal, commercial and
proprietary projects.

The licensing model must not accidentally create copyleft obligations for a
project merely because generated source contains literal material originating
from a Dryv template.

Apache-2.0 is preferred for the main repository because it is permissive and
includes explicit patent terms useful for a collaborative developer ecosystem.

0BSD is preferred for code-emitting template material because it creates very
little downstream licensing friction and does not require generated files to
carry attribution notices merely because template text was copied into them.

Do not invent a custom Dryv license without explicit owner approval and proper
legal review.

Before changing the licensing model, explain the consequences for:

- repository contributors;
- community pack authors;
- generated code;
- commercial/proprietary users;
- redistribution;
- patent rights;
- attribution obligations.

Then ask the owner for confirmation.

---

# 3. Global, local and private packs

## Decision

Distribution does not determine what technology a pack may target.

Any of these may target TypeORM, NestJS, Next.js, Zod, FastAPI or another
public framework:

- official/global packs;
- project-local packs;
- private Git packs.

A company may legitimately maintain its own TypeORM pack because its conventions
are different from the official TypeORM pack.

Therefore this rule is prohibited:

> well-known frameworks are never allowed in local/private packs.

## No implicit precedence

Dryv must not silently prefer:

- global over local;
- local over global;
- official over private;
- one pack because of install order.

The project explicitly declares which packs it uses.

---

# 4. Pack composition is explicit

## Decision

Relationships between packs are first-class contracts.

Installing multiple compatible packs must never create a relationship merely
because they happen to be present in the same project.

Capability relationships use explicit:

- `provides`;
- `needs`;
- project bindings.

Generated-artifact relationships use explicit imports/exports or the equivalent
canonical pack contract.

These are separate concepts.

Example:

```text
typeorm pack
provides schema.persistence

backend pack
needs schema.persistence

dryv.yaml
binds that need to the selected persistence pack
```

The Engine owns validation and binding.

Packs must not discover or bind to one another through hidden naming
conventions, filesystem locations, framework detection, install order, or
Template Server behaviour.

---

# 5. Output collisions are fatal

## Decision

By default:

> one planned output path has one owner.

If two planned artifacts independently target the same output path, planning
fails.

Example:

```text
src/users/index.ts

producer A:
  persistence/typeorm-entities

producer B:
  backend/nestjs-backend
```

Dryv must not resolve this using:

- last writer wins;
- pack order;
- source priority;
- global/local priority;
- template order;
- silent file merging.

The Planner should identify the conflicting producers and explain why the plan
cannot proceed.

A future explicit shared-artifact or composition mechanism may be designed, but
it must be a deliberate contract. It must not weaken the default collision rule.

---

# 6. Pack revisions must resolve to immutable identities

## Decision

Human configuration may use a readable Git tag or revision.

Example:

```yaml
revision: persistence/typeorm-entities/v1.2.0
```

However, reproducible generation ultimately requires Dryv to know the immutable
resolved identity, such as the Git commit SHA and/or a verified content digest.

Git tags alone are not considered sufficient immutable state because tags can
be moved.

## Machine-owned lock state

Dryv should eventually maintain machine-owned resolution state analogous to a
package lockfile.

The exact filename and schema are **not locked yet**.

Possible forms include:

```text
dryv.lock
.dryv/lock.yaml
```

This lock state is not a second user-authored configuration tier.

`dryv.yaml` remains the human-facing usage configuration.

The lock state exists only to preserve resolution/reproducibility information.

## Architectural boundary

Git access and persistence of workspace state remain Client responsibilities.

The Engine must not start performing host Git operations or filesystem I/O.

The Engine receives the resolved pack information it needs for validation,
planning and traceability.

---

# 7. No special hidden `dryv` source type

## Decision

Do not currently add:

```yaml
source:
  type: dryv
```

if it merely hides knowledge of the official GitHub repository, path structure,
catalogue and tag convention.

The preferred user experience is a discovery command such as:

```text
dryv packs add typeorm-entities
```

The CLI may discover the pack from the catalogue and write an explicit Git
source into `dryv.yaml`.

Conceptually:

```yaml
packs:
  persistence:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: persistence/typeorm-entities/v1.0.0
      path: packs/persistence/typeorm-entities
```

This gives users convenience while keeping the runtime configuration explicit.

If a future requirement genuinely justifies a first-class `dryv` source type,
the owner must approve reopening this decision.

---

# 8. The catalogue is discovery-only

## Decision

The public catalogue exists for discovery and presentation, for example:

- search;
- browsing;
- the Dryv website;
- `dryv packs search`;
- `dryv packs add`;
- available versions;
- descriptions;
- categories;
- framework/language filtering.

It is **not** a semantic or runtime dependency.

The catalogue must not become required for:

- `dryv plan`;
- `dryv generate`;
- pack selection;
- binding;
- template context;
- rendering;
- Runtime IR interpretation.

Once a project has an explicit pack source and the pack has been resolved, its
`dryv.pack.yaml` and the normal Dryv contracts are authoritative.

An already configured project must not depend on the catalogue being online in
order to understand or generate from its resolved packs.

The catalogue is an index, not an authority.

---

# 9. Generated-once means scaffolding

## Decision

Do not treat "generated once" as ordinary Dryv-owned generated output.

Use two conceptual ownership modes:

### Managed

Dryv owns the artifact.

Dryv may create, update or delete it according to the current plan.

### Scaffold

Dryv creates the artifact only when it does not exist.

After successful creation, ownership transfers to the project/developer.

Dryv must not later claim that the scaffold is current, synchronized or still
represents the current template merely because the file exists.

A future plan should be able to explain this clearly, for example:

```text
SKIP src/auth/service.ts
reason: scaffold already exists
ownership: project
```

The exact schema terminology is not locked yet, but the ownership distinction
is.

## Partial-file ownership is not currently accepted

Do not implement generic "Dryv owns these individual lines" behaviour as an
assumed future direction.

Line ownership is fragile under formatting, refactors, imports, IDE actions and
human edits.

If partial-file generation is ever introduced, it requires a separate explicit
design with deterministic structural ownership. Ask the owner before adopting
such a model.

---

# 10. Summary of locked invariants

The following principles are currently locked:

1. Repository packs are grouped by stable **primary purpose**:
   `packs/<purpose>/<pack-name>`.
2. Folder structure is organizational only and carries no runtime semantics.
3. Repository/pack infrastructure uses **Apache-2.0**.
4. Code-emitting templates use **0BSD** so generated application code remains
   licensing-friendly.
5. Local/private packs may target the same public technologies as official
   packs.
6. Pack composition is explicit through declared contracts and project
   bindings.
7. One normal output path has one owner; unapproved collisions fail planning.
8. Pack revisions must ultimately resolve to immutable reproducibility state.
9. `dryv.yaml` remains the human-facing usage configuration; resolution state
   may be machine-owned.
10. There is no special `source: { type: dryv }` unless a real future
    requirement justifies reopening the decision.
11. The catalogue is for discovery only and is never a semantic/runtime
    authority.
12. Generated-once output is scaffolding: after creation, ownership belongs to
    the project.
13. Generic line-level Dryv ownership is not an approved design.
14. Future AI agents must challenge contradictions and risks, but must ask the
    owner before changing locked decisions.

These decisions should be reflected in future repository plans, pack schemas,
CLI work and documentation. If another document conflicts with this one, do not
silently choose either version. Surface the conflict to the owner and ask which
direction is authoritative.
