# Pydantic Models pack

Generates a standalone Python 3.11+ package containing Pydantic v2 models, canonical-value enums and generic models from Dryv Runtime IR.

The package is the reusable Python validation/type layer shared conceptually with the FastAPI backend. It covers nested schemas, arrays, optional/null distinctions, primitive constraints, common string formats, canonical enum values, temporal values, generics and schema invariants.

Pydantic validation is model-level; no framework-specific request or persistence behavior is introduced.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
