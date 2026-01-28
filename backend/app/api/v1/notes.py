from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.crud import notes as crud_notes
from app.db.db import get_db
from app.core.oauth2 import get_current_user
from app.schemas import note, token


router = APIRouter(prefix="/api/notes", tags=['Notes'])


# Create a note
@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=note.NoteResponse
)
def create_note(
    note: note.NoteCreate,
    current_user: token.TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_note = crud_notes.create_note(note, current_user.user_id, db)
    return new_note


# Get all notes
@router.get("", response_model=list[note.NoteResponse])
def get_notes(
    current_user: token.TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notes = crud_notes.get_notes(current_user.user_id, db)
    return notes


# Update a note
@router.put("/{id}", response_model=note.NoteResponse)
def update_note(
    id: int,
    note: note.NoteCreate,
    current_user: token.TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    updated_note = crud_notes.update_note(id, note, current_user.user_id, db)
    return updated_note


# Delete a note
@router.delete("/{id}")
def delete_note(
    id: int,
    current_user: token.TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    crud_notes.delete_note(id, current_user.user_id, db)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
