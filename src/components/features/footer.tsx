import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      {/* Gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-[#06b6d4] flex items-center justify-center">
                <span className="text-white font-bold text-xs">TD</span>
              </div>
              <span className="text-lg font-bold text-deep tracking-tight">
                Talent<span className="gradient-text">Dash</span>
              </span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Career intelligence platform — structured salary data, company
              insights, and compensation comparisons for informed career
              decisions.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-deep mb-3">Explore</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/salaries" className="text-sm text-muted hover:text-accent transition-colors duration-200">
                  Salaries
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-sm text-muted hover:text-accent transition-colors duration-200">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-muted hover:text-accent transition-colors duration-200">
                  Compare
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-deep mb-3">Resources</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted cursor-pointer hover:text-accent transition-colors">About</span></li>
              <li><span className="text-sm text-muted cursor-pointer hover:text-accent transition-colors">Methodology</span></li>
              <li><span className="text-sm text-muted cursor-pointer hover:text-accent transition-colors">Contribute Data</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
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
