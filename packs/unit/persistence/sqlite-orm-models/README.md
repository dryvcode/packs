# sqlite_orm Models pack

Generates a C++20 persistence library using sqlite_orm 1.9.1.

Each Dryv entity schema becomes a plain persistence struct. One aggregate `makeDryvStorage(path)` factory owns tables, primary/composite keys, indexes, unique indexes, scalar foreign keys and declared update/delete lifecycle actions.

Mappings are intentionally SQLite-specific:

- optional/nullable columns use `std::optional<T>`;
- system integer single-column primary keys use SQLite autoincrement;
- UUIDs, temporals, decimal/money and canonical enum values persist as strings;
- arrays, nested schemas, records and dynamic structures persist as JSON text strings;
- scalar FK fields remain authoritative and become real sqlite_orm foreign-key constraints;
- inverse relation fields are not duplicated as stored columns.

SQLite has no independent schema namespace, so a Dryv storage namespace is not fabricated into a table prefix. Defaults/check expressions and create-only enforcement remain migration/schema-layer concerns when their semantics are not portably representable by sqlite_orm's table declaration.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
