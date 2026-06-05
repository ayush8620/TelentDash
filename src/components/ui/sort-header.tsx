import type { SortField, SortState } from '@/types';

interface SortHeaderProps {
  label: string;
  field: SortField;
  currentSort: SortState;
  onSort: (field: SortField) => void;
  className?: string;
}

export function SortHeader({ label, field, currentSort, onSort, className = '' }: SortHeaderProps) {
  const isActive = currentSort.field === field;

  return (
    <button
      onClick={() => onSort(field)}
      className={`group flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted hover:text-deep transition-colors ${className}`}
    >
      {label}
      <span
        className={`transition-colors ${
          isActive ? 'text-accent' : 'text-muted/40 group-hover:text-muted'
        }`}
      >
        {isActive && currentSort.direction === 'asc' ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : isActive && currentSort.direction === 'desc' ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
