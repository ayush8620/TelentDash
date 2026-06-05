# TalentDash — Career Intelligence Platform

A production-grade compensation intelligence platform built with Next.js 15, TypeScript, Tailwind CSS, and PostgreSQL (Prisma ORM). Static-first architecture optimized for SEO, performance, and ultra-low infrastructure cost.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

---

## Quick Start (< 5 minutes)

### Prerequisites
- Node.js 18+
- npm
- PostgreSQL database (or [Neon](https://neon.tech) free tier)

### 1. Clone & Install

```bash
git clone <repo-url>
cd talentdash
npm install
```

### 2. Environment Variables

Create `.env` in the project root:

```env
# Required: PostgreSQL connection string
# For Neon: postgresql://user:password@host/dbname?sslmode=require
# For local: postgresql://localhost:5432/talentdash
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed the database with 60+ records
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Without Database (Mock Data Mode)

The frontend pages work without a database using mock data in `lib/mock-data.ts`. Simply:

```bash
npm install
npm run dev
```

The salary table, company pages, and compare page will use 57 embedded salary records.

---

## Architecture Overview

```
User → CDN → Static HTML → Done
NOT: User → Server → DB → SSR → Response
```

### Rendering Strategy

| Page | Strategy | Reason |
|------|----------|--------|
| `/salaries` | SSG (Static) | Core SEO asset. Data embedded at build time. |
| `/companies/[slug]` | SSG via `generateStaticParams()` | Pre-generates per-company pages. Changes rarely. |
| `/compare` | Client Component | Interactive selection UI. Cannot be pre-built. |
| API Routes | Dynamic | Serve external consumers, ingest pipeline. |

### Folder Structure

```
talentdash/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts              # 60+ record seed script
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (Inter font, nav, footer)
│   │   ├── page.tsx         # Homepage → /salaries redirect
│   │   ├── salaries/        # Salary table page
│   │   ├── companies/[slug] # Company profile pages
│   │   ├── compare/         # Side-by-side comparison
│   │   └── api/             # REST API endpoints
│   ├── components/
│   │   ├── ui/              # Primitive components (Badge, Button, Input...)
│   │   └── features/        # Product components (SalaryTable, FilterBar...)
│   ├── lib/
│   │   ├── mock-data.ts     # 57 embedded salary records
│   │   ├── company-data.ts  # Company metadata
│   │   ├── db.ts            # Prisma client singleton
│   │   ├── constants.ts     # Config values
│   │   └── utils/           # Formatting, filtering, sorting, pagination, SEO
│   ├── types/               # TypeScript interfaces
│   └── config/              # Site configuration
```

---

## Features

### Salary Table (`/salaries`)
- **Filterable**: Company search (debounced 300ms), role dropdown, level multi-select, location dropdown
- **Currency toggle**: INR ↔ USD with consistent conversion rate (₹83.5 = $1)
- **Sortable columns**: Click any column header to sort asc/desc
- **Pagination**: 25 records per page with "Showing X–Y of Z" display
- **URL-synced filters**: `/salaries?company=google&level=L4,L5&location=Bengaluru` — shareable
- **Empty state**: "No records found" with clear filters CTA
- **Indian number formatting**: ₹42,00,000 (lakh/crore system)

### Company Profile (`/companies/[slug]`)
- **Static generation**: `generateStaticParams()` pre-builds all company pages
- **Computed stats**: Median TC (true statistical median), min/max range, record count
- **Level distribution**: Horizontal stacked bar chart with tooltips
- **Compare CTA**: Links to `/compare?c1={slug}`
- **404 handling**: Invalid slugs return proper 404

### Compare (`/compare`)
- **Side-by-side**: Select any two salary records
- **Delta calculations**: +₹4,00,000 (green) / -₹2,00,000 (red)
- **Winner badge**: "Higher TC" chip on the winning record
- **URL state**: `/compare?s1=id&s2=id` — shareable comparisons

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ingest-salary` | Ingest new salary records with validation |
| `GET` | `/api/salaries` | Query salaries with filters, sort, pagination |
| `GET` | `/api/companies/[slug]` | Company data with computed stats |
| `GET` | `/api/compare?s1=&s2=` | Compare two salary records |

### SEO
- Dynamic `<title>` and `<meta description>` per page
- Canonical URLs
- Open Graph tags
- JSON-LD structured data (schema.org/Dataset, schema.org/Organization)
- Semantic HTML5 with proper heading hierarchy

---

## API Documentation

### POST /api/ingest-salary

```bash
curl -X POST http://localhost:3000/api/ingest-salary \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Google India",
    "role": "Software Engineer",
    "level": "L4",
    "location": "Bengaluru",
    "currency": "INR",
    "experience_years": 5,
    "base_salary": 2800000,
    "bonus": 400000,
    "stock": 1200000,
    "confidence_score": 0.85
  }'
```

**Validation**: Per-field errors (400), duplicate detection (409), TC always recomputed.

### GET /api/salaries

```bash
# All filters
GET /api/salaries?company=google&role=Software+Engineer&level=L4&location=Bengaluru&currency=INR&sort=total_comp_desc&page=1&limit=25

# Limit capped at 100
GET /api/salaries?limit=10000  →  returns meta.limit = 100
```

### GET /api/companies/:slug

```bash
GET /api/companies/google
# Returns: company metadata, salary list, median_total_compensation, level_distribution
# 404 for unknown slugs
```

### GET /api/compare

```bash
GET /api/compare?s1=uuid1&s2=uuid2
# Returns: both records + delta object
# 400 if s1 === s2
# 404 if either not found
```

---

## Architecture Decisions

### Why SSG for `/salaries`?
The salary table is the primary SEO page. Static HTML served from CDN edge delivers LCP < 2s. Filters run client-side on the embedded dataset — no API call needed for the initial load.

### Why page-based pagination (not cursor-based)?
Page numbers are SEO-friendly (can be indexed), simpler for users ("page 3 of 12"), and sufficient at MVP scale. Cursor-based pagination would be better at 100K+ rows but adds complexity without benefit at current scale.

### Why BigInt for salary fields?
Avoids floating-point precision issues. ₹42,00,000 stored as `4200000` (full rupees). The display layer handles formatting. BigInt also supports the paise/cents representation if needed later.

### Why separate Company model?
Enables company page generation, name normalization ("google", "Google India", "GOOGLE" → same record), and deduplication. A string field on Salary would make aggregation unreliable.

### Cache-Control TTLs
- `GET /api/salaries`: `s-maxage=300, stale-while-revalidate=3600` — salary data updates with submissions but isn't real-time critical. 5-min fresh + 1-hour stale.
- `GET /api/companies/:slug`: `s-maxage=3600, stale-while-revalidate=86400` — company data changes rarely. 1-hour fresh + 24-hour stale.

### What I would build with another day
1. Full-text search with PostgreSQL `tsvector` on company + role
2. ISR revalidation triggers after POST /api/ingest-salary
3. Salary submission form for contributors
4. Company comparison page (`/compare/google-vs-amazon`)
5. Lighthouse CI integration for automated performance regression testing

---

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes (for API/seed) | PostgreSQL connection string | `postgresql://user:pass@host/db` |

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 (App Router) | RSC + SSG + ISR |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS | Utility-first, minimal bundle |
| Database | PostgreSQL (Neon) | Structured relational data |
| ORM | Prisma | Type-safe queries, migration history |
| Components | Custom Tailwind only | No ShadCN, MUI, Radix |

---

## Design System

| Element | Value | Usage |
|---------|-------|-------|
| Primary Accent | `#FF5A5F` | CTAs, active states |
| Deep Text | `#222222` | Headings, primary content |
| Body Text | `#484848` | Paragraphs, metadata |
| Muted | `#717171` | Secondary labels |
| Background | `#F7F7F7` | App background |
| Border | `#EBEBEB` | Dividers, card outlines |
| Data Blue | `#0369A1` | Total Comp highlight |
| Success | `#008A05` | Positive deltas |
| Error | `#D93025` | Negative deltas |

Typography: Inter (Google Fonts), H1=36px/700, H2=28px/700, H3=22px/600, Body=16px/400

---

## Edge Cases Handled

- ✅ All filter combinations work together (company + role + level + location + currency)
- ✅ Empty results state with clear filters CTA
- ✅ Single-record company (level distribution bar = 100% one level)
- ✅ Records with bonus=0 and stock=0 (shows "—", TC = base exactly)
- ✅ Very long company name (Tata Consultancy Services — 30+ chars)
- ✅ Very large salary (₹4,00,00,000 — formatted correctly in Indian system)
- ✅ Invalid company slug → 404
- ✅ POST with negative base_salary → 400
- ✅ POST with invalid level → 400
- ✅ POST with pre-filled incorrect total_compensation → recomputed
- ✅ GET /api/salaries?limit=10000 → capped at 100
- ✅ GET /api/compare?s1=id&s2=same_id → 400
- ✅ Duplicate ingest within 48h (base within 10%) → 409

---

## Performance

- **LCP target**: < 2 seconds (static HTML from CDN)
- **CLS target**: < 0.1 (reserved layout space, no layout shift)
- **JS bundle**: Minimal — salary table is a server component, only filter bar and compare page hydrate
- **Font**: Inter loaded via `next/font/google` with `display: swap`

---

## License

Private — Confidential. Do not distribute.
