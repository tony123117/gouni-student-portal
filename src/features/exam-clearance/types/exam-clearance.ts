export type ClearanceAvailability = 'available' | 'unavailable';

/**
 * Visual tone supplied by the university service. The portal never assigns a
 * tone to an unknown status on its own; a missing tone renders neutrally.
 */
export type ClearanceStatusTone =
  | 'neutral'
  | 'positive'
  | 'warning'
  | 'critical';

/**
 * A clearance status as labelled by the university. The portal displays the
 * label verbatim and never translates an unknown code into an assumed meaning.
 */
export interface ClearanceStatus {
  label: string;
  description: string | null;
  tone: ClearanceStatusTone | null;
}

export interface ClearanceStudent {
  fullName: string | null;
  matriculationNumber: string | null;
}

export interface ClearanceAcademicContext {
  academicSession: string;
  semester: string;
  student: ClearanceStudent | null;
  programme: string | null;
  department: string | null;
  faculty: string | null;
  level: string | null;
}

/**
 * Overall clearance information supplied by the university.
 *
 * `cleared` and `eligibleForExaminations` are the service's own verdicts. The
 * portal never derives either verdict from requirement statuses, counts, or
 * the presence of supporting documents. `null` means the university did not
 * supply that verdict.
 */
export interface ClearanceOverallStatus {
  cleared: boolean | null;
  eligibleForExaminations: boolean | null;
  status: ClearanceStatus | null;
  message: string | null;
  lastVerifiedAt: string | null;
  outstandingRequirementCount: number | null;
  completedRequirementCount: number | null;
}

/**
 * Information about a supporting document held by the university.
 *
 * The document itself is never exposed as a public URL. When downloads are
 * enabled, the service retrieves the authenticated file.
 */
export interface ClearanceSupportingDocument {
  id: string;
  label: string;
  fileName: string | null;
  description: string | null;
}

/**
 * An action the university asks the student to take.
 *
 * `type` is a service-supplied action category and is displayed verbatim. The
 * portal only opens an HTTPS destination supplied by the service; it never
 * constructs an action URL.
 */
export interface ClearanceRequirementAction {
  type: string;
  label: string;
  description: string | null;
  destination: string | null;
}

/**
 * A clearance requirement determined by the university.
 *
 * Every value is optional at the field level except the identity and title.
 * Missing values stay missing; the portal never invents amounts, due dates,
 * offices, actions, or documents.
 */
export interface ClearanceRequirement {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  responsibleOffice: string | null;
  status: ClearanceStatus | null;
  verificationMessage: string | null;
  outstandingAmount: number | null;
  /** ISO 4217 code when supplied. The portal does not assume a currency. */
  currency: string | null;
  dueDate: string | null;
  lastUpdatedAt: string | null;
  action: ClearanceRequirementAction | null;
  documents: ClearanceSupportingDocument[];
}

export interface ClearanceCapabilities {
  /** Whether the university supports submitting a clearance request. */
  requestSubmission: boolean;
  /** Whether authenticated supporting-document downloads are supported. */
  documentDownload: boolean;
}

export interface ClearanceSnapshot {
  availability: ClearanceAvailability;
  message: string | null;
  academicContext: ClearanceAcademicContext | null;
  /** `null` means the university did not supply an overall clearance status. */
  overallStatus: ClearanceOverallStatus | null;
  /**
   * `null` means the university did not supply a requirement list. An empty
   * array means a list was supplied and contains no requirements.
   */
  requirements: ClearanceRequirement[] | null;
  capabilities: ClearanceCapabilities;
  /**
   * Service-supplied explanation for why a clearance request cannot be
   * submitted. Never generated from assumed eligibility.
   */
  requestBlockedReason: string | null;
  lastUpdated: string | null;
}

export interface ClearanceFilters {
  query: string;
  status: string;
  category: string;
}

export interface ClearanceFilterOptions {
  statuses: string[];
  categories: string[];
}

/**
 * A resolved request means the university confirmed receipt. It does not mean
 * the student is cleared, eligible, or approved for examinations.
 */
export interface ClearanceRequestResult {
  reference: string | null;
  status: ClearanceStatus;
  message: string | null;
  submittedAt: string | null;
}

/**
 * An authenticated supporting document returned by the service. The portal
 * never generates a clearance document locally.
 */
export interface ClearanceDocumentDownload {
  blob: Blob;
  fileName: string;
}

export interface ExamClearanceService {
  /**
   * Returns the clearance context, overall verdict, requirements, and
   * capabilities supplied by the university.
   *
   * Implementations must never invent students, academic periods, verdicts,
   * eligibility, requirements, actions, documents, counts, or deadlines.
   */
  getClearance(signal?: AbortSignal): Promise<ClearanceSnapshot>;

  /**
   * Submits a clearance request for the authenticated student.
   *
   * The request intentionally carries no student identity. A future live
   * adapter must derive the student from the authenticated session; the
   * university backend owns authorization, review, and the final verdict.
   */
  submitClearanceRequest(
    signal?: AbortSignal,
  ): Promise<ClearanceRequestResult>;

  /**
   * Retrieves an official supporting document through an authenticated
   * service operation. Public document URLs are never assumed.
   */
  downloadRequirementDocument(
    requirementId: string,
    documentId: string,
    signal?: AbortSignal,
  ): Promise<ClearanceDocumentDownload>;
}
