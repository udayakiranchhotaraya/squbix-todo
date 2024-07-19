const express = require('express');

const { 
    newToDo,
    getUserToDos,
    getToDo,
    updateToDo,
    markToDoAsComplete
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
// Mark a todo as complete
ToDoRouter.put('/:id/markAsComplete', markToDoAsComplete);

module.exports = ToDoRouter;