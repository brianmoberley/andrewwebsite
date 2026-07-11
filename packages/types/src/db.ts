// Re-export Prisma types
export type {
  User,
  Role,
  Lead,
  Customer,
  Project,
  Estimate,
  EstimateLineItem,
  Invoice,
  InvoiceLineItem,
  Payment,
  ScheduleEvent,
  Message,
  File,
  PortfolioProject,
  Testimonial,
  WebsitePage,
  EmailTemplate,
  SmsTemplate,
  AuditLog,
  Address,
  ProjectTask,
  CalendarIntegration,
} from "@prisma/client";

export enum LeadStatus {
  NEW = "new",
  CONTACTED = "contacted",
  APPOINTMENT_SCHEDULED = "appointment_scheduled",
  ESTIMATE_NEEDED = "estimate_needed",
  ESTIMATE_SENT = "estimate_sent",
  FOLLOW_UP_NEEDED = "follow_up_needed",
  WON = "won",
  LOST = "lost",
  ARCHIVED = "archived",
}

export enum EstimateStatus {
  DRAFT = "draft",
  SENT = "sent",
  VIEWED = "viewed",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired",
  REVISED = "revised",
  CONVERTED_TO_PROJECT = "converted_to_project",
}

export enum InvoiceStatus {
  DRAFT = "draft",
  SENT = "sent",
  VIEWED = "viewed",
  PARTIALLY_PAID = "partially_paid",
  PAID = "paid",
  OVERDUE = "overdue",
  CANCELED = "canceled",
  REFUNDED = "refunded",
  WRITTEN_OFF = "written_off",
}

export enum ProjectStatus {
  NOT_STARTED = "not_started",
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  WAITING_ON_CUSTOMER = "waiting_on_customer",
  WAITING_ON_MATERIALS = "waiting_on_materials",
  WAITING_ON_PERMIT = "waiting_on_permit",
  DELAYED = "delayed",
  COMPLETED = "completed",
  CLOSED = "closed",
  CANCELED = "canceled",
}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  ESTIMATOR = "estimator",
  PROJECT_MANAGER = "project_manager",
  CREW_MEMBER = "crew_member",
  OFFICE_STAFF = "office_staff",
  CUSTOMER = "customer",
}
