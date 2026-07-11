import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Public routes - no auth required
router.get("/", asyncHandler(async (req, res) => {
  res.json({ success: true, data: [] });
}));

router.get("/:id", asyncHandler(async (req, res) => {
  res.json({ success: true, data: {} });
}));

// Admin routes - auth required
router.post("/", authenticate, asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: {} });
}));

router.patch("/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: {} });
}));

router.delete("/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Deleted" });
}));

export default router;
