# JSON Schema pack

Generates one portable JSON Schema Draft 2020-12 document per Dryv schema.

The pack translates canonical Dryv validation meaning into standard JSON Schema vocabulary:

- effective schema fields → `properties`;
- required presence → `required`;
- nullability → `anyOf` with `null`;
- arrays and cardinality → `items`, `minItems`, `maxItems`;
- nested schemas → relative `$ref` links to generated schema artifacts;
- arbitrary canonical enums → `enum`;
- literals → `const`;
- primitive length/range/multiple-of rules;
- common standard formats plus deterministic patterns for selected Dryv-specific string formats;
- tuple properties → Draft 2020-12 `prefixItems` + `items: false`;
- record/object/union/nullable TypeContext forms.

Every document declares:

`"$schema": "https://json-schema.org/draft/2020-12/schema"`

The following Dryv semantics are intentionally **not approximated**:

- cross-field schema/composite invariants (standard JSON Schema has no portable `$data` comparison vocabulary);
- arithmetic invariants;
- decimal precision/scale beyond directly representable numeric constraints;
- temporal past/future/range ordering;
- generic-application substitution when only a semantic generic link is available;
- nested TypeContext references that do not resolve to another generated schema artifact.

`format` follows JSON Schema 2020-12 semantics and should not be treated as stronger than the validator implementation's enabled format vocabulary.

This pack generates validation artifacts only. Runtime IR remains Dryv's semantic authority; generated JSON Schema is never read back as Dryv meaning.

**Provides:** `schema.validation`.

Verification is deferred while the Dryv Engine is under maintenance.
