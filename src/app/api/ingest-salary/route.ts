import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  validateIngestRequest,
  normalizeCompanyName,
} from '@/lib/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate request body
    const validation = validateIngestRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: true, errors: validation.errors },
        { status: 400 }
      );
    }

    // 2. Normalize company name for dedup
    const normalizedName = normalizeCompanyName(body.company as string);
    const companyDisplayName = (body.company as string).trim();
    const slug = normalizedName;

    // 3. Find or create company
    let company = await prisma.company.findFirst({
      where: { normalized_name: normalizedName },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyDisplayName,
          slug,
          normalized_name: normalizedName,
        },
      });
    }

    // 4. Recompute total_compensation — NEVER trust client-submitted value
    const baseSalary = BigInt(Math.round(Number(body.base_salary)));
    const bonus = BigInt(Math.round(Number(body.bonus || 0)));
    const stock = BigInt(Math.round(Number(body.stock || 0)));
    const totalComp = baseSalary + bonus + stock;

    // 5. Duplicate check: same company + role + level + location within 48h
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const duplicates = await prisma.salary.findMany({
      where: {
        company_id: company.id,
        role: (body.role as string).trim(),
        level: body.level as never,
        location: (body.location as string).trim(),
        submitted_at: { gte: fortyEightHoursAgo },
      },
    });

    const hasDuplicate = duplicates.some((d) => {
      const existingBase = Number(d.base_salary);
      const newBase = Number(baseSalary);
      if (existingBase === 0) return false;
      const diff = Math.abs(existingBase - newBase) / existingBase;
      return diff < 0.1;
    });

    if (hasDuplicate) {
      return NextResponse.json(
        {
          error: true,
          message:
            'A similar salary record for this company, role, level, and location was submitted within the last 48 hours.',
        },
        { status: 409 }
      );
    }

    // 6. Create salary record
    const salary = await prisma.salary.create({
      data: {
        company_id: company.id,
        role: (body.role as string).trim(),
        level: body.level as never,
        location: (body.location as string).trim(),
        currency: body.currency as never,
        experience_years: Number(body.experience_years),
        base_salary: baseSalary,
        bonus,
        stock,
        total_compensation: totalComp,
        source: (body.source as never) || 'CONTRIBUTOR',
        confidence_score: Number(body.confidence_score),
        is_verified: false,
      },
      include: { company: true },
    });

    // 7. Serialize BigInt for JSON response
    const serialized = {
      ...salary,
      base_salary: Number(salary.base_salary),
      bonus: Number(salary.bonus),
      stock: Number(salary.stock),
      total_compensation: Number(salary.total_compensation),
    };

    return NextResponse.json(serialized, { status: 201 });
  } catch (error) {
    console.error('POST /api/ingest-salary error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
