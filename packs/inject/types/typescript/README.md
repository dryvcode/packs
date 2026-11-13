# TypeScript types pack

Generates framework-free TypeScript declarations once per IR property and schema, under `<group>/`, so other packs import them instead of generating their own copies:

| IR | Output | Example |
| --- | --- | --- |
| `property.enum` | `<name>.enum.ts` | `export enum UserStatus { ACTIVE = "active" }` |
| named `property.primitive` | `<name>.type.ts` | `export type Email = string;` |
| `property.temporal` | `<name>.type.ts` | `export type CreatedAt = string;` (ISO-8601 text) |
| `property.literal` | `<name>.type.ts` | `export type ActiveStatus = "active";` |
| `property.union` | `<name>.type.ts` | `export type UserLookup = DisplayName \| UserId;` |
| `property.record` / `property.tuple` | `<name>.type.ts` | `Record<string, string>`, `[number, number]` |
| `property.generic` | `<name>.type.ts` | `export type Page<T> = { items: Array<T>; total: Count };` / `Page<UserProfile>` |
| `property.composite` | `<name>.type.ts` | `export interface NamePair { … }` |
| `schema` | `<name>.interface.ts` | `export interface UserProfile { … }` |

It provides `property.enum.types`, `property.types` (one template per property kind) and `schema.types`. DTO, entity and server packs need those slots and import the declarations through Usage `bind`.

Inline types inside a property definition are rendered to three levels of nesting. A deeper inline type renders `DryvTypeNestingTooDeep`, which fails type checking and names the problem; references to other named properties or schemas don't count toward the limit.

`unknown` fields render `unknown`; `dynamic` fields render `Record<string, unknown>`.

**Test:** `bun scripts/test-pack.ts inject/types/typescript` renders the shared fixture IR, typechecks every declaration and checks representative shapes.
