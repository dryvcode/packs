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
| `relation` (many-to-one / one-to-one) | the FK column plus `@ManyToOne`/`@OneToOne` + `@JoinColumn`, with `onDelete` |
| `related` | `@OneToMany(() => Other, (item) => item.<thisSchema>)` |

Column names follow the `namingStrategy` input (`snake`, the default, or `camel`). Descriptions on primitive properties become column comments.

**Provides:** `schema.persistence` (entities) and `property.enum.types` (enums).

**Test:** `bun scripts/test-pack.ts persistence/typeorm-entities` renders `tests/fixture` (a commerce model), typechecks it against `typeorm`, and checks the registered metadata: tables, column types, checks, indexes and both relation sides.

## Use it

```yaml
packs:
  typeorm:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: persistence/typeorm-entities/v0.1.0
      path: packs/persistence/typeorm-entities
    destinations:
      source:
        $ref: "#/destinations/<your destination>"
```

## Slots

- provides `schema.persistence`
- provides `property.enum.types`
