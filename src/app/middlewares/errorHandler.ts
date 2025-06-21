import { Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response) => {
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
