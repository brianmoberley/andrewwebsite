import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Placeholder routes
router.get("/", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: [] });
}));

router.post("/send", authenticate, asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: {} });
}));

router.post("/email", authenticate, asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: {} });
}));

router.post("/sms", authenticate, asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: {} });
}));

export default router;
