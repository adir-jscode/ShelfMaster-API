import { NextFunction, Request, Response } from "express";
import Borrow from "./borrow.model";
import { Aggregate } from "mongoose";
import { Book } from "../book/book.model";

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowBook = await Borrow.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error) {
    next(error);
  }
};

const getBorrowedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowSummary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: "$totalQuantity",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowSummary,
    });
  } catch (error) {
    next(error);
  }
};

export const borrowController = { borrowBook, getBorrowedBooks };
