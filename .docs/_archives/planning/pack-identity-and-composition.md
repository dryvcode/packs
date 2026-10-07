> Archived 2026-10-07. Historical planning only. Active execution moved to `.docs/tasks/pack-modernization/`.

# Pack identity, unit composition and binding compatibility

Status: **scheduled design / prerequisite to pack layout refactor**

Updated: **2026-10-06**

This plan extends the scheduled `inject | unit` refactor with three related goals:

1. simplify pack names and identities;
2. make root-owning units compose implementation packs instead of duplicating them;
3. make the Engine reject incompatible pack bindings before generation.

The broad architectural research remains in the Dryv repository. This file owns the packs-repository migration intent and concrete proof cases.

## 1. Simple pack names

A pack path already contains layout and purpose:

```text
packs/<layout>/<purpose>/<name>
```

The terminal name should therefore be the **smallest stable discriminator inside that layout/purpose**, not a sentence that repeats the parent folders.

Current examples:

```text
inject/backend/nestjs-backend
inject/persistence/typeorm-entities
inject/validation/zod-schemas
package/clients/dart-client-sdk
package/testing/postman-collection
project/frontend/flutter-app
```

Target style after the layout migration:

```text
inject/backend/nestjs
inject/persistence/typeorm
inject/validation/zod
unit/clients/dart
unit/testing/postman
unit/frontend/flutter
```

The name must stay descriptive when the parent purpose is not enough to distinguish the implementation.

For example, a future frontend purpose may legitimately contain several React packs:

```text
inject/frontend/react-forms
inject/frontend/react-table
inject/frontend/react-query
```

Do not shorten until meaning is lost.

### Naming rule

Prefer:

```text
<technology>
<technology>-<variant>
```

Avoid suffixes that merely repeat the purpose:

```text
-backend
-client-sdk
-entities
-models
-schemas
-validation
-collection
-app
```

when that information is already unambiguous from the parent purpose.

Use the ecosystem's recognizable canonical name. For example, `nestjs` is preferable to an invented alias when the public ecosystem is normally identified as NestJS.

## 2. The same short name may exist in both layouts

This is intentional:

```text
inject/backend/nestjs
unit/backend/nestjs
```

They are different packs with different generation roles.

The inject pack provides NestJS implementation artifacts inside a unit.

The unit pack establishes a runnable NestJS unit and assembles bound implementation artifacts.

The layout is part of canonical pack identity, so terminal names do not need to be globally unique across layouts.

### Manifest key implication

Current catalogue tooling expects:

```text
key = <purpose>.<name>
```

and globally rejects duplicate keys.

That rule cannot survive same-name inject/unit pairs.

During the refactor, make pack identity layout-aware. Preferred direction:

```text
inject/backend/nestjs
  key: inject.backend.nestjs

unit/backend/nestjs
  key: unit.backend.nestjs
```

If later research proves the manifest `key` is redundant with canonical pack identity, removal can be considered separately. Do not keep a globally ambiguous `backend.nestjs` key for two different packs.

Release refs continue to derive from the full pack ID.

## 3. Units should assemble, not repeat inject implementation

A unit pack should primarily own the root-level artifacts and assembly needed to make a generated unit usable.

It should not copy implementation already available through an inject pack.

### Current NestJS problem

Today these two packs overlap heavily:

```text
inject/backend/nestjs-backend
project/backend/nestjs-app
```

Both select HTTP Operations by Feature and generate controller/service/module behavior.

That is unnecessary duplication.

Target split:

```text
inject/backend/nestjs
  HTTP controllers
  feature service boundary
  feature Nest module / registration artifact
  Nest-specific adapters
  generated tests tied to those artifacts where appropriate

unit/backend/nestjs
  package/project manifest
  TypeScript configuration
  bootstrap/main
  root application module
  root configuration
  assembly of bound server-operation artifacts
```

The unit should consume the server-side operation capability produced by the inject pack.

## 4. Canonical composition terminology

Use Dryv's existing explicit capability vocabulary:

```text
provider pack  -> provides
consumer pack  -> needs
dryv.yaml      -> bind
```

Do not introduce a second `requires` relationship for pack-to-pack composition.

Conceptually a unit “requires” other implementation capabilities, but the canonical manifest spelling remains `needs`.

A unit must not silently activate concrete packs.

## 5. Example NestJS capability graph

Target conceptual graph:

```text
unit/backend/nestjs
    needs operation.server
              │
              ▼
inject/backend/nestjs
    needs schema.validation
    needs schema.persistence (optional)
         │               │
         ▼               ▼
inject/validation/zod   inject/persistence/typeorm
```

The project Usage document chooses every concrete provider.

This preserves:

```text
PACK declares NEEDS.
USAGE chooses PROVIDERS.
ENGINE validates bindings.
```

## 6. Pack-level dryv.example.yaml

Any pack may carry a normal usage example. Unit examples are especially useful because they can demonstrate a complete recommended composition:

```text
dryv.example.yaml
```

This is **not runtime authority** and must not make generation implicitly activate sibling packs. The full compact-example, output-override and import-addressing design is tracked in [pack examples and output overrides](pack-examples-and-placements.md).

