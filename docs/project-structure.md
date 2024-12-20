# Web Application Project Structure

## Overview
A modern web application built with Next.js and React, featuring user authentication, admin panel, subscription management, automated workflows with n8n, and robust backup systems.

## Tech Stack
- **Frontend**: 
  - Next.js 14
  - React 18
  - TypeScript
- **UI Libraries**: 
  - Tamagui UI
  - Shadcn/UI
- **Authentication**: STACK Auth
- **Database**: Supabase Postgres with Prisma
- **Payment Processing**: Stripe
- **Automation**: n8n
- **Backup**: Automated backup system with versioning

## Project Structure
```
/project-root
├── src/
│   ├── app/                     # Next.js 14 app directory
│   │   ├── api/                # API routes
│   │   │   ├── auth/          # Auth endpoints
│   │   │   ├── stripe/        # Payment endpoints
│   │   │   └── webhooks/      # n8n and other webhooks
│   │   ├── (auth)/            # Auth routes
│   │   │   ├── signin/       # Sign in page
│   │   │   └── register/     # Registration page
│   │   ├── dashboard/         # User dashboard
│   │   └── admin/            # Admin section
│   ├── components/            # React components
│   │   ├── ui/               # UI components (Tamagui & Shadcn)
│   │   ├── auth/             # Authentication components
│   │   ├── dashboard/        # Dashboard components
│   │   └── admin/           # Admin panel components
│   ├── lib/                  # Utility functions
│   │   ├── auth.ts         # Auth utilities
│   │   └── api/            # API utilities
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React context providers
│   ├── styles/              # Global styles
│   └── types/              # TypeScript types
├── prisma/                 # Prisma configuration
├── public/                # Static assets
├── automation/            # Automation configurations
│   ├── n8n/              # n8n workflow files
│   │   ├── workflows/    # n8n workflow definitions
│   │   ├── credentials/  # n8n credentials (gitignored)
│   │   └── custom/       # Custom n8n nodes
│   └── scripts/          # Automation scripts
├── backup/               # Backup system
│   ├── config/          # Backup configuration
│   ├── scripts/         # Backup scripts
│   │   ├── daily/      # Daily backup scripts
│   │   └── weekly/     # Weekly backup scripts
│   └── storage/         # Local backup storage
│       ├── database/    # Database backups
│       ├── files/       # File backups
│       └── logs/        # Backup logs
├── config/              # Configuration files
├── scripts/            # Build and deployment scripts
└── tests/             # Test files

## Automation System (n8n)

### Workflow Categories
```
/automation/n8n/workflows/
├── user/                 # User-related workflows
│   ├── onboarding.json  # User onboarding automation
│   └── cleanup.json     # User cleanup processes
├── backup/              # Backup workflows
│   ├── daily.json      # Daily backup workflow
│   └── weekly.json     # Weekly backup workflow
├── monitoring/          # System monitoring
│   ├── health.json     # Health check workflow
│   └── alerts.json     # Alert notification workflow
└── integration/        # Third-party integrations
    ├── stripe/        # Stripe automation
    └── email/         # Email automation

## Backup System

### Backup Types
1. **Database Backups**
   - Full daily backups
   - Incremental hourly backups
   - Point-in-time recovery

2. **File Backups**
   - User uploads
   - System configurations
   - Workflow definitions

3. **Configuration Backups**
   - Environment variables
   - n8n workflows
   - System settings

### Backup Schedule
```
/backup/scripts/
├── daily/
│   ├── database-backup.sh
│   ├── file-backup.sh
│   └── config-backup.sh
└── weekly/
    ├── full-backup.sh
    └── cleanup.sh

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Updates Table
```sql
CREATE TABLE updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Key Features

### Authentication
- Email/Password login
- Social authentication
- Password reset
- Session management

### User Dashboard
- Profile management
- Subscription status
- Updates timeline
- Account settings

### Admin Panel
- User management
- Subscription management
- Update management
- Analytics dashboard

### Pricing System
- Multiple subscription tiers
- Payment processing
- Subscription management
- Invoice generation

## Environment Variables
```env
# App
GATSBY_PUBLIC_URL=http://localhost:8000

# Authentication
STACK_AUTH_SECRET=your_auth_secret
STACK_AUTH_PUBLIC_KEY=your_public_key

# Database
DATABASE_URL=your_database_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Development Setup

### Prerequisites
- Bun installed
- Node.js 18+
- Supabase CLI
- Stripe CLI

### Installation Steps
1. Clone repository
2. Install dependencies
3. Set up environment variables
4. Initialize database
5. Start development server

## Deployment
- CI/CD pipeline configuration
- Production environment setup
- Database migration process
- SSL certificate setup

## Security Considerations
- Authentication best practices
- Data encryption
- API security
- Rate limiting

---

*Last Updated: 2024-12-19*
