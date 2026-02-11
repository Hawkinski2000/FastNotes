from fastapi import HTTPException, status
import json
import redis
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.schemas import note
from app.db.models import Note


r = redis.Redis(host=settings.redis_host, decode_responses=True)


def create_note(note: note.NoteCreate, user_id: int, db: Session):
    new_note = Note(**note.model_dump(exclude_unset=True), user_id=user_id)
    db.add(new_note)
    db.commit()
    r.delete(f"notes:{user_id}")
    db.refresh(new_note)
    return new_note


def get_notes(user_id: int, db: Session):
    cache_key = f"notes:{user_id}"

    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)

    rows = db.execute(
        text(
            """
            SELECT id, title, content, created_at
            FROM note
            WHERE user_id = :uid
            ORDER BY created_at DESC
            """
        ),
        {"uid": user_id}
    ).mappings().all()

    notes = []
    for row in rows:
        note = dict(row)
        created_at = note["created_at"]
        note["created_at"] = created_at.isoformat() if created_at else None
        notes.append(note)

    r.set(cache_key, json.dumps(notes), ex=86400)

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
    r.delete(f"notes:{user_id}")
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
    r.delete(f"notes:{user_id}")
