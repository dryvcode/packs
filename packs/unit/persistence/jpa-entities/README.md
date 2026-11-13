# JPA Entities pack

Generates a reusable Maven package containing portable Jakarta Persistence 3.2 entities.

- storage name / namespace → `@Table(name, schema)`;
- canonical indexes → JPA `@Index` declarations;
- primary keys → `@Id`, with standard UUID/IDENTITY generation only for simple system-generated keys;
- composite primary keys → generated `@IdClass` key types;
- nullability and string/decimal column metadata → `@Column`;
- create-only fields → `updatable = false`;
- owning relations keep the scalar FK column and add a read-only `@ManyToOne` / `@OneToOne` navigation;
- inverse one-to-one / one-to-many relations use `mappedBy`;
- nested/record/array/unknown structures use a portable JSON-string `AttributeConverter` backed by Jackson.

Canonical enum values are currently persisted as strings instead of JPA enum names, avoiding the false assumption that Java variant names are storage values.

Dryv relation delete/update lifecycle is intentionally not translated to JPA cascade operations: object lifecycle cascades are not equivalent to database foreign-key actions. Schema invariants/default expressions likewise remain for a future migration/schema pack.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
