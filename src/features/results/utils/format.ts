import type { ResultPeriod } from '../types/results';

const resultDateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Formats a service-supplied date without inventing a value. Missing or
 * invalid dates are rendered as an em dash.
 */
export function formatResultDate(value: string | null): string {
  if (!value) {
    return '—';
  }

  const date = new Date(
    dateOnlyPattern.test(value) ? `${value}T00:00:00` : value,
  );

  return Number.isNaN(date.getTime()) ? '—' : resultDateFormatter.format(date);
}

/**
 * Displays a number exactly as supplied by the service. No rounding, scaling,
 * or score-boundary interpretation is applied.
 */
export function formatSuppliedNumber(value: number | null): string {
  return value !== null && Number.isFinite(value) ? String(value) : '—';
}

export function formatSuppliedText(value: string | null): string {
  return value && value.trim() ? value : '—';
}

export function getPeriodLabel(period: ResultPeriod): string {
  if (period.academicSession && period.semester) {
    return `${period.academicSession} · ${period.semester}`;
  }

  return period.academicSession || period.semester || 'Academic period';
}

/**
 * Keeps a university-supplied file name usable as a browser download name.
 * Path separators and control characters are removed; the value is never used
 * as a server path.
 */
export function getSafeDownloadFileName(
  fileName: string,
  fallback: string,
): string {
  const cleaned = fileName
    .trim()
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-')
    .replace(/\s+/g, ' ')
    .slice(0, 120)
    .trim();

  return cleaned || fallback;
}
