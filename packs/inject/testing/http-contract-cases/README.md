# HTTP Contract Cases pack

Generates portable machine-readable JSON case descriptors for every Dryv HTTP operation.

Each case records:

- semantic operation identity;
- method and canonical effective path;
- declared success statuses;
- HTTP binding locations and wire names;
- required/optional semantic fields where applicable;
- deterministic placeholder values suitable for test scaffolding.

These files are intended as **test inputs for generated client/backend harnesses**, not as a second API contract and not as Runtime IR. Placeholder values are synthesized and clearly marked as such.

The pack deliberately stops short of executing requests or interpreting framework behavior. Multipart values remain unresolved until Runtime IR exposes first-class file-part semantics.

Verification is deferred while the Dryv Engine is under maintenance.
