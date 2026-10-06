# Import addressing examples

Status: **design-only**

Dryv already knows generated dependency edges, final artifact paths and symbols.

The proposed addition is destination-level import-root configuration so the Planner can expose generic address facts after all output overrides are resolved.

## Default: relative

No destination import configuration:

```yaml
destinations:
  code:
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

Dryv already knows a relative filesystem address such as:

```text
../models/user.ts
```

A TypeScript pack may normalize that to:

```text
../models/user
```

## TypeScript @/ alias

```yaml
destinations:
  code:
    backend:
      path: apps/backend
      imports:
        root: src
        prefix: "@/"
```

Producer:

```text
apps/backend/src/models/user.ts
```

Planner facts:

```text
unit root:            apps/backend
import root:          apps/backend/src
root-relative path:  models/user.ts
prefix:               @/
symbol:               UserModel
```

A TypeScript pack can render:

```ts
import { UserModel } from "@/models/user";
```

## TypeScript #/ alias

```yaml
imports:
  root: src
  prefix: "#/"
```

The same dependency can render as:

```ts
import { UserModel } from "#/models/user";
```

## Python dotted module

```yaml
destinations:
  code:
    backend:
      path: apps/backend
      imports:
        root: src/dryv
        prefix: dryv
```

Producer:

```text
apps/backend/src/dryv/models/user.py
```

Planner facts:

```text
root-relative path: models/user.py
prefix:             dryv
symbol:             User
```

The Python pack converts path segments to Python module syntax:

```python
from dryv.models.user import User
```

## Java package import

```yaml
destinations:
  code:
    backend:
      path: apps/backend
      imports:
        root: src/main/java/com/dryv/api
        prefix: com.dryv.api
```

Producer:

```text
apps/backend/src/main/java/com/dryv/api/users/User.java
```

A Java pack receives:

```text
root-relative path: users/User.java
prefix:             com.dryv.api
symbol:             User
```

and renders:

```java
import com.dryv.api.users.User;
```

## Dart package import

Cross-unit package addressing uses provider package identity plus its import root.

Provider unit:

```text
workspace root: packages/riderescue_api
package name:    riderescue_api
import root:     lib
producer:        lib/src/models/user.dart
```

Generic planner facts:

```text
provider package:             riderescue_api
provider import-root-relative: src/models/user.dart
symbol:                       User
```

The Dart pack renders:

```dart
import 'package:riderescue_api/src/models/user.dart';
```

## Output overrides happen first

Suppose Usage changes:

```yaml
outputs:
  persistence:
    entity:
      path: [src, models]
      symbol: "$(subject.name.pascal)Model"
```

The Engine must first resolve the final producer:

```text
apps/backend/src/models/user.entity.ts
UserModel
```

Only then does it calculate:

- relative address;
- import-root-relative address;
- package-relative address;
- final dependency symbol.

No template should retain the old path or old symbol.

## Validation

Planning should fail when:

- producer is outside the configured import root;
- a cross-unit package import has no package identity/import root;
- output override moves a provider outside its consumable import root;
- a requested root/prefix cannot produce a valid address;
- a same-unit-only need is bound across units.

The Engine validates addressability; the pack renders target-language syntax.
