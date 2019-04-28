# Static Instant Messenger

A static instant messenger service were you can create rooms to have converstations in.

A simple login based system has been added to allow a visual difference between messages from one user to another.




#### Setup

Once you have cloned this repository you will need to open a terminal window (mac) or a git bash window (pc) and navigate to the cloned folder.

You will then need to change directory into the backend folder and run the command `npm install` this will install all the dependancies for the backend

Once the previous step is complete you will need to change directory into the messenger folder and type `npm install` this will then install all the necessary dependancies to allow the react front end to work.

The script that launched this application is in the messenger folder so type `npm run launchApp` this will launch both the frontend and the backend simultaniously and will present you with the login screen on your default browser.

Default logins have been created to get you started the username and password are `root` the second login details username and password are `test`. To change these locate the users.json files in the backend folder and open it in any text editor change to username and password details to something that you prefer

A default room has been created so you can get started right away


#### Note: The launch app script launches the application in development mode there is no production script as of yet


## This is not a secure messaging service everything has been stored in plain text for educational purposes


### Features to come

| Progress | Feature |
|----------|---------|
|[]        | signup component to add new users|
|basic     |emoji support|
|[]        |file attachments|
|[]        |deletion of rooms|
|[]        |forwarding a message from one room to another|
|[]        |password encryption|
|[]        |JWT Authentication|
|[]        |Sessions|
