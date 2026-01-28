from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional


class UserBase(BaseModel):
    username: str
    email: EmailStr
    settings: Optional[dict] = None


class UserCreate(UserBase):
    password: Optional[str] = None
    recaptcha_token: Optional[str] = None


class UserUpdate(BaseModel):
    settings: Optional[dict] = None

    model_config = ConfigDict(extra="forbid")


class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CheckResponse(BaseModel):
    taken: bool
