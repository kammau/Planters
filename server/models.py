from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    accountType = db.Column(db.String)

    posts = db.relationship("Post", backref="user")
    plants = db.relationship("Plant", secondary=user_plant, back_populates="users")

    def __repr__(self):
        return f"<User {self.username} | {self.accountType}>"

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    genre = db.Column(db.String)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))
    forum_id = db.Column(db.Integer(), db.ForeignKey("forums.id"))

    def __repr__(self):
        return f"<Post {self.genre} | {self.user_id}>"

class Plant(db.Model):
    __tablename__ = "plants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    #native = db.Column(db.String)
    growingLevel = db.Column(db.Integer) 
    img = db.Column(db.String)

    users = db.relationship("User", secondary=user_plant, back_populates="plants")

class Forum(db.Model):
    __tablename__ = "forums"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    followers = db.Column(db.Integer)

    # Maybe add a number of posts

    posts = db.relationship("Post", backref="forum")

    def __repr__(self):
        return f"<Forum {self.title} | {self.followers}"

user_plant = db.Table(
    "user_plant", 
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("plant_id", db.Integer, db.ForeignKey("plants.id"))
)