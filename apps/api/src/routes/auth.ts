import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@construction/db/client";
import {
  generateToken,
  hashPassword,
  verifyPassword,
} from "../utils/auth.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../middleware/error-handler.js";
import { authenticate, AuthRequest } from "../middleware/auth.js";

const router = Router();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Login
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
    }

    // Check if user is active
    if (user.status !== "active") {
      throw new AppError(403, "USER_INACTIVE", "User account is inactive");
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role.name);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.name,
          phone: user.phone,
        },
      },
    });
  })
);

// Register (admin only)
router.post(
  "/register",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = registerSchema.parse(
      req.body
    );

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(409, "USER_EXISTS", "User already exists");
    }

    // Get default role (assumed to be "office_staff" or similar)
    const defaultRole = await prisma.role.findUnique({
      where: { name: "office_staff" },
    });

    if (!defaultRole) {
      throw new AppError(500, "ROLE_NOT_FOUND", "Default role not found");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        roleId: defaultRole.id,
      },
      include: { role: true },
    });

    // Generate token
    const token = generateToken(newUser.id, newUser.email, newUser.role.name);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role.name,
        },
      },
    });
  })
);

// Get current user
router.get(
  "/me",
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError(401, "UNAUTHORIZED", "User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { role: true },
    });

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "User not found");
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        phone: user.phone,
      },
    });
  })
);

// Logout (client-side only, but included for completeness)
router.post("/logout", authenticate, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
