#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Plant, Forum

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

        users = []
        for i in range(25):
            user = User(
                username=fake.user_name(),
                accountType=random.choice(accountTypes)
            )
            users.append(user)
        
        db.session.add_all(users)

        posts = []
        for i in range(25):
            post = Post(
                content=fake.sentence(nb_words=5),
                genre=random.choice(genres),
                user_id=random.randint(1, 25),
                forum_id=random.randint(1, 25)
            )
            posts.append(post)

        db.session.add_all(posts)
