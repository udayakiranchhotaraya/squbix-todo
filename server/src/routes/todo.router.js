const express = require('express');

const { 
    newToDo,
    getUserToDos
} = require('../controllers/todo.controller');

const ToDoRouter = express.Router();

// New ToDo
ToDoRouter.post('/new', newToDo);
// Get User's todos
ToDoRouter.get('/', getUserToDos);

module.exports = ToDoRouter;