# Pack examples and configurable output placement

Status: **scheduled design / prerequisite to pack structure refactor**

Updated: **2026-10-06**

This plan defines two related authoring aids for packs:

1. every pack may provide a realistic `dryv.example.yaml`;
2. packs, especially inject packs, may expose controlled output-placement configuration so projects can fit generated artifacts into their own source structure.

Neither feature changes Runtime IR semantics.

The corresponding Engine/contract implementation roadmap lives in the Dryv repository at:

`.docs/planning/roadmap/pack-placement-and-validation/README.md`

## 1. Correct example filename

The canonical filename is:

```text
dryv.example.yaml
```

Not:

```text
dryv.yaml.example
```

Any pack may contain it:

```text
packs/<layout>/<purpose>/<name>/
├── dryv.pack.yaml
├── dryv.example.yaml      optional
├── templates/
└── tests/
```

This applies equally to:

- inject packs;
- unit packs;
- official packs;
- local packs;
- private packs.

## 2. What dryv.example.yaml means

`dryv.example.yaml` is a **Usage-shaped, validated pack example**. It should be materializable into a normal project `dryv.yaml`, but it should not hard-code repository/source coordinates that make a reusable pack non-portable.

It demonstrates a realistic way to activate the pack, including where useful:

- destination intent;
- this pack's activation;
- pack inputs;
- placement overrides;
- required or recommended companion pack identities;
- capability bindings;
- destination choices;
- actions/choices needed for a realistic generated result.

It is not a second semantic authority.

The exact example schema is not locked yet. A key requirement from stress testing is that it remain **source-neutral**: a pack installed from an official Git source, private Git source or local path must be able to reuse the same example without rewriting embedded source URLs.

A likely model is:

```text
pack example
    ↓
Client resolves self + suggested pack identities from available sources/catalogue
    ↓
preview concrete dryv.yaml edits
    ↓
user accepts
    ↓
ordinary explicit dryv.yaml
```

The Engine should validate the materialized Usage graph using normal contracts.

It does not silently activate packs during normal generation.

It does not replace the user's `dryv.yaml`.

The example is a validated recommendation that tools may use to help construct explicit Usage.

## 3. Why every pack benefits from an example

Today pack tests often maintain private fixture usage documents under:

```text
tests/fixture/dryv.yaml
```

Those are useful to the harness but poor as a public explanation of intended composition.

A root-level example gives one visible contract between pack author, Engine, user and AI agent:

```text
dryv.pack.yaml
  says what the pack can do

dryv.example.yaml
  shows one realistic way to use it

templates/
  implement the generation

tests/
  prove the result
```

This reduces guessing during pack authoring.

## 4. Tool behavior

### Pack validation

When `dryv.example.yaml` exists, pack validation should validate it automatically.

Conceptually:

```text
dryv pack validate

1. validate dryv.pack.yaml
2. validate source/template filesystem
3. validate selections and template references
4. validate dryv.example.yaml
5. confirm the example activates this pack
6. resolve all example bindings
7. validate compatibility
8. build a plan from the example
9. report missing providers, collisions or invalid structure
```

The example should therefore be executable enough to reveal whether the pack author actually understands how the pack is expected to compose.

### Pack test harness

The public packs harness should be able to use `dryv.example.yaml` as the default Usage fixture when appropriate.

Pack-local test fixtures may still add environment files or specialized test configuration.

A long-term direction is:

```text
dryv.example.yaml
    ↓
canonical realistic usage

tests/fixture/
    ↓
extra native/toolchain test files only
```

Do not force every test immediately to use the example until the harness supports composition examples cleanly.

### Adding a pack

Interactive tooling may treat the example as the default proposal:

```text
dryv packs add unit/backend/nestjs
```

could:

1. load and validate the pack;
2. inspect its needs;
3. inspect `dryv.example.yaml`;
4. propose the example's companion providers and bindings;
5. show compatible alternatives;
6. show the resulting `dryv.yaml` change;
7. write only after approval.

