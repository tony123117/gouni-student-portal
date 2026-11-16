export function formatNaira(amount: number | null): string {
  if (amount === null) {
    return '—';
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}
