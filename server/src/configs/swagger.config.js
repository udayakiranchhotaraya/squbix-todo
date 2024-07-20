const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'To-do application API',
            version: '1.0.0',
            description: "A simple To-do application API using Node.JS, Express and MongoDB. \n\n Welcome to the Todo Application API documentation. This API allows users to manage their todo items efficiently. Features include user registration, login, and CRUD operations on todo items, secured with JWT authentication.\n\nHere, you can explore and test the endpoints interactively. Start by registering a new user using the /user/register endpoint, then log in with /user/login to obtain a JWT token. Include this token in the Authorization header as a Bearer token for all other requests.\n\nYou can then create new todos with /todo/new, retrieve all todos with /todo/, get details of a specific todo with /todo/{id}/view, update a todo with /todo/{id}/update, mark a todo as complete with /todo/{id}/markAsComplete, and delete a todo with /todo/{id}/delete. The Swagger UI will provide forms to input your request data and view responses, making it easy to interact with the API."
        }
    },
    apis: ['./src/routes/*.js']
}

const specs = swaggerJSDoc(options);
module.exports = {
    specs,
    swaggerUI
}