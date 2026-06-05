import type { CompanyProfile } from '@/types';

export const companyProfiles: Record<string, CompanyProfile> = {
  google: {
    name: 'Google',
    slug: 'google',
    industry: 'Technology',
    founded_year: 1998,
    headcount_range: '100,000+',
    headquarters: 'Mountain View, CA',
  },
  amazon: {
    name: 'Amazon',
    slug: 'amazon',
    industry: 'Technology / E-Commerce',
    founded_year: 1994,
    headcount_range: '100,000+',
    headquarters: 'Seattle, WA',
  },
  microsoft: {
    name: 'Microsoft',
    slug: 'microsoft',
    industry: 'Technology',
    founded_year: 1975,
    headcount_range: '100,000+',
    headquarters: 'Redmond, WA',
  },
  meta: {
    name: 'Meta',
    slug: 'meta',
    industry: 'Technology / Social Media',
    founded_year: 2004,
    headcount_range: '50,000+',
    headquarters: 'Menlo Park, CA',
  },
  flipkart: {
    name: 'Flipkart',
    slug: 'flipkart',
    industry: 'E-Commerce',
    founded_year: 2007,
    headcount_range: '30,000+',
    headquarters: 'Bengaluru, India',
  },
  meesho: {
    name: 'Meesho',
    slug: 'meesho',
    industry: 'E-Commerce / Social Commerce',
    founded_year: 2015,
    headcount_range: '2,000+',
    headquarters: 'Bengaluru, India',
  },
  razorpay: {
    name: 'Razorpay',
    slug: 'razorpay',
    industry: 'Fintech',
    founded_year: 2014,
    headcount_range: '3,000+',
    headquarters: 'Bengaluru, India',
  },
  zepto: {
    name: 'Zepto',
    slug: 'zepto',
    industry: 'Quick Commerce',
    founded_year: 2021,
    headcount_range: '1,500+',
    headquarters: 'Mumbai, India',
  },
  nvidia: {
    name: 'NVIDIA',
    slug: 'nvidia',
    industry: 'Semiconductors / AI',
    founded_year: 1993,
    headcount_range: '30,000+',
    headquarters: 'Santa Clara, CA',
  },
  tcs: {
    name: 'Tata Consultancy Services',
    slug: 'tcs',
    industry: 'IT Services / Consulting',
    founded_year: 1968,
    headcount_range: '600,000+',
    headquarters: 'Mumbai, India',
  },
  infosys: {
    name: 'Infosys',
    slug: 'infosys',
    industry: 'IT Services / Consulting',
    founded_year: 1981,
    headcount_range: '300,000+',
    headquarters: 'Bengaluru, India',
  },
  wipro: {
    name: 'Wipro',
    slug: 'wipro',
    industry: 'IT Services / Consulting',
    founded_year: 1945,
    headcount_range: '250,000+',
    headquarters: 'Bengaluru, India',
  },
  atlassian: {
    name: 'Atlassian',
    slug: 'atlassian',
    industry: 'Technology / Developer Tools',
    founded_year: 2002,
    headcount_range: '10,000+',
    headquarters: 'Sydney, Australia',
  },
};

/**
 * Retrieves a single company profile by slug.
 */
export function getCompanyProfile(slug: string): CompanyProfile | undefined {
  return companyProfiles[slug];
}

/**
 * Returns an array of all company profiles.
 */
export function getAllCompanyProfiles(): CompanyProfile[] {
  return Object.values(companyProfiles);
}
