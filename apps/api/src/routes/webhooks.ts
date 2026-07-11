import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

// Webhook routes - no auth required (use signature verification instead)
router.post("/sendgrid", asyncHandler(async (req, res) => {
  res.json({ success: true });
}));

router.post("/twilio/status", asyncHandler(async (req, res) => {
  res.json({ success: true });
}));

router.post("/stripe", asyncHandler(async (req, res) => {
  res.json({ success: true });
}));

export default router;
