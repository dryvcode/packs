"""Handwritten behaviour behind the generated User Management routes."""

from datetime import UTC, datetime
from uuid import UUID, uuid4

from fastapi import HTTPException

from app.gen.models import CreateUserRequest, UserPage, UserProfile, UserStatus
from app.gen.routers import CoreUserManagementService


class InMemoryUsers(CoreUserManagementService):
    def __init__(self) -> None:
        self._users: dict[UUID, UserProfile] = {}

    async def create_user(self, request: CreateUserRequest) -> UserProfile:
        if any(
            user.external_customer_id == request.external_customer_id
            for user in self._users.values()
        ):
            raise HTTPException(status_code=409, detail="duplicate external customer ID")
        user = UserProfile(
            id=uuid4(),
            external_customer_id=request.external_customer_id,
            display_name=request.display_name,
            status=request.status or UserStatus.ACTIVE,
            created_at=datetime.now(UTC),
        )
        self._users[user.id] = user
        return user

    async def get_user(self, id: UUID) -> UserProfile:
        user = self._users.get(id)
        if user is None:
            raise HTTPException(status_code=404, detail="User Not Found")
        return user

    async def list_users(self) -> UserPage:
        users = list(self._users.values())
        return UserPage(items=users, total=len(users))
