# ShelfMaster-API

This project provides a RESTful API for managing books and borrow records, with full schema validation, business logic enforcement, aggregation, and filtering capabilities.

---

## 🌐 Live Deployment

🔗 [Click to access the live API](https://sm-api-eight.vercel.app/)

## 🚀 With this API, you can:

- \*\*Add new books to the library, including details like title, author, genre, and number of copies.
- \*\*View all books, search by genre, and sort or limit results.
- \*\*Update or delete books as needed.
- \*\*Borrow books while making sure there are enough copies available.
- \*\*See a summary of how many times each book has been borrowed.

## 📁 Directory Structure

```plaintext
src/
└── app/
    ├── config/
    │   └── db.ts
    │── middlewares/
    │   └── errorHandler.ts
    ├── modules/
    │   ├── book/
    │   │   ├── book.controller.ts
    │   │   ├── book.interface.ts
    │   │   ├── book.model.ts
    │   │   ├── book.routes.ts
    │   │
    │   └── borrow/
    │       ├── borrow.controller.ts
    │       ├── borrow.interface.ts
    │       ├── borrow.model.ts
    │       └── borrow.routes.ts
    └── routes/
        └── index.ts
    ├── app.ts
    └── server.ts
.env
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your project directory with the following content:

```plaintext
DB_URL="YOUR MONGO URI"
PORT=5000
```

- **`DB_URL`**: The connection string for your MongoDB database.
- **`PORT`**: The port on which the server will run.

---

## 🛠️ Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/adir-jscode/ShelfMaster-API.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd ShelfMaster-API
   ```

3. **Install Dependencies:**

   Make sure you have Node.js installed. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**

   Create a `.env` file in the root of your project directory and add the environment variables specified above.

5. **Run the Development Server:**

   Start the development server with:

   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:5000` (or your configured port).

---

## 📖 API Endpoints

The ShelfMaster-API provides a RESTful interface for managing books and borrow records. All endpoints return a consistent response structure with `success`, `message`, and `data` fields.

---

### 📚 Books

#### Get All Books

- **Endpoint:** `GET /api/books`
- **Description:** Retrieve all books from the library. Supports filtering by genre, sorting by fields, and limiting the result count.

| Query Param | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `filter`    | string | No       | Filter books by genre. (e.g., `SCIENCE`, `FICTION`) |
| `sortBy`    | string | No       | Field to sort by (e.g., `createdAt`, `title`).      |
| `sort`      | string | No       | Sort order: `asc` or `desc`.                        |
| `limit`     | number | No       | Limit the number of results returned (default: 10). |

**Example:**

```http
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

#### Get Book by ID

- **Endpoint:** `GET /api/books/:bookId`
- **Description:** Retrieve a single book by its unique ID.

| URL Param | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `bookId`  | string | Yes      | The unique ID of the book. |

**Example:**

```http
GET /api/books/64f123abc4567890def12345
```

#### Create a Book

- **Endpoint:** `POST /api/books`
- **Description:** Add a new book to the library.
- **Request Body:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### Update a Book

- **Endpoint:** `PUT /api/books/:bookId`
- **Description:** Update details of an existing book by ID.

| URL Param | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `bookId`  | string | Yes      | The ID of the book to update |

**Example:**

```http
PUT /api/books/64f123abc4567890def12345
```

**Request Body Example:**

```json
{
  "copies": 10
}
```

---

#### Delete a Book

- **Endpoint:** `DELETE /api/books/:bookId`
- **Description:** Permanently delete a book by its ID.

| URL Param | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `bookId`  | string | Yes      | The ID of the book to delete |

**Example:**

```http
DELETE /api/books/64f123abc4567890def12345
```

---

### 🔄 Borrow

#### Borrow a Book

- **Endpoint:** `POST /api/borrow`
- **Description:** Borrow copies of a book. Validates availability and adjusts inventory accordingly.

**Request Body:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

#### Borrow Summary

- **Endpoint:** `GET /api/borrow`
- **Description:** Get a summary of all borrowed books using aggregation. Shows total borrowed quantity and book title + ISBN.

**Response Example:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---

### Generic Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min",
        "value": -5
      }
    }
  }
}
```

---

## Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- REST API design
- Mongoose schema validation, middleware, and static methods

---
