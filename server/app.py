#!/usr/bin/env python3


# from dotenv import load_dotenv
# load_dotenv()

from config import app, db, api
from models import User, Post, Plant, user_plant

from flask import request, session
from flask_restful import Resource


# @app.route("/")
# @app.route("/<int:id>")
# def index(id=0):
#     return render_template("index.html")

class CheckSession(Resource):
    def get(self):
        user_id = session["user_id"]
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401

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
        plants = [plant.to_dict() for plant in Plant.query.all()]

        return plants, 200

class PlantByID(Resource):
    def patch(self, id):
        plant = Plant.query.filter(Plant.id == id).first()
        user = User.query.filter(User.id == session["user_id"]).first()

        plant.users.append(user)

        db.session.add(plant)
        db.session.commit()
    
        return plant.to_dict(), 202



class UserPlants(Resource):
    def get(self):
        plants = Plant.query.join(user_plant).join(User).filter((user_plant.c.user_id == session["user_id"]) & (user_plant.c.plant_id == Plant.id)).all()

        plants_serialized = [plant.to_dict() for plant in plants]
        
        if len(plants_serialized) > 0:
            return plants_serialized, 200

        else:
            return {"message": "204: No Content"}, 204

    def post(self):
        data = request.get_json()
        user = User.query.filter(User.id == session["user_id"]).first()
        
        new_plant = Plant(
            common_name=data["common_name"],
            scientific_name=data["scientific_name"],
            growing_level=data["growing_level"],
            img=data["img"],
        )

        new_plant.users.append(user)

        db.session.add(new_plant)
        db.session.commit()

        return new_plant.to_dict(), 201

class UserPlantByID(Resource):
    def get(self, id):
        plant = Plant.query.filter(Plant.id == id).first()

        return plant.to_dict(), 200
    
    def patch(self, id):
        data = request.get_json()

        plant = Plant.query.filter(Plant.id == id).first()

        for attr in data:
            setattr(plant, attr, data[attr])

        db.session.add(plant)
        db.session.commit()

        return plant.to_dict(), 202

    def delete(self, id):
        plant = Plant.query.filter(Plant.id == id).first()
        user = User.query.filter(User.id == session["user_id"]).first()

        plant.users.remove(user)

        db.session.add(plant)
        db.session.commit()

        return {}, 204

class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]

        return posts, 200

    def post(self):
        data = request.get_json()
        user = User.query.filter(User.id == session["user_id"]).first()
        plant = Plant.query.filter(Plant.common_name == data["plant"]).first()

        print(user)
        print(plant)

        new_post = Post(
            content=data["content"],
            genre=data["genre"],
            img=data["img"],
            user=user,
            plant=plant
        )

        print(new_post)


        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict(), 201
    
class UserPlantsResource(Resource):
    def get(self, n):
        users = User.query.all()

        # for user in users:
        #     print(user.plants)

        users_plants_n = []

        for user in users:

            if len(user.plants) >= n:
                # return user.to_dict(), 200
                users_plants_n.append(user)

        response = [u.to_dict() for u in users_plants_n]

        return response, 200
        

        return {"message": "testing"}, 200



        

api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Plants, "/plants", endpoint="plants")
api.add_resource(PlantByID, "/plants/<int:id>", endpoint="plants_by_id")
api.add_resource(UserPlants, "/user_plants", endpoint="user_plants")
api.add_resource(UserPlantByID, "/user_plants/<int:id>", endpoint="user_plant_by_id")
api.add_resource(Posts, "/posts", endpoint="posts")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(UserPlantsResource, "/user_with_n_amount_of_plants/<int:n>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

