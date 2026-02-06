from locust import between, HttpUser, task
import random


"""
Locust file for FastNotes API performance benchmarking.

Requires seeded database (run scripts/seed_db.py first).

Running the test:    
    Start Locust in FastNotes/backend/:
        locust -f locustfile.py --host=http://localhost:8000
    
    Open web UI:
        http://localhost:8089
"""


class FastNotesUser(HttpUser):
    wait_time = between(0.5, 2)
    

    def on_start(self):
        self.user_id = random.randint(1, 1000)

        response = self.client.post(
            "/api/tokens",
            data={
                "username": f"user_{self.user_id}@example.com",
                "password": "password"
            }
        )
        self.token = response.json()["access_token"]

        self.note_id_start = (self.user_id - 1) * 100 + 1
        self.note_id_end = self.user_id * 100
    

    @task(1)
    def get_all_notes(self):
        self.client.get(
            f"/api/notes",
            headers={"Authorization": f"Bearer {self.token}"}
        )
