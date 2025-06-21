import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorResponse = {
    message: "An error occurred",
    success: false,
    error: err,
  };

  //validation error
  if (err.name === "ValidationError") {
    errorResponse = {
      message: "Validation failed",
      success: false,
      error: err,
    };
    return res.status(400).json(errorResponse);
  }

  //duplicate key error
  if (err.code === 11000) {
    errorResponse = {
      message: "Duplicate value",
      success: false,
      error: err,
    };
    return res.status(409).json(errorResponse); //status 409 for duplicate key
  }

  // internal error
  return res.status(500).json(errorResponse);
}
