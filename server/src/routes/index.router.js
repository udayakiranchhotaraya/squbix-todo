const express = require('express');

const UserRouter = require('./users.router');

const Router = express.Router();

Router.use('/user', UserRouter);

module.exports = Router;