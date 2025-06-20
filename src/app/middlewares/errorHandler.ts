import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof ZodError) {
    const formattedErrors: Record<string, any> = {};
    for (const key in err.flatten().fieldErrors) {
      formattedErrors[key] = {
        message: err.flatten().fieldErrors[key]?.[0] || "Invalid value",
        name: "ValidatorError",
        properties: {
          message: err.flatten().fieldErrors[key]?.[0] || "Invalid value",
          type: "validation",
        },
        kind: "validation",
        path: key,
        value: req.body[key],
      };
    }

    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: formattedErrors,
      },
    });
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }

  // Other errors
  res.status(500).json({
    message: err.message || "Internal server error",
    success: false,
    error: err,
  });
};
