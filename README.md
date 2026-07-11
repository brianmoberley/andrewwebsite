# Construction Platform - MVP

A complete construction company website and business management platform.

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your actual values

# Set up database
pnpm db:migrate
pnpm db:generate

# Optional: Seed database
pnpm db:seed
```

### Development

Start all services:

```bash
pnpm dev
```

Services will run on:
- **Public Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3002
- **API Server**: http://localhost:3001

### Individual Services

```bash
# Web app only
pnpm dev --filter=@construction/web

# Admin app only
pnpm dev --filter=@construction/admin

# API only
pnpm dev --filter=@construction/api
```

## Project Structure

```
├── apps/
│   ├── web/          # Public website + customer portal (Next.js)
│   ├── admin/        # Admin dashboard (Next.js)
│   └── api/          # Backend API (Express + TypeScript)
├── packages/
│   ├── db/           # Prisma database setup
│   ├── types/        # Shared TypeScript types
│   └── utils/        # Shared utilities
├── docs/             # Documentation
└── .env.example      # Environment variables template
```

## Key Features (MVP)

### Public Website
- ✅ Home page with hero section
- ✅ Services overview
- ✅ Portfolio gallery
- ✅ Testimonials section
- ✅ About page
- ✅ Contact page
- ✅ Free estimate request form
- ✅ Responsive mobile design

### Admin Dashboard
- ✅ Login/authentication
- ✅ Dashboard with KPIs
- ✅ Lead management (CRUD)
- ✅ Lead assignment
- ✅ Lead status tracking
- ✅ Customer list
- ✅ Estimate builder
- ✅ Invoice builder
- ✅ Calendar view (basic)
- ✅ Portfolio manager
- ✅ Basic reporting

### API
- ✅ Authentication endpoints
- ✅ Lead management endpoints
- ✅ Customer management endpoints
- ✅ Estimate endpoints
- ✅ Invoice endpoints
- ✅ Project endpoints
- ✅ Schedule/Calendar endpoints
- ✅ File upload endpoints
- ✅ Portfolio endpoints
- ✅ Message logging
- ✅ Webhook endpoints

### Integrations (Placeholder)
- 📋 SendGrid email (ready for implementation)
- 📱 Twilio SMS (ready for implementation)
- 📅 Google Calendar (ready for implementation)
- 💳 Stripe payments (ready for implementation)
- ☁️ AWS S3 file storage (ready for implementation)

## API Documentation

### Authentication

**Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    }
  }
}
```

### Create a Lead

```bash
POST /api/leads
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "address": {
    "line1": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701"
  },
  "projectType": "Kitchen Remodel",
  "projectDescription": "Looking to update our kitchen...",
  "leadSource": "website_form",
  "preferredContact": "email",
  "emailConsent": true,
  "smsConsent": false
}
```

See `/docs/api.md` for complete API documentation.

## Database Schema

The database includes tables for:
- Users (with roles)
- Leads & Customers
- Projects
- Estimates & Invoice Line Items
- Invoices & Invoice Line Items
- Payments
- Schedule Events
- Messages (communication log)
- Files & Media
- Portfolio Projects
- Testimonials
- Audit Logs

See `packages/db/prisma/schema.prisma` for complete schema.

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make your changes**
   - Keep changes focused on a single feature
   - Follow the existing code style

3. **Test locally**
   ```bash
   pnpm test
   pnpm build
   ```

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/feature-name
   ```

## Environment Variables

See `.env.example` for required environment variables. Key variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `SENDGRID_API_KEY` - SendGrid API key for emails
- `TWILIO_ACCOUNT_SID` - Twilio account SID for SMS
- `STRIPE_SECRET_KEY` - Stripe API key for payments
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google Calendar integration
- `S3_BUCKET` or `SUPABASE_STORAGE_URL` - File storage

## Next Steps

### Phase 2 (After MVP)
- [ ] Customer portal with project tracking
- [ ] Advanced project scheduling
- [ ] Two-way Google Calendar sync
- [ ] PDF generation for estimates/invoices
- [ ] Email templates configuration
- [ ] SMS templates configuration
- [ ] Payment processing with Stripe
- [ ] Advanced reporting and analytics

### Phase 3
- [ ] Mobile app (React Native)
- [ ] QuickBooks integration
- [ ] AI-powered estimate assistant
- [ ] Automated lead follow-up sequences
- [ ] Review generation workflow

## Troubleshooting

### Database Issues

```bash
# Reset database (⚠️ deletes all data)
pnpm db:migrate reset

# Check database connection
pnpm db:studio
```

### Port Already in Use

```bash
# Find and kill process using port
lsof -i :3000
kill -9 <PID>

# Or change port in package.json scripts
```

### Build Errors

```bash
# Clear dependencies and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Next.js cache
rm -rf apps/web/.next apps/admin/.next
```

## Contributing

1. Follow the project structure
2. Use TypeScript throughout
3. Keep components small and reusable
4. Add comments only for non-obvious logic
5. Test critical flows before committing

## License

Copyright 2024. All rights reserved.

## Support

For questions or issues, contact the development team.
