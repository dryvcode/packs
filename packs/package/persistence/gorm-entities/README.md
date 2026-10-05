# GORM Entities pack

Generates Go entity models for GORM v1.31 from Dryv schemas with role `entity`.

Mappings are target-owned:

- storage name / namespace → `TableName()`;
- primary keys → `primaryKey`;
- system integer primary keys use GORM auto-increment;
- indexes and unique indexes → named GORM index tags;
- optional/nullable scalar values → pointers;
- decimal/money values → exact strings with explicit decimal column types;
- arrays, nested schemas, records and dynamic structures → GORM JSON serializer fields;
- owning relations keep the scalar FK and add a navigation field using `foreignKey` / `references`;
- inverse one-to-one / one-to-many relations add navigation fields without replacing canonical FK values;
- relation lifecycle maps to GORM constraint actions only where Dryv explicitly declares it.

Defaults and schema invariants are not guessed into GORM tags when they need database-specific expressions/check constraints. Those belong in a future migration/schema pack.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
