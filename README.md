# PLANTER'S WEB APPLICATION (PHASE-4 PROJECT)

## Introduction:
This Web application is for plant owners who want to keep track of their plants in an easy to use environment. User's can add new plant's to their colections as well as share post's about their favorite plants!

## Setup:
After copying this repo to your computer, head over to this repo's directory in terminal. Once in this repo's root directory install the dependencies for the backend by typing:
`pipenv install`

Next for installing dependcies for the frontend type:
`npm install --prefix client`

After the installations are complete, we can start up our server. First, head over to the `/server` directory with `cd server/`. Inside of `/server` to be able to launch our server, type these commands one after the other:
```
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```

Now to start our flask server type `flask run`.

Now for our client, open a new terminal and head to this repo's root directory. Once there, type `npm start --prefix client` to lauch.

## Login/Signup:
The browser will first take you to the login and sigup pages, which you can navigate between with the navbar at the top. To login with an existing account type your credentials, to signup type what is prompted of you to begin an account. After filling in the input's with the correct information, press the login or signup button.