The resulting project configuration remains explicit.

For non-interactive use, tooling should require an explicit option before materializing additional suggested packs. Do not turn an example into hidden dependency activation.

## 5. Example as recommendation, not provider lock-in

A pack may have many valid providers.

Example:

```text
inject/backend/nestjs
  needs schema.validation
```

Its example may choose:

```text
inject/validation/zod
```

That means:

> Zod is one tested/recommended composition.

It must not mean:

> Zod is the only legal provider.

Compatibility constraints on `needs` determine what is legal.

The example determines one known-good path.

Catalogue/search tooling can later discover other compatible providers.

This avoids adding a second hard-coded `suggests` dependency system unless real use proves it necessary.

## 6. Units become easy to consume without hidden magic

A unit can remain explicit and composable while still providing a standalone user experience.

For example:

```text
unit/backend/nestjs
  needs operation.server
```

Its `dryv.example.yaml` can demonstrate:

```text
unit/backend/nestjs
      ↓ binds
inject/backend/nestjs
      ↓ binds
inject/validation/zod
inject/persistence/typeorm
```

Then:

```text
dryv packs add unit/backend/nestjs
```

can propose that complete tested composition.

The user does not need to already understand every internal pack.

But after addition, the project still contains explicit normal Usage:

```text
packs:
  app: ...
  server: ...
  validation: ...
  persistence: ...
```

Therefore convenience does not weaken explainability.

## 7. Inject packs need placement flexibility

Inject packs frequently target existing codebases.

Existing projects do not agree on one filesystem convention.

All of these can be reasonable:

```text
src/modules/orders/dto/
src/modules/orders/controllers/
src/orders/dto/
modules/orders/controller.ts
controllers/orders.controller.ts
_generated/dto/
_generated/entities/
generated/contracts/
```

A reusable pack should not require one universal source layout merely because its template source tree uses one structure.

At the same time, Dryv must not allow arbitrary hidden filesystem logic.

The answer is a small explicit **placement contract**.

## 8. Destination versus placement

Keep these concepts separate.

### Destination

Usage-level project/workspace root.

Example:

```yaml
destinations:
  code:
    backend:
      path: apps/backend/src
```

### Placement

Pack-relative artifact structure inside that destination.

Example:

```text
modules/$(group.name.kebab)/dto
_generated/dto
controllers
```

Therefore:

```text
workspace path
=
usage destination
+
resolved pack placement
+
resource filename
```

The Engine owns this resolution.

## 9. Named placement declarations

A pack may expose named placement points.

Conceptual pack syntax:

```yaml
placements:
  dto:
    description: Generated DTO placement.
    path: modules/$(group.name.kebab)/dto
    filename: $(name).dto.ts

  controller:
    description: Generated feature controller placement.
    path: modules/$(feature.name.kebab)
    filename: controller.ts
```

A template opts into a public placement:

```yaml
templates:
  dto:
    $ref: "#/selections/schemas"
    placement: dto
    output:
      name: $(subject.name.kebab)
      symbol: $(subject.name.pascal)Dto

  controller:
    $ref: "#/selections/controllers"
    placement: controller
    output:
      name: $(feature.name.kebab)
      symbols:
        controller: $(feature.name.pascal)Controller
```

Exact schema is not yet locked.

## 10. Usage overrides only declared placements

Conceptual usage:

```yaml
packs:
  validation:
    path: inject/validation/class-validator
    destination: { $ref: "#/destinations/code/backend" }

    place:
      dto:
        path: _generated/dto
```

or:

```yaml
packs:
  validation:
    place:
      dto:
        path: modules/$(group.name.kebab)/dto
        filename: $(name).dto.ts
```

or:

```yaml
packs:
  http:
    place:
      controller:
        path: modules/$(feature.name.kebab)
        filename: controller.ts
```

The user may only override a placement key explicitly exposed by the pack.

