# Schema Contract Cases pack

Generates one machine-readable JSON contract descriptor per Dryv schema.

Each descriptor records the semantic field contract needed by cross-language generated-model and validation tests:

- field names and semantic value kinds;
- optionality, nullability and array bounds;
- canonical enum values;
- primitive length/range/pattern/format constraints;
- defaults;
- mutation ownership;
- schema invariants;
- authored examples.

These descriptors are testing projections only. They never become semantic authority and are never read back into Dryv.

Verification is deferred while the Dryv Engine is under maintenance.
