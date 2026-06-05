import type { SalaryRecord, ComparisonDelta, Currency } from '@/types';
import { LevelBadge } from '@/components/ui/level-badge';
import { formatSalary, formatExperience, formatDelta } from '@/lib/utils/formatting';

interface CompareCardProps {
  record1: SalaryRecord;
  record2: SalaryRecord;
  delta: ComparisonDelta;
  currency: Currency;
}

interface CompareRowProps {
  label: string;
  value1: string | React.ReactNode;
  value2: string | React.ReactNode;
  deltaText?: string;
  deltaColor?: string;
  isHighlight?: boolean;
}

function CompareRow({ label, value1, value2, deltaText, deltaColor, isHighlight }: CompareRowProps) {
  return (
    <div
      className={`grid grid-cols-4 gap-4 py-3 px-4 ${isHighlight ? 'bg-[#0369A1]/5' : ''}`}
    >
      <div className="text-xs font-medium text-muted uppercase tracking-wider self-center">
        {label}
      </div>
      <div
        className={`text-sm ${
          isHighlight ? 'text-data-blue font-bold text-base' : 'text-deep font-medium'
        }`}
      >
        {value1}
      </div>
      <div
        className={`text-sm ${
          isHighlight ? 'text-data-blue font-bold text-base' : 'text-deep font-medium'
        }`}
      >
        {value2}
      </div>
      <div className={`text-sm font-medium self-center ${deltaColor || 'text-muted'}`}>
        {deltaText || '—'}
      </div>
    </div>
  );
}

export function CompareCard({ record1, record2, delta, currency }: CompareCardProps) {
  const baseDelta = formatDelta(delta.base_delta, currency);
  const bonusDelta = formatDelta(delta.bonus_delta, currency);
  const stockDelta = formatDelta(delta.stock_delta, currency);
  const tcDelta = formatDelta(delta.tc_delta, currency);
  const expDelta = delta.experience_delta;

  const winner = delta.tc_delta > 0 ? 1 : delta.tc_delta < 0 ? 2 : 0;

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 py-3 px-4 bg-background border-b border-border">
        <div className="text-xs font-semibold text-muted uppercase tracking-wider">Field</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-deep">{record1.company}</span>
          {winner === 1 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0369A1]/10 text-data-blue">
              Higher TC
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-deep">{record2.company}</span>
          {winner === 2 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0369A1]/10 text-data-blue">
              Higher TC
            </span>
          )}
        </div>
        <div className="text-xs font-semibold text-muted uppercase tracking-wider">Delta</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        <CompareRow label="Role" value1={record1.role} value2={record2.role} />
        <div className="grid grid-cols-4 gap-4 py-3 px-4">
          <div className="text-xs font-medium text-muted uppercase tracking-wider self-center">
            Level
          </div>
          <div>
            <LevelBadge level={record1.level_standardized} />
          </div>
          <div>
            <LevelBadge level={record2.level_standardized} />
          </div>
          <div></div>
        </div>
        <CompareRow label="Location" value1={record1.location} value2={record2.location} />
        <CompareRow
          label="Experience"
          value1={formatExperience(record1.experience_years)}
          value2={formatExperience(record2.experience_years)}
          deltaText={
            expDelta !== 0 ? `${expDelta > 0 ? '+' : ''}${expDelta} yrs` : '—'
          }
          deltaColor="text-muted"
        />
        <CompareRow
          label="Base Salary"
          value1={formatSalary(record1.base_salary, currency)}
          value2={formatSalary(record2.base_salary, currency)}
          deltaText={baseDelta.text}
          deltaColor={baseDelta.colorClass}
        />
        <CompareRow
          label="Bonus"
          value1={record1.bonus > 0 ? formatSalary(record1.bonus, currency) : '—'}
          value2={record2.bonus > 0 ? formatSalary(record2.bonus, currency) : '—'}
          deltaText={bonusDelta.text}
          deltaColor={bonusDelta.colorClass}
        />
        <CompareRow
          label="Stock"
          value1={record1.stock > 0 ? formatSalary(record1.stock, currency) : '—'}
          value2={record2.stock > 0 ? formatSalary(record2.stock, currency) : '—'}
          deltaText={stockDelta.text}
          deltaColor={stockDelta.colorClass}
        />
        <CompareRow
          label="Total Comp"
          value1={formatSalary(record1.total_compensation, currency)}
          value2={formatSalary(record2.total_compensation, currency)}
          deltaText={tcDelta.text}
          deltaColor={tcDelta.colorClass}
          isHighlight
        />
      </div>
    </div>
  );
}
