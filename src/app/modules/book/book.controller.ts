import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";
import { BookCreateSchema } from "./book.schemas";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = await BookCreateSchema.parseAsync(req.body);
    const book = await Book.create(payload);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export { createBook, getAllBooks };
