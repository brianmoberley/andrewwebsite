# Construction Platform API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Login

**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "phone": "(555) 123-4567"
    }
  }
}
```

### Register

**POST** `/auth/register`

Request:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

### Get Current User

**GET** `/auth/me`

Requires authentication.

Response:
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "phone": "(555) 123-4567"
  }
}
```

## Leads

### Create Lead

**POST** `/leads`

This endpoint is public (no authentication required). Used for free estimate requests from website.

Request:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "(555) 987-6543",
  "address": {
    "line1": "456 Oak Ave",
    "line2": "Suite 200",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62702"
  },
  "projectType": "Kitchen Remodel",
  "projectDescription": "Want to update our kitchen with new cabinets and countertops",
  "budgetRange": "10000-25000",
  "desiredTimeline": "2-3 months",
  "leadSource": "website_form",
  "preferredContact": "email",
  "emailConsent": true,
  "smsConsent": false
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "lead-456",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "(555) 987-6543",
    "projectType": "Kitchen Remodel",
    "status": "new",
    "leadSource": "website_form",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

Triggers:
- Confirmation email sent to lead
- SMS confirmation sent (if opted in)
- Lead notification email sent to company
- SMS notification sent to company (if configured)

### Get All Leads

**GET** `/leads?status=new&assignedToId=user-123&search=jane&page=1&limit=10`

Requires authentication.

Query Parameters:
- `status` - Filter by lead status (new, contacted, estimate_sent, etc.)
- `assignedToId` - Filter by assigned staff member
- `search` - Search by name, email, or phone
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

Response:
```json
{
  "success": true,
  "data": {
    "leads": [
      { ... lead objects ... }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 45,
      "totalPages": 5
    }
  }
}
```

### Get Single Lead

**GET** `/leads/:id`

Requires authentication.

