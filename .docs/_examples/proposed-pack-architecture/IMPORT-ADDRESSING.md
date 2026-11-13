# Import addressing examples

Status: **design example aligned with current Dryv planning**

Import addressing happens after activation roots and output overrides have produced final artifacts.

## Default: relative

```yaml
destinations:
  backend:
    path: apps/backend
```

No import configuration means relative addressing.

## TypeScript @/ alias

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src
      prefix: "@/"
```

If persistence is configured as:

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src]

    outputs:
      entity:
        path: [models]
        symbol: "$(subject.name.pascal)Model"
```

then a User entity resolves conceptually under:

```text
apps/backend/src/models/...
```

Planner facts can include:

```text
unit root:            apps/backend
activation root:      src
final output path:    models/...
import root:           apps/backend/src
import-root-relative: models/...
prefix:               @/
symbol:               UserModel
```

A TypeScript template can render:

```ts
import { UserModel } from "@/models/user";
```

## TypeScript #/ alias

```yaml
imports:
  root: src
  prefix: "#/"
```

The same final producer can render with `#/`.

## Python dotted module

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src/dryv
      prefix: dryv
```

A final producer below that root can be converted by a Python template to dotted module syntax.

## Java package import

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src/main/java/com/dryv/api
      prefix: com.dryv.api
```

A Java template renders the generic final address facts as package syntax.

## Dart package import

Cross-unit addressing uses provider package identity plus the provider's final import-root-relative path.

## Planning order

```text
pack template output
+ activation output override
    ↓
final template-relative path/symbol
+ activation destination.root
    ↓
final unit-relative artifact
+ destination.path
    ↓
workspace artifact
    ↓
representation/dependency graph
    ↓
destination import policy
    ↓
generic import address facts
```

Example:

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src, models]

    outputs:
      entity:
        path: [$(group.name.kebab)]
        symbol: "$(subject.name.pascal)Model"
```

The Engine must use that final rooted artifact for every consumer.

## Validation

Planning should fail when:

- activation root escapes the destination unit;
- final producer lies outside a configured import root;
- a cross-unit package import lacks package/import-root identity;
- output/root changes create an artifact collision;
- an address form cannot be proven;
- a same-unit-only capability is bound across units.
