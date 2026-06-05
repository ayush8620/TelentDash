interface EmptyStateProps {
  title?: string;
  message?: string;
  onClear?: () => void;
}

export function EmptyState({
  title = 'No records found',
  message = 'No records match your current filters. Try removing a filter to see more results.',
  onClear,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-deep mb-2">{title}</h3>
      <p className="text-sm text-muted text-center max-w-md mb-6">{message}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="text-sm font-medium text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
