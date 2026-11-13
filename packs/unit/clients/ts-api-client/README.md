# TypeScript API client pack

Generates a framework-free TypeScript client package: interfaces for every schema, enums, and one typed `fetch` call per HTTP operation. Any TypeScript frontend can use it; `frontend/react-native-app` binds it.

| IR | Generated |
| --- | --- |
| schema | `src/models/<schema>.ts`: an interface |
| enum | `src/enums/<enum>.ts` |
| HTTP operation | `src/operations/<group>/<operation>.ts`: `operation(input, options?)` → `Promise<ApiResult<T>>` |
| — | `src/transport.ts` (`configureApi`, `request`, `requestBlob`), `src/index.ts`, `package.json`, `tsconfig.json` |

Each call takes the operation's single input, like props: a schema input is its model (`createUser({ displayName })`), named fields an object (`getUser({ id })`). The call places each field where HTTP binds it (path, query, body or header). Caller-provided request options and headers are preserved, with contract-bound headers added for that operation. Results never throw for HTTP errors: `{ ok: true, data }` or `{ ok: false, status, message }`.

Configure once: `configureApi({ baseUrl: "https://api.example.com", headers, credentials: "include" })`.
Credential mode is optional per client, and individual operations can override
it through their `options` argument.

The generated package exposes operation, model, enum, and source subpaths. The
source wildcard lets applications add typed API helpers alongside generated
contracts, while specific operation/model/enum exports keep their documented
paths:

```ts
import { listUsers } from "@fixture/api-client/operations/core/list-users";
import type { UserProfile } from "@fixture/api-client/models/user-profile";
import { requestBlob } from "@fixture/api-client/transport";
```

**Provides:** `operation.client` (the calls), `schema.types` (models), `property.enum.types` (enums).

The generated package manifest uses `package_name` for its package name and the
optional `package_private` boolean to prevent publication of project-internal
clients. It defaults to `false` for distributable client packages.

**Test:** `bun scripts/test-pack.ts unit/clients/ts-api-client` typechecks the package and exercises JSON and binary calls against a mocked `fetch`.
