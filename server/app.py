#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request
from flask_restful import Resource
from flask_migrate import Migrate 

# Local imports
from config import app, db, api
from models import db, User, Post, Plant, Forum

app = Flask(__name__)
# CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #

migrate = Migrate(app, db)

db.init_app(app)

class CheckSession(Resource):
    def get(self):
        if session.get("user.id"):
            user = User.query.filter(User.id == session["user_id"]).first()

            return user.to_dict(), 200

        return {"error": "401 Unauthorized"}

class Login(Resource):
    def post(self):
        username = request.get_json().get("username")
        password = request.get_json().get("password")

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session["user_id"] = user.id
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        
        return {"error": "401 Unauthorized"}, 401


api.add_resource(Login, "/login", endpoint="login")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

