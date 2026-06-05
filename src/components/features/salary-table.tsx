'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { SalaryRecord, SortField, SortState, Currency } from '@/types';
import { LevelBadge } from '@/components/ui/level-badge';
import { SortHeader } from '@/components/ui/sort-header';
import { Pagination } from '@/components/ui/pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { formatSalary, formatExperience } from '@/lib/utils/formatting';
import { applyFilters, convertRecordCurrency, parseFiltersFromParams } from '@/lib/utils/filtering';
import { sortRecords, toggleSort, DEFAULT_SORT } from '@/lib/utils/sorting';
import { paginateItems, parsePageFromParams } from '@/lib/utils/pagination';
import { ITEMS_PER_PAGE } from '@/lib/constants';

interface SalaryTableProps {
  records: SalaryRecord[];
}

export function SalaryTable({ records }: SalaryTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = parseFiltersFromParams(searchParams);
  const page = parsePageFromParams(searchParams);
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);

  // Pipeline: filter → convert currency → sort → paginate
  const processedData = useMemo(() => {
    let filtered = applyFilters(records, filters);
    filtered = filtered.map((r) => convertRecordCurrency(r, filters.currency));
    const sorted = sortRecords(filtered, sort.field, sort.direction);
    return paginateItems(sorted, page, ITEMS_PER_PAGE);
  }, [records, filters, sort, page]);

  const handleSort = useCallback((field: SortField) => {
    setSort((prev) => toggleSort(prev, field));
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage > 1) {
        params.set('page', newPage.toString());
      } else {
        params.delete('page');
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  if (processedData.data.length === 0) {
    return <EmptyState onClear={clearFilters} />;
  }

  const currency: Currency = filters.currency;

  return (
    <div>
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto salary-table-container">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="text-left px-4 py-3">
                  <SortHeader label="Company" field="company" currentSort={sort} onSort={handleSort} />
                </th>
                <th className="text-left px-4 py-3">
                  <SortHeader label="Role" field="role" currentSort={sort} onSort={handleSort} />
                </th>
                <th className="text-left px-4 py-3">
                  <SortHeader label="Level" field="level" currentSort={sort} onSort={handleSort} />
                </th>
                <th className="text-left px-4 py-3">
                  <SortHeader label="Location" field="location" currentSort={sort} onSort={handleSort} />
                </th>
                <th className="text-left px-4 py-3">
                  <SortHeader label="Exp." field="experience_years" currentSort={sort} onSort={handleSort} />
                </th>
                <th className="text-right px-4 py-3">
                  <SortHeader label="Base" field="base_salary" currentSort={sort} onSort={handleSort} className="justify-end" />
                </th>
                <th className="text-right px-4 py-3">
                  <SortHeader label="Stock" field="stock" currentSort={sort} onSort={handleSort} className="justify-end" />
                </th>
                <th className="text-right px-4 py-3">
                  <SortHeader label="Total Comp" field="total_compensation" currentSort={sort} onSort={handleSort} className="justify-end" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {processedData.data.map((record) => (
                <tr key={record.id} className="hover:bg-hover transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/companies/${record.company_slug}`}
                      className="text-sm font-medium text-deep hover:text-accent transition-colors"
                    >
                      {record.company}
                    </Link>
                    {record.is_verified && (
                      <span className="ml-1.5 inline-flex items-center" title="Verified">
                        <svg className="w-3.5 h-3.5 text-[#008A05]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-body">{record.role}</td>
                  <td className="px-4 py-3">
                    <LevelBadge level={record.level_standardized} />
                  </td>
                  <td className="px-4 py-3 text-sm text-body">{record.location}</td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {formatExperience(record.experience_years)}
                  </td>
                  <td className="px-4 py-3 text-sm text-body text-right font-medium">
                    {formatSalary(record.base_salary, currency)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {record.stock > 0 ? (
                      <span className="text-body">{formatSalary(record.stock, currency)}</span>
                    ) : (
                      <span className="text-muted">&mdash;</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-base font-bold text-data-blue">
                      {formatSalary(record.total_compensation, currency)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination meta={processedData.meta} onPageChange={handlePageChange} />
    </div>
  );
}
