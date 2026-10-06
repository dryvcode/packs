# Import addressing examples

Status: **design example aligned with current Dryv planning**

Dryv plans import addresses only after final pack-activation output overrides are resolved.

## Default: relative

```yaml
destinations:
  backend:
    path: apps/backend
```

Producer:

```text
apps/backend/src/models/user.ts
```

Consumer:

```text
apps/backend/src/controllers/users.controller.ts
```

Dryv can expose the relative filesystem address and the TypeScript pack may normalize it to a module specifier.

## TypeScript @/ alias

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src
      prefix: "@/"
```

Planner facts:

```text
unit root:           apps/backend
import root:         apps/backend/src
root-relative path: models/user.ts
prefix:              @/
symbol:              UserModel
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

can render:

```ts
import { UserModel } from "#/models/user";
```

## Python dotted module

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src/dryv
      prefix: dryv
```

A producer under `src/dryv/models/user.py` can become:

```python
from dryv.models.user import User
```

## Java package import

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src/main/java/com/dryv/api
      prefix: com.dryv.api
```

A producer under `users/User.java` can become:

```java
import com.dryv.api.users.User;
```

## Dart package import

Cross-unit addressing uses provider package identity plus its import root.

```text
provider unit:    packages/riderescue_api
package name:     riderescue_api
import root:      lib
producer:         lib/src/models/user.dart
```

A Dart template can render:

```dart
import 'package:riderescue_api/src/models/user.dart';
```

## Pack output overrides happen first

Usage changes a concrete activation/template:

```yaml
packs:
  persistence:
    source:
      $ref: "#/sources/packs/official"
      path: inject/persistence/typeorm
    destination:
      $ref: "#/destinations/backend"

    outputs:
      entity:
        path: [src, models]
        symbol: "$(subject.name.pascal)Model"
```

Planning order:

```text
pack template output
+ packs.persistence.outputs.entity
    ↓
final producer path + symbol
    ↓
dependency graph
    ↓
destination import addressing
```

No template should retain the old path or symbol.

## Validation

Planning should fail when:

- the final producer is outside a configured import root;
- a cross-unit package import has no package/import-root identity;
- an activation output override makes the provider unreachable;
- a requested address cannot be proven;
- a same-unit-only capability is bound across units.