Usage must not reach into arbitrary template internals or source-resource paths.

## 11. Why named placements are better than generic path inputs

A normal string input such as:

```yaml
inputs:
  output_path: modules/orders/dto
```

is too weak because the Engine cannot tell whether it is:

- a filesystem path;
- a semantic naming pattern;
- an ordinary string passed into a template;
- safe to interpolate;
- allowed to contain semantic tokens;
- expected to affect collision/import calculations.

A placement is explicitly generation topology.

The Engine can therefore:

- validate path syntax;
- validate allowed semantic interpolation tokens;
- prevent traversal;
- resolve final paths before render;
- compute relative imports from final paths;
- detect collisions;
- record placement provenance in the plan/trace;
- explain that a path changed because Usage overrode a named placement.

## 12. Placement patterns are generation-plane expressions

Placement patterns may use the same closed planning vocabulary Dryv already understands, for example:

```text
$(subject.name.kebab)
$(feature.name.kebab)
$(group.name.kebab)
$(name)
```

Do not allow arbitrary template language inside Usage.

Do not allow Jinja/Handlebars expressions in placement configuration.

Do not allow arbitrary Runtime IR field access.

Placement expressions remain a small Engine-owned planning language.

This preserves deterministic planning.

## 13. File-name overrides

Folder flexibility alone is not enough.

Some projects prefer:

```text
controllers/orders.controller.ts
```

while others prefer:

```text
modules/orders/controller.ts
```

Therefore a declared placement may expose both:

```text
path
filename
```

The Engine must resolve the final filename before collision and generated-dependency resolution.

For a placement attached to a template that emits multiple files, filename override is ambiguous.

Initial rule should therefore be conservative:

- path override may apply to a multi-resource template boundary;
- filename override is valid only when the placement's target has one emitted resource, unless a future resource-level mapping is explicitly designed.

Reject ambiguity rather than guessing.

## 14. Pack authors choose what is configurable

Not every output should be movable.

A unit may intentionally own a conventional framework root:

```text
package.json
src/main.ts
src/app.module.ts
```

and expose no placements.

An inject pack may expose several:

```text
dto
entity
controller
test
```

A pack can also expose only path while keeping filename fixed if changing the filename would violate framework/tooling conventions.

The absence of a placement is an explicit statement:

> this artifact's structure is owned by the pack.

This is especially suitable for self-contained units.

## 15. Defaults belong to the pack

Every exposed placement should have a valid default.

That means an inject pack remains useful without configuration.

Example:

```text
inject/validation/class-validator
default:
  modules/$(group.name.kebab)/dto/$(name).dto.ts
```

A project that prefers generated isolation can override:

```text
_generated/dto/$(name).dto.ts
```

This gives both:

- zero-config usability;
- explicit project-specific layout control.

## 16. dryv.example.yaml should demonstrate placement

When a pack has meaningful placement choices, its example should show at least one realistic structure.

For example:

```yaml
packs:
  validation:
    path: inject/validation/class-validator
    destination: { $ref: "#/destinations/code/backend" }
    place:
      dto:
        path: modules/$(group.name.kebab)/dto
```

A unit example can control the placements of the inject packs it recommends:

```text
unit/backend/nestjs/dryv.example.yaml

app
  unit/backend/nestjs

server
  inject/backend/nestjs
  controller placement -> modules/<feature>

validation
  inject/validation/zod
  schema placement -> modules/<group>/dto

persistence
  inject/persistence/typeorm
  entity placement -> modules/<group>/entities
```

This makes the unit's recommended project structure visible without hard-coding that structure into every inject pack.

## 17. Existing named destinations

Current Usage already contains:

```text
PackActivation.destination
PackActivation.destinations
```

The current Planner uses the primary `destination`; named activation destinations are not yet part of artifact placement resolution.

Do not introduce a competing concept without auditing this existing field.

The preferred direction is:

