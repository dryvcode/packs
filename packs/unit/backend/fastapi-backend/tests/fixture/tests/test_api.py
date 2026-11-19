from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def payload() -> dict[str, object]:
    return {"external_customer_id": str(uuid4()), "display_name": "Ada Lovelace"}


def test_create_get_and_list_users() -> None:
    created = client.post("/users", json=payload())
    assert created.status_code == 201
    user = created.json()
    assert user["status"] == "active"

    assert client.get(f"/users/{user['id']}").json() == user
    listed = client.get("/users").json()
    assert user in listed["items"]


def test_generated_models_validate_requests() -> None:
    assert client.post("/users", json={**payload(), "display_name": ""}).status_code == 422
    assert client.post("/users", json={**payload(), "id": str(uuid4())}).status_code == 422


def test_handwritten_failures_surface_as_http_errors() -> None:
    assert client.get(f"/users/{uuid4()}").status_code == 404
    first = payload()
    assert client.post("/users", json=first).status_code == 201
    assert client.post("/users", json=first).status_code == 409
