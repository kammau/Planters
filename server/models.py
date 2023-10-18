from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from app import db, bcrypt

user_plant = db.Table(
    "user_plant", 
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("plant_id", db.Integer, db.ForeignKey("plants.id"))
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-plants.users", "-posts.user", "-plants.posts", "-posts.plant")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    plants = db.relationship("Plant", secondary=user_plant, back_populates="users")

    posts = db.relationship("Post", back_populates="user")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes cannot be viewed!")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8"))


    def __repr__(self):
        return f"< User | {self.username} | {self.id}>"

class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    serialize_rules = ("-user.posts", "-plant.posts", "-plant.users", "-user.plants")

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    genre = db.Column(db.String)
    img = db.Column(db.String, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    plant_id = db.Column(db.Integer, db.ForeignKey("plants.id"))

    user = db.relationship("User", back_populates="posts")
    plant = db.relationship("Plant", back_populates="posts")


    def __repr__(self):
        return f"<Post {self.genre} | {self.user} | {self.plant}>"

class Plant(db.Model, SerializerMixin):
    __tablename__ = "plants"

    serialize_rules = ("-users.plants", "-posts.plant", "-posts.user", "-users.posts")

    id = db.Column(db.Integer, primary_key=True)
    common_name = db.Column(db.String, unique=True)
    scientific_name = db.Column(db.String)
    growing_level = db.Column(db.Integer) 
    img = db.Column(db.String)

    users = db.relationship("User", secondary=user_plant, back_populates="plants")

    posts = db.relationship("Post", back_populates="plant")

    def __repr__(self):
        return f"<Plant | {self.common_name} | {self.id}>"

