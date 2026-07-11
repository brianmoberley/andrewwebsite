import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Placeholder routes
router.get("/", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: [] });
}));

router.post("/", authenticate, asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: {} });
}));

router.get("/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: {} });
}));

router.get("/:id/pdf", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: { url: "" } });
}));

router.patch("/:id", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: {} });
}));

router.post("/:id/send", authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Invoice sent" });
}));

export default router;
