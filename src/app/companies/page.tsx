import Link from 'next/link';
import { getAllCompanyProfiles, getAllSalaryRecords } from '@/lib/queries';
import { computeCompanyStats } from '@/lib/utils/compensation';
import { formatSalaryCompact } from '@/lib/utils/formatting';

export const revalidate = 3600;

export default async function CompaniesPage() {
  const [companies, records] = await Promise.all([
    getAllCompanyProfiles(),
    getAllSalaryRecords()
  ]);

  // Pre-calculate stats for each company to show on the cards
  const companiesWithStats = companies.map(company => {
    const companyRecords = records.filter(r => r.company_slug === company.slug);
    const stats = computeCompanyStats(companyRecords);
    return { ...company, stats };
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep mb-2">Tech Companies</h1>
        <p className="text-body text-base">
          Browse salary data and compensation statistics across {companies.length} tech companies.
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companiesWithStats.map((company) => (
          <Link 
            key={company.slug} 
            href={`/companies/${company.slug}`}
            className="glass hover:glass-strong transition-default p-6 flex flex-col group"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-accent/10 group-hover:border-accent/30 flex-shrink-0 transition-colors">
                <span className="text-lg font-bold text-deep">{company.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-deep group-hover:text-accent transition-colors">{company.name}</h2>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-surface-solid border border-border text-xs font-medium text-muted">
                  {company.industry}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-border/50">
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider font-semibold">Median TC</p>
                <p className="text-lg font-bold text-data-blue">
                  {company.stats.record_count > 0 
                    ? formatSalaryCompact(company.stats.median_total_compensation, 'INR') 
                    : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1 uppercase tracking-wider font-semibold">Data Points</p>
                <p className="text-lg font-bold text-deep">
                  {company.stats.record_count}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
