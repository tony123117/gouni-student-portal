import { formatNaira } from '@/utils/format';
import { formatPaymentDate } from './format';

export function formatInvoiceDate(value: string | null): string {
  if (!value) {
    return 'Not supplied';
  }

  const formatted = formatPaymentDate(value);

  return formatted === '—' ? 'Not supplied' : formatted;
}

export function formatInvoiceAmount(value: number | null): string {
  return value === null ? 'Not supplied' : formatNaira(value);
}

export function displayInvoiceValue(value: string | null): string {
  const normalized = value?.trim();

  return normalized ? normalized : 'Not supplied';
}

export function hasInvoiceValue(
  value: string | null | undefined,
): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Only an HTTPS destination supplied by the university may enable the
 * e-Transact action. No payment URL is constructed locally.
 */
export function getSafePaymentDestination(
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
