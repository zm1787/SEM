# SEM

**SEM is a full-stack web application developed for an early-stage startup concept connecting clients with specialized service providers.**

The application was developed as a solo software project, with responsibility for the frontend, backend, database architecture, authentication, real-time communication, and integration of third-party services.

Development was discontinued before the product was launched publicly. The repository is preserved as a demonstration of the application's architecture and the software development work completed during the project.

## Project Overview

SEM was designed as a platform where users could create accounts, manage profiles, register businesses or services, discover nearby specialists, communicate with other users, and manage business-related information.

The application was developed as a MERN-stack project with additional services for authentication, real-time communication, location-based functionality, and payments.

## My Role

**Sole Developer / Technical Lead**

I was responsible for the software development of the application, including:

* Designing the overall application architecture
* Developing the React frontend
* Developing the Node.js/Express backend
* Designing MongoDB/Mongoose data models
* Implementing user authentication and authorization
* Developing REST API routes and controllers
* Implementing real-time communication using Socket.IO
* Developing user, business, and contact functionality
* Integrating third-party services
* Managing application state with Redux
* Designing the application's UI and navigation structure

The project was developed independently with input from the other startup founder regarding product requirements and direction.

## Key Features

### User Accounts

* User registration and login
* Authenticated user sessions
* User profiles
* User location information
* User type/role management
* Profile updates and account management

### Business Management

* Business registration
* Business profiles
* Business management and editing
* Business discovery
* Location-based business searches
* Business/user relationships

### Real-Time Communication

* User-to-user communication
* Chat functionality
* Real-time communication using Socket.IO
* Notification handling

### Payments

The backend includes integration with Stripe for payment functionality.

## Technology Stack

### Frontend

* React
* Redux
* React Router
* Axios
* Material-UI
* Bootstrap / Reactstrap
* Socket.IO Client
* Styled Components

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* Socket.IO
* JWT
* bcrypt
* Stripe

### Development

* npm
* Git
* Create React App
* Nodemon

## Architecture

The application is divided into separate client and server applications.

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │                     │
                    │  Pages / Components │
                    │       Redux         │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node / Express    │
                    │                     │
                    │ Routes               │
                    │ Controllers         │
                    │ Middleware          │
                    └──────┬────────┬─────┘
                           │        │
                           │        └──────────────┐
                           ▼                       ▼
                    ┌─────────────┐        ┌─────────────┐
                    │   MongoDB   │        │  Socket.IO  │
                    │  / Mongoose │        │ Real-time   │
                    └─────────────┘        │ communication│
                                           └─────────────┘
```

The server is organized into separate route, controller, model, middleware, and socket layers.

```text
server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── socket/
└── index.js
```

The frontend is similarly separated into pages, components, Redux actions/reducers, API functions, styles, and supporting resources.

## Project Status

**Discontinued / Archived**

The startup project did not progress to a public launch, and the original production infrastructure is no longer active.

The repository therefore should be considered a **historical development project and portfolio artifact**, rather than a currently maintained application.

The source code represents the state of the application during development and may require dependency updates and configuration changes before it can be run on a modern development environment.

## Running the Project

The original application consisted of separate client and server applications.

### Server

```bash
cd server
npm install
npm start
```

The server requires environment variables for configuration, including the MongoDB connection string and other service credentials.

### Client

```bash
cd client
npm install
npm start
```

The client was configured to communicate with the local Express server on port 5000.

> **Note:** The application was developed several years ago and has not been maintained for modern versions of its dependencies. The instructions above describe the original development setup and do not guarantee that the application will run without dependency or configuration changes.

## What This Project Demonstrates

This project demonstrates experience developing a complete web application rather than an isolated component or tutorial project.

In particular, it demonstrates experience with:

* Full-stack JavaScript development
* REST API design
* Frontend/backend integration
* Database modeling
* Authentication and authorization
* State management
* Real-time web communication
* Third-party API/service integration
* Application architecture
* Separation of frontend and backend concerns
* Designing and implementing features from a product concept

## Background

This project was developed for an early-stage startup concept. At the time, I was the sole developer responsible for implementing the software while working with the other founder on the product concept and requirements.

Although the project was never brought to market, it provided experience taking a product from an initial concept through application architecture and implementation across the frontend, backend, database, and supporting services.
