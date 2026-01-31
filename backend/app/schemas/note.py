from datetime import datetime
from pydantic import BaseModel, ConfigDict, model_validator
from typing import Optional


class NoteBase(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class NoteCreate(NoteBase):
    @model_validator(mode="after")
    def check_note_not_empty(self):
        if not self.title and not self.content:
            raise ValueError("Note cannot be empty")
        return self


class NoteResponse(NoteBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
