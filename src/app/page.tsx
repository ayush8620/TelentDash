import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAllCompanySlugs, getAllSalaryRecords } from '@/lib/queries';

export const revalidate = 3600;

export default async function LandingPage() {
  const companies = await getAllCompanySlugs();
  const records = await getAllSalaryRecords();
  
  // Get top 6 companies with most records to feature them
  const companyCounts = records.reduce((acc, curr) => {
    acc[curr.company] = (acc[curr.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => {
      const record = records.find(r => r.company === name);
      return { name, slug: record?.company_slug || name.toLowerCase() };
    });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient opacity-70 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Floating Badge */}
        <div className="animate-float mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs font-medium text-accent">Now with {records.length}+ verified salaries</span>
        </div>

        <h1 className="max-w-4xl mx-auto mb-6">
          Unlock the black box of <br className="hidden sm:block" />
          <span className="gradient-text">Tech Compensation</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-body mb-10 leading-relaxed">
          Make data-driven career decisions. Compare granular salary data across levels, locations, and roles for top tech companies in India and globally.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link href="/salaries" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-base font-semibold px-8 h-14 bg-gradient-to-r from-accent to-[#06b6d4] hover:opacity-90 border-0 glow-accent-hover transition-default">
              Explore Salaries
            </Button>
          </Link>
          <Link href="/compare" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base font-semibold px-8 h-14 glass border-border hover:bg-hover transition-default">
              Compare Offers
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature/Trending Section */}
      <section className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 border-t border-border/50">
        <div className="text-center mb-10">
          <h3 className="text-xl text-muted font-medium mb-8">Trending Companies</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {topCompanies.map((company) => (
              <Link 
                key={company.slug} 
                href={`/companies/${company.slug}`}
                className="px-6 py-3 rounded-xl glass hover:glass-strong transition-default flex items-center gap-3 group"
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-accent/10 group-hover:border-accent/30">
                  <span className="text-xs font-bold text-deep">{company.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-body group-hover:text-deep">{company.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-lg font-semibold text-deep mb-3">Verified Data</h4>
            <p className="text-muted text-sm leading-relaxed">Salaries crowd-sourced from verified professionals across top tech hubs.</p>
          </div>
          
          <div className="glass p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h4 className="text-lg font-semibold text-deep mb-3">Granular Breakdown</h4>
            <p className="text-muted text-sm leading-relaxed">See the exact split between base pay, stock grants, and annual bonuses.</p>
          </div>

          <div className="glass p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <h4 className="text-lg font-semibold text-deep mb-3">Compare Offers</h4>
            <p className="text-muted text-sm leading-relaxed">Evaluate multiple offers side-by-side to negotiate the best compensation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
