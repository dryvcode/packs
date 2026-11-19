"""The application: generated routers plus handwritten services."""

from fastapi import FastAPI

from app.gen.routers import build_core_user_management_router
from app.services import InMemoryUsers

app = FastAPI(title="Users")
app.include_router(build_core_user_management_router(InMemoryUsers()))
