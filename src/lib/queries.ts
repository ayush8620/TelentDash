/**
 * Data Access Layer — Server-side only.
 * Queries PostgreSQL via Prisma and maps results to frontend types.
 * Replaces mock-data.ts for all page data fetching.
 */
import { prisma } from '@/lib/db';
import type { SalaryRecord, CompanyProfile, LevelStandardized, Currency } from '@/types';

// ═══════════════════════════════════════════════════════════════
// LEVEL MAPPING: Prisma enum ↔ Frontend display
// ═══════════════════════════════════════════════════════════════

const PRISMA_TO_DISPLAY_LEVEL: Record<string, LevelStandardized> = {
  L3: 'L3',
  L4: 'L4',
  L5: 'L5',
  L6: 'L6',
  SDE_I: 'SDE-I',
  SDE_II: 'SDE-II',
  SDE_III: 'SDE-III',
  STAFF: 'Staff',
  PRINCIPAL: 'Principal',
  IC4: 'L4',
  IC5: 'L5',
};

// ═══════════════════════════════════════════════════════════════
// SERIALIZERS: Prisma row → Frontend interface
// ═══════════════════════════════════════════════════════════════

interface PrismaSalaryWithCompany {
  id: string;
  role: string;
  level: string;
  location: string;
  currency: string;
  experience_years: number;
  base_salary: bigint;
  bonus: bigint;
  stock: bigint;
  total_compensation: bigint;
  confidence_score: unknown; // Decimal
  is_verified: boolean;
  company: {
    name: string;
    slug: string;
  };
}

function serializeSalary(row: PrismaSalaryWithCompany): SalaryRecord {
  return {
    id: row.id,
    company: row.company.name,
    company_slug: row.company.slug,
    role: row.role,
    level_standardized: PRISMA_TO_DISPLAY_LEVEL[row.level] || (row.level as LevelStandardized),
    location: row.location,
    currency: row.currency as Currency,
    experience_years: row.experience_years,
    base_salary: Number(row.base_salary),
    bonus: Number(row.bonus),
    stock: Number(row.stock),
    total_compensation: Number(row.total_compensation),
    confidence_score: Number(row.confidence_score),
    is_verified: row.is_verified,
  };
}

interface PrismaCompany {
  name: string;
  slug: string;
  industry: string | null;
  headquarters: string | null;
  founded_year: number | null;
  headcount_range: string | null;
}

function serializeCompany(row: PrismaCompany): CompanyProfile {
  return {
    name: row.name,
    slug: row.slug,
    industry: row.industry || 'Technology',
    headquarters: row.headquarters || '',
    founded_year: row.founded_year,
    headcount_range: row.headcount_range || '',
  };
}

// ═══════════════════════════════════════════════════════════════
// QUERY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Fetch ALL salary records (with company relation).
 * Used by /salaries page and /compare page.
 */
export async function getAllSalaryRecords(): Promise<SalaryRecord[]> {
  const rows = await prisma.salary.findMany({
    include: { company: true },
    orderBy: { total_compensation: 'desc' },
  });
  return rows.map(serializeSalary);
}

/**
 * Fetch salary records for a specific company by slug.
 */
export async function getSalaryRecordsByCompanySlug(slug: string): Promise<SalaryRecord[]> {
  const rows = await prisma.salary.findMany({
    where: { company: { slug } },
    include: { company: true },
    orderBy: { total_compensation: 'desc' },
  });
  return rows.map(serializeSalary);
}

/**
 * Fetch a single salary record by ID.
 */
export async function getSalaryRecordById(id: string): Promise<SalaryRecord | null> {
  const row = await prisma.salary.findUnique({
    where: { id },
    include: { company: true },
  });
  if (!row) return null;
  return serializeSalary(row);
}

/**
 * Get all unique roles from the database.
 */
export async function getAllRoles(): Promise<string[]> {
  const roles = await prisma.salary.findMany({
    select: { role: true },
    distinct: ['role'],
    orderBy: { role: 'asc' },
  });
  return roles.map((r) => r.role);
}

/**
 * Get all unique locations from the database.
 */
export async function getAllLocations(): Promise<string[]> {
  const locations = await prisma.salary.findMany({
    select: { location: true },
    distinct: ['location'],
    orderBy: { location: 'asc' },
  });
  return locations.map((l) => l.location);
}

/**
 * Get all company slugs (for generateStaticParams).
 */
export async function getAllCompanySlugs(): Promise<string[]> {
  const companies = await prisma.company.findMany({
    select: { slug: true },
    orderBy: { name: 'asc' },
  });
  return companies.map((c) => c.slug);
}

/**
 * Get company profile by slug.
 */
export async function getCompanyProfile(slug: string): Promise<CompanyProfile | null> {
  const company = await prisma.company.findUnique({
    where: { slug },
  });
  if (!company) return null;
  return serializeCompany(company);
}

/**
 * Get all company profiles.
 */
export async function getAllCompanyProfiles(): Promise<CompanyProfile[]> {
  const companies = await prisma.company.findMany({
    orderBy: { name: 'asc' },
  });
  return companies.map(serializeCompany);
}
