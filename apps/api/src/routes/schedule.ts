import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Placeholder routes
router.get("/events", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: [] });
}));

router.post("/events", authenticate, asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: {} });
}));

router.get("/events/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: {} });
}));

router.patch("/events/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: {} });
}));

router.delete("/events/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Event deleted" });
}));

router.get("/availability", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: [] });
}));

export default router;