Its purposes are:

- show the complete recommended composition;
- show real `needs` bindings;
- show compatible validation/persistence/client choices;
- provide a fixture for pack validation;
- give humans and AI agents a correct starting point;
- later allow CLI initialization/add flows to materialize explicit project-owned Usage configuration.

Example direction:

```yaml
# unit/backend/nestjs/dryv.example.yaml

version: dryv/v1alpha1

sources:
  # normal explicit sources

destinations:
  code:
    backend:
      path: apps/backend

packs:
  app:
    path: unit/backend/nestjs
    destination: { $ref: "#/destinations/code/backend" }
    bind:
      operation.server: { $ref: "#/packs/http" }

  http:
    path: inject/backend/nestjs
    destination: { $ref: "#/destinations/code/backend" }
    bind:
      schema.validation: { $ref: "#/packs/validation" }
      schema.persistence: { $ref: "#/packs/persistence" }

  validation:
    path: inject/validation/zod
    destination: { $ref: "#/destinations/code/backend" }

  persistence:
    path: inject/persistence/typeorm
    destination: { $ref: "#/destinations/code/backend" }
```

Exact source syntax must follow the current Usage contract when implemented.

### Tooling behavior

Future tooling may:

```text
dryv pack validate
  -> validate dryv.pack.yaml
  -> validate templates/filesystem
  -> validate dryv.example.yaml when present
  -> resolve its complete binding graph
  -> prove compatibility

dryv packs add unit/backend/nestjs
  -> inspect the unit's declared needs
  -> show compatible provider choices
  -> optionally use dryv.example.yaml as a recommended composition
  -> write explicit activations/bindings into the user's dryv.yaml
```

The CLI may help the user construct Usage. The Engine still receives explicit Usage and never adds packs implicitly.

## 7. Current binding validation is insufficient

Current Engine binding validation proves:

- the consumer declares the slot;
- provider activation exists;
- provider declares the slot;
- required needs are bound;
- self-binding is rejected;
- cycles are rejected.

That is necessary but not sufficient.

It does not currently prove that generated representations are compatible.

For example, a TypeScript consumer could bind a Python provider if both advertise the same slot.

## 8. Runtime target metadata

Language/framework data currently lives under discovery-only `catalog` metadata.

The Engine must not start using catalogue metadata as runtime authority.

If compatibility checking is required, promote the necessary implementation-target facts into an explicit runtime pack contract.

Research direction:

```yaml
target:
  languages: [typescript]
  frameworks: [nestjs]
```

Potential future axes, only when proven:

```text
languages
frameworks
runtime/platform
module/package system
target platform
```

Catalogue language/framework filters should then be derived from this authoritative target metadata rather than maintained as a competing copy.

These facts describe the **generated implementation target**, not Runtime IR software meaning.

## 9. Per-need compatibility constraints

A need should declare only the compatibility dimensions that matter for that relationship.

Conceptual syntax:

```yaml
needs:
  operation.server:
    required: true
    match:
      languages: same
      frameworks: same

  schema.validation:
    required: true
    match:
      languages: same

  schema.persistence:
    required: false
    match:
      languages: same
```

The exact schema is not locked.

### Meaning

For a declared match dimension the Engine must prove compatibility and fail planning if it cannot.

For list-valued targets such as frameworks, `same` should mean a compatible common target exists, not necessarily byte-for-byte equality of the complete metadata arrays.

Do not use a generic:

```yaml
strict: false
```

for correctness constraints.

If framework matching is necessary, declare it and enforce it.

If framework matching is irrelevant, omit that dimension.

This makes each constraint explainable in diagnostics.

## 10. Compatibility is more than language/framework

Language/framework matching catches obvious errors but is not enough by itself.

The full binding audit should eventually consider:

### Capability identity

The provider must provide the exact capability the consumer needs.

Already implemented.

### Semantic subject

The provider capability must cover the expected canonical subject.

Already partially implemented by the slot catalogue.

### Coverage

Every referenced semantic subject required by the consumer must actually be represented by the provider.

Already partially implemented as uncovered-subject validation.

### Implementation target

When the need requests it:

- language compatible;
- framework compatible;
- runtime/platform compatible.

### Representation contract

Two providers can share a language and still expose incompatible generated forms.

Example:

```text
Zod runtime schema
Joi runtime schema
class-validator decorated DTO
```

A consumer must not branch on provider pack IDs forever.

Research a capability-level representation contract so a consumer can declare which representation forms it knows how to consume.

This metadata belongs to the generation/capability plane, not Runtime IR.

### Locality

Some generated representations must live in the same generated unit.

Others are intentionally consumed across units through package identity.

A need may eventually require:

```text
same-unit
cross-unit/package
either
```

The Engine must reject a cross-unit binding when the consumer only knows how to generate same-unit imports.

### Package/import reachability

For cross-unit dependencies, the provider must expose enough package/unit identity for the consuming template to build a valid import.

### Dependency compatibility

Merged unit dependencies must not silently contain incompatible runtime/tool versions.

If two packs require incompatible dependency ranges, planning or validation should fail with the contributing packs identified.

### Choice compatibility

