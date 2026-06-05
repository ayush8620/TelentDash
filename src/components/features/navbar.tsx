"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/salaries", label: "Salaries" },
  { href: "/companies", label: "Companies" },
  { href: "/compare", label: "Compare" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-[#06b6d4] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105">
              <span className="text-white font-bold text-sm">TD</span>
            </div>
            <span className="text-xl font-bold text-deep tracking-tight">
              Talent<span className="gradient-text">Dash</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-accent"
                      : "text-muted hover:text-deep"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-accent to-[#06b6d4]" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/salaries"
              className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-200 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              Explore Data →
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
