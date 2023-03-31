# To-Do Json REST API

A simple JSON RESTful API Service for a To-Do List. Built with Node.js, Express and Postgres.

I created a docker image for the project and will walk you through running the project using Docker below.

## Install

    git clone git@github.com:Ethansteip/mabels-labels-tech-assessment.git ethans-todo-api

## cd into the new directory, then into the server root directory.

    cd ethans-todo-api
    cd server

## Create a .env file in the root of the /server folder.

    touch .env

## Copy the contents of the .env.example file and paste it in your newly created .env file.

    ENVIROMENT='dev'
    PORT=8080
    DB_HOST=host.docker.internal
    DB_USER=root
    DB_PASSWORD=root
    DB_DATABASE=root
    DB_PORT=5431

## In the root of the server folder, run:

    docker-compose up

    // This may take about a minute to fully boot.

## From your Docker app dashboard, find the "server_app_1" service, open the CLI and run:

    npm run db:reset

    // This resets and seeds the database

## Then, open Postman or your browser and make a GET request to:

    http://localhost:8080/todos

___________________________________

## Get list of To-Dos

### Request
`GET /todos`

### Response

    Status: 200 OK
    Content-Type: application/json

    // An Array of To-Do Objects

    [
      {
        "id": 1
        "name": "Take out the garbage", 
        "comment": null, 
        "status": "todo"
        },
       ...
    ]

## Create a new To-Do

### Request

`POST /todo`


    // Requires request body containing at least the name property.

    // Requires Basic HTTP authorization
    // username: 'admin'
    // password: 'password'
    

### Response

    Status: 201 Created
    Content-Type: application/json

    // Returns the newly created To-Do

      {
        "id": 10
        "name": "My newest To-Do", 
        "comment": null, 
        "status": "todo"
      }
       

## Get a specific To-Do

### Request

`GET /todo/{id}`

    // Requires integer for the id

### Response

    Status: 200 OK
    Content-Type: application/json

    // Returns a specific To-Do

      {
        "id": 5,
        "name": "Go grocery shopping",
        "comment": null,
        "status": "inprogress"
      }

## Update a specific To-Do

### Request

`PUT /todo/{id}`

    // Requires integer for the id

    // Requires request body containing at least name and status property.

    // Requires basic HTTP auth
    // username: 'admin'
    // password: 'password'

### Response

    Status: 200 OK
    Content-Type: application/json

    // Returns the updated To-Do

      {
        "id": 5,
        "name": "something something",
        "comment": "Updated with comment",
        "status": "inprogress"
      }

## Delete a specific To-Do

### Request

`DELETE /todo/{id}`

    // Requires integer for the id

    // Requires basic HTTP auth
    // username: 'admin'
    // password: 'password'

### Response

    Status: 200 OK
    Content-Type: application/json

    // Returns a message object

      {
        "message": "To-Do with an id of 5 was deleted successfully!"
      }