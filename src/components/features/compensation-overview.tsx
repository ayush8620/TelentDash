import type { CompanyStats, Currency } from '@/types';
import { formatSalary, formatSalaryCompact } from '@/lib/utils/formatting';

interface CompensationOverviewProps {
  stats: CompanyStats;
  currency?: Currency;
}

export function CompensationOverview({ stats, currency = 'INR' }: CompensationOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Median TC */}
      <div className="bg-surface rounded-xl border border-border p-6 text-center">
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
          Median Total Comp
        </p>
        <p className="text-3xl font-bold text-data-blue">
          {formatSalaryCompact(stats.median_total_compensation, currency)}
        </p>
        <p className="text-xs text-muted mt-1">
          {formatSalary(stats.median_total_compensation, currency)}
        </p>
      </div>

      {/* Range */}
      <div className="bg-surface rounded-xl border border-border p-6 text-center">
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">TC Range</p>
        <p className="text-lg font-semibold text-deep">
          {formatSalaryCompact(stats.min_total_compensation, currency)}
          <span className="text-muted mx-2">–</span>
          {formatSalaryCompact(stats.max_total_compensation, currency)}
        </p>
        <p className="text-xs text-muted mt-1">Min – Max</p>
      </div>

      {/* Record count */}
      <div className="bg-surface rounded-xl border border-border p-6 text-center">
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Data Points</p>
        <p className="text-3xl font-bold text-deep">{stats.record_count}</p>
        <p className="text-xs text-muted mt-1">salary records</p>
      </div>
    </div>
  );
}
