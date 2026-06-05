'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { Currency } from '@/types';
import { ALL_LEVELS, SEARCH_DEBOUNCE_MS } from '@/lib/constants';

interface FilterBarProps {
  roles: string[];
  locations: string[];
}

export function FilterBar({ roles, locations }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [companySearch, setCompanySearch] = useState(searchParams.get('company') || '');

  const currentRole = searchParams.get('role') || '';
  const currentLocation = searchParams.get('location') || '';
  const currentCurrency = (searchParams.get('currency') as Currency) || 'INR';
  const currentLevels = searchParams.get('level')?.split(',').filter(Boolean) || [];

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change
      params.delete('page');

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  // Debounced company search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ company: companySearch });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [companySearch, updateParams]);

  const toggleLevel = (level: string) => {
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter((l) => l !== level)
      : [...currentLevels, level];
    updateParams({ level: newLevels.join(',') });
  };

  const clearAll = () => {
    setCompanySearch('');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    companySearch || currentRole || currentLocation || currentLevels.length > 0 || currentCurrency !== 'INR';

  return (
    <div className="bg-surface rounded-xl border border-border p-4 mb-6">
      <div className="flex flex-col gap-4">
        {/* Row 1: Search + Role + Location + Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Company"
            placeholder="Search companies..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />

          <Select
            label="Role"
            placeholder="All Roles"
            value={currentRole}
            onChange={(e) => updateParams({ role: e.target.value })}
            options={roles.map((r) => ({ value: r, label: r }))}
          />

          <Select
            label="Location"
            placeholder="All Locations"
            value={currentLocation}
            onChange={(e) => updateParams({ location: e.target.value })}
            options={locations.map((l) => ({ value: l, label: l }))}
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Currency
            </label>
            <div className="flex rounded-lg border border-border overflow-hidden h-[38px]">
              <button
                onClick={() => updateParams({ currency: '' })}
                className={`flex-1 text-sm font-medium transition-colors ${
                  currentCurrency === 'INR'
                    ? 'bg-accent text-white'
                    : 'bg-surface text-body hover:bg-hover'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => updateParams({ currency: 'USD' })}
                className={`flex-1 text-sm font-medium transition-colors border-l border-border ${
                  currentCurrency === 'USD'
                    ? 'bg-accent text-white'
                    : 'bg-surface text-body hover:bg-hover'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Level multi-select + Clear */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted uppercase tracking-wider mr-1">
            Level
          </span>
          {ALL_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => toggleLevel(level)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                currentLevels.includes(level)
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-surface text-body hover:border-muted'
              }`}
            >
              {level}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="ml-auto text-xs font-medium text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="mt-3 h-0.5 bg-accent/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full animate-pulse"
            style={{ width: '30%' }}
          />
        </div>
      )}
    </div>
  );
}
