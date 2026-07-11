# Construction Platform - Development Guide

## Project Overview

A complete construction company website and business management platform with:
- **Public Website**: Portfolio, services, free estimate form
- **Admin Dashboard**: Lead management, scheduling, estimates, invoices
- **Customer Portal**: Project status, invoices, payments, documents
- **Integrations**: SendGrid, Twilio, Google Calendar, Stripe

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express or NestJS, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: AWS S3 / Supabase Storage
- **Email**: SendGrid
- **SMS**: Twilio
- **Calendar**: Google Calendar API
- **Payments**: Stripe
- **Hosting**: Vercel (frontend), Railway/Render (backend)

## Project Structure

```
/
├── apps/
│   ├── web/                  # Next.js public website + customer portal
│   ├── admin/                # Admin dashboard (Next.js)
│   └── api/                  # Express backend
├── packages/
│   ├── db/                   # Prisma database schema
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Shared utilities
├── .github/                  # GitHub workflows
└── docs/                     # Documentation
```

## MVP Phase 1 (Current)

### Phase 1a: Foundation & Setup
- [ ] Initialize monorepo (pnpm workspaces)
- [ ] Set up database schema (Prisma)
- [ ] Create shared types package
- [ ] Set up environment configuration
- [ ] Create base API structure

### Phase 1b: Public Website
- [ ] Home page with hero
- [ ] Services pages
- [ ] Portfolio gallery
- [ ] Testimonials section
- [ ] About page
- [ ] Contact page
- [ ] Free estimate form
- [ ] Responsive design

### Phase 1c: Admin Core
- [ ] Admin login & authentication
- [ ] Dashboard overview
- [ ] Lead management (CRUD)
- [ ] Lead assignment
- [ ] Lead status tracking
- [ ] Basic calendar view

### Phase 1d: Scheduling
- [ ] Appointment creation
- [ ] Calendar views (day, week, month)
- [ ] Google Calendar sync (one-way)
- [ ] Appointment reminders
- [ ] Appointment confirmation

### Phase 1e: Estimates
- [ ] Estimate builder
- [ ] Estimate templates
- [ ] Line item management
- [ ] PDF generation
- [ ] Email delivery
- [ ] Customer approval flow

### Phase 1f: Invoices
- [ ] Invoice builder
- [ ] Invoice templates
- [ ] PDF generation
- [ ] Email delivery
- [ ] Payment link generation

### Phase 1g: Integrations
- [ ] SendGrid email
- [ ] Twilio SMS
- [ ] Google Calendar
- [ ] Stripe payments
- [ ] Webhook handling

### Phase 1h: Communication
- [ ] Automated confirmation emails
- [ ] Appointment reminders (email + SMS)
- [ ] Estimate sent notifications
- [ ] Invoice payment reminders
- [ ] Message logging

### Phase 1i: Portfolio Manager
- [ ] Portfolio CRUD
- [ ] Project categorization
- [ ] Photo management
- [ ] Before/after galleries
- [ ] Testimonial management

### Phase 1j: Polish & Launch
- [ ] Security review
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Monitoring setup
- [ ] Production deployment

## Development Commands

### Setup
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm db:migrate

# Seed database (optional)
pnpm db:seed
```

### Development
```bash
# Start all services
pnpm dev

