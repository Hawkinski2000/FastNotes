import argparse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.v1 import notes, tokens, users


app = FastAPI(redirect_slashes=False)


origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/")
def root():
    return {"data": "root"}

app.include_router(users.router)
app.include_router(tokens.router)
app.include_router(notes.router)
