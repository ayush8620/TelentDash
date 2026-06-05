import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding TalentDash database...\n');

  // Clear existing data
  await prisma.salary.deleteMany();
  await prisma.company.deleteMany();
  console.log('  Cleared existing data.');

  // ═══════════════════════════════════════════════════════════════
  // CREATE COMPANIES
  // Demonstrates name normalization: "Google India", "GOOGLE" → slug "google"
  // ═══════════════════════════════════════════════════════════════

  const google = await prisma.company.create({
    data: {
      name: 'Google',
      slug: 'google',
      normalized_name: 'google',
      industry: 'Technology',
      headquarters: 'Mountain View, CA',
      founded_year: 1998,
      headcount_range: '100,000+',
    },
  });

  const amazon = await prisma.company.create({
    data: {
      name: 'Amazon',
      slug: 'amazon',
      normalized_name: 'amazon',
      industry: 'E-Commerce & Cloud',
      headquarters: 'Seattle, WA',
      founded_year: 1994,
      headcount_range: '100,000+',
    },
  });

  const microsoft = await prisma.company.create({
    data: {
      name: 'Microsoft',
      slug: 'microsoft',
      normalized_name: 'microsoft',
      industry: 'Technology',
      headquarters: 'Redmond, WA',
      founded_year: 1975,
      headcount_range: '100,000+',
    },
  });

  const meta = await prisma.company.create({
    data: {
      name: 'Meta',
      slug: 'meta',
      normalized_name: 'meta',
      industry: 'Technology',
      headquarters: 'Menlo Park, CA',
      founded_year: 2004,
      headcount_range: '50,000+',
    },
  });

  const flipkart = await prisma.company.create({
    data: {
      name: 'Flipkart',
      slug: 'flipkart',
      normalized_name: 'flipkart',
      industry: 'E-Commerce',
      headquarters: 'Bengaluru, India',
      founded_year: 2007,
      headcount_range: '30,000+',
    },
  });

  const meesho = await prisma.company.create({
    data: {
      name: 'Meesho',
      slug: 'meesho',
      normalized_name: 'meesho',
      industry: 'E-Commerce',
      headquarters: 'Bengaluru, India',
      founded_year: 2015,
      headcount_range: '1,000+',
    },
  });

  const razorpay = await prisma.company.create({
    data: {
      name: 'Razorpay',
      slug: 'razorpay',
      normalized_name: 'razorpay',
      industry: 'Fintech',
      headquarters: 'Bengaluru, India',
      founded_year: 2014,
      headcount_range: '3,000+',
    },
  });

  const zepto = await prisma.company.create({
    data: {
      name: 'Zepto',
      slug: 'zepto',
      normalized_name: 'zepto',
      industry: 'Quick Commerce',
      headquarters: 'Mumbai, India',
      founded_year: 2021,
      headcount_range: '1,000+',
    },
  });

  const nvidia = await prisma.company.create({
    data: {
      name: 'NVIDIA',
      slug: 'nvidia',
      normalized_name: 'nvidia',
      industry: 'Semiconductors',
      headquarters: 'Santa Clara, CA',
      founded_year: 1993,
      headcount_range: '25,000+',
    },
  });

  const tcs = await prisma.company.create({
    data: {
      name: 'Tata Consultancy Services',
      slug: 'tcs',
      normalized_name: 'tata-consultancy-services',
      industry: 'IT Services',
      headquarters: 'Mumbai, India',
      founded_year: 1968,
      headcount_range: '600,000+',
    },
  });

  const infosys = await prisma.company.create({
    data: {
      name: 'Infosys',
      slug: 'infosys',
      normalized_name: 'infosys',
      industry: 'IT Services',
      headquarters: 'Bengaluru, India',
      founded_year: 1981,
      headcount_range: '300,000+',
    },
  });

  const wipro = await prisma.company.create({
    data: {
      name: 'Wipro',
      slug: 'wipro',
      normalized_name: 'wipro',
      industry: 'IT Services',
      headquarters: 'Bengaluru, India',
      founded_year: 1945,
      headcount_range: '250,000+',
    },
  });

  const atlassian = await prisma.company.create({
    data: {
      name: 'Atlassian',
      slug: 'atlassian',
      normalized_name: 'atlassian',
      industry: 'Technology',
      headquarters: 'Sydney, Australia',
      founded_year: 2002,
      headcount_range: '10,000+',
    },
  });

  console.log('  Created 13 companies.\n');

  // ═══════════════════════════════════════════════════════════════
  // CREATE SALARY RECORDS
  // total_compensation is ALWAYS base_salary + bonus + stock
  // ═══════════════════════════════════════════════════════════════

  const salaryData = [
    // ── Google (9 records) ─────────────────────────────────────
    { company_id: google.id, role: 'Software Engineer', level: 'L3' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 2, base_salary: 1800000n, bonus: 200000n, stock: 400000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.9, is_verified: true },
    { company_id: google.id, role: 'Software Engineer', level: 'L4' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 5, base_salary: 2800000n, bonus: 400000n, stock: 1200000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: google.id, role: 'Software Engineer', level: 'L4' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 4, base_salary: 2600000n, bonus: 350000n, stock: 1000000n, source: 'SCRAPED' as const, confidence_score: 0.8, is_verified: false },
    { company_id: google.id, role: 'Software Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 8, base_salary: 4200000n, bonus: 600000n, stock: 2500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.92, is_verified: true },
    { company_id: google.id, role: 'Software Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 10, base_salary: 4800000n, bonus: 800000n, stock: 3000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: google.id, role: 'Software Engineer', level: 'L6' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 14, base_salary: 6500000n, bonus: 1200000n, stock: 5000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.75, is_verified: false },
    { company_id: google.id, role: 'Software Engineer', level: 'L4' as const, location: 'San Francisco', currency: 'USD' as const, experience_years: 4, base_salary: 165000n, bonus: 30000n, stock: 80000n, source: 'SCRAPED' as const, confidence_score: 0.82, is_verified: false },
    { company_id: google.id, role: 'Software Engineer', level: 'L5' as const, location: 'San Francisco', currency: 'USD' as const, experience_years: 7, base_salary: 220000n, bonus: 50000n, stock: 150000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.9, is_verified: true },
    // Principal — very high TC edge case: ₹4Cr+
    { company_id: google.id, role: 'Software Engineer', level: 'PRINCIPAL' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 20, base_salary: 12000000n, bonus: 3000000n, stock: 25000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.7, is_verified: false },

    // ── Amazon (7 records) ─────────────────────────────────────
    { company_id: amazon.id, role: 'SDE', level: 'SDE_I' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 1, base_salary: 1400000n, bonus: 100000n, stock: 250000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: amazon.id, role: 'SDE', level: 'SDE_II' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 4, base_salary: 2400000n, bonus: 200000n, stock: 800000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: amazon.id, role: 'SDE', level: 'SDE_II' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 5, base_salary: 2800000n, bonus: 300000n, stock: 1200000n, source: 'SCRAPED' as const, confidence_score: 0.8, is_verified: false },
    { company_id: amazon.id, role: 'SDE', level: 'SDE_III' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 8, base_salary: 3800000n, bonus: 500000n, stock: 2000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.9, is_verified: true },
    { company_id: amazon.id, role: 'SDE', level: 'SDE_I' as const, location: 'Seattle', currency: 'USD' as const, experience_years: 2, base_salary: 130000n, bonus: 20000n, stock: 40000n, source: 'SCRAPED' as const, confidence_score: 0.78, is_verified: false },
    { company_id: amazon.id, role: 'SDE', level: 'SDE_II' as const, location: 'Seattle', currency: 'USD' as const, experience_years: 5, base_salary: 165000n, bonus: 25000n, stock: 80000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    // Zero bonus AND stock edge case
    { company_id: amazon.id, role: 'SDE', level: 'SDE_I' as const, location: 'Delhi NCR', currency: 'INR' as const, experience_years: 1, base_salary: 1200000n, bonus: 0n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.65, is_verified: false },

    // ── Microsoft (6 records) ──────────────────────────────────
    { company_id: microsoft.id, role: 'Software Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 6, base_salary: 3200000n, bonus: 500000n, stock: 1500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: microsoft.id, role: 'Software Engineer', level: 'L5' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 7, base_salary: 3500000n, bonus: 600000n, stock: 1800000n, source: 'SCRAPED' as const, confidence_score: 0.82, is_verified: false },
    { company_id: microsoft.id, role: 'Software Engineer', level: 'L6' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 12, base_salary: 5500000n, bonus: 1000000n, stock: 4000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: microsoft.id, role: 'Software Engineer', level: 'L4' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 3, base_salary: 2200000n, bonus: 300000n, stock: 600000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.9, is_verified: true },
    { company_id: microsoft.id, role: 'Software Engineer', level: 'L5' as const, location: 'New York', currency: 'USD' as const, experience_years: 7, base_salary: 185000n, bonus: 35000n, stock: 100000n, source: 'SCRAPED' as const, confidence_score: 0.8, is_verified: false },
    { company_id: microsoft.id, role: 'Software Engineer', level: 'STAFF' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 16, base_salary: 7500000n, bonus: 1500000n, stock: 6000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.72, is_verified: false },

    // ── Meta (5 records) ───────────────────────────────────────
    { company_id: meta.id, role: 'Software Engineer', level: 'L4' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 4, base_salary: 3000000n, bonus: 450000n, stock: 1500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: meta.id, role: 'Software Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 7, base_salary: 4500000n, bonus: 700000n, stock: 3000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.9, is_verified: true },
    { company_id: meta.id, role: 'Software Engineer', level: 'L5' as const, location: 'San Francisco', currency: 'USD' as const, experience_years: 6, base_salary: 230000n, bonus: 50000n, stock: 180000n, source: 'SCRAPED' as const, confidence_score: 0.85, is_verified: false },
    { company_id: meta.id, role: 'Software Engineer', level: 'L6' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 12, base_salary: 7000000n, bonus: 1200000n, stock: 5500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.78, is_verified: false },
    { company_id: meta.id, role: 'Software Engineer', level: 'L3' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 2, base_salary: 2000000n, bonus: 200000n, stock: 500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.82, is_verified: true },

    // ── Flipkart (5 records) ───────────────────────────────────
    { company_id: flipkart.id, role: 'SDE', level: 'SDE_I' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 1, base_salary: 1600000n, bonus: 150000n, stock: 300000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: flipkart.id, role: 'SDE', level: 'SDE_II' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 4, base_salary: 2800000n, bonus: 400000n, stock: 1000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: flipkart.id, role: 'SDE', level: 'SDE_III' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 7, base_salary: 4200000n, bonus: 600000n, stock: 2200000n, source: 'SCRAPED' as const, confidence_score: 0.82, is_verified: false },
    { company_id: flipkart.id, role: 'SDE', level: 'SDE_II' as const, location: 'Delhi NCR', currency: 'INR' as const, experience_years: 3, base_salary: 2400000n, bonus: 300000n, stock: 700000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.8, is_verified: true },
    { company_id: flipkart.id, role: 'SDE', level: 'STAFF' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 12, base_salary: 6500000n, bonus: 1000000n, stock: 4500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.75, is_verified: false },

    // ── Meesho (3 records) ─────────────────────────────────────
    { company_id: meesho.id, role: 'Software Engineer', level: 'SDE_I' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 2, base_salary: 1500000n, bonus: 100000n, stock: 200000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.82, is_verified: true },
    { company_id: meesho.id, role: 'Software Engineer', level: 'SDE_II' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 4, base_salary: 2600000n, bonus: 300000n, stock: 600000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: meesho.id, role: 'Software Engineer', level: 'SDE_III' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 7, base_salary: 3800000n, bonus: 500000n, stock: 1200000n, source: 'SCRAPED' as const, confidence_score: 0.78, is_verified: false },

    // ── Razorpay (3 records) ───────────────────────────────────
    { company_id: razorpay.id, role: 'Software Engineer', level: 'SDE_I' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 2, base_salary: 1600000n, bonus: 150000n, stock: 250000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: razorpay.id, role: 'Software Engineer', level: 'SDE_II' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 5, base_salary: 2800000n, bonus: 400000n, stock: 800000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: razorpay.id, role: 'Software Engineer', level: 'SDE_III' as const, location: 'Pune', currency: 'INR' as const, experience_years: 8, base_salary: 4000000n, bonus: 600000n, stock: 1500000n, source: 'SCRAPED' as const, confidence_score: 0.8, is_verified: false },

    // ── Zepto (2 records) — few records edge case ──────────────
    { company_id: zepto.id, role: 'Software Engineer', level: 'SDE_I' as const, location: 'Mumbai', currency: 'INR' as const, experience_years: 1, base_salary: 1800000n, bonus: 200000n, stock: 400000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.8, is_verified: true },
    { company_id: zepto.id, role: 'Software Engineer', level: 'SDE_II' as const, location: 'Mumbai', currency: 'INR' as const, experience_years: 3, base_salary: 3000000n, bonus: 400000n, stock: 800000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.82, is_verified: true },

    // ── NVIDIA (3 records — stock-heavy comp) ──────────────────
    { company_id: nvidia.id, role: 'Software Engineer', level: 'L4' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 4, base_salary: 2800000n, bonus: 300000n, stock: 2500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: nvidia.id, role: 'Software Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 7, base_salary: 4000000n, bonus: 500000n, stock: 5000000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: nvidia.id, role: 'Software Engineer', level: 'L5' as const, location: 'Pune', currency: 'INR' as const, experience_years: 8, base_salary: 4200000n, bonus: 600000n, stock: 5500000n, source: 'SCRAPED' as const, confidence_score: 0.8, is_verified: false },

    // ── TCS (5 records — long company name edge case) ──────────
    { company_id: tcs.id, role: 'Software Engineer', level: 'L3' as const, location: 'Mumbai', currency: 'INR' as const, experience_years: 1, base_salary: 800000n, bonus: 50000n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.75, is_verified: true },
    { company_id: tcs.id, role: 'Software Engineer', level: 'L3' as const, location: 'Pune', currency: 'INR' as const, experience_years: 2, base_salary: 900000n, bonus: 60000n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.7, is_verified: false },
    { company_id: tcs.id, role: 'Software Engineer', level: 'L4' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 5, base_salary: 1400000n, bonus: 100000n, stock: 0n, source: 'SCRAPED' as const, confidence_score: 0.72, is_verified: false },
    // Zero bonus + zero stock edge case
    { company_id: tcs.id, role: 'Software Engineer', level: 'L4' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 6, base_salary: 1600000n, bonus: 0n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.68, is_verified: true },
    { company_id: tcs.id, role: 'Lead Engineer', level: 'L5' as const, location: 'Mumbai', currency: 'INR' as const, experience_years: 10, base_salary: 2400000n, bonus: 200000n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.78, is_verified: true },

    // ── Infosys (4 records) ────────────────────────────────────
    { company_id: infosys.id, role: 'Software Engineer', level: 'L3' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 1, base_salary: 850000n, bonus: 40000n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.72, is_verified: true },
    // Zero bonus + zero stock edge case
    { company_id: infosys.id, role: 'Software Engineer', level: 'L3' as const, location: 'Pune', currency: 'INR' as const, experience_years: 2, base_salary: 950000n, bonus: 0n, stock: 0n, source: 'SCRAPED' as const, confidence_score: 0.65, is_verified: false },
    { company_id: infosys.id, role: 'Software Engineer', level: 'L4' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 5, base_salary: 1500000n, bonus: 100000n, stock: 50000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.75, is_verified: true },
    { company_id: infosys.id, role: 'Lead Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 9, base_salary: 2200000n, bonus: 200000n, stock: 100000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.78, is_verified: true },

    // ── Wipro (2 records) ──────────────────────────────────────
    { company_id: wipro.id, role: 'Software Engineer', level: 'L3' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 1, base_salary: 750000n, bonus: 30000n, stock: 0n, source: 'CONTRIBUTOR' as const, confidence_score: 0.7, is_verified: true },
    { company_id: wipro.id, role: 'Software Engineer', level: 'L4' as const, location: 'Hyderabad', currency: 'INR' as const, experience_years: 4, base_salary: 1300000n, bonus: 80000n, stock: 0n, source: 'SCRAPED' as const, confidence_score: 0.65, is_verified: false },

    // ── Atlassian (3 records) ──────────────────────────────────
    { company_id: atlassian.id, role: 'Software Engineer', level: 'L4' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 4, base_salary: 3000000n, bonus: 400000n, stock: 1200000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.88, is_verified: true },
    { company_id: atlassian.id, role: 'Software Engineer', level: 'L5' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 7, base_salary: 4500000n, bonus: 600000n, stock: 2500000n, source: 'CONTRIBUTOR' as const, confidence_score: 0.85, is_verified: true },
    { company_id: atlassian.id, role: 'Software Engineer', level: 'L6' as const, location: 'Bengaluru', currency: 'INR' as const, experience_years: 11, base_salary: 6000000n, bonus: 1000000n, stock: 4000000n, source: 'SCRAPED' as const, confidence_score: 0.8, is_verified: false },
  ];

  // Insert all salary records with computed total_compensation
  for (const s of salaryData) {
    const total = s.base_salary + s.bonus + s.stock;
    await prisma.salary.create({
      data: {
        ...s,
        total_compensation: total,
      },
    });
  }

  const salaryCount = salaryData.length;
  console.log(`  Created ${salaryCount} salary records.\n`);
  console.log(`✅ Seed complete: 13 companies, ${salaryCount} salary records.`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
