import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
  res.status(500).json({
    message: error.message || "Internal server error",
    success: false,
    error: error,
  });
};
