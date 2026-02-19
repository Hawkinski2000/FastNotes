import bcrypt
import random
from sqlalchemy import text
import string
from tqdm import tqdm

from app.db.db import SessionLocal
from app.db.models import Note, User


"""
Script for seeding database with fake users and notes for performance testing.

Creates 1000 users, each with 100 notes of 1000 characters.

Running the script:
    Enter the api container:
        docker compose -f docker-compose-dev.yml exec api bash
    
    Run the script inside the api container:
        python -m scripts.seed_db
"""


def generate_note_content(length=1000):
    return ''.join(
        random.choices(string.ascii_letters + string.digits + ' ', k=length)
    )


def seed_data(num_users=1000, notes_per_user=100, note_length=1000):
    session = SessionLocal()
    
    password = "password".encode("utf-8")
    password_hash = bcrypt.hashpw(password, bcrypt.gensalt()).decode("utf-8")

    try:
        print(
            f"Creating {num_users} users with {notes_per_user} notes each..."
        )

        session.execute(
            text(
                """
                TRUNCATE TABLE "user", note, refresh_token
                RESTART IDENTITY CASCADE
                """
            )
        )
        session.commit()
        
        for i in tqdm(range(1, num_users + 1), desc="Seeding users"):
            user = User(
                email=f"user_{i}@example.com",
                password_hash=password_hash
            )
            session.add(user)
            session.flush()
            
            notes = [
                Note(
                    user_id=user.id,
                    title=f"Note {j}",
                    content=generate_note_content(note_length)
                )
                for j in range(notes_per_user)
            ]
            session.bulk_save_objects(notes)
            
            if i % 100 == 0:
                session.commit()
        
        session.commit()
        print("Seeding complete!")
        
    except Exception as e:
        session.rollback()
        print(f"Error: {e}")

    finally:
        session.close()


if __name__ == "__main__":
    seed_data()
