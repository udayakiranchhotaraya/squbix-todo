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

// function to get all ToDo items for a specific(logged-in) user
async function getUserToDos (req, res) {
    // Checking if the user is logged in
    if (req.user) {
        try {
            // Getting the user's ID from the request
            const userID = req.user.id;
            // Finding all ToDo items associated with the user's ID
            const todos = await ToDo.find({ user: userID });

            // If no ToDo items are found
            if (todos.length === 0) {
                // responding with a 404 status code (Not Found) and a message indicating no items were found
                return res.status(404).json({ "message" : "No ToDo Item(s) found" });
            } else {
                // If ToDo items are found, responding with a 200 status code (OK) and the list of ToDo items
                return res.status(200).json({ todos });
            }
        } catch (error) {
            // If there is an error, responding with a 400 status code (Bad Request) and the error message
            return res.status(400).json({ "message" : error.message });
        }
    } else {
        // If the user is not logged in, responding with a 401 status code (Unauthorized) and an error message        
        return res.status(401).json({ "message" : "Please login to continue" })
    }
}

// function to get a specific ToDo item
async function getToDo (req, res) {
    // Checking if the user is logged in
    if (req.user) {
        try {
            // Getting the ToDo item ID from the request parameters
            const { id } = req.params;
            // Getting the user's ID from the request headers
            const userID = req.user.id;

            // Finding the ToDo item with the specified ID and associated with the user's ID
            const todo = await ToDo.findOne({ _id: id, user: userID });

            // If the ToDo item is found
            if (todo) {
                // responding with a 200 status code (OK) and the ToDo item
                return res.status(200).json({ todo });
            } else {
                // If the ToDo item is not found, responding with a 404 status code (Not Found) and an error message
                return res.status(404).json({ "message" : "No ToDo Item(s) found" })
            }
        } catch (error) {
            return res.status(400).json({ "message" : error.message });
        }
    } else {
        return res.status(401).json({ "message" : "Please login to continue" });
    }
}

module.exports = {
    newToDo,
    getUserToDos,
    getToDo
}