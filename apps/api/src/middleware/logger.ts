import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  // Store original json method
  const originalJson = res.json;

  // Override json method
  res.json = function (data: unknown) {
    // Log response
    const duration = Date.now() - startTime;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    );

    // Call original json
    return originalJson.call(this, data);
  };

  next();
};
