import type { SalaryRecord, LevelDistribution } from '@/types';

/**
 * Compute the true statistical median of an array of numbers.
 * For even-length arrays, returns the average of the two middle values.
 */
export function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }
  return sorted[mid];
}

/**
 * Compute min and max from an array of numbers.
 */
export function computeMinMax(values: number[]): { min: number; max: number } {
  if (values.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

/**
 * Compute level distribution from salary records.
 * Returns count per level.
 */
export function computeLevelDistribution(records: SalaryRecord[]): LevelDistribution {
  const distribution: LevelDistribution = {};
  for (const record of records) {
    const level = record.level_standardized;
    distribution[level] = (distribution[level] || 0) + 1;
  }
  return distribution;
}

/**
 * Compute all company stats from salary records.
 */
export function computeCompanyStats(records: SalaryRecord[]): {
  median_total_compensation: number;
  min_total_compensation: number;
  max_total_compensation: number;
  record_count: number;
  level_distribution: LevelDistribution;
} {
  const tcValues = records.map((r) => r.total_compensation);
  const { min, max } = computeMinMax(tcValues);
  return {
    median_total_compensation: computeMedian(tcValues),
    min_total_compensation: min,
    max_total_compensation: max,
    record_count: records.length,
    level_distribution: computeLevelDistribution(records),
  };
}
