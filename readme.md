# ShelfMaster-API

This project provides a RESTful API for managing books and borrow records, with full schema validation, business logic enforcement, aggregation, and filtering capabilities.

With this API, you can:

- \*\*Add new books to the library, including details like title, author, genre, and number of copies.
- \*\*View all books, search by genre, and sort or limit results.
- \*\*Update or delete books as needed.
- \*\*Borrow books while making sure there are enough copies available.
- \*\*See a summary of how many times each book has been borrowed.

### **Directory Structure**

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

## API Endpoints

The ShelfMaster-API provides a RESTful interface for managing books and borrow records. All endpoints return a consistent response structure with `success`, `message`, and `data` fields.

---

### 📚 Books

#### Create a Book

- **Endpoint:** `POST /api/books`
- **Description:** Add a new book to the library.
- **Request Body:**
  {
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
  }

- **Response:**
  {
  "success": true,
  "message": "Book created successfully",
  "data": {
  "\_id": "64f123abc4567890def12345",
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true,
  "createdAt": "2024-11-19T10:23:45.123Z",
  "updatedAt": "2024-11-19T10:23:45.123Z"
  }
  }

### **Environment Variables**

Create a `.env` file in the root of your project directory with the following content:

```plaintext
DB_URL="YOUR MONGO URI"
PORT=5000
```

- **`DB_URL`**: The connection string for your MongoDB database.
- **`PORT`**: The port on which the server will run.

---

### **Getting Started**

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
