import express, { Application, Request, Response } from "express";
import { createBook, getAllBooks } from "../controllers/book.controller";

export const bookRouter = express.Router();

bookRouter.post("/", createBook);
bookRouter.get("/", getAllBooks);
