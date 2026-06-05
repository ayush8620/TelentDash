import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }
  return sorted[mid];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const company = await prisma.company.findUnique({
      where: { slug },
      include: {
        salaries: {
          orderBy: { total_compensation: 'desc' },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: true, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Compute compensation stats
    const tcValues = company.salaries.map((s) => Number(s.total_compensation));
    const medianTC = computeMedian(tcValues);

    // Level distribution
    const levelDist: Record<string, number> = {};
    for (const s of company.salaries) {
      levelDist[s.level] = (levelDist[s.level] || 0) + 1;
    }

    // Serialize BigInt
    const salaries = company.salaries.map((s) => ({
      ...s,
      base_salary: Number(s.base_salary),
      bonus: Number(s.bonus),
      stock: Number(s.stock),
      total_compensation: Number(s.total_compensation),
    }));

    const response = NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
        industry: company.industry,
        headquarters: company.headquarters,
        founded_year: company.founded_year,
        headcount_range: company.headcount_range,
      },
      salaries,
      median_total_compensation: medianTC,
      min_total_compensation: tcValues.length > 0 ? Math.min(...tcValues) : 0,
      max_total_compensation: tcValues.length > 0 ? Math.max(...tcValues) : 0,
      level_distribution: levelDist,
      record_count: salaries.length,
    });

    // Company data changes rarely: 1 hour fresh, 24 hour stale
    response.headers.set(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    );

    return response;
  } catch (error) {
    console.error('GET /api/companies/:slug error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
