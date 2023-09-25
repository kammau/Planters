#!/usr/bin/env python3

# Standard library imports
from random import randint, choice
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Plant, user_plant

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        # User.query.delete()
        # Plant.query.delete()
        # Post.query.delete()

        # Sample Data:
        accountTypes = ["Guide", "Planter"]
        genres = ["Question", "Post", "Answer"]
        common_names = ["Cactus", "Bonsai Tree", "Rose", "Olive Tree"]
        scientific_names = ["Cactaceae", "Ulmus Parvifolia", "Rosa Rubiginosa", "Olea Europaea"]
        plant_imgs = ["https://www.creativefabrica.com/wp-content/uploads/2021/03/17/kawaii-cute-potted-plant-Graphics-9699063-1-580x386.jpg"]
        growing_levels = ["Beginner", "Intermediate", "Advanced"]
        titles = ["Growing Help", "Plant Memes", "Species Research"]

        print("Seeding Users...")
        users = []
        for i in range(25):
            user = User(
                username=fake.user_name(),
            )
            user.password_hash = user.username + "password"

            users.append(user)
        
        db.session.add_all(users)
        print(users)

        print("Seeding Plants...")
        plants = []
        for i in common_names and scientific_names:
            plant = Plant(
                common_name=i,
                scientific_name=i,
                img=random.choice(plant_imgs),
                growing_level=random.randint(1, 5)
            )
            plants.append(plant)

        db.session.add_all(plants)

        print("Seeding Posts...")
        posts = []

        post1 = Post(content="Love my plant!", genre="Post", img="https://www.creativefabrica.com/wp-content/uploads/2021/03/17/kawaii-cute-potted-plant-Graphics-9699063-1-580x386.jpg", user=f"{users[1]}", plant=f"{plants[1]}")
        posts.append(post1)

        db.session.add_all(posts)

        # Maybe change to plant and usernames instead of id later?...
        for plant in plants:
            user = random.choice(users)
            if plant not in user.plants:
                user.plants.append(plant)
                db.session.add(user)
                db.session.commit()


        db.session.commit()

        print("Seeding Complete!")

        




