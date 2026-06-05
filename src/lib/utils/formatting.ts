import type { Currency } from '@/types';
import { CURRENCY_RATES } from '@/lib/constants';

/**
 * Format a number in the Indian numbering system (lakhs, crores)
 * e.g., 4200000 → "42,00,000"
 */
export function formatIndianNumber(num: number): string {
  const numStr = Math.round(num).toString();
  // Last 3 digits, then groups of 2
  if (numStr.length <= 3) return numStr;

  const lastThree = numStr.slice(-3);
  const remaining = numStr.slice(0, -3);
  const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return formatted + ',' + lastThree;
}

/**
 * Format a number in US comma system
 * e.g., 180000 → "180,000"
 */
export function formatUSNumber(num: number): string {
  return Math.round(num).toLocaleString('en-US');
}

/**
 * Format salary with currency symbol
 * INR: ₹42,00,000
 * USD: $180,000
 */
export function formatSalary(amount: number, currency: Currency): string {
  if (amount === 0) return currency === 'INR' ? '₹0' : '$0';
  if (currency === 'INR') {
    return `₹${formatIndianNumber(amount)}`;
  }
  return `$${formatUSNumber(amount)}`;
}

/**
 * Format salary in compact form
 * INR: ₹42L, ₹1.5Cr
 * USD: $180K, $1.2M
 */
export function formatSalaryCompact(amount: number, currency: Currency): string {
  if (currency === 'INR') {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)}Cr`;
    }
    if (amount >= 100000) {
      const l = amount / 100000;
      return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
    }
    return formatSalary(amount, currency);
  }
  // USD
  if (amount >= 1000000) {
    const m = amount / 1000000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return formatSalary(amount, currency);
}

/**
 * Convert between currencies
 */
export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;
  if (from === 'INR' && to === 'USD') return Math.round(amount * CURRENCY_RATES.INR_TO_USD);
  if (from === 'USD' && to === 'INR') return Math.round(amount * CURRENCY_RATES.USD_TO_INR);
  return amount;
}

/**
 * Format experience years
 */
export function formatExperience(years: number): string {
  if (years === 1) return '1 yr';
  return `${years} yrs`;
}

/**
 * Format delta with sign and color class
 */
export function formatDelta(amount: number, currency: Currency): { text: string; colorClass: string } {
  const formatted = formatSalary(Math.abs(amount), currency);
  if (amount > 0) return { text: `+${formatted}`, colorClass: 'text-[#008A05]' };
  if (amount < 0) return { text: `-${formatted}`, colorClass: 'text-[#D93025]' };
  return { text: formatted, colorClass: 'text-[#717171]' };
}
