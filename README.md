# Todo Application

This Todo Application allows users to manage their todo items efficiently. It provides features such as user registration, login, and CRUD operations on todo items, all secured with JWT authentication.

## Features
- User Registration
- User Login
- Create, Read, Update, and Delete (CRUD) Todo items
- Mark Todo items as complete
- JWT Authentication and Authorization

## Prerequisites
- Node.js
- MongoDB

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/udayakiranchhotaraya/squbix-todo.git
    cd squbix-todo
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    The `.env` file in the root of the project is already configured and ready

4. **Run the application locally**:
    ```sh
    npm run dev
    ```

    The application should now be running on `http://localhost:5000`.

## API Documentation

Access the API documentation at `http://localhost:5000/api-docs` using Swagger UI.

  ### User Registration
- **Endpoint**: `/api/user/register`
- **Method**: POST
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
      "name": { "firstName": "John", "lastName" : "Doe" },
      "email": "john.doe@example.com",
      "password": "password123"
  }
  ```
  ### User Login
- **Endpoint**: `/api/user/login`
- **Method**: POST
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

  ### Create New Todo
- **Endpoint**: `/api/todo/new`
- **Method**: POST
- **Description**: Creates a new todo item.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "Test Todo",
    "description": "Test Description"
  }
  ```
  
  ### Get All Todos for User
- **Endpoint**: `/api/todo`
- **Method**: GET
- **Description**: Retrieves all todo items for the logged-in user.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT token>"
  }
  ```
  
  ### Get Specific Todo
- **Endpoint**: `/api/todo/:id/view`
- **Method**: GET
- **Description**: Retrieves a specific todo item by its ID.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT token>"
  }
  ```
  
  ### Update Todo
- **Endpoint**: `/api/todo/:id/update`
- **Method**: PUT
- **Description**: Updates a specific todo item by its ID.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "Updated Todo Title",
    "description": "Updated Description"
  }
  ```

  ### Mark Todo as Complete
- **Endpoint**: `/api/todo/:id/markAsComplete`
- **Method**: PUT
- **Description**: Marks a specific todo item as complete.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT token>"
  }
  ```

  ### Delete Todo
- **Endpoint**: `/api/todo/:id/delete`
- **Method**: DELETE
- **Description**: Deletes a specific todo item.
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT token>"
  }
  ```

## Testing

 To run unit tests:
  ```sh
    npm run test
  ```

 ## Conclusion

 This Todo Application provides a robust and secure way to manage your todo items. Use the Swagger UI at `http://localhost:5000/api-docs` to interact with the API endpoints and test the functionality.
