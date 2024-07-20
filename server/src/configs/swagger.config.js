const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'To-do application using NodeJS and ExpressJS',
            version: '1.0.0',
            description: "A simple API for to-do application"
        }
    },
    apis: ['./src/routes/*.js']
}

const specs = swaggerJSDoc(options);
module.exports = {
    specs,
    swaggerUI
}