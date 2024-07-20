const request = require('supertest');
const mongoose = require('mongoose');
const { connect, closeDatabase, clearDatabase } = require('../tests.setup');
const app = require('../../src/app');
const ToDo = require('../../src/models/todo.model');
const User = require('../../src/models/user.model');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await closeDatabase();
});

beforeEach(async () => {
    await clearDatabase();
});

describe("To-Do API controller", () => {
    let token;
    let user;

    beforeEach(async () => {
        user = await User.create({
            name: {
                firstName: "Test",
                lastName: "User"
            },
            email: "testuser@email.com",
            password: "testpassword"
        });
        token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    });

    describe("POST /todo/new", () => {
        it("should create a new todo", async () => {
            const res = await request(app)
                .post('/api/todo/new')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: "Test Todo",
                    description: "Test Description"
                });
            
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("New ToDo created successfully");
            expect(res.body.todo.title).toBe("Test Todo");
            expect(res.body.todo.description).toBe("Test Description");
        });

        it("should return 400 if the title is missing", async () => {
            const res = await request(app)
                .post('/api/todo/new')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: "Test Description"
                });
            
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("message");
        });

        it("should return 401 if the user is not authenticated", async () => {
            const res = await request(app)
                .post('/api/todo/new')
                .send({
                    title: "Test Todo",
                    description: "Test Description"
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized. Token not found.");
        });
    });

    describe("GET /todo/", () => {
        it("should get all todos for the authenticated user", async () => {
            await ToDo.create({
                title: "Test Todo 1",
                description: "Test Description 1",
                user: user._id,
            });
        
            await ToDo.create({
                title: "Test Todo 2",
                description: "Test Description 2",
                user: user._id,
            });
        
            const res = await request(app)
                .get('/api/todo/')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.todos.length).toBe(2);
        });

        it('should return 404 if no todos found for the user', async () => {
            const res = await request(app)
                .get('/api/todo/')
                .set('Authorization', `Bearer ${token}`);
      
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("No ToDo Item(s) found");
        });

        it("should return 401 if the user is not authenticated", async () => {
            const res = await request(app)
                .get('/api/todo/');

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized. Token not found.");
        });
    });

    describe("GET /todo/:id", () => {
        it("should get a specific todo item", async () => {
            const todo = await ToDo.create({
                title: "Test Todo",
                description: "Test Description",
                user: user._id,
            });
        
            const res = await request(app)
                .get(`/api/todo/${todo._id}/view`)
                .set('Authorization', `Bearer ${token}`);
    
            expect(res.statusCode).toBe(200);
            expect(res.body.todo.title).toBe("Test Todo");
            expect(res.body.todo.description).toBe("Test Description");
        });

        it("should return 404 if todo item is not found", async () => {
            const res = await request(app)
                .get(`/api/todo/${new mongoose.Types.ObjectId()}/view`)
                .set('Authorization', `Bearer ${token}`);
      
            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("No ToDo Item(s) found");
        });

        it("should return 401 if user is not authenticated", async () => {
            const todo = await ToDo.create({
              title: "Test Todo",
              description: "Test Description",
              user: user._id,
            });
      
            const res = await request(app)
                .get(`/api/todo/${todo._id}/view`);
      
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized. Token not found.");
        });
    });

    describe("PUT /todo/:id/update", () => {
        it("should update a specific todo item", async () => {
            const todo = await ToDo.create({
                title: "Test Todo",
                description: "Test Description",
                user: user._id,
            });
    
            const res = await request(app)
                .put(`/api/todo/${todo._id}/update`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: "Updated Todo",
                    description: "Updated Description",
                });
    
            expect(res.statusCode).toBe(200);
            expect(res.body.todo.title).toBe("Updated Todo");
            expect(res.body.todo.description).toBe("Updated Description");
        });

        it("should return 401 if user is not authenticated", async () => {
            const todo = await ToDo.create({
              title: "Test Todo",
              description: "Test Description",
              user: user._id,
            });
      
            const res = await request(app)
              .put(`/api/todo/${todo._id}/update`)
              .send({
                title: "Updated Todo",
                description: "Updated Description",
              });
      
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized. Token not found.");
        });
    });

    describe("PUT /todo/:id/markAsComplete", () => {
        it("should mark a specific todo item as complete", async () => {
            const todo = await ToDo.create({
                title: "Test Todo",
                description: "Test Description",
                user: user._id,
            });
    
            const res = await request(app)
            .put(`/api/todo/${todo._id}/markAsComplete`)
            .set('Authorization', `Bearer ${token}`);
    
            expect(res.statusCode).toBe(200);
            expect(res.body.todo.status).toBe("completed");
        });

        it("should return 401 if user is not authenticated", async () => {
            const todo = await ToDo.create({
              title: "Test Todo",
              description: "Test Description",
              user: user._id,
            });
      
            const res = await request(app)
              .put(`/api/todo/${todo._id}/markAsComplete`);
      
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized. Token not found.");
        });
    });

    describe("DELETE /todo/:id/delete", () => {
        it('should delete a specific todo item', async () => {
            const todo = await ToDo.create({
              title: "Test Todo",
              description: "Test Description",
              user: user._id,
            });
      
            const res = await request(app)
              .delete(`/api/todo/${todo._id}/delete`)
              .set('Authorization', `Bearer ${token}`);
      
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'ToDo deleted successfully');
        });

        it("should return 401 if user is not authenticated", async () => {
            const todo = await ToDo.create({
              title: "Test Todo",
              description: "Test Description",
              user: user._id,
            });
      
            const res = await request(app)
              .delete(`/api/todo/${todo._id}/delete`);
      
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized. Token not found.");
        });
    })
});