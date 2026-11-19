> Archived 2026-10-07. Historical planning only. Active execution moved to `.docs/tasks/pack-modernization/`.

# Pack examples, output overrides and import addressing

Status: **scheduled design / prerequisite to pack structure refactor**

Updated: **2026-10-06**

This is the current packs-side design direction.

The goal is to keep `dryv.pack.yaml` small and focused on generation while allowing project Usage to adapt generated structure, naming and import addressing safely.

The corresponding Engine roadmap lives in the Dryv repository:

`.docs/planning/roadmap/pack-placement-and-validation/README.md`

## 1. Keep dryv.pack.yaml close to the current model

A pack primarily declares:

```text
plugins
inputs
selections
templates
template output defaults
imports
needs / provides
dependencies
intrinsic generation actions only
```

Do not make the pack manifest carry project setup UX.

In particular, the proposed design no longer adds:

```text
placements:
template.output.placement
project folder profiles
package-manager option matrices for ordinary setup
formatter preferences
```

A pack should describe the implementation it generates.

## 2. Pack output remains the default

The existing model is retained:

```text
template filesystem
+ template.output.path
+ template.output.name
= default generated artifact location
```

Example:

```yaml
templates:
  entity:
    $ref: "#/selections/entities"
    output:
      name: $(subject.name.kebab)
      path:
        - $(group.name.kebab)
        - entities
      symbol: $(subject.name.pascal)Entity
```

If the project supplies no override, this wins.

A pack therefore remains useful with:

- no `dryv.example.yaml`;
- no output overrides;
- no interactive setup.

## 3. Pack output.path stays semantic/local

Reusable packs must not decide project roots such as:

```text
src/models
src/modules
lib/generated
app/controllers
```

Those belong to Usage because real projects differ.

The proposed output-path rule is:

- when `output.path` exists, its first segment must contain a Dryv planning token;
- later segments may be static pack-local structure.

Good:

```yaml
path:
  - $(group.name.kebab)
  - entities
```

Bad:

```yaml
path:
  - src
  - models
```

This is a small relaxation from the current Engine rule, which requires **every** `output.path` segment to contain a planning token.

## 4. Template filesystem participates in the default

The source filesystem already carries structure.

For example:

```text
templates/
  {entity}/$(name).entity.ts.j2
```

with:

```yaml
output:
  path:
    - $(group.name.kebab)
    - entities
```

is enough to establish a zero-config default.

Pack authors should avoid burying project-specific architecture around a dynamic template boundary when it should be project configurable.

Prefer semantic/local defaults in `output.path`; let Usage decide project-root structure.

## 5. Template key is the output override address

No placement registry is required.

Given:

```yaml
packs:
  persistence:
    path: inject/persistence/typeorm
```

and pack template:

```text
entity
```

the project addresses that output as:

```text
persistence.entity
```

where:

- `persistence` is the pack activation name;
- `entity` is the template key.

This reuses identities Dryv already has.

## 6. Destination owns output overrides

A code destination is the generated-unit root.

It may partially override pack template outputs for activations targeting that destination:

```yaml
destinations:
  code:
    backend:
      path: apps/backend

      outputs:
        persistence:
          entity:
            path: [src, models, "$(group.name.kebab)"]
            symbol: "$(subject.name.pascal)Model"
```

The override shape mirrors the pack's existing `output` vocabulary:

```text
name
path
symbol
symbols
```

No separate placement vocabulary is needed.

## 7. Output overrides are partial

Pack default:

```yaml
output:
  name: $(subject.name.kebab)
  path:
    - $(group.name.kebab)
    - entities
  symbol: $(subject.name.pascal)Entity
```

Project changes only the symbol:

```yaml
outputs:
  persistence:
    entity:
      symbol: "$(subject.name.pascal)Model"
```

Final planning keeps the pack's default name/path and replaces only the symbol.

A project may instead override only path, only name, or the complete output object.

## 8. Usage paths may be project-specific

Unlike reusable pack defaults, Usage knows the actual project.

Therefore this is valid project intent:

```yaml
outputs:
  persistence:
    entity:
      path:
        - src
        - domain
        - $(group.name.kebab)
        - models
```

Usage paths may combine static project structure and planning tokens.

They are still validated as:

- project-relative;
- no traversal;
- closed Dryv planning-token vocabulary;
- deterministic.

## 9. Override permission

Output overrides should be allowed by default.

A rare template that must not be structurally or symbolically changed may explicitly opt out in its output contract.

The exact spelling is not locked. Conceptually:

```yaml
output:
  allow_override: false
```

Do not require packs to opt in output-by-output; that would recreate the cognitive load this design is removing.

## 10. Planner order is critical

Output overrides must resolve **before** representations and generated dependencies are finalized:

```text
pack filesystem/default output
        ↓
destination output override
        ↓
final artifact path/name/symbols
        ↓
representation index
        ↓
needs/bind resolution
        ↓
generated dependency graph
        ↓
import addressing
        ↓
renderer context
        ↓
render
```

This guarantees that moving or renaming a producer never leaves consumers with stale imports or stale symbols.

## 11. dryv.example.yaml is setup guidance

The canonical filename remains:

```text
dryv.example.yaml
```

Any pack may provide one.

It is:

- source-neutral;
- Usage-shaped;
- optional;
- validated;
- intended for humans, CLI, editor and agents;
- materialized into ordinary explicit `dryv.yaml`.

It is not runtime authority and does not silently activate packs.

## 12. Example files may repeat

Repetition in `dryv.example.yaml` is acceptable.

For example, many JavaScript/TypeScript packs may independently contain:

```yaml
choose:
  js.package_manager: [bun, pnpm, npm, yarn]
```