# Or start individual services
pnpm dev --filter=web
pnpm dev --filter=admin
pnpm dev --filter=api
```

### Database
```bash
pnpm db:studio      # Prisma Studio
pnpm db:migrate     # Run migrations
pnpm db:generate   # Generate Prisma client
```

### Testing
```bash
pnpm test          # Run all tests
pnpm test:watch    # Watch mode
```

### Build & Deploy
```bash
pnpm build         # Build all apps
pnpm start         # Start production build
```

## Environment Variables

See `.env.example` for required environment variables.

### Key Variables
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Auth token secret
- `SENDGRID_API_KEY` - Email service
- `TWILIO_ACCOUNT_SID` - SMS service
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `STRIPE_SECRET_KEY` - Payments
- `GOOGLE_CLIENT_ID` - Calendar sync
- `GOOGLE_CLIENT_SECRET`
- `S3_BUCKET` / `SUPABASE_STORAGE_URL` - File storage

## Database Schema Overview

### Core Tables
- **users**: Admin, estimators, project managers, crew members
- **roles**: Super Admin, Admin, Estimator, Project Manager, Crew Member, Office Staff, Customer
- **leads**: Prospect information and status
- **customers**: Active customer records
- **projects**: Active or completed projects
- **estimates**: Estimate records with approval flow
- **estimate_line_items**: Line items for estimates
- **invoices**: Invoice records
- **invoice_line_items**: Line items for invoices
- **payments**: Payment records with Stripe integration
- **schedule_events**: Appointments and job schedules
- **messages**: Communication log (email, SMS, internal notes)
- **files**: Document and photo storage references
- **portfolio_projects**: Public gallery projects
- **testimonials**: Customer reviews

## API Endpoints Summary

See `/docs/api.md` for complete API documentation.

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

### Leads
- `GET/POST /api/leads`
- `GET/PATCH/DELETE /api/leads/:id`
- `POST /api/leads/:id/convert-to-customer`

### Estimates
- `GET/POST /api/estimates`
- `GET/PATCH /api/estimates/:id`
- `POST /api/estimates/:id/send`
- `POST /api/estimates/:id/approve`

### Invoices
- `GET/POST /api/invoices`
- `GET/PATCH /api/invoices/:id`
- `POST /api/invoices/:id/send`

### Schedule
- `GET/POST /api/schedule/events`
- `GET/PATCH/DELETE /api/schedule/events/:id`

## Testing Strategy

- **Unit tests**: API endpoints, utilities, helpers
- **Integration tests**: Database operations, workflows
- **E2E tests**: Critical user flows (estimate request → approval → invoice → payment)
- **Mobile testing**: Responsive design validation

## Security Checklist

- [ ] Environment variables not committed
- [ ] API authentication required
- [ ] Role-based permissions enforced
- [ ] HTTPS enforced in production
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS protection
- [ ] CSRF tokens for forms
- [ ] Rate limiting on public endpoints
- [ ] SMS consent tracking
- [ ] Payment data never stored directly

## Deployment Pipeline

1. **Staging**: Deploy to staging on PR
2. **Testing**: Run E2E tests in staging
3. **Production**: Merge to main triggers production deploy
4. **Monitoring**: CloudWatch/Sentry error tracking
5. **Backups**: Daily database backups

## Key Features by Phase

### Phase 1 Complete: MVP Ready
1. ✅ Professional website with portfolio
2. ✅ Free estimate request form
3. ✅ Automated lead notifications
4. ✅ Admin dashboard with lead tracking
5. ✅ Appointment scheduling with Google Calendar
6. ✅ Estimate creation & approval
7. ✅ Invoice creation & payment
8. ✅ Automated email & SMS reminders

### Future Phases
- Phase 2: Customer portal, advanced scheduling
- Phase 3: AI estimate assistance, reporting
- Phase 4: Mobile app, integrations (QuickBooks)
- Phase 5: Advanced crew scheduling, job tracking

## Development Notes

- Use TypeScript throughout for type safety
- Follow component-driven development
- Implement responsive design from the start
- Use database transactions for critical workflows
- Log all integrations for debugging
- Test payment flows with Stripe test keys
- Use Twilio sandboxed phone number for SMS testing

## Useful Links

- [Next.js Docs](https://nextjs.org)
- [Prisma Docs](https://www.prisma.io)
- [SendGrid API](https://sendgrid.com/docs)
- [Twilio Docs](https://www.twilio.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Google Calendar API](https://developers.google.com/calendar)
