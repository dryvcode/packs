# NestJS Application project pack

Generates an editable NestJS application shell plus feature-grouped Dryv HTTP controllers.

This is a **project** pack, not a hidden bundle of other packs. The consuming `dryv.yaml` must explicitly activate and bind:

- `schema.validation` — required;
- `schema.persistence` — optional.

The project pack owns NestJS bootstrap/routing. Validation and persistence types come through normal Dryv capability bindings and appear as planner dependencies. Nothing is activated implicitly.

Generated controllers use canonical **effective** HTTP paths from the Engine. Each feature exposes an abstract service contract and a dynamic Nest module; application code supplies the handwritten service implementation and registers the generated module. The root `AppModule` remains intentionally editable and starts empty so Dryv never invents business implementations.

Verification is deferred while the Dryv Engine is under maintenance.
