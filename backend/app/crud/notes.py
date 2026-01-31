from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.schemas import note
from app.db.models import Note


def create_note(note: note.NoteCreate, user_id: int, db: Session):
    new_note = Note(**note.model_dump(exclude_unset=True), user_id=user_id)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note


def get_notes(user_id: int, db: Session):
    notes = (
        db.query(Note)
        .filter(Note.user_id == user_id)
        .order_by(Note.created_at.desc())
        .all()
    )
    return notes


def update_note(id: int, note: note.NoteCreate, user_id: int, db: Session):
    note_query = db.query(Note).filter(Note.id == id, Note.user_id == user_id)

    if not note_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )

    note_query.update(
        note.model_dump(exclude_unset=True),
        synchronize_session=False
    )
    db.commit()
    updated_note = note_query.first()
    return updated_note


def delete_note(id: int, user_id: int, db: Session):
    note = (
        db.query(Note)
        .filter(Note.id == id, Note.user_id == user_id)
        .first()
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )

    db.delete(note)
    db.commit()
