import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">TD</span>
              </div>
              <span className="text-lg font-bold text-deep tracking-tight">
                Talent<span className="text-accent">Dash</span>
              </span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Structured salary data, company insights, and compensation
              comparisons for informed career decisions.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-deep mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/salaries"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Salaries
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-deep mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted">About</span>
              </li>
              <li>
                <span className="text-sm text-muted">Methodology</span>
              </li>
              <li>
                <span className="text-sm text-muted">Contribute Data</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} TalentDash. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Salary data is community-sourced and may not reflect exact figures.
          </p>
        </div>
      </div>
    </footer>
  );
}
