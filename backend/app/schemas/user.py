from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    settings: Optional[dict] = None


class UserCreate(UserBase):
    password: str
    recaptcha_token: str


class UserUpdate(BaseModel):
    settings: dict

    model_config = ConfigDict(extra="forbid")


class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CheckResponse(BaseModel):
    taken: bool
