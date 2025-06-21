import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";
import { isValidObjectId } from "mongoose";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    const filterObj: { genre?: string } = {};
    if (filter && typeof filter === "string") {
      filterObj.genre = filter;
    }
    const sortObj: { [key: string]: 1 | -1 } = {};
    if (sortBy && typeof sortBy === "string") {
      const sortOrder = sort === "desc" ? -1 : 1;
      sortObj[sortBy] = sortOrder;
    }
    const parsedLimit = Number(limit) || 0;
    const books = await Book.find(filterObj).sort(sortObj).limit(parsedLimit);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.bookId;
    const bookbyId = await Book.findById(id);
    if (!bookbyId) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: bookbyId,
    });
  } catch (error) {
    next(error);
  }
};

//PUT
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.bookId;
    const payload = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

//delete
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
    await Book.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
