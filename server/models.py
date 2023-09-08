from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

user_plant = db.Table(
    "user_plant", 
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("plant_id", db.Integer, db.ForeignKey("plants.id"))
)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    accountType = db.Column(db.String) # Maybe get rid of accountType later...

    posts = db.relationship("Post", backref="user")
    plants = db.relationship("Plant", secondary=user_plant, back_populates="users")

    # @hybrid_property
    # def password_hash(self):
    #     raise AttributeError("")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8"))


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
    common_name = db.Column(db.String)
    scientific_name = db.Column(db.String)
    growing_level = db.Column(db.Integer) 
    img = db.Column(db.String)

    users = db.relationship("User", secondary=user_plant, back_populates="plants")

    def __repr__(self):
        return f"<Plant {self.common_name} | {self.scientific_name} | {self.growing_level}>"

class Forum(db.Model):
    __tablename__ = "forums"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    followers = db.Column(db.Integer)

    # Maybe add a number of posts

    posts = db.relationship("Post", backref="forum")

    def __repr__(self):
        return f"<Forum {self.title} | {self.followers}"
