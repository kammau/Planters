# PLANTER'S WEB APPLICATION (PHASE-4 PROJECT)
[Video link](https://youtu.be/huTaXB_g_lI)
[Deployment Link](https://planters.onrender.com)

## Introduction:
This Web application is for plant owners who want to keep track of their plants in an easy-to-use environment. Users can add new plants to their collections as well as share posts about their favorite plants!

## Setup:
After copying this repo to your computer, head over to this repo's directory in the terminal. Once in this repo's root directory install the dependencies for the backend by typing:
`pipenv install`

Next for installing dependencies for the frontend type:
`npm install --prefix client`

After the installations are complete, we can start up our server. First, type `pipenv shell` to enter the virtual environment. Next, head over to the `/server` directory with `cd server/`. Inside of `/server` to be able to launch our server, type these commands one after the other:
```
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```

Now to start our flask server type `flask run`.

Now for our client, open a new terminal and head to this repo's root directory. Once there, type `npm start --prefix client` to launch.

## Login/Signup:
The browser will first take you to the login and signup pages, which you can navigate between with the navbar at the top. To log in with an existing account type your credentials, and to sign up type what is prompted of you to begin an account. After filling in the inputs with the correct information, press the login or signup button.

## My Plant Collection:
The My Plant Collection tab takes the user to their plant collection. 

### Plant Collection (Creating):
To create a new plant enter a common name, scientific name, growing level (1-5), and image URL of the plant you would like to add to your collection in the New Plant Form. After filling in the required information press the Add button. The plant should now be added to your collection.

### Plant Collection (Deleting):
To delete a plant from your collection click the Remove button.

### Plant Collection (Editing):
To edit a plant in your collection, click the Edit button to change the field you would like. Then press Save Changes to save your changes.

## Plants:
The Plants tab on the nav bar will take the user to a page where all plants are located. This includes the user's plants as well as other user's plant's. To add another user's plants to your collection, click the Add to Collection button on the plant you would like to add.

## Posts:
The Posts tab is where users can share questions, answers, and general posts about a specific plant. To add a post, fill in the required inputs in the New Post Form. Select a plant you would like your post to be a part of, as well as the genre, and an image of that plant. After finishing, press the Post button to post.

## Logging Out:
To log out of the web application, simply press the purple Logout button in the upper right corner.
