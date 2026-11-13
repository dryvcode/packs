# Python Client SDK pack

Generates a reusable async Python 3.11+ HTTP client package using HTTPX and Pydantic v2.

The package owns one `DryvClient`, typed Pydantic models/enums/generics and one async function per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Pydantic `TypeAdapter` performs typed response decoding.

Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning. Non-2xx responses raise `ApiError` with status, message and decoded payload when available.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

The `package_name` input sets the installable distribution name (default `dryv-client`). Import from `dryv_client`. Use the client as an async context manager, or pass a caller-owned `httpx.AsyncClient` for shared connection pooling, authentication, or custom transport.

Models accept Python field names and authored JSON names. Requests use authored JSON names and omit fields the caller leaves unset. For the shared fixture, a JSON POST looks like this.

```python
from uuid import UUID

from dryv_client import CreateUserRequest, DryvClient, core_create_user


async def create_user(base_url: str, customer_id: UUID) -> None:
    request = CreateUserRequest(external_customer_id=customer_id, display_name="New user")
    async with DryvClient(base_url) as client:
        user = await core_create_user(client, request)
        print(user.id)
```

The shared fixture checks request serialization, response decoding, and HTTP error handling.

```sh
bun scripts/test-pack.ts --keep unit/clients/python-client-sdk
```

Declared failures also generate named exception types in `dryv_client.errors`, selected by the
HTTP body's stable `code`. Each exposes its structured body and authored issue paths; schema and
primitive payloads expose typed `details`. Unknown error bodies retain the base `ApiError` surface.
Query-derived response schemas, nested collections and envelopes use the same Pydantic models as
ordinary operations. Request serialization preserves omission separately from explicit null.
