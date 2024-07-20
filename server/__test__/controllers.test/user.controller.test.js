const request = require('supertest');
const mongoose = require('mongoose');
const { connect, closeDatabase, clearDatabase } = require('../tests.setup');
const app = require('../../src/app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await closeDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("User API controller", () => {
    
    describe("POST /api/user/register", () => {
        it("should register a new user", async () => {
            const res = await request(app)
                .post('/api/user/register')
                .send({
                    name: { firstName: "Test", lastName: "User" },
                    email: "test@example.com",
                    password: "password123"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("User registration successful");
            expect(res.body).toHaveProperty('token');
        });

        it("should not register a user with duplicate email", async () => {
            await request(app)
                .post('/api/user/register')
                .send({
                    name: { firstName: "Test", lastName: "User" },
                    email: "test@example.com",
                    password: "password123"
                });

            const res = await request(app)
                .post('/api/user/register')
                .send({
                    name: { firstName: "Another Test", lastName: "User" },
                    email: "test@example.com",
                    password: "password123"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message');
        });

        it("should not register a user with missing fields", async () => {
            const res = await request(app)
                .post('/api/user/register')
                .send({
                    email: "test@example.com"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe("POST /api/user/login", () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/user/register')
                .send({
                    name: { firstName: "Test", lastName: "User" },
                    email: "test@example.com",
                    password: "password123"
                });
        });
        
        it("should login an existing user", async () => {
            const res = await request(app)
                .post('/api/user/login')
                .send({
                    email: "test@example.com",
                    password: "password123"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', "User login successful");
            expect(res.body).toHaveProperty('token');
        });

        it("should not login with invalid email", async () => {
            const res = await request(app)
                .post('/api/user/login')
                .send({
                    email: "wrong@example.com",
                    password: "password123"
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('message', "Invalid credentials");
        });

        it("should not login with incorrect password", async () => {
            const res = await request(app)
                .post('/api/user/login')
                .send({
                    email: "test@example.com",
                    password: "wrongpassword"
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('message', "Invalid credentials");
        });
    });
});