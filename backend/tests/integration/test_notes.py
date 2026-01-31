import pytest

from app.db.models import Note
from app.schemas.note import NoteResponse


@pytest.fixture
def notes(user, another_user, session):
    notes_data = [
        {
            "user_id": user["id"],
            "title": "title",
            "content": "content"
        },
        {
            "user_id": user["id"],
            "title": "title",
            "content": "content"
        },
        {
            "user_id": another_user["id"],
            "title": "title",
            "content": "content"
        }
    ]

    new_notes = [Note(**data) for data in notes_data]

    session.add_all(new_notes)
    session.commit()

    return new_notes

# ----------------------------------------------------------------------------

@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "title": "title",
                "content": "content"
            },
            201
        ),
        (
            {
                "title": "title"
            },
            201
        ),
        (
            {
                "content": "content"
            },
            201
        )
    ]
)
def test_create_note(authorized_client, data, status_code):
    res = authorized_client.post("/api/notes", json=data)
    assert res.status_code == status_code
    NoteResponse(**res.json())


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "title": [],
                "content": "content"
            },
            422
        ),
        (
            {
                "title": "title",
                "content": []
            },
            422
        ),
        (
            {
                "title": "",
                "content": ""
            },
            422
        ),
        (
            {},
            422
        )
    ]
)
def test_create_note_invalid(authorized_client, data, status_code):
    res = authorized_client.post("/api/notes", json=data)
    assert res.status_code == status_code


def test_create_note_unauthorized(client):
    res = client.post(
        "/api/notes",
        json={"title": "title", "content": "content"}
    )
    assert res.status_code == 401

# ----------------------------------------------------------------------------

def test_get_notes(authorized_client, user, notes):
    res = authorized_client.get("/api/notes")
    assert res.status_code == 200
    notes_list = [NoteResponse(**note) for note in res.json()]
    user_notes = [note for note in notes if note.user_id == user["id"]]
    assert len(notes_list) == len(user_notes)


def test_get_notes_unauthorized(client, notes):
    res = client.get("/api/notes")
    assert res.status_code == 401

# ----------------------------------------------------------------------------

@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "title": "title",
                "content": "content"
            },
            200
        ),
        (
            {
                "title": "title"
            },
            200
        ),
        (
            {
                "content": "content"
            },
            200
        )
    ]
)
def test_update_note(authorized_client, notes, data, status_code):
    res = authorized_client.put(f"/api/notes/{notes[0].id}", json=data)
    assert res.status_code == status_code
    NoteResponse(**res.json())


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "title": [],
                "content": "content"
            },
            422
        ),
        (
            {
                "title": "title",
                "content": []
            },
            422
        ),
        (
            {
                "title": "",
                "content": ""
            },
            422
        ),
        (
            {},
            422
        )
    ]
)
def test_update_note_invalid(authorized_client, notes, data, status_code):
    res = authorized_client.put(f"/api/notes/{notes[0].id}", json=data)
    assert res.status_code == status_code


def test_update_note_unauthorized(client, notes):
    res = client.put(
        f"/api/notes/{notes[0].id}",
        json={"title": "title", "content": "content"}
    )
    assert res.status_code == 401


def test_update_note_not_owner(authorized_client, notes):
    res = authorized_client.put(
        f"/api/notes/{notes[2].id}",
        json={"title": "title", "content": "content"}
    )
    assert res.status_code == 404


def test_update_note_not_found(authorized_client, session, notes):
    max_id = session.query(Note.id).order_by(Note.id.desc()).first()[0]
    non_existent_id = max_id + 1
    res = authorized_client.put(
        f"/api/notes/{non_existent_id}",
        json={"title": "title", "content": "content"}
    )
    assert res.status_code == 404

# ----------------------------------------------------------------------------

def test_delete_note(authorized_client, notes):
    res = authorized_client.delete(f"/api/notes/{notes[0].id}")
    assert res.status_code == 204


def test_delete_note_unauthorized(client, notes):
    res = client.delete(f"/api/notes/{notes[0].id}")
    assert res.status_code == 401


def test_delete_note_not_owner(authorized_client, notes):
    res = authorized_client.delete(f"/api/notes/{notes[2].id}")
    assert res.status_code == 404


def test_delete_note_not_found(authorized_client, session, notes):
    max_id = session.query(Note.id).order_by(Note.id.desc()).first()[0]
    non_existent_id = max_id + 1
    res = authorized_client.delete(f"/api/notes/{non_existent_id}")
    assert res.status_code == 404
