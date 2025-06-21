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
