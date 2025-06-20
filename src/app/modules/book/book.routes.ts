import express, { Application, Request, Response } from "express";
import { createBook, getAllBooks, getBookById } from "./book.controller";

const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:bookId", getBookById);

export default bookRouter;
