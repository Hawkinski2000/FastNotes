from datetime import datetime, timedelta, timezone
from fastapi.testclient import TestClient
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from unittest.mock import patch

from app.core import oauth2
from app.core.config import settings
from app.db import models
from app.db.db import get_db
from app.main import app


"""
Pytest test configuration.

Run all tests:
    python -m pytest -v -s

Run a specific test file:
    python -m pytest tests/<path_to_test_file>.py -v -s

Examples:
    python -m pytest tests/integration/test_file.py -v -s
    python -m pytest tests/unit/test_file.py -v -s
"""


TEST_DATABASE_URL = (
    f"postgresql://"
    f"{settings.database_username}:"
    f"{settings.database_password}@"
    f"{settings.database_hostname}:"
    f"{settings.database_port}/"
    f"{settings.database_name}_test"
)

engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


@pytest.fixture(scope="session", autouse=True)
def test_db():
    models.Base.metadata.create_all(bind=engine)
    yield
    models.Base.metadata.drop_all(bind=engine)


@pytest.fixture
def session():
    connection = engine.connect()
    transaction = connection.begin()

    db = TestingSessionLocal(bind=connection)
    try:
        yield db
    finally:
        db.close()
        transaction.rollback()
        connection.close()


@pytest.fixture
def client(session):
    def override_get_db():
        yield session

    app.dependency_overrides[get_db] = override_get_db

    try:
        yield TestClient(app)
    finally:
        app.dependency_overrides.clear()


@pytest.fixture
def mock_recaptcha():
    with patch("app.crud.users.requests.post") as mock_post:
        mock_post.return_value.json.return_value = {"success": True}
        yield mock_post


@pytest.fixture
def user(client, mock_recaptcha):
    user_data = {
        "username": "username",
        "email": "email@gmail.com",
        "password": "password",
        "recaptcha_token": "recaptcha_token"
    }

    res = client.post("/api/users", json=user_data)

    new_user = res.json()
    new_user["password"] = user_data["password"]

    return new_user


@pytest.fixture
def another_user(client, mock_recaptcha):
    user_data = {
        "username": "username2",
        "email": "email2@gmail.com",
        "password": "password",
        "recaptcha_token": "recaptcha_token"
    }

    res = client.post("/api/users", json=user_data)

    new_user = res.json()
    new_user["password"] = user_data["password"]
    
    return new_user


@pytest.fixture
def token(user):
    return oauth2.create_access_token({"user_id": user["id"]})


@pytest.fixture
def authorized_client(client, token):
    client.headers = {"Authorization": f"Bearer {token}"}
    return client


@pytest.fixture
def google_user(session):
    user = models.User(
        username="email@gmail.com",
        email="email@gmail.com",
        google_sub="sub"
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@pytest.fixture
def mock_verify_google_access_token():
    with patch("app.core.oauth2.verify_google_access_token") as mock_verify:
        mock_verify.return_value = {"sub": "sub", "email": "email@gmail.com"}
        yield mock_verify


@pytest.fixture
def refresh_token(client, user):
    res = client.post(
        "/api/tokens",
        data={"username": user["email"], "password": user["password"]}
    )
    assert res.status_code == 201

    return res.cookies.get("refresh_token")


@pytest.fixture
def expired_refresh_token(session, client, user):
    raw_token = oauth2.generate_refresh_token()
    token_hash = oauth2.hash_token(raw_token)
    expires_at = datetime.now(timezone.utc) - timedelta(days=1)

    new_refresh_token = models.RefreshToken(
        user_id=user["id"],
        token_hash=token_hash,
        expires_at=expires_at
    )
    session.add(new_refresh_token)
    session.commit()

    return raw_token
