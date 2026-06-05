import type { Metadata } from 'next';
import type { CompanyProfile } from '@/types';
import { siteConfig } from '@/config/site';

/**
 * Generate metadata for the salary table page.
 */
export function generateSalaryPageMetadata(): Metadata {
  const title = 'Software Engineer Salaries in India — L3 to Principal | TalentDash';
  const description =
    'Compare verified software engineer salaries across Google, Amazon, Microsoft, Flipkart and 50+ companies in India. Filter by level, location, and role. Updated compensation data with base, bonus, stock and total comp.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/salaries`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/salaries`,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

/**
 * Generate metadata for a company page.
 */
export function generateCompanyPageMetadata(company: CompanyProfile, recordCount: number): Metadata {
  const title = `${company.name} Salaries — Compensation by Level | ${siteConfig.name}`;
  const description = `Explore ${recordCount} salary records at ${company.name}. See compensation breakdown by level (L3–Principal), median total comp, and salary distribution. ${company.industry} · ${company.headquarters}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/companies/${company.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/companies/${company.slug}`,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

/**
 * Generate metadata for the compare page.
 */
export function generateComparePageMetadata(): Metadata {
  const title = `Compare Salaries Side-by-Side | ${siteConfig.name}`;
  const description =
    'Compare two salary offers side-by-side. See base, bonus, stock, total compensation deltas and find out which offer pays more.';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/compare`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/compare`,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

/**
 * Generate JSON-LD structured data for salary dataset.
 */
export function generateSalaryDatasetJsonLd(recordCount: number): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'TalentDash Salary Dataset',
    description: `Structured compensation data for ${recordCount} salary records across multiple companies, roles, and levels in India and the US.`,
    url: `${siteConfig.url}/salaries`,
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: `${siteConfig.url}/salaries`,
    },
    variableMeasured: [
      'base_salary',
      'bonus',
      'stock',
      'total_compensation',
      'experience_years',
    ],
  };
  return JSON.stringify(jsonLd);
}

/**
 * Generate JSON-LD for a company (Organization schema).
 */
export function generateCompanyJsonLd(company: CompanyProfile): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: `${siteConfig.url}/companies/${company.slug}`,
    industry: company.industry,
    ...(company.founded_year && { foundingDate: company.founded_year.toString() }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.headquarters,
    },
  };
  return JSON.stringify(jsonLd);
}
