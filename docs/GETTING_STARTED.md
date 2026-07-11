# Getting Started with Construction Platform

## Prerequisites

- **Node.js** 18 or higher
- **PostgreSQL** 14 or higher
- **pnpm** (or npm/yarn if preferred)
- **Git**

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/brianmoberley/andrewwebsite.git
cd andrewwebsite
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This installs dependencies for all packages and apps in the monorepo.

### Step 3: Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/construction_platform"

# Auth
JWT_SECRET="your-super-secret-key-min-32-chars"

# SendGrid (optional for MVP)
SENDGRID_API_KEY="your-key"
SENDGRID_FROM_EMAIL="noreply@yourcompany.com"

# Twilio (optional for MVP)
TWILIO_ACCOUNT_SID="your-sid"
TWILIO_AUTH_TOKEN="your-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Stripe (optional for MVP)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Google Calendar (optional for MVP)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-secret"

# File Storage
S3_BUCKET="construction-platform"
S3_REGION="us-east-1"
S3_ACCESS_KEY_ID="your-key"
S3_SECRET_ACCESS_KEY="your-secret"

# App URLs
API_BASE_URL="http://localhost:3001"
WEB_BASE_URL="http://localhost:3000"
ADMIN_BASE_URL="http://localhost:3002"

# Environment
NODE_ENV="development"
```

### Step 4: Set Up Database

Create a PostgreSQL database:

```bash
createdb construction_platform
```

Run migrations:

```bash
pnpm db:migrate
```

Generate Prisma client:

```bash
pnpm db:generate
```

Optional: Seed the database with demo data:

```bash
pnpm db:seed
```

### Step 5: Start Development

Start all three services:

```bash
pnpm dev
```

Or start individual services:

```bash
# Terminal 1: API Server
pnpm dev --filter=@construction/api

# Terminal 2: Public Website
pnpm dev --filter=@construction/web

# Terminal 3: Admin Dashboard
pnpm dev --filter=@construction/admin
```

Services will be running at:
- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3002
- **API**: http://localhost:3001

## First Steps

### 1. Create an Admin User

You need to manually add a super_admin user to the database. First, ensure the roles exist:

```bash
pnpm db:studio
```

Then create a user through the database studio or via SQL:

```sql
-- Create admin role
INSERT INTO roles (id, name, description, permissions)
VALUES ('role-admin', 'admin', 'Administrator', '["*"]');

-- Create user
INSERT INTO users (id, email, password, firstName, lastName, roleId, status)
VALUES (
  'user-admin',
  'admin@example.com',
  '$2a$10$...', -- bcrypt hash of your password
  'Admin',
  'User',
  'role-admin',
  'active'
);
```

Or use the API to register:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPassword123",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

### 2. Test the Public Website

Visit http://localhost:3000 and test:
- Navigation menu
- Hero section with CTA buttons
- Services overview cards
- Featured projects gallery
- Testimonials section
- Footer

### 3. Test the Free Estimate Form

1. Click "Get Free Estimate" or "Free Estimate Request"
2. Fill in the form with test data
3. Submit the form
4. Check your terminal for the API response

### 4. Access the Admin Dashboard

Visit http://localhost:3002

For now, it's a shell showing basic navigation and placeholder pages for:
- Dashboard (KPI cards)
- Leads management
- Estimates builder
- Invoices
- Calendar
- Portfolio manager

### 5. Test the API

Use curl or Postman to test endpoints:

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPassword123"
  }'

# Get current user (replace TOKEN with your actual token)
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# Create a test lead
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "address": {
      "line1": "123 Main St",
      "city": "Springfield",
      "state": "IL",
      "zipCode": "62701"
    },
    "projectType": "Kitchen Remodel",
    "leadSource": "website_form",
    "preferredContact": "email",
    "emailConsent": true,
    "smsConsent": false
  }'
```

See [API.md](./API.md) for complete API documentation.

