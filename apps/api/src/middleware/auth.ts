import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error-handler.js";
import { JwtPayload } from "@construction/types";

export interface AuthRequest extends Request {
  user?: JwtPayload;
  token?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        401,
        "UNAUTHORIZED",
        "Missing or invalid authorization header"
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    req.user = decoded;
    req.token = token;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, "INVALID_TOKEN", "Invalid or expired token");
    }
    throw err;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, "UNAUTHORIZED", "User not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(
        403,
        "FORBIDDEN",
        "Insufficient permissions for this action"
      );
    }

    next();
  };
};
