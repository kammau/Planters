from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    # add password and serializer
    posts = db.relationship("Post", backref="user")

    def __repr__(self):
        return f"<User {self.username}>"

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    genre = db.Column(db.String)
    # come back to add more

    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))

    def __repr__(self):
        return f"<Post {self.genre}>" # come back to repr

class Plant(db.Model):
    __tablename__ = "plants"

    id = Column(db.Integer, primary_key=True)
    name = Column(db.String)
    native = Column(db.String)
    growingLevel = Column(db.Integer)