import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const s1 = searchParams.get('s1');
    const s2 = searchParams.get('s2');

    if (!s1 || !s2) {
      return NextResponse.json(
        {
          error: true,
          message: 'Both s1 and s2 query parameters are required.',
        },
        { status: 400 }
      );
    }

    if (s1 === s2) {
      return NextResponse.json(
        {
          error: true,
          message:
            'Cannot compare a record with itself. s1 and s2 must be different.',
        },
        { status: 400 }
      );
    }

    const [record1, record2] = await Promise.all([
      prisma.salary.findUnique({
        where: { id: s1 },
        include: { company: true },
      }),
      prisma.salary.findUnique({
        where: { id: s2 },
        include: { company: true },
      }),
    ]);

    if (!record1) {
      return NextResponse.json(
        { error: true, message: `Salary record with id '${s1}' not found.` },
        { status: 404 }
      );
    }
    if (!record2) {
      return NextResponse.json(
        { error: true, message: `Salary record with id '${s2}' not found.` },
        { status: 404 }
      );
    }

    // Serialize BigInt
    const serialize = (r: NonNullable<typeof record1>) => ({
      ...r,
      base_salary: Number(r.base_salary),
      bonus: Number(r.bonus),
      stock: Number(r.stock),
      total_compensation: Number(r.total_compensation),
    });

    const r1 = serialize(record1);
    const r2 = serialize(record2);

    return NextResponse.json({
      record_1: r1,
      record_2: r2,
      delta: {
        base_delta: r1.base_salary - r2.base_salary,
        bonus_delta: r1.bonus - r2.bonus,
        stock_delta: r1.stock - r2.stock,
        tc_delta: r1.total_compensation - r2.total_compensation,
        experience_delta: r1.experience_years - r2.experience_years,
      },
    });
  } catch (error) {
    console.error('GET /api/compare error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
