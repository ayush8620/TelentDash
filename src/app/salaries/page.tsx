import { Suspense } from 'react';
import type { Metadata } from 'next';
import { salaryRecords, getAllRoles, getAllLocations } from '@/lib/mock-data';
import { generateSalaryPageMetadata, generateSalaryDatasetJsonLd } from '@/lib/utils/seo';
import { FilterBar } from '@/components/features/filter-bar';
import { SalaryTable } from '@/components/features/salary-table';

export const metadata: Metadata = generateSalaryPageMetadata();

export default function SalariesPage() {
  const roles = getAllRoles();
  const locations = getAllLocations();
  const jsonLd = generateSalaryDatasetJsonLd(salaryRecords.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-deep mb-2">
          Software Engineer Salaries in India
        </h1>
        <p className="text-body text-base">
          Compare verified compensation data across{' '}
          <span className="font-semibold text-deep">{salaryRecords.length}</span>{' '}
          salary records from top tech companies. Filter by company, role, level, and location.
        </p>
      </div>

      {/* Filter Bar (Client Component) */}
      <Suspense
        fallback={
          <div className="h-32 bg-surface rounded-xl border border-border animate-pulse" />
        }
      >
        <FilterBar roles={roles} locations={locations} />
      </Suspense>

      {/* Salary Table (Client Component) */}
      <Suspense
        fallback={
          <div className="h-96 bg-surface rounded-xl border border-border animate-pulse" />
        }
      >
        <SalaryTable records={salaryRecords} />
      </Suspense>
    </section>
  );
}
