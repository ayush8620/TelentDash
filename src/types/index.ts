// Level standardized enum type
export type LevelStandardized = 'L3' | 'L4' | 'L5' | 'L6' | 'SDE-I' | 'SDE-II' | 'SDE-III' | 'Staff' | 'Principal';

// Currency type
export type Currency = 'INR' | 'USD';

// Source type (for DB)
export type Source = 'CONTRIBUTOR' | 'SCRAPED' | 'AI_INFERRED';

// Sort direction
export type SortDirection = 'asc' | 'desc';

// Sort fields - all sortable columns in the salary table
export type SortField = 'company' | 'role' | 'level' | 'location' | 'experience_years' | 'base_salary' | 'stock' | 'total_compensation';

// The core salary record interface (matches integration contract)
export interface SalaryRecord {
  id: string;
  company: string;
  company_slug: string;
  role: string;
  level_standardized: LevelStandardized;
  location: string;
  currency: Currency;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  confidence_score: number;
  is_verified: boolean;
}

// Company profile metadata
export interface CompanyProfile {
  name: string;
  slug: string;
  industry: string;
  founded_year: number | null;
  headcount_range: string;
  headquarters: string;
}

// Filter state for URL-synced filtering
export interface FilterState {
  company: string;
  role: string;
  levels: LevelStandardized[];
  location: string;
  currency: Currency;
}

// Pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Comparison delta between two salary records
export interface ComparisonDelta {
  base_delta: number;
  bonus_delta: number;
  stock_delta: number;
  tc_delta: number;
  experience_delta: number;
}

// Sort state
export interface SortState {
  field: SortField;
  direction: SortDirection;
}

// Level distribution: count per level
export type LevelDistribution = Partial<Record<LevelStandardized, number>>;

// Company stats computed from salary data
export interface CompanyStats {
  median_total_compensation: number;
  min_total_compensation: number;
  max_total_compensation: number;
  record_count: number;
  level_distribution: LevelDistribution;
}

// API error response
export interface ApiError {
  error: true;
  field?: string;
  message: string;
}

// Ingest salary request body
export interface IngestSalaryRequest {
  company: string;
  role: string;
  level: string;
  location: string;
  currency: string;
  experience_years: number;
  base_salary: number;
  bonus?: number;
  stock?: number;
  total_compensation?: number; // Will be stripped and recomputed
  source?: string;
  confidence_score: number;
}
