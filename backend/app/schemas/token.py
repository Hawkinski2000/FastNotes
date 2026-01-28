from pydantic import BaseModel
from typing import Optional


class TokenBase(BaseModel):
    pass


class TokenResponse(TokenBase):
    access_token: str
    token_type: str
    user_exists: Optional[bool] = None


class TokenData(BaseModel):
    user_id: Optional[int] = None


class GoogleTokenRequest(BaseModel):
    access_token: str
