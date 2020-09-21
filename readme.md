### Overview
This boilerplate is built for a NodeJS backend with a MongoDB database

### Installation
- Install [node.js](https://nodejs.org) if don't have it on your machine already. 
- Create a `.env` file in the root directory of this project and populate it with the required values. See `.sample.env` file for more info.
- Setup a MongoDB database, see section below. We recommend using MongoDB Atlas as it's easier to setup, however a local cluster works just as well.


#### Mongo DB
You can install MongoDB locally or use MongoDB Atlas to run a free cloud cluster.

MongoDB Atlas is a hosted MongoDB service option in the cloud which requires no installation overhead and offers a free tier to get started. Click [here](https://www.mongodb.com/try) and use this quick tutorial to connect your db to your local environment [here](https://docs.atlas.mongodb.com/getting-started/)


### Quick start
#### Frontend - React App
- In the `src/react-app` directory, run the following commands
  - Run `npm install`
  - Run `npm run build`
  - Run `npm run start` to start the react dev server (which will apply any new changes to the react code)
- Check `src/react-app/src/App.js` to get started with the frontend code. 

If you run into any issues with installation, check `src/react-app/readme.md` which provides more details about the react app installation.

#### Backend - Node JS
- In the root directory, run the following commands
  - Run `npm install` to install the required packages for the server
  - Run `npm run seed` to seed the database (do this only once)
  - Run `npm run start` to start your backend server
  
Here are some details about the backend boilerplate:
- `src/init_data` - this is where you'd find the seed data.
- `src/seed_data` - this is the seed data utility function to populate the database.
- `src/index.js` - you'd find the node js API configuration here + endpoints.


### Assignment
