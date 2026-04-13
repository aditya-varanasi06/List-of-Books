#  Books REST API

A simple in-memory REST API built with **Node.js** and **Express** for managing a list of books.


##  Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# (Optional) Start with auto-reload during development
npm run dev
```

Server runs at: **http://localhost:3000**



##  API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint      | Description          |
|--------|---------------|----------------------|
| GET    | /books        | Get all books        |
| GET    | /books/:id    | Get a book by ID     |
| POST   | /books        | Add a new book       |
| PUT    | /books/:id    | Update a book by ID  |
| DELETE | /books/:id    | Delete a book by ID  |

---

##  Postman Test Examples

### 1. GET all books
```
GET http://localhost:3000/books
```
**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
    { "id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee" },
    { "id": 3, "title": "1984", "author": "George Orwell" }
  ]
}
```

---

### 2. GET a single book
```
GET http://localhost:3000/books/1
```
**Response:**
```json
{
  "success": true,
  "data": { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
}
```

---

### 3. POST — Add a new book
```
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "The Alchemist",
  "author": "Paulo Coelho"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { "id": 4, "title": "The Alchemist", "author": "Paulo Coelho" }
}
```

---

### 4. PUT — Update a book
```
PUT http://localhost:3000/books/1
Content-Type: application/json

{
  "title": "The Great Gatsby (Updated Edition)",
  "author": "F. Scott Fitzgerald"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { "id": 1, "title": "The Great Gatsby (Updated Edition)", "author": "F. Scott Fitzgerald" }
}
```

---

### 5. DELETE — Remove a book
```
DELETE http://localhost:3000/books/1
```
**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
}
```

---

##  Error Responses

| Scenario              | Status | Message Example                        |
|-----------------------|--------|----------------------------------------|
| Book not found        | 404    | `"Book with id 99 not found"`          |
| Missing fields (POST) | 400    | `"Both title and author are required"` |
| No fields to update   | 400    | `"Provide at least one field to update"` |
| Unknown route         | 404    | `"Route GET /unknown not found"`       |

---

## 🗂 Project Structure

```
books-api/
├── server.js       # Main application (routes + logic)
├── package.json    # Dependencies & scripts
└── README.md       # This file
```

> **Note:** Data is stored in memory. All data resets when the server restarts.
