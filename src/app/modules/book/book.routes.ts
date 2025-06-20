import express, { Application, Request, Response } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./book.controller";

const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.put("/:bookId", updateBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
