import type { CompanyProfile } from '@/types';
import { Badge } from '@/components/ui/badge';

interface CompanyHeaderProps {
  company: CompanyProfile;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      {/* Avatar / Logo */}
      <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center border border-border shadow-sm flex-shrink-0 overflow-hidden">
        {company.logo_url ? (
          <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain p-2" />
        ) : (
          <span className="text-2xl font-bold text-slate-800">{company.name.charAt(0)}</span>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-deep mb-2">{company.name}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="info">{company.industry}</Badge>
          {company.founded_year && (
            <span className="text-sm text-muted">Founded {company.founded_year}</span>
          )}
          <span className="text-sm text-muted">•</span>
          <span className="text-sm text-muted">{company.headcount_range} employees</span>
          <span className="text-sm text-muted">•</span>
          <span className="text-sm text-muted">📍 {company.headquarters}</span>
        </div>
      </div>
    </div>
  );
}
