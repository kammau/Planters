"""got rid of forums

Revision ID: adf910c85cfc
Revises: ffa84e9c106e
Create Date: 2023-09-22 13:29:44.212870

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'adf910c85cfc'
down_revision = 'ffa84e9c106e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('forums')
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint('fk_posts_forum_id_forums', type_='foreignkey')
        batch_op.drop_column('forum_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('forum_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_posts_forum_id_forums', 'forums', ['forum_id'], ['id'])

    op.create_table('forums',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(), nullable=True),
    sa.Column('followers', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###