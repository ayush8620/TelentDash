import type { PaginationMeta } from '@/types';
import { ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from '@/lib/constants';

/**
 * Paginate an array of items.
 * Returns the slice for the current page and pagination metadata.
 */
export function paginateItems<T>(
  items: T[],
  page: number = 1,
  limit: number = ITEMS_PER_PAGE
): { data: T[]; meta: PaginationMeta } {
  // Ensure valid values
  const safeLimit = Math.min(Math.max(1, limit), MAX_ITEMS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(items.length / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (safePage - 1) * safeLimit;
  const endIndex = startIndex + safeLimit;
  const data = items.slice(startIndex, endIndex);

  return {
    data,
    meta: {
      total: items.length,
      page: safePage,
      limit: safeLimit,
      totalPages,
    },
  };
}

/**
 * Get the display range string: "Showing 1–25 of 312 records"
 */
export function getPaginationDisplay(meta: PaginationMeta): string {
  if (meta.total === 0) return 'No records found';
  const start = (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);
  return `Showing ${start}–${end} of ${meta.total} records`;
}

/**
 * Parse page from URL search params.
 */
export function parsePageFromParams(params: URLSearchParams): number {
  const page = parseInt(params.get('page') || '1', 10);
  return isNaN(page) || page < 1 ? 1 : page;
}