Response:
```json
{
  "success": true,
  "data": {
    "id": "lead-456",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "(555) 987-6543",
    "address": { ... },
    "projectType": "Kitchen Remodel",
    "projectDescription": "...",
    "status": "new",
    "assignedTo": {
      "id": "user-123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@company.com"
    },
    "estimates": [ ... ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Update Lead

**PATCH** `/leads/:id`

Requires authentication.

Request:
```json
{
  "status": "contacted",
  "assignedToId": "user-123"
}
```

Response: Updated lead object

### Delete Lead

**DELETE** `/leads/:id`

Requires authentication.

Response:
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

## Estimates

### Create Estimate

**POST** `/estimates`

Requires authentication.

Request:
```json
{
  "leadId": "lead-456",
  "customerId": null,
  "lineItems": [
    {
      "description": "Kitchen demolition",
      "quantity": 1,
      "unit": "job",
      "unitCost": 2500,
      "markupPercent": 15,
      "taxable": false
    },
    {
      "description": "Cabinet installation",
      "quantity": 20,
      "unit": "linear_ft",
      "unitCost": 150,
      "markupPercent": 20,
      "taxable": true
    }
  ],
  "tax": 500,
  "discount": 0,
  "terms": "Payment due upon completion",
  "notes": "Sample kitchen remodel estimate",
  "expirationDate": "2024-02-15T23:59:59Z"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "est-789",
    "estimateNumber": "EST-001",
    "status": "draft",
    "leadId": "lead-456",
    "subtotal": 5250,
    "tax": 500,
    "discount": 0,
    "total": 5750,
    "estimateDate": "2024-01-15T10:30:00Z",
    "expirationDate": "2024-02-15T23:59:59Z",
    "lineItems": [ ... ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get All Estimates

**GET** `/estimates?status=sent&leadId=lead-456&page=1`

Requires authentication.

Query Parameters:
- `status` - draft, sent, viewed, approved, rejected, etc.
- `leadId` - Filter by lead
- `customerId` - Filter by customer
- `page` - Page number
- `limit` - Results per page

### Get Estimate PDF

**GET** `/estimates/:id/pdf`

Requires authentication.

Returns: PDF file of the estimate

### Send Estimate

**POST** `/estimates/:id/send`

Requires authentication.

Request:
```json
{
  "recipientEmail": "jane@example.com"
}
```

Response: Updated estimate with status "sent"

Triggers:
- Email sent to customer with estimate link
- SMS sent (if opted in)
- Message logged

### Approve Estimate

**POST** `/estimates/:id/approve`

This endpoint is public. Customer clicks approval link.

Request:
```json
{
  "approvedBy": "Jane Smith"
}
```

Response: Updated estimate with status "approved"

Triggers:
- Confirmation email to customer
- Notification to company
- Create project (if configured)
- Create deposit invoice (if configured)

### Reject Estimate

**POST** `/estimates/:id/reject`

Public endpoint.

Response: Updated estimate with status "rejected"

## Invoices

### Create Invoice

**POST** `/invoices`

Requires authentication.

Request:
```json
{
  "customerId": "cust-123",
  "projectId": "proj-456",
  "dueDate": "2024-02-15T23:59:59Z",
  "lineItems": [
    {
      "description": "Labor",
      "quantity": 40,
      "unit": "hour",
      "unitPrice": 75,
      "taxable": true
    },
    {
      "description": "Materials",
      "quantity": 1,
      "unit": "job",
      "unitPrice": 2500,
      "taxable": true
    }
  ],
  "tax": 0,
  "discount": 0,
  "terms": "Net 30",
  "notes": "Project #456 - Kitchen Remodel Phase 1"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "inv-789",
    "invoiceNumber": "INV-001",
    "status": "draft",
    "customerId": "cust-123",
    "projectId": "proj-456",
    "subtotal": 5500,
    "tax": 550,
    "discount": 0,
    "total": 6050,
    "amountPaid": 0,
    "balanceDue": 6050,
    "invoiceDate": "2024-01-15T10:30:00Z",
    "dueDate": "2024-02-15T23:59:59Z",
    "lineItems": [ ... ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get All Invoices

**GET** `/invoices?status=sent&customerId=cust-123&page=1`

Requires authentication.

Query Parameters:
- `status` - sent, viewed, partially_paid, paid, overdue, etc.
- `customerId` - Filter by customer
- `projectId` - Filter by project
- `page`, `limit` - Pagination

### Get Invoice PDF

**GET** `/invoices/:id/pdf`

Requires authentication.

Returns: PDF file of the invoice

### Send Invoice

**POST** `/invoices/:id/send`

Requires authentication.

Request:
```json
{
  "recipientEmail": "jane@example.com"
}
```

Triggers:
- Email sent with payment link
- SMS sent (if opted in)
- Invoice status updated to "sent"

## Schedule / Calendar

### Get Events

**GET** `/schedule/events?startDate=2024-01-01&endDate=2024-01-31`

Requires authentication.

Query Parameters:
- `startDate` - ISO 8601 date/time
- `endDate` - ISO 8601 date/time
- `leadId`, `customerId`, `projectId` - Filter options

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "evt-123",
      "eventType": "estimate_appointment",
      "title": "Estimate Visit: Jane Smith",
      "description": "Kitchen Remodel estimate",
      "startTime": "2024-01-20T10:00:00Z",
      "endTime": "2024-01-20T11:00:00Z",
      "location": "456 Oak Ave, Springfield, IL",
      "status": "scheduled",
      "leadId": "lead-456",
      "assignedToId": "user-123"
    }
  ]
}
```

### Create Event

**POST** `/schedule/events`

Requires authentication.

Request:
```json
{
  "eventType": "estimate_appointment",
  "title": "Estimate Visit: Jane Smith",
  "description": "Kitchen Remodel estimate",
  "leadId": "lead-456",
  "assignedToId": "user-123",
  "startTime": "2024-01-20T10:00:00Z",
  "endTime": "2024-01-20T11:00:00Z",
  "location": "456 Oak Ave, Springfield, IL"
}
```

Triggers:
- Confirmation email to lead
- SMS reminder (if opted in)
- Google Calendar event created (if integrated)

### Update Event

**PATCH** `/schedule/events/:id`

Requires authentication.

### Delete Event

**DELETE** `/schedule/events/:id`

Requires authentication.

## Projects

### Create Project

**POST** `/projects`

Requires authentication.

Request:
```json
{
  "customerId": "cust-123",
  "estimateId": "est-789",
  "managerId": "user-123",
  "title": "Kitchen Remodel - Smith Residence",
  "description": "Complete kitchen renovation",
  "address": {
    "line1": "456 Oak Ave",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62702"
  },
  "status": "scheduled",
  "startDate": "2024-02-01T00:00:00Z",
  "targetCompletionDate": "2024-03-15T00:00:00Z"
}
```

### Get All Projects

**GET** `/projects?status=in_progress&managerId=user-123`

Requires authentication.

### Get Single Project

**GET** `/projects/:id`

Requires authentication.

## Payments

### Record Payment

**POST** `/payments`

Requires authentication.

Request:
```json
{
  "invoiceId": "inv-789",
  "customerId": "cust-123",
  "amount": 3025,
  "paymentMethod": "credit_card",
  "paymentProvider": "stripe",
  "providerTransactionId": "ch_1234567890"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "pay-456",
    "invoiceId": "inv-789",
    "customerId": "cust-123",
    "amount": 3025,
    "paymentMethod": "credit_card",
    "status": "completed",
    "paidAt": "2024-01-15T14:30:00Z",
    "createdAt": "2024-01-15T14:30:00Z"
  }
}
```

Triggers:
- Invoice status updated (paid or partially_paid)
- Receipt email sent to customer
- Notification email sent to company

## Portfolio

### Get Portfolio Projects

**GET** `/portfolio?category=kitchen&published=true`

Public endpoint (no authentication required).

Query Parameters:
- `category` - Filter by category
- `published` - Filter by published status (true/false)

### Get Single Portfolio Project

**GET** `/portfolio/:id`

Public endpoint.

### Create Portfolio Project

**POST** `/portfolio`

Requires authentication.

Request:
```json
{
  "title": "Modern Kitchen Remodel",
  "slug": "modern-kitchen-remodel",
  "description": "Beautiful kitchen with custom cabinets",
  "category": "kitchen",
  "location": "Springfield, IL",
  "completionDate": "2024-01-15T00:00:00Z",
  "published": true
}
```

## Messages

### Send Email

**POST** `/messages/email`

Requires authentication.

Request:
```json
{
  "channel": "email",
  "recipientEmail": "jane@example.com",
  "subject": "Estimate Request Confirmation",
  "body": "Thank you for requesting a free estimate...",
  "leadId": "lead-456"
}
```

### Send SMS

**POST** `/messages/sms`

Requires authentication.

Request:
```json
{
  "channel": "sms",
  "recipientPhone": "(555) 987-6543",
  "body": "Hi Jane, this is a reminder about your estimate appointment tomorrow at 10am.",
  "leadId": "lead-456"
}
```

## Files

### Upload File

**POST** `/files/upload`

Requires authentication.

Multipart form data with `file` field.

Response:
```json
{
  "success": true,
  "data": {
    "id": "file-123",
    "fileName": "kitchen-photo.jpg",
    "fileSize": 2500000,
    "fileUrl": "https://s3.amazonaws.com/...",
    "fileType": "image/jpeg",
    "category": "before",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Delete File

**DELETE** `/files/:id`

Requires authentication.

## Webhooks

### SendGrid Webhook

**POST** `/webhooks/sendgrid`

Receives email delivery events from SendGrid.

### Twilio Webhook

**POST** `/webhooks/twilio/status`

Receives SMS delivery status from Twilio.

### Stripe Webhook

**POST** `/webhooks/stripe`

Receives payment events from Stripe.

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `VALIDATION_ERROR` - Missing or invalid fields
- `UNAUTHORIZED` - Missing or invalid authentication
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `INTERNAL_ERROR` - Server error

## Rate Limiting

- Public endpoints (lead creation, portfolio): 100 requests per hour
- Authenticated endpoints: 1000 requests per hour

## Pagination

List endpoints support pagination with default limit of 10:

```
GET /leads?page=2&limit=20
```

Response includes:
- `data` - Array of items
- `pagination.page` - Current page
- `pagination.pageSize` - Items per page
- `pagination.total` - Total items
- `pagination.totalPages` - Total pages

---

## Examples

### Complete Estimate to Payment Flow

1. **Lead submits estimate request**
   ```bash
   POST /api/leads
   ```

2. **Company staff creates estimate**
   ```bash
   POST /api/estimates
   ```

3. **Estimate is sent to customer**
   ```bash
   POST /api/estimates/:id/send
   ```

4. **Customer approves estimate**
   ```bash
   POST /api/estimates/:id/approve
   ```

5. **Project is created**
   ```bash
   POST /api/projects
   ```

6. **Invoice is created**
   ```bash
   POST /api/invoices
   ```

7. **Invoice is sent to customer**
   ```bash
   POST /api/invoices/:id/send
   ```

8. **Customer payment is recorded**
   ```bash
   POST /api/payments
   ```

---

For more details, see the CLAUDE.md file for development guides and README.md for setup instructions.
