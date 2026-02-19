"""remove username from user table

Revision ID: d54e127e900b
Revises: bdc5a1080150
Create Date: 2026-02-19 03:42:09.799062

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd54e127e900b'
down_revision: Union[str, Sequence[str], None] = 'bdc5a1080150'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_column('user', 'username')


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column('user', sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=False))
