'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { salaryRecords, getRecordById } from '@/lib/mock-data';
import type { SalaryRecord, ComparisonDelta, Currency } from '@/types';
import { CompareSelector } from '@/components/features/compare-selector';
import { CompareCard } from '@/components/features/compare-card';

function computeDelta(r1: SalaryRecord, r2: SalaryRecord): ComparisonDelta {
  return {
    base_delta: r1.base_salary - r2.base_salary,
    bonus_delta: r1.bonus - r2.bonus,
    stock_delta: r1.stock - r2.stock,
    tc_delta: r1.total_compensation - r2.total_compensation,
    experience_delta: r1.experience_years - r2.experience_years,
  };
}

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [id1, setId1] = useState(searchParams.get('s1') || '');
  const [id2, setId2] = useState(searchParams.get('s2') || '');

  // Sync selections to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (id1) params.set('s1', id1);
    if (id2) params.set('s2', id2);
    const qs = params.toString();
    const newUrl = qs ? `/compare?${qs}` : '/compare';
    router.replace(newUrl, { scroll: false });
  }, [id1, id2, router]);

  const record1 = useMemo(() => (id1 ? getRecordById(id1) : undefined), [id1]);
  const record2 = useMemo(() => (id2 ? getRecordById(id2) : undefined), [id2]);
  const delta = useMemo(
    () => (record1 && record2 ? computeDelta(record1, record2) : null),
    [record1, record2]
  );

  const currency: Currency = record1?.currency || 'INR';

  return (
    <>
      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <CompareSelector
          records={salaryRecords}
          selectedId={id1}
          onChange={setId1}
          label="Record A"
        />
        <CompareSelector
          records={salaryRecords}
          selectedId={id2}
          onChange={setId2}
          label="Record B"
        />
      </div>

      {/* Comparison Result */}
      {record1 && record2 && delta ? (
        <CompareCard
          record1={record1}
          record2={record2}
          delta={delta}
          currency={currency}
        />
      ) : (
        <div className="bg-surface rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-deep mb-2">
            Select Two Records
          </h3>
          <p className="text-sm text-muted max-w-md mx-auto">
            Choose two salary records above to see a detailed side-by-side
            comparison with delta calculations.
          </p>
        </div>
      )}
    </>
  );
}

export default function ComparePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep mb-2">Compare Salaries</h1>
        <p className="text-body">
          Select two salary records to compare side-by-side. See the difference
          in base, bonus, stock, and total compensation.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-64 bg-surface rounded-xl border border-border animate-pulse" />
        }
      >
        <CompareContent />
      </Suspense>
    </section>
  );
}
