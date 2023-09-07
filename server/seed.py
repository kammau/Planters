#!/usr/bin/env python3

# Standard library imports
from random import randint, choice
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Plant, Forum, user_plant

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        User.query.delete()
        Post.query.delete()
        Plant.query.delete()
        Forum.query.delete()

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
                accountType=random.choice(accountTypes)
            )
            users.append(user)
        
        db.session.add_all(users)

        print("Seeding Posts...")
        posts = []
        for i in range(50):
            post = Post(
                content=fake.sentence(nb_words=5),
                genre=random.choice(genres),
                user_id=random.randint(1, 25),
                forum_id=random.randint(1, 25)
            )
            posts.append(post)

        db.session.add_all(posts)

        print("Seeding Plants...")
        plants = []
        for i in range(25):
            plant = Plant(
                common_name=random.choice(common_names),
                scientific_name=random.choice(scientific_names),
                img=random.choice(plant_imgs),
                growing_level=random.choice(growing_levels)
            )
            plants.append(plant)

        db.session.add_all(plants)

        print("Seeding Forums...")
        forums = []
        for i in range(25):
            forum = Forum(
                title=random.choice(titles),
                followers=random.randint(1, 500)
            )
            forums.append(forum)

        db.session.add_all(forums)

        # Maybe change to plant and usernames instead of id later?...
        for plant in plants:
            user = random.choice(users)
            if plant not in user.plants:
                user.plants.append(plant)
                db.session.add(user)
                db.session.commit()


        db.session.commit()

        print("Seeding Complete!")

        




