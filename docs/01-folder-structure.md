# 01-Project Folder Structure

This document outlines the organization and purpose of each directory in the project.

## Root Directory Layout
```
/
├── src/                    # Application source code
├── public/                 # Static assets
├── prisma/                # Database configuration
├── automations/           # n8n workflows
├── backup/                # Backup system
└── docs/                  # Documentation
```

## Source Code Organization (/src)
```
src/
├── app/                   # Next.js app router
│   ├── (auth)/           # Authentication routes
│   ├── (marketing)/      # Public pages
│   ├── admin/            # Admin panel
│   └── dashboard/        # User dashboard
├── components/           # UI components
│   ├── admin/           # Admin-specific components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── landing/         # Landing page components
│   ├── pricing/         # Pricing components
│   └── shared/          # Shared components
├── lib/                  # Utility functions
├── hooks/               # Custom React hooks
├── styles/              # Global styles
└── server/              # Server-side code
```

## Component Library Structure (/src/components)
Each component directory follows this pattern:
```
components/[section]/
├── ui/                  # UI components
├── forms/              # Form components
├── layouts/            # Layout components
└── features/           # Feature-specific components
```

## Server-side Organization (/src/server)
```
server/
├── api/                # API endpoints
├── auth/               # Auth configuration
├── db/                 # Database operations
└── stripe/             # Payment integration
```

## Database Structure (/prisma)
```
prisma/
├── schema.prisma       # Database schema
├── migrations/         # Database migrations
└── seeds/             # Seed data
```

## Automation System (/automations)
```
automations/
├── workflows/          # n8n workflow definitions
├── triggers/           # Event triggers
└── actions/           # Custom actions
```

## Backup System (/backup)
```
backup/
├── config/            # Backup configurations
├── scripts/           # Backup scripts
└── storage/           # Storage settings
```

## Documentation (/docs)
```
docs/
├── 01-prerequisites.md     # Setup requirements
├── 02-folder-structure.md  # This file
├── 03-architecture.md      # System architecture
├── 04-authentication.md    # Auth implementation
├── 05-admin-panel.md      # Admin features
└── 06-deployment.md       # Deployment guide
```

## Purpose of Key Directories

### /src/app
- Contains all Next.js pages and routes
- Organized by feature and access level
- Implements app router for improved performance

### /src/components
- Reusable UI components
- Organized by feature area
- Follows atomic design principles

### /src/server
- Server-side logic and API routes
- Database operations
- External service integrations

### /automations
- n8n workflow configurations
- Custom automation scripts
- Integration webhooks

### /backup
- Backup system configuration
- Automated backup scripts
- Storage management

## File Naming Conventions
1. React Components: PascalCase (e.g., UserProfile.tsx)
2. Utilities: camelCase (e.g., formatDate.ts)
3. Constants: UPPER_SNAKE_CASE
4. CSS Modules: kebab-case.module.css
5. Documentation: kebab-case.md

## Import Organization
1. External dependencies
2. Internal components
3. Hooks and utilities
4. Types and interfaces
5. Styles and assets
