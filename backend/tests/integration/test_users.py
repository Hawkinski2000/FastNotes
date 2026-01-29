import pytest

from app.schemas.user import CheckResponse, UserResponse
from app.db.models import User


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "username": "username",
                "email": "email@gmail.com",
                "password": "password",
                "recaptcha_token": "recaptcha_token"
            },
            201
        )
    ]
)
def test_create_user(client, data, mock_recaptcha, status_code):
    res = client.post("/api/users", json=data)
    assert res.status_code == status_code
    res_data = UserResponse(**res.json())
    assert data["username"] == res_data.username
    assert data["email"] == res_data.email
    assert "password" not in res.json()


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "email": "email@gmail.com",
                "password": "password",
                "recaptcha_token": "recaptcha_token"
            },
            422
        ),
        (
            {
                "username": "username",
                "password": "password",
                "recaptcha_token": "recaptcha_token"
          },
          422
        )
    ]
)
def test_create_user_invalid(client, data, mock_recaptcha, status_code):
    res = client.post("/api/users", json=data)
    assert res.status_code == status_code


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "username": "username",
                "email": "email2@gmail.com",
                "password": "password",
                "recaptcha_token": "recaptcha_token"
            },
            409
        ),
        (
            {
                "username": "username2",
                "email": "email@gmail.com",
                "password": "password",
                "recaptcha_token": "recaptcha_token"
            },
            409
        )
    ]
)
def test_create_user_duplicate(
    client,
    user,
    data,
    mock_recaptcha,
    status_code
):
    res = client.post("/api/users", json=data)
    assert res.status_code == status_code

# ----------------------------------------------------------------------------

@pytest.mark.parametrize(
    "data, response, status_code",
    [
        (
            {
                "username": "username"
            },
            {
                "taken": True
            },
            200
        ),
        (
            {
                "username": "username2"
            },
            {
                "taken": False
            },
            200
        )
    ]
)
def test_check_username(client, user, data, response, status_code):
    res = client.get("/api/users/check-username", params=data)
    assert res.status_code == status_code
    res_data = CheckResponse(**res.json())
    assert response == res_data.model_dump()


@pytest.mark.parametrize(
    "data, response, status_code",
    [
        (
            {
                "username": []
            },
            {
                "taken": True
            },
            422
        )
    ]
)
def test_check_username_invalid(client, user, data, response, status_code):
    res = client.get("/api/users/check-username", params=data)
    assert res.status_code == status_code

# ----------------------------------------------------------------------------

@pytest.mark.parametrize(
    "data, response, status_code",
    [
        (
            {
                "email": "email@gmail.com"
            },
            {
                "taken": True
            },
            200
        ),
        (
            {
                "email": "email2@gmail.com"
            },
            {
                "taken": False
            },
            200
        )
    ]
)
def test_check_email(client, user, data, response, status_code):
    res = client.get("/api/users/check-email", params=data)
    assert res.status_code == status_code
    res_data = CheckResponse(**res.json())
    assert response == res_data.model_dump()


@pytest.mark.parametrize(
    "data, response, status_code",
    [
        (
            {
                "email": []
            },
            {
                "taken": True
            },
            422
        )
    ]
)
def test_check_email_invalid(client, user, data, response, status_code):
    res = client.get("/api/users/check-email", params=data)
    assert res.status_code == status_code

# ----------------------------------------------------------------------------

def test_get_user(authorized_client, user):
    res = authorized_client.get(f"/api/users/{user["id"]}")
    assert res.status_code == 200
    UserResponse(**res.json())


def test_get_user_unauthorized(client, user):
    res = client.get(f"/api/users/{user["id"]}")
    assert res.status_code == 401


def test_get_user_not_owner(authorized_client, another_user):
    res = authorized_client.get(f"/api/users/{another_user["id"]}")
    assert res.status_code == 404


def test_get_user_not_found(authorized_client, session):
    max_id = session.query(User.id).order_by(User.id.desc()).first()[0]
    non_existent_id = max_id + 1
    res = authorized_client.get(f"/api/users/{non_existent_id}")
    assert res.status_code == 404

# ----------------------------------------------------------------------------

@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "settings": {}
            },
            200
        )
    ]
)
def test_update_user(authorized_client, user, data, status_code):
    res = authorized_client.patch(f"/api/users/{user["id"]}", json=data)
    assert res.status_code == status_code
    res_data = UserResponse(**res.json())
    assert data["settings"] == res_data.settings


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "settings": []            
            },
            422
        )
    ]
)
def test_update_user_invalid(authorized_client, user, data, status_code):
    res = authorized_client.patch(f"/api/users/{user["id"]}", json=data)
    assert res.status_code == status_code


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "settings": {}
            },
            401
        )
    ]
)
def test_update_user_unauthorized(client, user, data, status_code):
    res = client.patch(f"/api/users/{user["id"]}", json=data)
    assert res.status_code == status_code


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "settings": {}
            },
            404
        )
    ]
)
def test_update_user_not_owner(
    authorized_client,
    another_user,
    data,
    status_code
):
    res = authorized_client.patch(
        f"/api/users/{another_user["id"]}",
        json=data
    )
    assert res.status_code == status_code


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "settings": {}
            },
            404
        )
    ]
)
def test_update_user_not_found(authorized_client, session, data, status_code):
    max_id = session.query(User.id).order_by(User.id.desc()).first()[0]
    non_existent_id = max_id + 1
    res = authorized_client.patch(f"/api/users/{non_existent_id}", json=data)
    assert res.status_code == status_code

# ----------------------------------------------------------------------------

def test_delete_user(authorized_client, user):
    res = authorized_client.delete(f"/api/users/{user["id"]}")
    assert res.status_code == 204


def test_delete_user_unauthorized(client, user):
    res = client.delete(f"/api/users/{user["id"]}")
    assert res.status_code == 401


def test_delete_user_not_owner(authorized_client, another_user):
    res = authorized_client.delete(f"/api/users/{another_user["id"]}")
    assert res.status_code == 404


def test_delete_user_not_found(authorized_client, session):
    max_id = session.query(User.id).order_by(User.id.desc()).first()[0]
    non_existent_id = max_id + 1
    res = authorized_client.delete(f"/api/users/{non_existent_id}")
    assert res.status_code == 404
