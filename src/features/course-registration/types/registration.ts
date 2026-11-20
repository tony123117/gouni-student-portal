export type RegistrationAvailability = 'available' | 'unavailable';

/**
 * Visual tone supplied by the university service. The portal never assigns a
 * tone to an unknown status code on its own; a missing tone renders neutrally.
 */
export type RegistrationStatusTone =
  | 'neutral'
  | 'positive'
  | 'warning'
  | 'critical';

/**
 * A registration status as labelled by the university service. The portal
 * never translates an unknown code into an assumed meaning.
 */
export interface RegistrationStatus {
  code: string;
  label: string;
  description: string | null;
  tone: RegistrationStatusTone | null;
}

export interface RegistrationStudent {
  id: string;
  fullName: string;
  matricNumber: string | null;
  department: string | null;
  level: string | null;
}

export interface RegistrationTerm {
  academicSession: string;
  semester: string;
}

/**
 * Eligibility as returned by the university. `null` at the snapshot level
 * means the university did not supply an eligibility decision, and submission
 * must stay disabled.
 */
export interface RegistrationEligibility {
  eligible: boolean;
  reason: string | null;
}

/**
 * Registration period supplied by the service. The portal displays these
 * values but never computes open/closed state from them; only
 * `capabilities.submission` decides whether submission is offered.
 */
export interface RegistrationPeriod {
  label: string | null;
  opensAt: string | null;
  closesAt: string | null;
}

/**
 * A course in the official catalogue for the current term. `selectable` and
 * `unavailableReason` are the service's own verdict; the portal does not infer
 * availability from dates, levels, departments, or prerequisites.
 */
export interface RegistrationCourse {
  id: string;
  code: string;
  title: string;
  creditUnits: number;
  description: string | null;
  department: string | null;
  level: string | null;
  classification: string | null;
  requirement: 'compulsory' | 'elective' | null;
  /** Null means the university did not supply prerequisite information. */
  prerequisites: string[] | null;
  /**
   * The service's prerequisite verdict for this student. Null means the
   * service did not supply a verdict; the portal never evaluates prerequisite
   * text itself.
   */
  prerequisiteSatisfied: boolean | null;
  /** Service-supplied availability label, shown verbatim when present. */
  registrationStatus: string | null;
  selectable: boolean;
  unavailableReason: string | null;
}

/**
 * Credit-unit rules supplied by the university. Null means no rule was
 * supplied; the portal never invents a minimum or maximum.
 */
export interface RegistrationCreditRules {
  minimumCreditUnits: number | null;
  maximumCreditUnits: number | null;
}

export interface RegisteredCourse {
  id: string;
  code: string;
  title: string;
  creditUnits: number;
}

/**
 * An official confirmation document. Only rendered when the service supplies
 * one; the portal never generates a registration receipt.
 */
export interface RegistrationConfirmationDocument {
  fileName: string;
  downloadUrl: string;
}

export interface RegistrationRecord {
  id: string;
  reference: string;
  term: RegistrationTerm;
  submissionDate: string;
  courses: RegisteredCourse[];
  totalCreditUnits: number | null;
  status: RegistrationStatus;
  feedback: string | null;
  confirmation: RegistrationConfirmationDocument | null;
}

export interface RegistrationHistorySnapshot {
  availability: RegistrationAvailability;
  message: string | null;
  records: RegistrationRecord[];
}

export interface RegistrationSnapshot {
  availability: RegistrationAvailability;
  message: string | null;
  student: RegistrationStudent | null;
  term: RegistrationTerm | null;
  status: RegistrationStatus | null;
  eligibility: RegistrationEligibility | null;
  period: RegistrationPeriod | null;
  courses: RegistrationCourse[];
  rules: RegistrationCreditRules;
  warnings: string[];
  restrictions: string[];
  /**
   * Service-supplied explanation for why submission is not currently offered.
   * Never generated from assumed rules.
   */
  submissionBlockedReason: string | null;
  currentRegistration: RegistrationRecord | null;
  history: RegistrationHistorySnapshot;
  capabilities: {
    submission: boolean;
    confirmationDownload: boolean;
  };
}

/**
 * The request intentionally omits student identity. A future live adapter must
 * derive the student from the authenticated session; client-supplied identity
 * must never be trusted for registration.
 */
export interface RegistrationSubmissionRequest {
  academicSession: string;
  semester: string;
  courseIds: string[];
}

/**
 * A resolved submission means the service confirmed receipt. It does not mean
 * the registration was approved; the official status is displayed exactly as
 * returned.
 */
export interface RegistrationSubmissionResult {
  reference: string | null;
  status: RegistrationStatus;
  message: string | null;
}

export interface RegistrationService {
  /**
   * Returns the official registration context: term, student details (when
   * supplied), eligibility, available courses, credit rules, current
   * registration, and history.
   *
   * Implementations must never invent students, courses, eligibility verdicts,
   * academic rules, or registrations.
   */
  getRegistrationContext(
    signal?: AbortSignal,
  ): Promise<RegistrationSnapshot>;

  /**
   * Submits a course selection for the current term.
   *
   * The server owns authorization, prerequisite checks, credit-unit limits,
   * idempotency, and final approval. The portal's validation is for usability
   * only.
   */
  submitRegistration(
    request: RegistrationSubmissionRequest,
    signal?: AbortSignal,
  ): Promise<RegistrationSubmissionResult>;
}
