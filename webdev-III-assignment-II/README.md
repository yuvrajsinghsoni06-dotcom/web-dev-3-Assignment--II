# Student Management REST API

**Lab Assignment 2 – Web Development III (Node.js & Express Backend)**

- **Student Name:** Yuvraj Singh Soni
- **Roll Number:** 2501010098
- **Unit:** 2

## 1. Project Description
This project is a REST API built with Node.js and Express.js to manage student records. It supports all four CRUD operations (Create, Read, Update and Delete). As required by the assignment, it uses an in-memory JavaScript array and does not use MongoDB, MySQL or Mongoose.

## 2. Technologies Used
- Node.js
- Express.js
- Postman (for API testing)

## 3. Project Structure
```text
student_management_rest_api/
├── app.js
├── package.json
├── README.md
├── .gitignore
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
├── data/
│   └── students.js
└── postman/
    └── Student_Management_API.postman_collection.json
```

## 4. Setup and Run
1. Install Node.js on your computer.
2. Open this project folder in VS Code.
3. Open the VS Code terminal (**Terminal → New Terminal**).
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. The server will run at `http://localhost:3000`.

## 5. Required API Endpoints
Base URL: `http://localhost:3000`

| Method | Endpoint | Purpose | Success status |
|---|---|---|---|
| GET | `/students` | Get all students | 200 OK |
| GET | `/students/:id` | Get a student by ID | 200 OK |
| POST | `/students` | Add a student | 201 Created |
| PUT | `/students/:id` | Update a student's details | 200 OK |
| DELETE | `/students/:id` | Delete a student | 200 OK |

### Example POST/PUT JSON body
Set `Content-Type: application/json` in Postman and use:
```json
{
  "name": "Yuvraj Singh Soni",
  "age": 20,
  "course": "B.Tech CSE",
  "email": "uv@example.com"
}
```
For POST, the server generates the ID automatically. For PUT, send all four editable fields.

## 6. Status Codes and Error Handling
- **200 OK:** Request completed successfully (GET, PUT and DELETE).
- **201 Created:** A new student record was created.
- **400 Bad Request:** Invalid student ID, missing/invalid fields or malformed JSON.
- **404 Not Found:** Student ID or API route does not exist.
- **500 Internal Server Error:** Unexpected server-side error.

## 7. Middleware and Modular Routing
- `middleware/logger.js` is custom middleware. It prints the timestamp, HTTP method and URL of every request in the terminal.
- `routes/studentRoutes.js` contains all student endpoints and is mounted in `app.js` using `app.use('/students', studentRoutes)`.
- `express.json()` reads JSON data sent in request bodies.

## 8. Postman Testing
Import `postman/Student_Management_API.postman_collection.json` into Postman. Start the server, then run the requests in the collection. The collection includes all five required APIs and examples of invalid/not-found cases.

Suggested test order:
1. Get All Students
2. Get Student by ID
3. Create Student
4. Update Student
5. Delete Student
6. Test Invalid Student ID and Student Not Found

## 9. Important Note
Student data is stored only in memory. Any records added, updated or deleted will reset to the three sample records when the server is restarted. This is intentional because the assignment prohibits database use.


