# Schema Examples pack

Materializes canonical examples already authored on Dryv schemas.

Generated output:

- one `examples/<group>_<schema>.examples.json` file per schema;
- `examples/index.json` mapping each schema identity to the exact generated fixture path and authored example count.

The pack does **not** synthesize data, infer defaults, or create arbitrary example values. A schema with no authored examples generates an empty JSON array, which makes absence explicit and deterministic.

This is a testing/output projection only. It never becomes semantic authority and never feeds examples back into Runtime IR.

Verification is deferred while the Dryv Engine is under maintenance.
