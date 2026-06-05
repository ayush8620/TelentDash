import type { LevelStandardized } from '@/types';
import { LEVEL_COLORS } from '@/lib/constants';

interface LevelBadgeProps {
  level: LevelStandardized;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const colors = LEVEL_COLORS[level];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide ${colors.bg} ${colors.text}`}
    >
      {level}
    </span>
  );
}
