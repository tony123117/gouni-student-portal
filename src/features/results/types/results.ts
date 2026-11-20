export type ResultsAvailability = 'available' | 'unavailable';

/**
 * Visual tone supplied by the university service. The portal never assigns a
 * meaning to an unknown status; a missing tone renders neutrally.
 */
export type ResultStatusTone =
  | 'neutral'
  | 'positive'
  | 'warning'
  | 'critical';

/**
 * A status label as returned by the university. The portal displays the label
 * verbatim and never translates an unknown code into an assumed meaning.
 */
export interface ResultStatus {
  label: string;
  tone: ResultStatusTone | null;
}

export interface ResultsStudent {
  fullName: string | null;
  matriculationNumber: string | null;
}

export interface ResultsAcademicContext {
  academicSession: string;
  semester: string;
  student: ResultsStudent | null;
  programme: string | null;
  department: string | null;
  faculty: string | null;
  level: string | null;
}

/**
 * Publication information supplied by the university.
 *
 * `published` is the service's own verdict. The portal never derives it from a
 * date, a status label, or the presence of scores. `null` means the university
 * did not supply a verdict.
 */
export interface ResultPublication {
  published: boolean | null;
  status: ResultStatus | null;
  date: string | null;
  message: string | null;
}

/**
 * A course result returned by the university.
 *
 * Every academic value is optional at the field level because institutions
 * publish different levels of detail. A missing value is displayed as not
 * supplied; the portal never fills it with zero, an inferred grade, or a
 * calculated total.
 */
export interface CourseResult {
  id: string;
  courseCode: string;
  courseTitle: string;
  creditUnits: number | null;
  continuousAssessmentScore: number | null;
  examinationScore: number | null;
  totalScore: number | null;
  letterGrade: string | null;
  gradePoint: number | null;
  remark: string | null;
  status: ResultStatus | null;
}

/**
 * Academic figures supplied by the university. The portal never calculates
 * GPA, CGPA, units, pass/fail counts, outstanding courses, or standing from
 * course rows.
 */
export interface ResultsSummary {
  semesterGpa: number | null;
  cumulativeGpa: number | null;
  registeredCreditUnits: number | null;
  earnedCreditUnits: number | null;
  passedCourses: number | null;
  failedCourses: number | null;
  outstandingCourses: number | null;
  academicStanding: string | null;
}

/**
 * One academic period for which the university can return results.
 */
export interface ResultPeriod {
  id: string;
  academicSession: string;
  semester: string;
  /** Optional publication label for the period history list. */
  publicationStatus: ResultStatus | null;
}

export interface ResultsCapabilities {
  /** Whether the portal may render a local, clearly labelled printout. */
  print: boolean;
  /** Whether an authenticated official statement operation is supported. */
  statementDownload: boolean;
}

/**
 * Descriptor for an official statement held by the university.
 *
 * The document itself is not exposed as a public URL. `downloadStatement` on
 * the service performs the authenticated retrieval.
 */
export interface ResultsDocument {
  fileName: string;
}

export interface ResultsSnapshot {
  availability: ResultsAvailability;
  message: string | null;
  /**
   * `null` means the university did not supply a period history. An empty
   * array means history was supplied but contains no periods.
   */
  periods: ResultPeriod[] | null;
  activePeriod: ResultPeriod | null;
  academicContext: ResultsAcademicContext | null;
  publication: ResultPublication | null;
  summary: ResultsSummary | null;
  results: CourseResult[];
  capabilities: ResultsCapabilities;
  document: ResultsDocument | null;
  lastUpdated: string | null;
}

export interface ResultsFilters {
  query: string;
  grade: string;
  status: string;
}

export interface ResultsFilterOptions {
  grades: string[];
  statuses: string[];
}

/**
 * A downloaded official statement. The blob is returned by an authenticated
 * service operation; no document is generated from portal-rendered data.
 */
export interface ResultsStatementDocument {
  blob: Blob;
  fileName: string;
}

export interface ResultsService {
  /**
   * Returns results for the selected period, or the university's default
   * period when `periodId` is null.
   *
   * Implementations must never invent sessions, semesters, courses, scores,
   * grades, GPA/CGPA values, academic standing, or publication status.
   */
  getResults(
    periodId: string | null,
    signal?: AbortSignal,
  ): Promise<ResultsSnapshot>;

  /**
   * Retrieves the university's official result statement for a period.
   *
   * Only called when the snapshot advertises `statementDownload` and supplies
   * a document descriptor. Authentication and authorization belong to the
   * live adapter and the university backend.
   */
  downloadStatement(
    periodId: string,
    signal?: AbortSignal,
  ): Promise<ResultsStatementDocument>;
}
