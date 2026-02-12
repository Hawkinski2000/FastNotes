"""limit total note length to 1000 characters

Revision ID: bdc5a1080150
Revises: f31c731bea88
Create Date: 2026-02-12 02:44:47.196720

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bdc5a1080150'
down_revision: Union[str, Sequence[str], None] = 'f31c731bea88'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column(
        "note",
        "title",
        existing_type=sa.String(),
        type_=sa.String(100),
        existing_nullable=True,
    )
    op.alter_column(
        "note",
        "content",
        existing_type=sa.String(),
        type_=sa.String(1000),
        existing_nullable=True,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column(
        "note",
        "title",
        existing_type=sa.String(100),
        type_=sa.String(),
        existing_nullable=True,
    )
    op.alter_column(
        "note",
        "content",
        existing_type=sa.String(1000),
        type_=sa.String(),
        existing_nullable=True,
    )
