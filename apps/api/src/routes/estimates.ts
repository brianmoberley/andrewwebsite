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
  res.json({ success: true, message: "Estimate sent" });
}));

router.post("/:id/approve", asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Estimate approved" });
}));

router.post("/:id/reject", asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Estimate rejected" });
}));

export default router;
