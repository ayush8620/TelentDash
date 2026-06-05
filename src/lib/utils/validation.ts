import type { ApiError } from '@/types';

const VALID_LEVELS = ['L3', 'L4', 'L5', 'L6', 'SDE_I', 'SDE_II', 'SDE_III', 'STAFF', 'PRINCIPAL', 'IC4', 'IC5'] as const;
const VALID_CURRENCIES = ['INR', 'USD', 'GBP', 'EUR'] as const;
const VALID_SOURCES = ['CONTRIBUTOR', 'SCRAPED', 'AI_INFERRED'] as const;

export interface ValidationResult {
  valid: boolean;
  errors: ApiError[];
}

/**
 * Validate an ingest salary request body.
 * Returns per-field validation errors.
 */
export function validateIngestRequest(body: Record<string, unknown>): ValidationResult {
  const errors: ApiError[] = [];

  // Required field checks
  if (!body.company || typeof body.company !== 'string' || (body.company as string).trim().length < 2) {
    errors.push({ error: true, field: 'company', message: 'Company name is required and must be at least 2 characters.' });
  }

  if (!body.role || typeof body.role !== 'string' || (body.role as string).trim().length === 0) {
    errors.push({ error: true, field: 'role', message: 'Role is required.' });
  }

  if (!body.level || !VALID_LEVELS.includes(body.level as typeof VALID_LEVELS[number])) {
    errors.push({
      error: true,
      field: 'level',
      message: `Level must be one of: ${VALID_LEVELS.join(', ')}`,
    });
  }

  if (!body.location || typeof body.location !== 'string') {
    errors.push({ error: true, field: 'location', message: 'Location is required.' });
  }

  if (!body.currency || !VALID_CURRENCIES.includes(body.currency as typeof VALID_CURRENCIES[number])) {
    errors.push({
      error: true,
      field: 'currency',
      message: `Currency must be one of: ${VALID_CURRENCIES.join(', ')}`,
    });
  }

  // Numeric checks
  const expYears = Number(body.experience_years);
  if (isNaN(expYears) || expYears <= 0 || expYears > 50) {
    errors.push({
      error: true,
      field: 'experience_years',
      message: 'Experience years must be a positive integer less than or equal to 50.',
    });
  }

  const baseSalary = Number(body.base_salary);
  if (isNaN(baseSalary) || baseSalary <= 0) {
    errors.push({
      error: true,
      field: 'base_salary',
      message: 'Base salary must be a positive number.',
    });
  }

  const confidence = Number(body.confidence_score);
  if (isNaN(confidence) || confidence < 0 || confidence > 1) {
    errors.push({
      error: true,
      field: 'confidence_score',
      message: 'Confidence score must be between 0.0 and 1.0.',
    });
  }

  if (body.source && !VALID_SOURCES.includes(body.source as typeof VALID_SOURCES[number])) {
    errors.push({
      error: true,
      field: 'source',
      message: `Source must be one of: ${VALID_SOURCES.join(', ')}`,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Normalize company name: lowercase, trim, strip common suffixes.
 */
export function normalizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[.,]/g, '')
    .replace(/\s+(pvt|private|ltd|limited|inc|incorporated|llc|corp|corporation|technologies|tech|india|solutions)\b/gi, '')
    .replace(/\.com$/i, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Compute total compensation: base + bonus + stock.
 * Always recomputes, never trusts client-submitted value.
 */
export function computeTotalCompensation(base: number, bonus: number, stock: number): number {
  return base + (bonus || 0) + (stock || 0);
}
