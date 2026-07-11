// Lead Types
export interface CreateLeadRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  projectType: string;
  projectDescription?: string;
  budgetRange?: string;
  desiredTimeline?: string;
  leadSource: string;
  preferredContact: string; // email, phone, sms
  smsConsent: boolean;
  emailConsent: boolean;
}

export interface LeadResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  status: string;
  leadSource: string;
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateLeadRequest {
  status?: string;
  assignedToId?: string | null;
  projectType?: string;
  projectDescription?: string;
  budgetRange?: string;
}

// Estimate Types
export interface CreateEstimateRequest {
  leadId?: string;
  customerId?: string;
  projectId?: string;
  lineItems: EstimateLineItemRequest[];
  tax?: number;
  discount?: number;
  terms?: string;
  notes?: string;
  expirationDate?: string;
}

export interface EstimateLineItemRequest {
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  markupPercent?: number;
  taxable?: boolean;
}

export interface EstimateResponse {
  id: string;
  estimateNumber: string;
  status: string;
  leadId?: string;
  customerId?: string;
  projectId?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  estimateDate: string;
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
  lineItems: EstimateLineItemResponse[];
}

export interface EstimateLineItemResponse {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  markupPercent: number;
  taxable: boolean;
  lineTotal: number;
}

export interface ApproveEstimateRequest {
  approvedBy?: string;
}

// Invoice Types
export interface CreateInvoiceRequest {
  customerId: string;
  projectId: string;
  dueDate: string;
  lineItems: InvoiceLineItemRequest[];
  tax?: number;
  discount?: number;
  terms?: string;
  notes?: string;
}

export interface InvoiceLineItemRequest {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxable?: boolean;
}

export interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  status: string;
  customerId: string;
  projectId: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  invoiceDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  lineItems: InvoiceLineItemResponse[];
}

export interface InvoiceLineItemResponse {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxable: boolean;
  lineTotal: number;
}

// Schedule Event Types
export interface CreateScheduleEventRequest {
  eventType: string;
  title: string;
  description?: string;
  leadId?: string;
  customerId?: string;
  projectId?: string;
  assignedToId?: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  location?: string;
}

export interface ScheduleEventResponse {
  id: string;
  eventType: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  status: string;
  assignedToId?: string;
  leadId?: string;
  customerId?: string;
  projectId?: string;
  externalCalendarEventId?: string;
  calendarProvider?: string;
  createdAt: string;
  updatedAt: string;
}

// Portfolio Types
export interface CreatePortfolioProjectRequest {
  title: string;
  description?: string;
  category: string;
  location?: string;
  completionDate?: string;
  published?: boolean;
}

export interface PortfolioProjectResponse {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  location?: string;
  completionDate?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface CreatePaymentRequest {
  invoiceId: string;
  customerId: string;
  amount: number;
  paymentMethod: string; // credit_card, ach, check, cash
  paymentProvider?: string;
  providerTransactionId?: string;
}

export interface PaymentResponse {
  id: string;
  invoiceId: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  paidAt?: string;
  createdAt: string;
}

// Message Types
export interface SendMessageRequest {
  channel: string; // email, sms, internal_note
  recipient: string;
  subject?: string;
  body: string;
  leadId?: string;
  customerId?: string;
  projectId?: string;
}

// File Upload Types
export interface FileUploadResponse {
  id: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  fileType: string;
  category?: string;
  createdAt: string;
}
