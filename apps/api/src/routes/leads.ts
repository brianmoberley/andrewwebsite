import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@construction/db/client";
import { asyncHandler } from "../utils/async-handler.js";
import { authenticate, AuthRequest } from "../middleware/auth.js";
import { AppError } from "../middleware/error-handler.js";
import { CreateLeadRequest } from "@construction/types";

const router = Router();

// Create lead from form submission
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const leadData: CreateLeadRequest = req.body;

    // Validate required fields
    if (
      !leadData.firstName ||
      !leadData.lastName ||
      !leadData.email ||
      !leadData.phone
    ) {
      throw new AppError(
        400,
        "VALIDATION_ERROR",
        "Missing required fields"
      );
    }

    // Create lead with address
    const lead = await prisma.lead.create({
      data: {
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        projectType: leadData.projectType,
        projectDescription: leadData.projectDescription,
        budgetRange: leadData.budgetRange,
        desiredTimeline: leadData.desiredTimeline,
        leadSource: leadData.leadSource,
        preferredContact: leadData.preferredContact,
        smsConsent: leadData.smsConsent,
        emailConsent: leadData.emailConsent,
        address: {
          create: {
            line1: leadData.address.line1,
            line2: leadData.address.line2,
            city: leadData.address.city,
            state: leadData.address.state,
            zipCode: leadData.address.zipCode,
          },
        },
      },
      include: { address: true },
    });

    // TODO: Send confirmation email and SMS

    res.status(201).json({
      success: true,
      data: lead,
    });
  })
);

// Get all leads (admin)
router.get(
  "/",
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status, assignedToId, search, page = "1", limit = "10" } = req.query;

    const where: any = {};

    if (status) where.status = status;
    if (assignedToId) where.assignedToId = assignedToId;

    if (search) {
      where.OR = [
        { firstName: { contains: String(search), mode: "insensitive" } },
        { lastName: { contains: String(search), mode: "insensitive" } },
        { email: { contains: String(search), mode: "insensitive" } },
        { phone: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const pageNum = parseInt(String(page), 10);
    const pageSize = parseInt(String(limit), 10);

    const [leads, total] = await Promise.all([
      prisma.lead.find({
        where,
        include: { address: true, assignedTo: true },
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          page: pageNum,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    });
  })
);

// Get single lead
router.get(
  "/:id",
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { address: true, assignedTo: true, estimates: true },
    });

    if (!lead) {
      throw new AppError(404, "LEAD_NOT_FOUND", "Lead not found");
    }

    res.json({
      success: true,
      data: lead,
    });
  })
);

// Update lead
router.patch(
  "/:id",
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status, assignedToId, ...updateData } = req.body;

    // Check if lead exists
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new AppError(404, "LEAD_NOT_FOUND", "Lead not found");
    }

    // Update lead
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...updateData,
        status: status || lead.status,
        assignedToId: assignedToId !== undefined ? assignedToId : lead.assignedToId,
      },
      include: { address: true, assignedTo: true },
    });

    // TODO: Send notification if assigned to new user

    res.json({
      success: true,
      data: updatedLead,
    });
  })
);

// Delete lead
router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new AppError(404, "LEAD_NOT_FOUND", "Lead not found");
    }

    await prisma.lead.delete({ where: { id } });

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  })
);

export default router;
