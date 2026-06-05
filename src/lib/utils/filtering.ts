import type { SalaryRecord, FilterState, LevelStandardized, Currency } from '@/types';
import { convertCurrency } from './formatting';

export const DEFAULT_FILTERS: FilterState = {
  company: '',
  role: '',
  levels: [],
  location: '',
  currency: 'INR',
};

/**
 * Apply all filters to salary records.
 * Currency filter converts records to target currency for display.
 */
export function applyFilters(records: SalaryRecord[], filters: FilterState): SalaryRecord[] {
  return records.filter((record) => {
    // Company search (case-insensitive partial match)
    if (filters.company && !record.company.toLowerCase().includes(filters.company.toLowerCase())) {
      return false;
    }
    // Role filter (exact match from dropdown)
    if (filters.role && record.role !== filters.role) {
      return false;
    }
    // Level multi-select
    if (filters.levels.length > 0 && !filters.levels.includes(record.level_standardized)) {
      return false;
    }
    // Location filter
    if (filters.location && record.location !== filters.location) {
      return false;
    }
    return true;
  });
}

/**
 * Convert all salary fields in a record to the target currency.
 */
export function convertRecordCurrency(record: SalaryRecord, targetCurrency: Currency): SalaryRecord {
  if (record.currency === targetCurrency) return record;
  return {
    ...record,
    base_salary: convertCurrency(record.base_salary, record.currency, targetCurrency),
    bonus: convertCurrency(record.bonus, record.currency, targetCurrency),
    stock: convertCurrency(record.stock, record.currency, targetCurrency),
    total_compensation: convertCurrency(record.total_compensation, record.currency, targetCurrency),
    currency: targetCurrency,
  };
}

/**
 * Parse filter state from URL search params.
 */
export function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const levels = params.get('level');
  return {
    company: params.get('company') || '',
    role: params.get('role') || '',
    levels: levels ? (levels.split(',') as LevelStandardized[]) : [],
    location: params.get('location') || '',
    currency: (params.get('currency') as Currency) || 'INR',
  };
}

/**
 * Serialize filter state to URL search params string.
 * Only includes non-default values.
 */
export function serializeFiltersToParams(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.company) params.set('company', filters.company);
  if (filters.role) params.set('role', filters.role);
  if (filters.levels.length > 0) params.set('level', filters.levels.join(','));
  if (filters.location) params.set('location', filters.location);
  if (filters.currency !== 'INR') params.set('currency', filters.currency);
  return params.toString();
}
