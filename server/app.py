#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, jsonify, make_response
from flask_restful import Resource


# Local imports
from config import app, db, api
from models import db, User, Post, Plant, Forum, user_plant

app.secret_key = b'Q\xd9\x0c\xf0\xec\x1e!\xdb\xae6\x08\x0cuf\x95\xf9'


class CheckSession(Resource):
    def get(self):
        if session.get("user.id"):
            user = User.query.filter(User.id == session["user_id"]).first()

            return user.to_dict(), 200

        return {"error": "401 Unauthorized"}, 401

class Login(Resource):
    def post(self):
        username = request.get_json().get("username")
        password = request.get_json().get("password")

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session["user_id"] = user.id

            return user.to_dict(), 200
        
        return {"error": "401 Unauthorized"}, 401

class Signup(Resource):
    def post(self):
        username = request.get_json().get("username")
        password = request.get_json().get("password")

        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session["user_id"] = new_user.id

            return new_user.to_dict(), 201
        
        return {"error": "422 Unprocessable Entity"}, 422

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {"message": "204: No Content"}, 204

class Plants(Resource):
    def get(self):
        plants = Plant.query.join(user_plant).join(User).filter((user_plant.c.user_id == session["user_id"]) & (user_plant.c.plant_id == Plant.id)).all()
        
        if len(plants) > 0:
            return make_response(plants.to_dict(), 200)

        else:
            return {"message": "404: No Content"}, 404

api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Plants, "/collection", endpoint="plants")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

