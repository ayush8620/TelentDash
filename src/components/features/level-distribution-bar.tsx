import type { LevelDistribution } from '@/types';
import { LEVEL_ORDER, LEVEL_BAR_COLORS } from '@/lib/constants';

interface LevelDistributionBarProps {
  distribution: LevelDistribution;
  totalRecords: number;
}

export function LevelDistributionBar({ distribution, totalRecords }: LevelDistributionBarProps) {
  const activeLevels = LEVEL_ORDER.filter((level) => (distribution[level] || 0) > 0);

  if (activeLevels.length === 0) return null;

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-8">
      <h3 className="text-sm font-semibold text-deep mb-4">Level Distribution</h3>

      {/* Stacked horizontal bar */}
      <div className="h-8 rounded-lg overflow-hidden flex mb-4">
        {activeLevels.map((level) => {
          const count = distribution[level] || 0;
          const percentage = (count / totalRecords) * 100;
          return (
            <div
              key={level}
              className="relative group flex items-center justify-center transition-opacity hover:opacity-90"
              style={{
                width: `${Math.max(percentage, 3)}%`,
                backgroundColor: LEVEL_BAR_COLORS[level],
              }}
            >
              {percentage >= 10 && (
                <span className="text-white text-xs font-medium">{level}</span>
              )}
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-deep text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {level}: {count} ({percentage.toFixed(0)}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {activeLevels.map((level) => {
          const count = distribution[level] || 0;
          const percentage = (count / totalRecords) * 100;
          return (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: LEVEL_BAR_COLORS[level] }}
              />
              <span className="text-xs text-body">
                {level}: {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
