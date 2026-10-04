# TypeScript API client pack

Generates a framework-free TypeScript client package: interfaces for every schema, enums, and one typed `fetch` call per HTTP operation. Any TypeScript frontend can use it; `frontend/react-native-app` binds it.

| IR | Generated |
| --- | --- |
| schema | `src/models/<schema>.ts`: an interface |
| enum | `src/enums/<enum>.ts` |
| HTTP operation | `src/operations/<group>/<operation>.ts`: `operation(input, options?)` → `Promise<ApiResult<T>>` |
| — | `src/transport.ts` (`configureApi`, `request`), `src/index.ts`, `package.json`, `tsconfig.json` |

Each call takes the operation's single input, like props: a schema input is its model (`createUser({ displayName })`), named fields an object (`getUser({ id })`). The call places each field where HTTP binds it (path, query, body). Results never throw for HTTP errors: `{ ok: true, data }` or `{ ok: false, status, message }`.

Configure once: `configureApi({ baseUrl: "https://api.example.com", headers })`.

**Provides:** `operation.client` (the calls), `schema.types` (models), `property.enum.types` (enums).

**Test:** `bun scripts/test-pack.ts clients/ts-api-client` typechecks the package and exercises calls against a mocked `fetch`.