## Development Tips

### Database Changes

If you modify the Prisma schema:

```bash
# Create migration
pnpm db:migrate dev --name add_new_feature

# Or deploy existing migrations
pnpm db:migrate

# Regenerate Prisma client
pnpm db:generate

# View database in Studio
pnpm db:studio
```

### TypeScript

The project uses strict TypeScript. Type errors prevent builds:

```bash
# Check for type errors
pnpm type-check

# Or on individual packages
pnpm --filter=@construction/api type-check
```

### Linting

```bash
# Lint all code
pnpm lint

# Fix linting errors
pnpm lint -- --fix
```

### Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

## Project Structure

```
├── apps/
│   ├── web/              # Public website & customer portal (Next.js)
│   ├── admin/            # Admin dashboard (Next.js)
│   └── api/              # Backend API (Express + TypeScript)
├── packages/
│   ├── db/               # Prisma database schema & setup
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utilities
├── docs/                 # Documentation
├── .env.example          # Environment template
└── package.json          # Root package.json (pnpm workspaces)
```

## Next Steps

### Immediate (This Sprint)

1. ✅ Set up development environment
2. ✅ Initialize database
3. ✅ Create test users
4. □ Test all API endpoints
5. □ Implement lead creation flow end-to-end
6. □ Set up SendGrid integration
7. □ Implement appointment scheduling

### Short Term (Next Sprint)

- [ ] Implement estimate builder UI
- [ ] Add estimate PDF generation
- [ ] Implement estimate approval workflow
- [ ] Build invoice builder
- [ ] Add payment processing with Stripe
- [ ] Implement Google Calendar sync

### Medium Term

- [ ] Build complete admin dashboard UI
- [ ] Implement customer portal
- [ ] Add advanced reporting
- [ ] Performance optimization
- [ ] Security hardening

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql --version

# Test connection
psql postgresql://user:password@localhost:5432/construction_platform

# Reset database (⚠️ deletes all data)
dropdb construction_platform
createdb construction_platform
pnpm db:migrate
```

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Next.js cache
rm -rf apps/web/.next apps/admin/.next
```

### TypeScript Errors

```bash
# Regenerate Prisma types
pnpm db:generate

# Check for type errors
pnpm type-check

# In VS Code: Restart TypeScript server (Cmd/Ctrl + Shift + P)
```

## Useful Commands

```bash
# Development
pnpm dev                          # Start all services
pnpm dev --filter=@construction/web  # Single service

# Database
pnpm db:migrate                   # Run migrations
pnpm db:generate                  # Generate Prisma client
pnpm db:studio                    # Open Prisma Studio
pnpm db:seed                      # Seed with demo data

# Building
pnpm build                        # Build all apps
pnpm --filter=@construction/web build  # Single app

# Testing & Quality
pnpm type-check                   # Check TypeScript
pnpm lint                         # Lint all code
pnpm test                         # Run tests
pnpm test:watch                   # Watch mode

# Maintenance
pnpm install                      # Install dependencies
pnpm update                       # Update packages
```

## Getting Help

- **Documentation**: See `/docs` folder
- **API Documentation**: See [API.md](./API.md)
- **Development Guide**: See [CLAUDE.md](../CLAUDE.md)
- **README**: See [README.md](../README.md)

## Common Issues

**"Cannot find module '@construction/db'"**
- Run `pnpm install` in root directory
- Make sure all workspace packages are installed

**"Prisma error: Cannot find engine"**
- Run `pnpm db:generate` to regenerate Prisma client

**"React imports not found in admin/web apps"**
- Run `pnpm install` again
- Clear node_modules: `rm -rf node_modules && pnpm install`

**Database won't connect**
- Check PostgreSQL is running: `psql --version`
- Verify DATABASE_URL in .env.local
- Test connection: `psql $DATABASE_URL`

---

**Questions?** Check the docs or reach out to the development team.
