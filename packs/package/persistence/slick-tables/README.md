# Slick Tables pack

Generates a Scala 3.9/Slick 3.6 persistence library.

Each persistent Dryv schema becomes a table-support trait containing a row case class, Slick table mapping and `TableQuery`. A generated aggregate `DryvTables` trait mixes all supports into one shared `JdbcProfile`, avoiding hidden global profile assumptions and Slick path-dependent-type problems.

Mappings include:

- canonical table/schema names;
- single/composite primary keys;
- system integer auto-increment;
- indexes/uniqueness;
- nullability;
- decimal precision and bounded string SQL types;
- JSON-backed enum/structural/array values;
- relation foreign keys with canonical update/delete actions where Slick can express them.

Defaults, create-only enforcement and database check constraints remain migration/schema concerns. System UUID generation is not guessed at the generic Slick layer.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
