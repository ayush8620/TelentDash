import { getAllSalaryRecords } from '@/lib/queries';
import ComparePageClient from '@/components/features/compare-page-client';

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function ComparePage() {
  const records = await getAllSalaryRecords();
  return <ComparePageClient records={records} />;
}
