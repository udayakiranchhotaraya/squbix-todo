const express = require('express');

const {
    registerUser
} = require('../controllers/user.controller');

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);

module.exports = UserRouter;