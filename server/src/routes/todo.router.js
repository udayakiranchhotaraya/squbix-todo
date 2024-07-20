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

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - user
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the To-Do item
 *           example: "Buy groceries"
 *         description:
 *           type: string
 *           description: A detailed description of the To-Do item
 *           example: "Milk, Bread, Eggs, and Cheese"
 *         status:
 *           type: string
 *           description: The status of the To-Do item
 *           enum:
 *             - pending
 *             - completed
 *           default: "pending"
 *           example: "pending"
 *         user:
 *           type: objectID
 *           description: The ID of the user who created the To-Do item
 *           example: "60d0fe4f5311236168a109ca"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the To-Do item was created
 *           example: "2024-07-19T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the To-Do item was last updated
 *           example: "2024-07-19T12:34:56.789Z"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// New ToDo
/**
 * @swagger
 * /api/todo/new:
 *   post:
 *     summary: Create a new To-Do item
 *     description: This endpoint allows a logged-in user to create a new To-Do item.
 *     tags:
 *       - ToDos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy groceries"
 *                 description: "The title of the To-Do item"
 *               description:
 *                 type: string
 *                 example: "Milk, Bread, Eggs, and Cheese"
 *                 description: "A detailed description of the To-Do item"
 *     responses:
 *       201:
 *         description: New ToDo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New ToDo created successfully"
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Title is required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Token not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some error occurred"
 */
ToDoRouter.post('/new', newToDo);

// Get User's todos
/**
 * @swagger
 * /api/todo/:
 *   get:
 *     summary: Get user's To-Do items
 *     description: This endpoint allows a logged-in user to retrieve all their To-Do items.
 *     tags:
 *       - ToDos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of To-Do items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving ToDo items"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Token not found."
 *       404:
 *         description: No ToDo items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No ToDo Item(s) found"
 */
ToDoRouter.get('/', getUserToDos);

// Get specific todo
/**
 * @swagger
 * /api/todo/{id}/view:
 *   get:
 *     summary: Get a specific To-Do item
 *     description: This endpoint allows a logged-in user to retrieve a specific To-Do item by its ID.
 *     tags:
 *       - ToDos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the To-Do item
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: ToDo item found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving the ToDo item"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Token not found."
 *       404:
 *         description: No ToDo item found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No ToDo Item(s) found"
 */
ToDoRouter.get('/:id/view', getToDo);

// Update todo
/**
 * @swagger
 * /api/todo/{id}/update:
 *   put:
 *     summary: Update a specific To-Do item
 *     description: This endpoint allows a logged-in user to update a specific To-Do item by its ID.
 *     tags:
 *       - ToDos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the To-Do item to update
 *         example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy groceries"
 *                 description: "The new title of the To-Do item"
 *               description:
 *                 type: string
 *                 example: "Milk, Bread, Eggs, and Cheese"
 *                 description: "The new description of the To-Do item"
 *     responses:
 *       200:
 *         description: ToDo item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ToDo updated successfully"
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Title is required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Token not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some error occurred"
 */
ToDoRouter.put('/:id/update', updateToDo);

// Mark a todo as complete
/**
 * @swagger
 * /api/todo/{id}/markAsComplete:
 *   put:
 *     summary: Mark a specific To-Do item as complete
 *     description: This endpoint allows a logged-in user to mark a specific To-Do item as complete by its ID.
 *     tags:
 *       - ToDos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the To-Do item to mark as complete
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: To-Do item marked as complete successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Marked as complete"
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the ToDo item"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Token not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some error occurred"
 */
ToDoRouter.put('/:id/markAsComplete', markToDoAsComplete);

// Delete todo
/**
 * @swagger
 * /api/todo/{id}/delete:
 *   delete:
 *     summary: Delete a specific To-Do item
 *     description: This endpoint allows a logged-in user to delete a specific To-Do item.
 *     tags:
 *       - ToDos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the To-Do item to delete
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: To-Do item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ToDo deleted successfully"
 *                 todo:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while deleting the ToDo item"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Token not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some error occurred"
 */
ToDoRouter.delete('/:id/delete', deleteToDo);

module.exports = ToDoRouter;