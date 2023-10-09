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
        
        db.session.query(user_plant).delete()
        Post.query.delete()
        User.query.delete()
        Plant.query.delete()

        # Users Seed:
        print("Seeding Users...")
        users = []
        u1 = User(username=fake.user_name())
        u1.password_hash = u1.username + "salty"
        users.append(u1)

        u2 = User(username=fake.user_name())
        u2.password_hash = u2.username + "salty"
        users.append(u2)

        u3 = User(username=fake.user_name())
        u3.password_hash = u3.username + "salty"
        users.append(u3)

        db.session.add_all(users)
        db.session.commit()

        # Plants Seed:
        print("Seeding Plants...")
        plants = []
        p1 = Plant(
            common_name = "Cactus",
            scientific_name = "Cactaceae",
            growing_level = 1
        )
        plants.append(p1)

        p2 = Plant(
            common_name = "Bonsai Tree",
            scientific_name = "Ulmus Parvifolia",
            growing_level = 3
        )
        plants.append(p2)

        p3 = Plant(
            common_name = "Orchid",
            scientific_name = "Orchidaceae",
            growing_level = 3
        )
        plants.append(p3)

        db.session.add_all(plants)
        db.session.commit()

        # Posts Seed:
        print("Seeding Posts...")

        posts = []
        po1 = Post(
            content = "Love my plant!",
            genre = "General",
            user = u1,
            plant = p3
        )
        posts.append(po1)

        db.session.add(po1)

        db.session.commit()
        print("Seeding Complete!")