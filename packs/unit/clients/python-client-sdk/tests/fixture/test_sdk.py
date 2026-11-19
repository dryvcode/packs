import asyncio
import json
from uuid import UUID

import httpx
from dryv_client import (
    ApiError,
    CreateUserRequest,
    DryvClient,
    UserProfile,
    core_create_user,
)

EXTERNAL_ID = UUID("07b6e771-7f40-45bd-b021-10d41a2329fd")
USER_ID = UUID("91372b78-f094-4ab6-bad9-7fa3a81cf38c")


def handle(request: httpx.Request) -> httpx.Response:
    assert request.method == "POST"
    assert request.url.path == "/api/users"
    payload = json.loads(request.content)
    assert payload["externalCustomerId"] == str(EXTERNAL_ID)
    assert "status" not in payload
    if payload["displayName"] == "Duplicate":
        return httpx.Response(409, json={"message": "Already exists"})
    return httpx.Response(
        201,
        json={
            **payload,
            "id": str(USER_ID),
            "createdAt": "2026-11-13T09:30:00.000Z",
        },
    )


async def main() -> None:
    async with httpx.AsyncClient(transport=httpx.MockTransport(handle)) as transport:
        async with DryvClient("http://fixture.test", http=transport) as client:
            user = await core_create_user(
                client,
                CreateUserRequest(
                    external_customer_id=EXTERNAL_ID, display_name="New user"
                ),
            )
            assert isinstance(user, UserProfile)
            assert user.id == USER_ID
            assert user.display_name == "New user"
            try:
                await core_create_user(
                    client,
                    CreateUserRequest(
                        external_customer_id=EXTERNAL_ID, display_name="Duplicate"
                    ),
                )
            except ApiError as error:
                assert error.status == 409
                assert str(error) == "Already exists"
                assert error.payload == {"message": "Already exists"}
            else:
                raise AssertionError("HTTP failure should raise ApiError")
        assert not transport.is_closed


if __name__ == "__main__":
    asyncio.run(main())
