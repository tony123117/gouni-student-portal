const registrationDateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

export function formatRegistrationDate(value: string | null): string {
  if (!value) {
    return '—';
  }

  const date = new Date(
    dateOnlyPattern.test(value) ? `${value}T00:00:00` : value,
  );

  return Number.isNaN(date.getTime())
    ? '—'
    : registrationDateFormatter.format(date);
}

export function formatCreditUnits(value: number): string {
  return `${value} ${value === 1 ? 'unit' : 'units'}`;
}

/**
 * Describes only the credit-unit rules actually supplied by the university.
 * A null rule is never replaced with a guessed default.
 */
export function describeCreditLimits(
  minimumCreditUnits: number | null,
  maximumCreditUnits: number | null,
): string | null {
  if (minimumCreditUnits !== null && maximumCreditUnits !== null) {
    return `${minimumCreditUnits}–${maximumCreditUnits} credit units`;
  }

  if (maximumCreditUnits !== null) {
    return `Maximum ${maximumCreditUnits} credit units`;
  }

  if (minimumCreditUnits !== null) {
    return `Minimum ${minimumCreditUnits} credit units`;
  }

  return null;
}
