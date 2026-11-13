# Joi schemas pack

Generates `export const XSchema = Joi.object({...})` for every schema and `Joi.any().valid(...)` for every enum.

| IR | Generated |
| --- | --- |
| presence | `.required()` for required fields; `.default(value)` for defaults; optional fields stay optional |
| nullable | `.allow(null)` |
| string formats | `.guid()`, `.email()`, `.uri()`, `.hostname()`, `.ip()`, `.base64()`, `.hex()`, and patterns for `ulid`, loose `phone`, strict `e164`, `slug`, `hex-color`, `jwt`, `semver`, `country-code`, `currency-code` |
| length, pattern `match` | `.length()` / `.min()` / `.max()`, `.pattern(new RegExp(...))`; text without a minimum length allows `""` |
| numbers | `Joi.number()` with `.integer()`, `.min()`, `.max()`, `.multiple()` |
| temporal | `YYYY-MM-DD` pattern for dates, `.isoDate()` otherwise |
| nested schemas, arrays | the other schema by reference; `Joi.array().items(...)` with `.min()` / `.max()` |
| invariants | field-equals-field becomes `.valid(Joi.ref("other"))` on the left field with the invariant's message; other simple forms become an object-level `.custom(...)` rule |

**Provides:** `schema.validation`. Joi has no type inference, so a consumer that needs types binds `schema.types` to another pack.

**Test:** `bun scripts/test-pack.ts inject/validation/joi` renders the registration fixture, typechecks it, and validates valid and invalid samples.

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows the current source collection, destination and pack activation for this pack.

## Slots

- provides `schema.validation`
