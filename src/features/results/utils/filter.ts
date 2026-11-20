import type {
  CourseResult,
  ResultsFilterOptions,
  ResultsFilters,
} from '../types/results';

export interface ResultColumnAvailability {
  continuousAssessment: boolean;
  examination: boolean;
  total: boolean;
  letterGrade: boolean;
  gradePoint: boolean;
  remark: boolean;
}

function uniqueSuppliedText(values: Array<string | null>): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => Boolean(value?.trim()))),
  );
}

/**
 * Builds filter choices from values the service actually returned. No grade or
 * status vocabulary is hardcoded by the portal.
 */
export function getResultFilterOptions(
  results: CourseResult[],
): ResultsFilterOptions {
  return {
    grades: uniqueSuppliedText(results.map((result) => result.letterGrade)),
    statuses: uniqueSuppliedText(
      results.map((result) => result.status?.label ?? null),
    ),
  };
}

export function hasActiveResultFilters(filters: ResultsFilters): boolean {
  return (
    filters.query.trim() !== '' ||
    filters.grade !== 'all' ||
    filters.status !== 'all'
  );
}

export function filterCourseResults(
  results: CourseResult[],
  filters: ResultsFilters,
): CourseResult[] {
  const query = filters.query.trim().toLowerCase();

  return results.filter((result) => {
    if (query) {
      const haystack =
        `${result.courseCode} ${result.courseTitle}`.toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }

    if (filters.grade !== 'all' && result.letterGrade !== filters.grade) {
      return false;
    }

    if (
      filters.status !== 'all' &&
      (result.status?.label ?? null) !== filters.status
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Determines which optional columns contain at least one supplied value. A
 * column for a field the contract does not support is never rendered.
 */
export function getResultColumnAvailability(
  results: CourseResult[],
): ResultColumnAvailability {
  return {
    continuousAssessment: results.some(
      (result) => result.continuousAssessmentScore !== null,
    ),
    examination: results.some(
      (result) => result.examinationScore !== null,
    ),
    total: results.some((result) => result.totalScore !== null),
    letterGrade: results.some((result) => result.letterGrade !== null),
    gradePoint: results.some((result) => result.gradePoint !== null),
    remark: results.some((result) => Boolean(result.remark?.trim())),
  };
}
