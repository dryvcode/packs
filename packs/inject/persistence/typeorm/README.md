# TypeORM entities pack

Generates TypeORM entities from schemas with the `entity` role.

| IR | Generated |
| --- | --- |
| `facets.storage.name` / `namespace` (or group default) | `@Entity({ schema, name })` |
| `facets.storage.primary_key` | `@PrimaryGeneratedColumn("uuid")` for system uuid keys, else `@PrimaryColumn` |
| `facets.storage.indexes` | `@Index(name, [...], { unique })` |
| schema invariants (`form`) | `@Check("chk_<schema>_<invariant>", "<sql>")`; opaque rules get a comment instead |
| primitive fields | typed columns: `uuid`, `varchar(max length)`, `text`, `integer`, `bigint`, `numeric(p, s)`, `double precision`, `boolean` |
| money in minor units, 64-bit integers, decimals | `bigint` / `numeric` with `ColumnNumericTransformer` (Postgres returns them as strings) |
| enums | `type: "enum"` with the generated enum |
| temporal | `date`, `time`, `interval` or `timestamptz` |
| records, composites, unknown, embedded schemas | `jsonb` |
| `relation` (many-to-one / one-to-one) | the FK column plus `@ManyToOne`/`@OneToOne` + `@JoinColumn`, with `onDelete`, when the target entity is generated; otherwise the scalar column remains and a source comment says the FK/navigation was omitted |
| `related` | `@OneToMany(() => Other, (item) => item.<thisSchema>)` |

Column names follow the `naming_strategy` input (`snake`, the default, or `camel`). Descriptions on primitive properties become column comments.

This pack only creates TypeORM relations when it can resolve a generated target entity in the same
pack plan. A semantically valid Dryv relation may target a Schema outside the selected entity output;
in that case the generated field stays scalar and the emitted source comment makes the missing ORM
relationship visible. Include the target Schema in the persistence selection when the database FK is
required.

**Provides:** `schema.persistence` (entities) and `property.enum.types` (enums).

**Test:** `bun scripts/test-pack.ts inject/persistence/typeorm` renders `tests/fixture` (a commerce model), typechecks it against `typeorm`, and checks the registered metadata: tables, column types, checks, indexes and both relation sides.

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows the current source collection, destination and pack activation for this pack.

## Slots

- provides `schema.persistence`
- provides `property.enum.types`

## Generated tests

`common/entities/testing/entities.integrity.spec.ts` (Vitest) synchronizes every entity into an in-memory Postgres (pg-mem) and checks each against its contract: table, columns with nullability and primary keys, foreign keys, indexes, and rejection of rows missing required columns.
