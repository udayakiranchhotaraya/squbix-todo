const express = require('express');

const { 
    newToDo,
    getUserToDos,
    getToDo,
    updateToDo,
    markToDoAsComplete,
    deleteToDo
} = require('../controllers/todo.controller');

const ToDoRouter = express.Router();

// New ToDo
ToDoRouter.post('/new', newToDo);
// Get User's todos
ToDoRouter.get('/', getUserToDos);
// Get specific todo
ToDoRouter.get('/:id/view', getToDo);
// Update todo
ToDoRouter.put('/:id/update', updateToDo);
// Mark a todo as complete
ToDoRouter.put('/:id/markAsComplete', markToDoAsComplete);
// Delete todo
ToDoRouter.delete('/:id/delete', deleteToDo);

module.exports = ToDoRouter;