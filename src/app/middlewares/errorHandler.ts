// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = 500;
  let errorResponse = {
    message: "An error occurred",
    success: false as const,
    error: err,
  };

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    status = 400;
    errorResponse = {
      message: "Validation failed",
      success: false,
      error: err.format(),
    };
  }

  // Handle Mongoose validation errors
  else if (err.name === "ValidationError") {
    status = 400;
    errorResponse = {
      message: "Validation failed",
      success: false,
      error: err,
    };
  }

  // You can add more custom error handling here if needed

  return res.status(status).json(errorResponse);
}