That is user-facing setup guidance, not a semantic contract that must be deduplicated.

Do not make example syntax abstract merely to remove a few repeated readable options.

## 13. Compact scalar choices

The example schema should stay concise.

When the normal Usage field is scalar, a list may represent setup choices:

```yaml
choose:
  js.package_manager: [bun, pnpm, npm, yarn]
```

The first item is the suggested default.

Likewise:

```yaml
inputs:
  naming_strategy: [snake, camel]
```

and a source-neutral provider choice may be:

```yaml
packs:
  validation:
    pack:
      - inject/validation/zod
      - inject/validation/class-validator
```

Do not require verbose wrappers such as:

```yaml
npm:
  value: npm
```

for simple scalar choices.

## 14. Compact structured choices

A structured Usage value needs named alternatives.

Use a compact example-only wrapper with the alternative value directly beneath each name:

```yaml
outputs:
  $options:
    default: pack-default

    pack-default: {}

    feature:
      server:
        controller:
          path: [src, modules, "$(feature.name.kebab)"]

      validation:
        schema:
          path: [src, modules, "$(group.name.kebab)", dto]

    generated:
      server:
        controller:
          path: [src, _generated, controllers]

      validation:
        schema:
          path: [src, _generated, dto]
```

No per-option `value:` wrapper is required.

The exact marker name (`$options`, or another compact equivalent) remains a contract-design detail.

## 15. Pack contract versus example choices

Keep these separate:

```text
dryv.pack.yaml
    defines what is legal/required

dryv.example.yaml
    exposes useful choices and recommendations

dryv.yaml
    records what the project actually chose
```

For example, a pack input remains declared in the pack:

```yaml
inputs:
  naming_strategy:
    type: string
    default: snake
    allowed: [snake, camel]
```

The example can simply expose:

```yaml
inputs:
  naming_strategy: [snake, camel]
```

## 16. Dependencies stay in the pack

If generated source imports a library, that dependency is intrinsic implementation data.

Keep:

```yaml
dependencies:
  runtime:
    zod: ^3.24
```

in `dryv.pack.yaml`.

Do not move generated-code dependency requirements into examples.

## 17. Choices and actions should be simplified separately

Current packs repeat package-manager choice groups and command matrices heavily.

Direction:

- ordinary environment choices such as package manager should live in Usage/example setup;
- install/format/typecheck workflow should move toward destination/project tooling and shared command knowledge;
- packs should retain only actions intrinsically required to complete their generation.

Examples of potentially intrinsic actions:

```text
protobuf compilation
build_runner required by generated serializers
secondary source generation required for valid output
```

Do not redesign all action semantics as part of output overrides. Keep this as a neighboring cleanup.

## 18. Import addressing is part of destination/unit configuration

Dryv already resolves generated dependencies to:

- producer artifact;
- final workspace path;
- relative filesystem path;
- producer symbol(s);
- provider pack and slot.

That is enough for relative imports, but not for project aliases/module roots.

A code destination should be able to define an import-address root:

```yaml
destinations:
  code:
    backend:
      path: apps/backend

      imports:
        root: src
        prefix: "@/"
```

Default when `imports` is absent:

```text
relative addressing
```

The Engine should derive generic address facts; the target pack still renders language syntax.

## 19. TypeScript alias example

Producer:

```text
apps/backend/src/models/user.ts
```

Destination:

```yaml
imports:
  root: src
  prefix: "@/"
```

Planner can expose:

```text
root-relative path: models/user.ts
prefix: @/
symbol: User
```

The TypeScript template can render:

```text
@/models/user
```

after applying TypeScript extension/module-specifier rules.

Another project may use:

```yaml
imports:
  root: src
  prefix: "#/"
```

## 20. Python and Java examples

Python:

```yaml
imports:
  root: src/dryv
  prefix: dryv
```

Producer:

```text
src/dryv/models/user.py
```

Generic address facts allow a Python template to render:

```python
from dryv.models.user import User
```

Java:

```yaml
imports:
  root: src/main/java/com/dryv/api
  prefix: com.dryv.api
```

Producer:

```text
src/main/java/com/dryv/api/users/User.java
```

A Java template can render:

```java
import com.dryv.api.users.User;
```

The Engine owns path/root facts, not Java or Python syntax.

## 21. Package imports

Cross-unit imports also need:

- provider unit identity;
- provider package identity;
- provider import root;
- producer path relative to that import root.

Existing package metadata already points toward this model.

Dart example:

```text
package name: riderescue_api
import root: lib
producer: lib/src/models/user.dart
```

A Dart pack can render:

```dart
import 'package:riderescue_api/src/models/user.dart';
```

The Engine does not construct Dart syntax; it exposes the generic address components.

## 22. Import-root validation

Planning must reject configurations where the requested address cannot be proven.

Examples:

- producer is outside configured import root;
- cross-unit provider has no required package/import identity;
- output override moves an artifact outside a package's import root;
- alias/root configuration conflicts with unit boundaries.

This belongs before rendering.

## 23. Final model

```text
DRYV.PACK.YAML
    selections
    templates
    default output name/path/symbols
    inputs
    needs/provides
    dependencies
    intrinsic actions only

PACK FILESYSTEM
    contributes zero-config default topology

DRYV.EXAMPLE.YAML
    compact setup choices:
      providers
      inputs
      output profiles
      package manager
      import style/root/prefix
      workflow suggestions

DRYV.YAML
    actual project decisions:
      destinations
      output overrides
      bindings
      inputs
      import addressing
      environment choices

ENGINE
    resolves final output first
    then representations/dependencies
    then generic import addresses
    then renderer context
```

This keeps the pack author focused on the pack's actual purpose while still allowing substantial project customization.
