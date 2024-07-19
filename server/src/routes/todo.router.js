const express = require('express');

const { 
    newToDo
} = require('../controllers/todo.controller');

const ToDoRouter = express.Router();

ToDoRouter.post('/new', newToDo);

module.exports = ToDoRouter;