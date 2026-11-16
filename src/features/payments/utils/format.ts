const paymentDateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

export function formatPaymentDate(value: string): string {
  if (!value) {
    return '—';
  }

  const date = new Date(
    dateOnlyPattern.test(value) ? `${value}T00:00:00` : value,
  );

  return Number.isNaN(date.getTime()) ? '—' : paymentDateFormatter.format(date);
}
