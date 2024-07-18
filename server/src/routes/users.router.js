const express = require('express');

const {
    registerUser,
    loginUser
} = require('../controllers/user.controller');

const UserRouter = express.Router();

// Register router
UserRouter.post('/register', registerUser);
// Login router
UserRouter.post('/login', loginUser);

module.exports = UserRouter;