"""add index to user_id in note table

Revision ID: f31c731bea88
Revises: 17a1d2baf6d9
Create Date: 2026-02-07 04:43:46.211482

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f31c731bea88'
down_revision: Union[str, Sequence[str], None] = '17a1d2baf6d9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_index(op.f('ix_note_user_id'), 'note', ['user_id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_note_user_id'), table_name='note')
