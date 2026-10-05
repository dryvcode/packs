# EF Core Entities pack

Generates a reusable .NET 10 persistence library using Entity Framework Core 10.

Each persistent Dryv schema becomes a plain C# entity plus an `IEntityTypeConfiguration<T>` fluent mapping. An aggregate `DryvDbContext` applies every generated configuration.

Mappings include table/schema names, primary/composite keys, generated simple keys, indexes and uniqueness, nullability, string lengths, decimal precision, create-only values, relations and canonical delete behavior. Scalar foreign-key properties remain authoritative; navigation properties are additive.

Enums are persisted as their canonical JSON representation string rather than assuming C# member names equal storage values. Structural/array/dynamic values are persisted as JSON strings. Database defaults and check constraints remain for a future migration/schema pack when their expression semantics can be emitted explicitly.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
