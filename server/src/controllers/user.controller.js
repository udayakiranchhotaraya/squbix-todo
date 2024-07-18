const mongoose = require('mongoose');
const User = require('../models/user.model');
const { generateToken } = require('../middlewares/jwt.middleware');

// Function to register a new user
async function registerUser (req, res) {
    try {
        // Destructuring the fields from the request body
        const { name, email, password } = req.body;

        // Creating a new user with the provided details
        const user = await User.create({
            name: name,
            email: email,
            password: password
        });
        
        // Creating a payload for generating the token which contains the user ID
        const payload = {
            id: user.id
        };
        // generating the token using the payload
        const token = generateToken(payload);

        if (user && token) {
            return res.status(201).json({ "message" : "User registration successful", token: token, user: user.name });
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