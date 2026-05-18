import { Request, Response, NextFunction } from "express";

// Simple centralized error handler
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
