'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
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

  const pushUpdate = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // Debounce search ONLY when typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (companySearch !== (searchParams.get('company') || '')) {
        pushUpdate({ company: companySearch });
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySearch]); // Omit pushUpdate and searchParams to prevent loops

  const toggleLevel = (level: string) => {
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter((l) => l !== level)
      : [...currentLevels, level];
    pushUpdate({ level: newLevels.join(',') });
  };

  const clearAll = () => {
    setCompanySearch('');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    (searchParams.get('company') || '') || currentRole || currentLocation || currentLevels.length > 0 || currentCurrency !== 'INR';

  return (
    <div className="glass rounded-xl p-5 mb-6 shadow-sm border border-border">
      <div className="flex flex-col gap-5">
        {/* Row 1: Search + Role + Location + Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Company"
            placeholder="Search companies..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            icon={
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />

          <Select
            label="Role"
            placeholder="All Roles"
            value={currentRole}
            onChange={(e) => pushUpdate({ role: e.target.value })}
            options={roles.map((r) => ({ value: r, label: r }))}
          />

          <Select
            label="Location"
            placeholder="All Locations"
            value={currentLocation}
            onChange={(e) => pushUpdate({ location: e.target.value })}
            options={locations.map((l) => ({ value: l, label: l }))}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted uppercase tracking-widest pl-1">
              Currency
            </label>
            <div className="flex rounded-lg border border-border overflow-hidden h-[42px] bg-surface-solid">
              <button
                onClick={() => pushUpdate({ currency: 'INR' })}
                className={`flex-1 text-sm font-semibold transition-all duration-200 ${
                  currentCurrency === 'INR'
                    ? 'bg-gradient-to-r from-accent to-[#06b6d4] text-white shadow-inner'
                    : 'text-body hover:text-deep hover:bg-hover'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => pushUpdate({ currency: 'USD' })}
                className={`flex-1 text-sm font-semibold transition-all duration-200 border-l border-border ${
                  currentCurrency === 'USD'
                    ? 'bg-gradient-to-r from-accent to-[#06b6d4] text-white shadow-inner'
                    : 'text-body hover:text-deep hover:bg-hover'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Level multi-select + Clear */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest mr-2">
            Level
          </span>
          {ALL_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => toggleLevel(level)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 border ${
                currentLevels.includes(level)
                  ? 'border-accent/50 bg-accent/15 text-accent shadow-[0_0_10px_rgba(99,102,241,0.1)]'
                  : 'border-border bg-surface-solid text-body hover:border-muted hover:text-deep'
              }`}
            >
              {level}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="ml-auto text-xs font-semibold text-accent hover:text-accent-hover hover:underline underline-offset-4 transition-colors px-2 py-1"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="mt-4 h-0.5 w-full bg-accent/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-[#06b6d4] rounded-full animate-pulse" style={{ width: '30%' }} />
        </div>
      )}
    </div>
  );
}
