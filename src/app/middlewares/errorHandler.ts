import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (err instanceof ZodError) {
  //   console.log(err)
  //   const formattedErrors: Record<string, any> = {};
  //   for (const key in err.flatten().fieldErrors) {
  //     formattedErrors[key] = {
  //       message: err.flatten().fieldErrors[key]?.[0] || "Invalid value",
  //       name: "ValidatorError",
  //       properties: {
  //         message: err.flatten().fieldErrors[key]?.[0] || "Invalid value",
  //         type: "validation",
  //       },
  //       kind: "validation",
  //       path: key,
  //       value: req.body[key],
  //     };
  //   }

  //   res.status(400).json({
  //     message: "Validation failed",
  //     success: false,
  //     error: {
  //       name: "ValidationError",
  //       errors: formattedErrors,
  //     },
  //   });
  // }

  if (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }

  // Other errors
  res.status(500).json({
    message: error.message || "Internal server error",
    success: false,
    error: error,
  });
};
