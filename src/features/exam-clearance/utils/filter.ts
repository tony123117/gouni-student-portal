import type {
  ClearanceFilterOptions,
  ClearanceFilters,
  ClearanceRequirement,
} from '../types/exam-clearance';

function uniqueSuppliedText(values: Array<string | null>): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => Boolean(value?.trim()))),
  );
}

/**
 * Builds filter choices only from values the service actually returned. No
 * category or status vocabulary is hardcoded by the portal.
 */
export function getClearanceFilterOptions(
  requirements: ClearanceRequirement[],
): ClearanceFilterOptions {
  return {
    statuses: uniqueSuppliedText(
      requirements.map((requirement) => requirement.status?.label ?? null),
    ),
    categories: uniqueSuppliedText(
      requirements.map((requirement) => requirement.category),
    ),
  };
}

export function hasActiveClearanceFilters(
  filters: ClearanceFilters,
): boolean {
  return (
    filters.query.trim() !== '' ||
    filters.status !== 'all' ||
    filters.category !== 'all'
  );
}

export function filterClearanceRequirements(
  requirements: ClearanceRequirement[],
  filters: ClearanceFilters,
): ClearanceRequirement[] {
  const query = filters.query.trim().toLowerCase();

  return requirements.filter((requirement) => {
    if (query) {
      const haystack = [
        requirement.title,
        requirement.description,
        requirement.category,
        requirement.responsibleOffice,
        requirement.verificationMessage,
        requirement.action?.type ?? null,
        requirement.action?.label ?? null,
      ]
        .filter((value): value is string => Boolean(value?.trim()))
        .join(' ')
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }

    if (
      filters.status !== 'all' &&
      (requirement.status?.label ?? null) !== filters.status
    ) {
      return false;
    }

    if (
      filters.category !== 'all' &&
      (requirement.category ?? null) !== filters.category
    ) {
      return false;
    }

    return true;
  });
}