- keep project roots under `destinations.code`;
- use named activation destinations where an activation genuinely emits into multiple project roots;
- use named placements for relative artifact structure within those roots.

A future placement may optionally select one of the activation's declared destination names.

Conceptually:

```yaml
place:
  generated-tests:
    destination: tests
    path: generated
```

where `tests` is an explicitly bound named destination for that activation.

This should be implemented only after the existing `PackActivation.destinations` intent is finalized.

## 18. Import resolution must follow final planned paths

Templates must never guess relative imports from configured placement strings.

The Planner already owns generated dependency paths.

After placement resolution, dependency context should expose final producer paths/symbols.

Therefore moving:

```text
src/modules/orders/dto/order.dto.ts
```

to:

```text
_generated/dto/order.dto.ts
```

must automatically change generated import paths through Engine planning.

If a pack template manually hardcodes assumptions such as:

```text
../dto/
../../entities/
```

that pack is not placement-safe and must be fixed before it exposes those placements.

## 19. Placement compatibility and same-unit composition

Configurable placement does not weaken unit boundaries.

When several inject packs target the same generated unit:

```text
unit/backend/nestjs
inject/backend/nestjs
inject/validation/zod
inject/persistence/typeorm
```

all placement overrides resolve against the same explicit destination unless a named destination says otherwise.

The Engine must still validate:

- same-unit requirements;
- cross-unit restrictions;
- collisions;
- generated dependency reachability;
- package identity where cross-unit imports are needed;
- compatible actions/dependencies/choices.

## 20. Plan and trace requirements

Every planned artifact should be explainable as:

```text
pack
template/resource
selection
default placement
usage override, if any
resolved semantic tokens
destination root
final workspace path
ownership
dependencies
```

Example diagnostic/explanation:

```text
CREATE apps/backend/src/_generated/dto/create-order.dto.ts

pack: inject/validation/class-validator
template: dto
placement: dto
placement source: usage override
default path: modules/$(group.name.kebab)/dto
configured path: _generated/dto
subject: schema orders.CreateOrder
ownership: managed
```

This keeps path customization fully traceable.

## 21. Validation rules

Reject:

- undeclared placement keys in Usage;
- absolute placement paths;
- `..` traversal;
- malformed planning tokens;
- template-language syntax in placement expressions;
- filename containing path separators;
- filename override for ambiguous multi-resource outputs;
- resolved output collisions;
- configured placement that makes a required generated dependency unreachable;
- named destination references not declared by the activation;
- duplicate public placement declarations.

Do not silently fall back when a configured placement is invalid.

## 22. Suggested initial proof

Implement the design first against three existing inject packs:

### class-validator

Support:

```text
modules/<group>/dto
_generated/dto
```

### TypeORM

Support:

```text
modules/<group>/entities
_generated/entities
```

### NestJS server

Support at least:

```text
modules/<feature>/controller.ts
controllers/<feature>.controller.ts
```

Then compose them through:

```text
unit/backend/nestjs/dryv.example.yaml
```

and prove both layouts generate compilable NestJS output without changing the templates' semantic logic.

If this proof requires templates to inspect raw placement configuration, the design is wrong: the Engine should resolve placement first.

## 23. Refactor sequence

Recommended sequence:

1. formalize `dryv.example.yaml` discovery and validation;
2. make the packs harness able to validate examples;
3. define the Engine placement contract;
4. connect placement to current destination planning;
5. expose final planned paths to generated dependency/import context;
6. implement placement on 2–3 inject packs;
7. prove alternate structures;
8. use examples as the default proposal for `dryv packs add`;
9. add unit composition examples;
10. migrate broader packs only after the proof passes.

## 24. End state

A pack can be simple by default:

```text
dryv.pack.yaml
dryv.example.yaml
templates/
```

A user can add it with almost no prior Dryv knowledge.

The pack explains one known-good composition.

The CLI can propose that composition.

Usage can adapt declared output placements to the project's preferred structure.

The resulting `dryv.yaml` remains explicit.

