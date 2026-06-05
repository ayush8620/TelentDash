'use client';

import type { SalaryRecord } from '@/types';
import { formatSalaryCompact } from '@/lib/utils/formatting';

interface CompareSelectorProps {
  records: SalaryRecord[];
  selectedId: string;
  onChange: (id: string) => void;
  label: string;
}

export function CompareSelector({ records, selectedId, onChange, label }: CompareSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">
        {label}
      </label>
      <select
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-deep
          focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
          hover:border-muted transition-colors cursor-pointer
          bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%23717171%22%20d%3d%22M6%208L1%203h10z%22%2f%3e%3c%2fsvg%3e')]
          bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8"
      >
        <option value="">Select a salary record...</option>
        {records.map((record) => (
          <option key={record.id} value={record.id}>
            {record.company} · {record.role} · {record.level_standardized} · {record.location} — {formatSalaryCompact(record.total_compensation, record.currency)}
          </option>
        ))}
      </select>
    </div>
  );
}
