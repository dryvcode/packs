# Mongoose models pack

Generates `@nestjs/mongoose` schema classes from schemas with the `entity` role.

| IR | Generated |
| --- | --- |
| `facets.storage.name` (or the schema name in snake case) | `@Schema({ collection })` |
| `facets.storage.primary_key` | `_id`; a system uuid key gets `default: () => randomUUID()` |
| `facets.storage.indexes` | `<Model>Schema.index({ … }, { name, unique })` |
| schema invariants (`form`) | a `pre("validate")` hook that invalidates the document; opaque rules get a comment instead |
| string limits and pattern | `minlength`, `maxlength`, `match` (the first pattern) |
| number range, integers | `min`, `max`, an integer validator |
| enums | `enum: Object.values(<Enum>)` |
| instants, dates, times | `Date` |
| relations (`relation`) | the id as a string with `ref: "<TargetModel>"`; the reverse side isn't stored |
| records, nested schemas, durations | `Schema.Types.Mixed` |

Each model file exports the class, `<Model>Document` (`HydratedDocument<…>`) and `<Model>Schema`.

**Test:** `bun scripts/test-pack.ts inject/persistence/mongoose-models` renders the fixture IR, typechecks against the real `@nestjs/mongoose` and `mongoose`, then builds the schemas and validates valid and invalid documents (no database needed).

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows the current source collection, destination and pack activation for this pack.

## Slots

- provides `schema.persistence`
- provides `property.enum.types`
