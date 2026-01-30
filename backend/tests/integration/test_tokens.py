import pytest

from app.schemas.token import TokenResponse


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "username": "email@gmail.com",
                "password": "password"
            },
            201
        ),
        (
            {
                "username": "email2@gmail.com",
                "password": "password"
            },
            201
        )
    ]
)
def test_create_token(client, user, another_user, data, status_code):
    res = client.post("/api/tokens", data=data)
    assert res.status_code == status_code
    new_token = TokenResponse(**res.json())
    assert new_token.access_token
    assert len(new_token.access_token.split(".")) == 3
    assert new_token.token_type == "bearer"


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "password": "password"
            },
            422
        ),
        (
            {
                "username": "email@gmail.com"
            },
            422
        ),
        (
            {
                "email": [],
                "password": "password"
            },
            422
        )
    ]
)
def test_create_token_invalid(client, user, data, status_code):
    res = client.post("/api/tokens", data=data)
    assert res.status_code == status_code


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "username": "email@gmail.com",
                "password": "password"
            },
            403
        )
    ]
)
def test_create_token_user_not_found(client, data, status_code):
    res = client.post("/api/tokens", data=data)
    assert res.status_code == status_code


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "username": "email@gmail.com",
                "password": "password2"
            },
            403
        )
    ]
)
def test_create_token_wrong_password(client, user, data, status_code):
    res = client.post("/api/tokens", data=data)
    assert res.status_code == status_code

# ----------------------------------------------------------------------------

@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "access_token": "access_token"
            },
            201
        )
    ]
)
def test_create_token_google_new_user(
    client,
    mock_verify_google_access_token,
    data,
    status_code
):
    res = client.post("/api/tokens/google", json=data)
    assert res.status_code == status_code
    new_token = TokenResponse(**res.json())
    assert new_token.access_token
    assert len(new_token.access_token.split(".")) == 3
    assert new_token.token_type == "bearer"
    assert new_token.user_exists == False


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "access_token": "access_token"
            },
            201
        )
    ]
)
def test_create_token_google_existing_user(
    client,
    google_user,
    mock_verify_google_access_token,
    data,
    status_code
):
    res = client.post("/api/tokens/google", json=data)
    assert res.status_code == status_code
    new_token = TokenResponse(**res.json())
    assert new_token.access_token
    assert len(new_token.access_token.split(".")) == 3
    assert new_token.token_type == "bearer"
    assert new_token.user_exists == True


@pytest.mark.parametrize(
    "data, status_code",
    [
        (
            {
                "access_token": []
            },
            422
        )
    ]
)
def test_create_token_google_invalid(client, data, status_code):
    res = client.post("/api/tokens", data=data)
    assert res.status_code == status_code
