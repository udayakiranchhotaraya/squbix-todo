const mongoose = require('mongoose');
const ToDo = require('../models/todo.model');

// Function to create a new ToDo item
async function newToDo (req, res) {
    // Checking if the user is logged in
    if (req.user) {
        try {
            // Destructuring the fields from the request body
            const { title, description } = req.body;

            // Creating a new ToDo item with the provided title, description, and user ID
            const todo = await ToDo.create({
                title: title,
                description: description,
                user: req.user.id
            });

            // If the ToDo item is created successfully
            if (todo) {
                // responding with a 201 status code (Created) and a success message along with the ToDo item
                return res.status(201).json({ "message" : "New ToDo created successfully", todo });
            } else {
                // else responding with a 500 status code (Internal Server Error) and an error message
                return res.status(500).json({ "message" : "Some error occurred" });
            }
        } catch (error) {
            // If there is an error, responding with a 400 status code (Bad Request) and the error message
            return res.status(400).json({ "message" : error.message });
        }
    } else {
        // If the user is not logged in, responding with a 401 status code (Unauthorized) and an error message
        return res.status(401).json({ "message" : "Please login to continue" });
    }
}

module.exports = {
    newToDo
}