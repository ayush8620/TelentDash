import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllCompanySlugs, getSalaryRecordsByCompanySlug, getCompanyProfile } from '@/lib/queries';
import { generateCompanyPageMetadata, generateCompanyJsonLd } from '@/lib/utils/seo';
import { computeCompanyStats } from '@/lib/utils/compensation';
import { CompanyHeader } from '@/components/features/company-header';
import { CompensationOverview } from '@/components/features/compensation-overview';
import { LevelDistributionBar } from '@/components/features/level-distribution-bar';
import { SalaryTable } from '@/components/features/salary-table';
import { Button } from '@/components/ui/button';

// Revalidate every hour — company data changes rarely
export const revalidate = 3600;

// Pre-generate all company pages at build time
export async function generateStaticParams() {
  const slugs = await getAllCompanySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per company
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyProfile(slug);
  if (!company) return { title: 'Company Not Found' };
  const records = await getSalaryRecordsByCompanySlug(slug);
  return generateCompanyPageMetadata(company, records.length);
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompanyProfile(slug);
  if (!company) notFound();

  const records = await getSalaryRecordsByCompanySlug(slug);
  const stats = computeCompanyStats(records);
  const jsonLd = generateCompanyJsonLd(company);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/salaries" className="hover:text-accent transition-colors">
          Salaries
        </Link>
        <span>/</span>
        <span className="text-deep font-medium">{company.name}</span>
      </nav>

      {/* Company Header */}
      <CompanyHeader company={company} />

      {/* Compensation Overview Cards */}
      <CompensationOverview stats={stats} />

      {/* Level Distribution Bar */}
      <LevelDistributionBar
        distribution={stats.level_distribution}
        totalRecords={stats.record_count}
      />

      {/* Salary Records Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-deep">Salary Records</h2>
          <Link href="/compare">
            <Button variant="secondary" size="sm">
              Compare Offers
            </Button>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="h-64 bg-surface rounded-xl border border-border animate-pulse" />
          }
        >
          <SalaryTable records={records} />
        </Suspense>
      </div>
    </section>
  );
}
