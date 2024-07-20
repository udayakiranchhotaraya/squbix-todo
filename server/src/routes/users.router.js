const express = require('express');

const {
    registerUser,
    loginUser
} = require('../controllers/user.controller');

const UserRouter = express.Router();

// Register router
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing their name, email, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: object
 *                 properties:
 *                     firstName: string
 *                     lastName: string
 *                 example: { "firstName": "John", "lastName": Doe }
 *                 description: "The name of the user"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *                 description: "The email address of the user"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *                 description: "The password for the user"
 *     responses:
 *       201:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registration successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   example: { "firstName": "John", "lastName": Doe }
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Email is required"
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
UserRouter.post('/register', registerUser);

// Login router
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login an existing user
 *     description: This endpoint allows an existing user to login by providing their email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *                 description: "The email address of the user"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *                 description: "The password for the user"
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: string
 *                   example: "John Doe"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Email is required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
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
UserRouter.post('/login', loginUser);

module.exports = UserRouter;