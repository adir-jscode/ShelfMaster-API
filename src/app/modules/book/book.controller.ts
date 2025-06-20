import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";
import { BookCreateSchema } from "./book.schemas";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const payload = await BookCreateSchema.parseAsync(req.body);
    const book = await Book.create(req.body);
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
    const { filter, sortBy, sort, limit } = req.query;
    const filterObj: any = {};
    if (filter) {
      filterObj.genre = filter;
    }

    const sortOrder = sort === "desc" ? -1 : 1;
    const sortObj: any = {};
    sortObj[sortBy as string] = sortOrder;

    const books = await Book.find(filterObj).sort(sortObj).limit(Number(limit));

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
