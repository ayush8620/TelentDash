import type { LevelStandardized } from '@/types';

// Currency conversion rates
export const CURRENCY_RATES = {
  INR_TO_USD: 0.012,
  USD_TO_INR: 83.5,
} as const;

// Pagination
export const ITEMS_PER_PAGE = 25;
export const MAX_ITEMS_PER_PAGE = 100;

// Level badge colors - Tailwind class mappings
export const LEVEL_COLORS: Record<LevelStandardized, { bg: string; text: string }> = {
  'L3': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'SDE-I': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'L4': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'SDE-II': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'L5': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'SDE-III': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'L6': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Staff': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Principal': { bg: 'bg-[#1e3a5f]/10', text: 'text-[#1e3a5f]' },
} as const;

// All valid levels
export const ALL_LEVELS: LevelStandardized[] = [
  'L3', 'L4', 'L5', 'L6', 'SDE-I', 'SDE-II', 'SDE-III', 'Staff', 'Principal',
];

// Level display order for distribution bars
export const LEVEL_ORDER: LevelStandardized[] = [
  'L3', 'SDE-I', 'L4', 'SDE-II', 'L5', 'SDE-III', 'L6', 'Staff', 'Principal',
];

// Level colors for distribution bar (actual hex values)
export const LEVEL_BAR_COLORS: Record<LevelStandardized, string> = {
  'L3': '#64748b',
  'SDE-I': '#64748b',
  'L4': '#3b82f6',
  'SDE-II': '#3b82f6',
  'L5': '#6366f1',
  'SDE-III': '#6366f1',
  'L6': '#a855f7',
  'Staff': '#a855f7',
  'Principal': '#1e3a5f',
};

// Debounce delay for search input
export const SEARCH_DEBOUNCE_MS = 300;
