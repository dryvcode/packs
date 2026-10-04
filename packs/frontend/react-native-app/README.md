# React Native app pack

Generates an Expo app from views, organised by feature like the Flutter app pack: expo-router routes, a screen and a TanStack Query hook per view, route constants per feature, and API calls through the [ts-api-client](../../clients/ts-api-client) package.

| IR | Generated | Owner |
| --- | --- | --- |
| view | `app/<group>/<view>.tsx`: the expo-router route, behind the connectivity gate | Dryv |
| view | `src/presentation/screens/<feature>/<view>-hooks.ts`: `use<View>()` with a query per `present` part, a mutation per `collect`/`invoke` part, and form fields | Dryv |
| view | `src/presentation/screens/<feature>/<view>-screen.tsx`: the screen | **you** (scaffold) |
| feature | `src/presentation/routes/<feature>-routes.ts`: route paths, `/<group>/<view>` | Dryv |
| all views | `app/index.tsx`: opens the first screen | Dryv |

Written once: `package.json`, `app.json` and `src/core/config/app-config.ts` (reads `EXPO_PUBLIC_API_URL` and configures the client). Always regenerated: `app/_layout.tsx` (query client and stack), `tsconfig.json`, `src/core/network/network-gate.tsx`, `src/presentation/widgets/dryv-form.tsx` and `dryv-result.tsx`.

A `present` part queries when the screen opens, unless a `collect` part of the same view submits to the same operation; then it shows that submission's result.

**Binds:** `operation.client` (the client's typed calls) and `schema.types` (request models), both provided by `clients/ts-api-client`, imported as `<application>-api` through a `file:` dependency set by the `api_path` input (default `../api`).

**Limits in 0.1.0:** views must belong to a feature; screen-opening queries call operations without arguments; nested schemas and arrays aren't editable in generated forms.

**Test:** `bun scripts/test-pack.ts frontend/react-native-app` generates the client (`out/api`) and the app (`out/app`) bound to it, installs Expo, React Native and TanStack Query, and typechecks the app.

## Use it

```yaml
packs:
  api:
    source: { type: git, repository: https://github.com/dryvcode/packs, revision: develop, path: packs/clients/ts-api-client }
    destinations:
      source: { $ref: "#/destinations/api" }
  mobile:
    source: { type: git, repository: https://github.com/dryvcode/packs, revision: develop, path: packs/frontend/react-native-app }
    bind:
      operation.client: { $ref: "#/packs/api" }
      schema.types: { $ref: "#/packs/api" }
    destinations:
      source: { $ref: "#/destinations/mobile" }

destinations:
  api: { path: mobile/api }
  mobile: { path: mobile/app }
```

Run it with `EXPO_PUBLIC_API_URL=https://your-api npx expo start`.
