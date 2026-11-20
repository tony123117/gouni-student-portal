const clearanceDateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Formats a service-supplied date without inventing a value. Missing or
 * invalid dates are reported as not supplied.
 */
export function formatClearanceDate(value: string | null): string {
  if (!value) {
    return 'Not supplied';
  }

  const date = new Date(
    dateOnlyPattern.test(value) ? `${value}T00:00:00` : value,
  );

  return Number.isNaN(date.getTime())
    ? 'Not supplied'
    : clearanceDateFormatter.format(date);
}

/**
 * Formats an outstanding amount only when the university supplies it. The
 * portal does not calculate balances or assume a currency. When no currency
 * code is supplied, the exact number is displayed without a currency symbol.
 */
export function formatClearanceAmount(
  amount: number | null,
  currency: string | null,
): string {
  if (amount === null || !Number.isFinite(amount)) {
    return 'Not supplied';
  }

  const currencyCode = currency?.trim().toUpperCase();

  if (currencyCode) {
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${amount} ${currencyCode}`;
    }
  }

  return new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatClearanceCount(value: number | null): string {
  return value !== null && Number.isFinite(value) ? String(value) : 'Not supplied';
}

/**
 * Only an HTTPS destination supplied by the university may enable a
 * requirement action. No action URL is constructed locally.
 */
export function getSafeActionDestination(
  value: string | null,
): string | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== 'https:' || !url.hostname) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Keeps a university-supplied file name usable as a browser download name.
 * Path separators and control characters are removed; the value is never used
 * as a server path.
 */
export function getSafeDocumentFileName(
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
