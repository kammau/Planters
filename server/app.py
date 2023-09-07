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
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

