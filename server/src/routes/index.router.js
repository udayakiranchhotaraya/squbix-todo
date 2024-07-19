const express = require('express');

const { verifyToken } = require('../middlewares/jwt.middleware');

const UserRouter = require('./users.router');
const ToDoRouter = require('./todo.router');

const Router = express.Router();

// Users Router
Router.use('/user', UserRouter);
// To-Do Router
Router.use('/todo', verifyToken, ToDoRouter);

module.exports = Router;