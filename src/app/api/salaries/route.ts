import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const company = searchParams.get('company') || undefined;
    const role = searchParams.get('role') || undefined;
    const level = searchParams.get('level') || undefined;
    const location = searchParams.get('location') || undefined;
    const currency = searchParams.get('currency') || undefined;
    const sort = searchParams.get('sort') || 'total_comp_desc';
    const page = Math.max(
      1,
      parseInt(searchParams.get('page') || '1', 10) || 1
    );
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get('limit') || '25', 10) || 25)
    );

    // Build where clause dynamically
    const where: Record<string, unknown> = {};

    if (company) {
      where.company = {
        OR: [
          { name: { contains: company, mode: 'insensitive' } },
          {
            normalized_name: {
              contains: company.toLowerCase(),
              mode: 'insensitive',
            },
          },
        ],
      };
    }
    if (role) {
      where.role = { contains: role, mode: 'insensitive' };
    }
    if (level) {
      where.level = level;
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    if (currency) {
      where.currency = currency;
    }

    // Sort mapping
    let orderBy: Record<string, string> = {};
    switch (sort) {
      case 'total_comp_asc':
        orderBy = { total_compensation: 'asc' };
        break;
      case 'date_desc':
        orderBy = { submitted_at: 'desc' };
        break;
      case 'base_asc':
        orderBy = { base_salary: 'asc' };
        break;
      case 'base_desc':
        orderBy = { base_salary: 'desc' };
        break;
      case 'total_comp_desc':
      default:
        orderBy = { total_compensation: 'desc' };
        break;
    }

    // Parallel count + query for efficient pagination
    const [total, salaries] = await Promise.all([
      prisma.salary.count({ where: where as never }),
      prisma.salary.findMany({
        where: where as never,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: { company: true },
      }),
    ]);

    // Serialize BigInt fields for JSON
    const data = salaries.map((s) => ({
      ...s,
      base_salary: Number(s.base_salary),
      bonus: Number(s.bonus),
      stock: Number(s.stock),
      total_compensation: Number(s.total_compensation),
    }));

    const response = NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

    // CDN cache headers: 5 min fresh, 1 hour stale
    response.headers.set(
      'Cache-Control',
      's-maxage=300, stale-while-revalidate=3600'
    );

    return response;
  } catch (error) {
    console.error('GET /api/salaries error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