The Engine validates the complete graph and computes final artifact paths before render.

That provides convenience without hidden generator magic.

## 25. Stress-test decisions

The design was stress-tested against feature-oriented, centralized-generated and flat-controller project layouts; repeated pack activation; same-name inject/unit pairs; wrong-language and wrong-framework bindings; representation mismatch; cross-unit imports; path traversal; undeclared placement overrides; filename ambiguity; and output collisions.

The resulting design constraints are:

| Problem | Required behavior |
| --- | --- |
| Pack usable with zero configuration | every exposed placement has a valid pack default |
| Existing project has its own folder style | Usage may override only named public placements |
| User moves generated DTO/entity/controller files | Planner resolves imports from final artifact paths |
| User tries `../` or absolute output | reject before render |
| User overrides a private template path | reject undeclared placement |
| Two overrides resolve to one file | normal artifact collision error |
| One template emits several resources | path override may be possible; ambiguous filename override is rejected |
| TypeScript consumer binds Python provider | Engine rejects language incompatibility |
| NestJS unit binds wrong server framework | Engine rejects framework incompatibility |
| Zod/Joi/class-validator share a language but differ structurally | capability representation compatibility must be explicit |
| Same-unit consumer binds remote package artifact | locality/import reachability must be checked |
| Unit wants all feature registration artifacts | Engine needs aggregate capability consumption, not filesystem scanning |
| Example recommends companion packs | recommendation may autofill/preview but never silently activates |
| Pack comes from local/private/official source | example must remain source-neutral |
| User only inspects/validates an example | no commands or workspace mutations are executed |

### Destination rule

Stress testing strongly favors treating a code destination as the **generated-unit root**, for example:

```text
apps/backend
packages/api-client
apps/mobile
```

and treating internal folders such as:

```text
src/modules
src/_generated
test
migrations
controllers
dto
entities
```

as placement concerns.

This keeps unit-wide dependencies, choices, actions, package identity and same-unit validation aligned around one root.

The existing activation-level named `destinations` field must be audited before adding another multi-root mechanism. Do not use placements to create hidden second units.

### Pack author rule

Expose the smallest useful placement API.

Good:

```text
dto
entity
controller
service
test
```

Bad:

```text
every internal directory
every template source path
arbitrary template variables
arbitrary Runtime IR queries
```

A pack with no placement declarations remains fully valid. Units will often expose few or none because they intentionally own their framework structure.

### Safety rule

A placement is planning data, not template input.

The Engine must resolve:

```text
destination
+ placement default
+ Usage override
+ semantic planning tokens
+ filename
= final artifact path
```

before rendering, dependency resolution, collision validation and trace finalization.

Templates should receive resolved dependency paths/symbols and must not reason about raw placement configuration.

### Compatibility rule

Avoid a generic `strict: true|false`.

Each need should request the compatibility dimensions that matter to that relationship, such as:

```text
language
framework
representation contract
locality/import reachability
runtime/platform (only where proven necessary)
```

If a dimension is required, the Engine must prove it or reject the binding. If it is irrelevant, the need should not request it.

### Proof matrix

The initial proof should generate the same NestJS semantics under at least these structures:

```text
A. feature-oriented
src/modules/orders/controller.ts
src/modules/orders/dto/create-order.dto.ts
src/modules/orders/entities/order.entity.ts

B. centralized generated
src/_generated/controllers/orders.controller.ts
src/_generated/dto/create-order.dto.ts
src/_generated/entities/order.entity.ts

C. type-oriented
src/controllers/orders.controller.ts
src/services/orders.service.ts
src/contracts/create-order.dto.ts
src/models/order.entity.ts
```

The proof passes only if:

- the same semantic selections are used;
- templates do not inspect raw placement configuration;
- imports are derived from final planned artifact dependencies;
- no pack-specific path convention is used for cross-pack lookup;
- collisions and invalid paths fail before render;
- generated output compiles with the native toolchain.
