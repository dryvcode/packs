# FastAPI backend pack

Generates a Python package at its destination root:

- `models/`: a Pydantic model per schema, enum and generic, with field constraints, defaults and validated formats;
- `routers/`: for every feature with HTTP operations, an abstract `<Group><Feature>Service` and a `build_<group>_<feature>_router(service)` factory whose routes delegate to the service;
- `__init__.py`: re-exports `models` and `routers`.

The project owns the app, persistence and tests. It implements each service and mounts the router:

```python
app = FastAPI()
app.include_router(build_core_user_management_router(MyUserService()))
```

Services raise `fastapi.HTTPException` for failures such as "not found".

**Test:** `bun scripts/test-pack.ts backend/fastapi-backend` renders the flagship IR into a small app with in-memory services and runs its tests against the real endpoints.

## Use it

```yaml
packs:
  fastapi:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: backend/fastapi-backend/v0.1.0
      path: packs/backend/fastapi-backend
    destinations:
      source:
        $ref: "#/destinations/<your destination>"
```
