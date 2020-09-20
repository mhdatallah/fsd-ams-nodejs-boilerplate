### Overview
This boilerplate is built for a NodeJS backend with a MongoDB database

### Installation
- Install [node.js](https://nodejs.org) if don't have it on your machine already. 
- Run `npm install` in the root directory of this project.
- Create a `.env` file in the root directory of this project and populate it with the required values. See `.sample.env` file for more info.
- Setup a MongoDB database, see section below. We recommend using MongoDB Atlas as it's easier to setup.
- Run `npm run start` to start up the project.


#### Mongo DB
You can install MongoDB locally or use MongoDB Atlas to run a free cloud cluster.

MongoDB Atlas is a hosted MongoDB service option in the cloud which requires no installation overhead and offers a free tier to get started. Click [here](https://www.mongodb.com/try) and use this quick tutorial to connect your db to your local environment [here](https://docs.atlas.mongodb.com/getting-started/)

#### React App
In your terminal, navigate to the `src/react-app` directory and run the follow commands:
- Using NPM:
  - `npm install`
  - `npm run build`
  - `npm run start`

- Using Yarn
  - `yarn install`
  - `yarn build`
  - `yarn start`

Add the following snippet in `src/react-app/package.json` to complete the setup
```
"proxy": "http://localhost:3001" // replace `3001` with the port your nodejs server is running.
```

If you run into any issues, check `src/react-app/readme.md` which provides more details about the react app installation.

### Quick start
Backend
- `src/init_data` - this is where you'd find the seed data.
- `src/seed_data` - this is the seed data utility function to populate the database.
- `src/index.js` - you'd find the node js API configuration here + endpoints.

Frontend
- Check `src/react-app/src/App.js` to get started with the frontend code. 
- Be sure to always run `npm run build` or `yarn build` every time you make changes to the react app codebase. 

### Assignment
