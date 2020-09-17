### Installation
- Install [node.js](https://nodejs.org) if don't have it on your machine already. 
- Run `npm install` in the root directory of this project.
- Create a `.env` file in the root directory of this project. See `.sample.env` file for more info.
- Setup a MongoDB database, see section below. We recommend using MongoDB Atlas as it's easier to setup.
- Run `npm run start` to start up the project.


#### Mongo DB
MongoDB Atlas is a hosted MongoDB service option in the cloud which requires no installation overhead and offers a free tier to get started. Click [here](https://www.mongodb.com/try) and use this quick tutorial to connect your db to your local environment [here](https://docs.atlas.mongodb.com/getting-started/)

#### React App
Add the following snippet to the package json in `/react-app/package.json` to complete the setup
```
"proxy": "http://localhost:3001"
```

### Assignment