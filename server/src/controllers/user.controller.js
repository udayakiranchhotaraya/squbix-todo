const mongoose = require('mongoose');
const User = require('../models/user.model');

async function registerUser (req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name: name,
            email: email,
            password: password
        });

        if (user) {
            return res.status(201).json({ "message" : "User registration successful", user: user });
        } else {
            return res.status(500).json({ "message" : "Some error occurred" });
        }
    } catch (error) {
        return res.status(400).json({ "message" : error.message });
    }
}

module.exports = {
    registerUser
}