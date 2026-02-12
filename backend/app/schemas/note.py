from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, model_validator
from typing import Optional


class NoteBase(BaseModel):
    title: Optional[str] = Field(None, max_length=100)
    content: Optional[str] = Field(None, max_length=1000)


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
