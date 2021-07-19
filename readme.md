# Documentation
This file is to document an overview of the system design and provide instructions on how to run the project.

## System Overview

There are 3 components to the sytem, the back-end, the front-end and the API.

### API

I have included an [OpenAPI documentation file](./api/api-doc.yaml) that documents my API design. It is a `.yaml` file, which you can view on the browser by following the API installation instructions below.

However, there are 4 endpoints in the API, 2 of which are being consumed by the front-end, and the other 2 are just to demonstrate my knowledge of RESTful API design. The endpoitns are the following:

- `GET /accounts`: Return all accounts in the database. (consumed by the front-end)
- `POST /accounts`: Create a new account with status `pending` and balance `0`.
- `GET /account/{id}`: Return an account by ID.
- `PATCH /account/{id}`: Execute a partial update on the account resource according to what is in the request body. (consumed by the front-end)

### Back-End

My change to the back-end is not significant. I have just added the missing endpoints according to the API documentation. Also, I have kept in mind the business requirements and included the necessary error-handling in `PATCH /accounts/{id}`.

### Front-End

First, for the sake of swift delivery, I have done some research on the different libraries that provide UI tables. I found a few, and after a detailed evaluation with respect to the business requirements, I have decided to use [material-table](https://material-table.com/).

I have followed [grouping by file type](https://reactjs.org/docs/faq-structure.html) approach in structuring the files of the project:
- [components](./src/react-app/src/components): Includes all the UI components. For now, it's just [AccountsTable](./src/react-app/src/components/AccountsTable.js).
- [views](./src/react-app/src/views): Includes all the pages. For now, it's just [AccountsPage](./src/react-app/src/views/AccountsPage.js).
- [services](./src/react-app/src/services): Includes all the services, mainly for HTTP communication with the back-end.
- [models](./src/react-app/src/models): Includes all models:
  - [CONSTANTS](src/react-app/src/models/constants.js): All the UI constant texts. Doing this allows easier modifications as the application becomes more complex.
  - [ActionsEnum](src/react-app/src/models/actions.js): All the actions that the user can perform in the front-end.
  - [AccountStatusEnum](src/react-app/src/models/actions.js): All the statuses that an account can have. This is set by the business requirements.
  - [AccountFieldsEnum](src/react-app/src/models/actions.js): All the specific fields in the account object. This is being consumed by the UI.

As for the communication with the back-end, to insure [separation of concerns](https://deviq.com/principles/separation-of-concerns), I have separated all the API calls in [api.js](./src/reac-app/src/../../react-app/src/services/api.js). This allows for easier code-handling and scalability as the system grows and the API calls become more complex.

As the web app should be scalable enough to serve different pages (or components) for different URL paths, I have used [React Router](https://reactrouter.com/) to simplify the routing mechanism.

---

## Installation
- Install [node.js](https://nodejs.org) if don't have it on your machine already. 
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) (If you want to run SwaggerUI).
- Install [Docker Compose](https://docs.docker.com/compose/install/) (if you want to run SwaggerUI).
- Create a `.env` file in the root directory of this project and populate it with the required values. See `.sample.env` file for more info.
- Setup a MongoDB database, see section below. We recommend using MongoDB Atlas as it's easier to setup, however a local cluster works just as well.


#### Mongo DB
You can install MongoDB locally or use MongoDB Atlas to run a free cloud cluster.

MongoDB Atlas is a hosted MongoDB service option in the cloud which requires no installation overhead and offers a free tier to get started. Click [here](https://www.mongodb.com/try) and use this quick tutorial to connect your db to your local environment [here](https://docs.atlas.mongodb.com/getting-started/).


### Quick start
#### API - SwaggerUI (and a mock server)

Assuming you have Docker Desktop and Docker Compose installed on your machine, just run the following comman in the [root directory](.) of the project:

```
docker-compose up -d
```

The above command wil run the following:

- Nginx reverse proxy service that routes the traffic to the intended services
- Mock server, which you can talk to by calling `http://lcoalhost/mock`. Integration with the API is not yet complete, but it will give you a glimpse of how the mock server works.
- SwaggerUI, which you can view in your browser by vising `http://localhost` 

Note: No need to worry about any ports. All is being handled by the reverse proxy. You just need to talk to `http://localhost` (more accurately, you need to talk to `localhost` on port 80, which is the http port).

#### Frontend - React App

- In the `src/react-app` directory, run the following commands
  - Run `npm install`
  - Run `npm run build`
  - Run `npm run start` to start the react dev server (which will apply any new changes to the react code)
- Check `src/react-app/src/App.js` to get started with the frontend code. 

If you run into any issues with installation, check [src/react-app/readme.md](src/react-app/README.md) which provides more details about the react app installation.

#### Backend - Node JS
- In the root directory, run the following commands
  - Run `npm install` to install the required packages for the server
  - Run `npm run seed` to seed the database (do this only once)
  - Run `npm run start` to start your backend server
  

Here are some details about the backend boilerplate:
- `src/init_data` - this is where you'd find the seed data.
- `src/seed_data` - this is the seed data utility function to populate the database.
- `src/index.js` - you'd find the node js API configuration here + endpoints.