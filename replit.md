# Taqwa Tours and Travels

## Overview

Taqwa Tours and Travels is a Bengali-language travel agency landing page focused on Hajj, Umrah, world tour packages, and student consultancy services. The application is built as a modern single-page application with a React frontend and Express backend, designed to capture customer leads through an inquiry form.

**Core Purpose:** Provide a professional, culturally appropriate landing page for a travel agency serving Bengali-speaking customers, with lead capture functionality that stores submissions in Excel format.

**Key Features:**
- Bengali-optimized UI with Noto Sans Bengali typography
- Service showcase (Hajj/Umrah, World Tours, Student Consultancy)
- Customer inquiry form with validation
- Lead storage in Excel files
- Responsive design with mobile-first approach
- Islamic travel aesthetics combined with modern web design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React 18 with TypeScript using Vite as the build tool

**UI Component Library:** shadcn/ui (Radix UI primitives) with Tailwind CSS
- Uses "new-york" style variant
- Custom color scheme with primary green (#10b981 - Islamic green theme) and secondary yellow
- Extensive component library including forms, dialogs, cards, carousels, and more

**Routing:** Wouter (lightweight client-side routing)
- Currently implements a simple two-route structure (Home, Not Found)

**State Management:**
- React Hook Form for form state with Zod validation
- TanStack Query (React Query) for server state management
- No global state management library (Redux/Zustand) - uses React Context where needed

**Styling Approach:**
- Tailwind CSS with custom configuration
- Bengali-optimized typography (Noto Sans Bengali font)
- Responsive design using Tailwind breakpoints (mobile-first)
- Custom CSS variables for theming in index.css

**Design Philosophy:**
- Reference-based design inspired by Booking.com and Airbnb
- Cultural appropriateness for Islamic travel services
- Spacing system using Tailwind's standardized units (4, 6, 8, 12, 16, 20, 24)

### Backend Architecture

**Runtime:** Node.js with Express.js framework

**Language:** TypeScript with ES modules

**API Structure:**
- RESTful API design
- Single primary endpoint: `POST /api/submit-form` for lead submission
- JSON-based request/response format

**Development Server:**
- Vite middleware integration for HMR (Hot Module Replacement)
- Custom logging middleware for API requests
- Request body parsing with JSON and URL-encoded support

**Data Storage Strategy:**
- **Primary Storage:** Excel files (XLSX format) using the `xlsx` library
- **Fallback:** In-memory storage using Map data structure (MemStorage class)
- Lead data stored in `data/leads.xlsx` with automatic file initialization
- No database currently connected (Drizzle ORM configured but not actively used)

**Rationale for Excel Storage:**
- Simplicity for small-scale lead management
- Easy export and sharing with non-technical stakeholders
- No database infrastructure required for MVP
- Direct Excel compatibility for business workflows

**Alternative Considered:** PostgreSQL with Drizzle ORM
- Configuration exists (`drizzle.config.ts`, schema defined)
- Would provide better scalability and query capabilities
- Currently not implemented to reduce deployment complexity

### Data Model

**Customer Lead Schema:**
```typescript
{
  id: string (UUID)
  name: string (required)
  phone: string (required, min 10 chars)
  serviceType: string (required)
  travelDate: string (optional)
  passportStatus: string (optional)
  message: string (optional)
  createdAt: timestamp
}
```

**Validation:** Zod schema with Bengali error messages
- Name and service type required
- Phone number minimum length validation
- Form-level validation using React Hook Form resolver

### Build and Deployment

**Build Process:**
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Single production command starts the bundled server

**Development Mode:**
- tsx for TypeScript execution
- Vite dev server with HMR
- Concurrent frontend and backend development

## External Dependencies

### Core Frontend Libraries
- **React 18:** UI framework
- **Wouter:** Lightweight routing (~1KB vs React Router)
- **TanStack Query v5:** Server state management and caching
- **React Hook Form:** Form state and validation
- **Zod:** Schema validation

### UI Component Libraries
- **Radix UI:** Headless UI primitives (accordion, dialog, dropdown, select, etc.)
- **shadcn/ui:** Pre-built component templates
- **Tailwind CSS:** Utility-first CSS framework
- **class-variance-authority:** CSS variant management
- **clsx & tailwind-merge:** Class name utilities
- **Lucide React:** Icon library
- **React Icons:** Additional icons (SiFacebook, SiWhatsapp)

### Backend Libraries
- **Express.js:** Web server framework
- **xlsx:** Excel file reading/writing
- **Drizzle ORM:** SQL ORM (configured for PostgreSQL via Neon)
- **@neondatabase/serverless:** Serverless PostgreSQL driver
- **connect-pg-simple:** PostgreSQL session store (not actively used)

### Build Tools
- **Vite:** Frontend build tool and dev server
- **esbuild:** Backend bundler
- **TypeScript:** Type safety
- **tsx:** TypeScript execution for development
- **PostCSS & Autoprefixer:** CSS processing

### Database (Configured but Not Active)
- **PostgreSQL:** Via Neon serverless platform
- **Drizzle Kit:** Database migration tool
- Connection string expected in `DATABASE_URL` environment variable

**Note:** While Drizzle ORM and PostgreSQL are configured, the application currently uses Excel file storage for simplicity. The database infrastructure can be activated by provisioning a PostgreSQL database and running migrations.

### Third-Party Services (Implicit)
- **Google Fonts:** Noto Sans Bengali font family
- **WhatsApp & Facebook Messenger:** Contact integration (links only, no API)