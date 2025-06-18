# RecoMeal Backend (Express + PostgreSQL)

This is the **backend** for the RecoMeal fullstack application. It provides RESTful APIs for user authentication, ingredient and category management, recipe saving, and admin control. It is connected to a PostgreSQL database.

## Tech Stack

- Node.js + Express
- PostgreSQL (via `pg`)
- Middleware: Admin Middleware


## Getting Started

```bash
# 1. Install dependencies
cd recomealbackend
npm install

# 2. Start the development server
npx nodemon server.js


Project Structure

```
recomealbackend/
├── middleware/
│   └── adminAuth.js          # Role-based access control
├── Routes/
│   ├── categories.js         # Admin routes for managing categories
│   ├── ingredients.js        # Admin routes for managing ingredients
│   ├── recipes.js            # Save recipe on view
│   ├── saved_recipes.js      # Save/view/delete user favorites
│   └── users.js              # Signup, login, update user info
├── db.js                     # PostgreSQL client setup
├── server.js                 # Main server entry point
├── .env                      # Environment variables



API Endpoints
The API will run on: http://localhost:3001

Auth Routes
Base URL: /api/users

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| POST   | `/signup` | Register a new user     |
| POST   | `/login`  | Log in an existing user |

POST /api/users/signup  
Registers a new user (admin or user role):

```json
{
  "email": "admin@example.com",
  "password": "123456",
  "role": "admin",
  "username": "admin"
}
``` 

POST /api/users/login
Logs in a user and returns basic profile:

```json

{
  "email": "sara@gmail.com",
  "password": "123"
}
```

Saved Recipes Routes
Base URL: /api/saved_recipes

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/`                  | Save a recipe to user's list |
| GET    | `/user/:userId`      | Get saved recipes by user    |
| DELETE | `/:userId/:recipeId` | Delete a saved recipe        |


Recipes Routes
Base URL: /api/recipes

| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| POST   | `/`      | Insert a recipe when shown |


Admin: Categories and Ingredients
All endpoints under these routes require the x-role: admin header.

Header Required
x-role: admin


| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | `/`      | Get all categories |
| POST   | `/`      | Add a new category |
| PUT    | `/:id`   | Edit category      |
| DELETE | `/:id`   | Delete category    |

Categories - /api/categories

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | `/`      | Get all categories |
| POST   | `/`      | Add a new category |
| PUT    | `/:id`   | Edit category      |
| DELETE | `/:id`   | Delete category    |

Ingredients - /api/ingredients

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | Get all ingredients  |
| POST   | `/`      | Add a new ingredient |
| PUT    | `/:id`   | Edit ingredient      |
| DELETE | `/:id`   | Delete ingredient    |
