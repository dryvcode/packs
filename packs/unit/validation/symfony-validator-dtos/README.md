# Symfony Validator DTOs pack

Generates PHP 8.4.1+ typed DTOs, canonical-value enum wrappers and reusable Symfony Validator 8.1 validator classes.

DTOs remain framework-neutral and reuse the same PHP wire model used by the client/backend packs. Validator classes map required/nullability semantics, nested schemas, collections, enum membership, string length/formats/patterns, numeric ranges and simple schema invariants. Nested DTOs are delegated to their generated validator classes rather than embedding framework metadata into the DTO itself.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
