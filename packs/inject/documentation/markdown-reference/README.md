# Markdown Reference pack

Generates human-readable reference documentation directly from Canonical Runtime IR.

Output:

- `reference/index.md` — application entry point;
- `reference/schemas.md` — schema catalogue with fields, roles and storage facts;
- `reference/operations.md` — behavior/HTTP catalogue with semantic inputs, outputs, access and execution facts;
- `reference/policies.md` — policy catalogue;
- `reference/failures.md` — failure contracts;
- `reference/events.md` — event payloads/listeners;
- `reference/workflows.md` — workflow ports, steps and transitions;
- `reference/relationships.md` — Mermaid ER-style relation projection.

This pack intentionally documents HTTP paths as **operation-local paths**. Dryv currently exposes `operation.facets.http.path.local` and separately documents effective-path composition through application/group roots as a pending Engine improvement. The pack labels that fact rather than inventing an effective route.

Generated Markdown is a projection only. It never becomes semantic authority and is never read back into Dryv.

Verification is deferred while the Dryv Engine is under maintenance.
