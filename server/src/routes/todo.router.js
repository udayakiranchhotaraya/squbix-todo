const express = require('express');

const { 
    newToDo,
    getUserToDos,
    getToDo,
    updateToDo
} = require('../controllers/todo.controller');

const ToDoRouter = express.Router();

// New ToDo
ToDoRouter.post('/new', newToDo);
// Get User's todos
ToDoRouter.get('/', getUserToDos);
// Get specific todo
ToDoRouter.get('/:id', getToDo);
// Update todo
ToDoRouter.put('/:id/update', updateToDo);

module.exports = ToDoRouter;