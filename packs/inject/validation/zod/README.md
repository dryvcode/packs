# Zod schemas pack

Generates `export const XSchema = z.object({...})` and `export type X = z.infer<typeof XSchema>` for every schema, and `z.enum([...])` for every enum.

| IR | Generated |
| --- | --- |
| string formats | `.uuid()`, `.ulid()`, `.email()`, `.url()`, `.ip({ version })`, `.base64()`, and regexes for `hostname`, loose `phone`, strict `e164`, `slug`, `hex-color`, `hex`, `jwt`, `semver`, `country-code`, `currency-code` |
| length, pattern `match` | `.length()` / `.min()` / `.max()`, `.regex(new RegExp(...))` |
| numbers | `z.number()` with `.int()`, `.min()`, `.max()`, `.multipleOf()` |
| temporal | `z.string().date()`, `.time()`, or `.datetime({ offset: true })` |
| nested schemas | `z.lazy(() => OtherSchema)`, so order and cycles don't matter |
| arrays | `z.array(...)` with `.min()` / `.max()` |
| nullable, default, optional | `.nullable()`, `.default(value)` (which also makes the input optional), `.optional()` |
| schema invariants | `.superRefine(...)` adding an issue at the first field the rule reads, with the invariant's message |

**Provides:** `schema.validation` (the `XSchema` constants). The inferred types are exported too, but a slot carries one symbol, so the pack doesn't claim `schema.types`.

**Test:** `bun scripts/test-pack.ts inject/validation/zod` renders the registration fixture, typechecks it, and parses valid and invalid samples.

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows the current source collection, destination and pack activation for this pack.

## Slots

- provides `schema.validation`
