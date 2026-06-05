import type { SalaryRecord, SortField, SortDirection, SortState } from '@/types';

export const DEFAULT_SORT: SortState = {
  field: 'total_compensation',
  direction: 'desc',
};

/**
 * Sort salary records by a given field and direction.
 */
export function sortRecords(
  records: SalaryRecord[],
  field: SortField,
  direction: SortDirection
): SalaryRecord[] {
  const sorted = [...records].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
      case 'role':
        comparison = a.role.localeCompare(b.role);
        break;
      case 'level':
        comparison = a.level_standardized.localeCompare(b.level_standardized);
        break;
      case 'location':
        comparison = a.location.localeCompare(b.location);
        break;
      case 'experience_years':
        comparison = a.experience_years - b.experience_years;
        break;
      case 'base_salary':
        comparison = a.base_salary - b.base_salary;
        break;
      case 'stock':
        comparison = a.stock - b.stock;
        break;
      case 'total_compensation':
        comparison = a.total_compensation - b.total_compensation;
        break;
      default:
        comparison = 0;
    }

    return direction === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Toggle sort direction. If field changes, default to desc.
 */
export function toggleSort(current: SortState, field: SortField): SortState {
  if (current.field === field) {
    return { field, direction: current.direction === 'asc' ? 'desc' : 'asc' };
  }
  return { field, direction: 'desc' };
}

/**
 * Parse sort state from URL search params.
 */
export function parseSortFromParams(params: URLSearchParams): SortState {
  const sort = params.get('sort');
  if (!sort) return DEFAULT_SORT;

  if (sort === 'total_comp_asc') return { field: 'total_compensation', direction: 'asc' };
  if (sort === 'total_comp_desc') return { field: 'total_compensation', direction: 'desc' };
  if (sort === 'date_desc') return { field: 'experience_years', direction: 'desc' };
  if (sort === 'base_asc') return { field: 'base_salary', direction: 'asc' };
  if (sort === 'base_desc') return { field: 'base_salary', direction: 'desc' };

  return DEFAULT_SORT;
}