Packs sharing a unit must resolve shared choices consistently, for example one JavaScript package manager for the unit.

### Artifact ownership/collisions

Existing one-output-path/one-owner rules remain mandatory.

### Binding cycles

Existing cycle rejection remains mandatory.

## 11. Aggregate capability consumption is a real Engine gap

Current slot imports are primarily resolved while rendering a semantic-subject representation.

A root unit file such as:

```text
src/app.module.ts
```

must often import **all registerable artifacts** from a bound provider.

For NestJS:

```text
many canonical HTTP Operations
      ↓
inject/backend/nestjs
      ↓ grouped by Feature
feature Nest modules
      ↓
unit/backend/nestjs root app module
```

The unit root is not itself one Operation, so this is not normal subject-reference import resolution.

Research an explicit aggregate capability-consumption mechanism.

Conceptual behavior:

```text
global/root template
    imports all unique artifacts provided through operation.server
    deduplicated by provider artifact/invocation
    receives their declared registration symbols
```

Do not solve this by:

- scanning provider output directories;
- parsing sibling filenames;
- hardcoding pack paths;
- asking the template server to discover files;
- duplicating controllers/modules in the unit pack.

## 12. Capability provisions may need an explicit exported symbol role

A collected provider artifact can expose several symbols.

Current Nest feature output already has concepts equivalent to:

```text
controller
service
module
```

A unit needs the registerable module symbol, not every symbol.

Research allowing a provision to state which generated symbol satisfies a capability.

Conceptual example:

```yaml
provides:
  operation.server:
    $ref: "#/templates/server"
    symbol: module
```

The exact syntax is not approved.

The important rule is that the consumer should import the capability's declared public representation, not infer a symbol from a framework naming convention.

## 13. Naming migration examples

Representative target mapping:

```text
inject/backend/nestjs-backend
  -> inject/backend/nestjs

inject/persistence/typeorm-entities
  -> inject/persistence/typeorm

inject/persistence/mongoose-models
  -> inject/persistence/mongoose

inject/validation/zod-schemas
  -> inject/validation/zod

inject/validation/joi-schemas
  -> inject/validation/joi

inject/validation/class-validator-dtos
  -> inject/validation/class-validator

package/backend/spring-boot-backend
  -> unit/backend/spring

package/backend/fastapi-backend
  -> unit/backend/fastapi

package/clients/dart-client-sdk
  -> unit/clients/dart

package/clients/ts-api-client
  -> unit/clients/typescript

package/testing/postman-collection
  -> unit/testing/postman

package/testing/bruno-collection
  -> unit/testing/bruno

package/testing/k6-smoke-tests
  -> unit/testing/k6

package/documentation/openapi
  -> unit/documentation/openapi

project/backend/nestjs-app
  -> unit/backend/nestjs

project/frontend/flutter-app
  -> unit/frontend/flutter

project/frontend/nextjs-app
  -> unit/frontend/nextjs

project/frontend/react-native-app
  -> unit/frontend/react-native
```

This is a direction, not a mechanical rename table. Every pack must be checked for genuine variants before final naming.

## 14. Refactor order

Do not perform naming as an isolated move before the layout contract changes.

Recommended sequence:

1. Dryv: approve `inject | unit`;
2. Dryv: define runtime target metadata used for compatibility;
3. Dryv: add required server-side capability/aggregate-consumption behavior;
4. Dryv: extend binding validation;
5. packs: rename/move layouts and simplify terminal names in one repository-wide migration;
6. packs: split duplicated unit/inject responsibilities, starting with NestJS;
7. packs: add `dryv.example.yaml` to units;
8. packs: validate every example composition;
9. packs: remove provider-pack-key branching where capability representation contracts replace it;
10. verify catalogue, release IDs, fixtures and native generated output.

## 15. Required diagnostics

The Engine should explain rejected composition precisely.

Examples:

```text
usage.bind.language_mismatch
unit/backend/nestjs needs operation.server in typescript,
but the selected provider targets python.

usage.bind.framework_mismatch
unit/backend/nestjs requires a NestJS-compatible operation.server provider,
but inject/backend/fastapi targets FastAPI.

usage.bind.representation_mismatch
inject/backend/nestjs accepts schema.validation representation X or Y,
but the selected provider exposes Z.

usage.bind.locality_mismatch
inject/backend/nestjs requires schema.persistence in the same generated unit,
but the provider is bound from another unit without a consumable package identity.

usage.bind.dependency_conflict
two packs in backend require incompatible versions of dependency X.
```

A generation plan must fail before rendering when compatibility cannot be proven.

## 16. End state

A user should be able to understand a unit composition directly:

```text
unit/backend/nestjs
  needs:
    operation.server
      same language
      same framework

inject/backend/nestjs
  provides:
    operation.server
  needs:
    schema.validation
      same language
    schema.persistence
      same language, optional

inject/validation/zod
  provides:
    schema.validation

inject/persistence/typeorm
  provides:
    schema.persistence
```

And `dryv.yaml` explicitly chooses:

```text
which provider fills each need
which destination each pack targets
which options/choices apply
```

The Engine then proves the graph is compatible before any source code is rendered.
