from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional


class NoteBase(BaseModel):
    title: Optional[str] = None
    conent: Optional[str] = None


class NoteCreate(NoteBase):
    pass


class NoteResponse(NoteBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
