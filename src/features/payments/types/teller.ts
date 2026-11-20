export type TellerAvailability = 'available' | 'unavailable';

/**
 * Review status of a teller submission. Only values returned by the
 * university service may be displayed; the portal never derives or guesses a
 * verification outcome.
 */
export type TellerReviewStatus =
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'rejected';

export interface TellerSelectOption {
  value: string;
  label: string;
}

/**
 * Form options supplied by the university service. Fields stay hidden when
 * the service supplies no options for them — the portal never invents
 * sessions, semesters, fee categories, or payment channels.
 */
export interface TellerFormOptions {
  academicSessions: TellerSelectOption[];
  semesters: TellerSelectOption[];
  feeCategories: TellerSelectOption[];
  paymentChannels: TellerSelectOption[];
}

/**
 * Requirements advertised by the official workflow. Nothing is mandatory
 * unless the university contract says so.
 */
export interface TellerRequirements {
  requiresDepositorName: boolean;
  invoiceAssociationRequired: boolean;
}

/**
 * Upload constraints. Official values come from the university service; when
 * absent, the portal falls back to clearly-labelled technical defaults.
 */
export interface TellerUploadConstraints {
  /** Official accepted MIME types, when the university supplies them. */
  acceptedFileTypes: string[] | null;
  /** Official maximum file size in bytes, when the university supplies one. */
  maxFileSizeBytes: number | null;
}

/**
 * An official invoice the student may associate with the submission. Every
 * field originates from the university service.
 */
export interface TellerInvoiceOption {
  id: string;
  invoiceNumber: string;
  description: string | null;
  amountDue: number | null;
  academicSession: string | null;
  semester: string | null;
}

export interface TellerSubmissionRequest {
  invoiceReference: string;
  invoiceId: string | null;
  feeCategory: string | null;
  academicSession: string | null;
  semester: string | null;
  amountPaid: number;
  paymentDate: string;
  depositorName: string | null;
  paymentChannel: string | null;
  transactionReference: string | null;
}

/**
 * Result of an accepted submission. A success here means only that the
 * evidence was received by the system and is awaiting review.
 */
export interface TellerSubmissionResult {
  submissionReference: string | null;
  status: TellerReviewStatus;
  message: string | null;
}

export interface TellerSubmissionRecord {
  id: string;
  submissionReference: string;
  invoiceNumber: string | null;
  submissionDate: string;
  amount: number | null;
  status: TellerReviewStatus;
  feedback: string | null;
}

export interface TellerCapabilities {
  /** Whether the service currently accepts teller submissions. */
  submission: boolean;
  /** Whether the service supports upload progress reporting. */
  uploadProgress: boolean;
}

export interface TellerContextSnapshot {
  availability: TellerAvailability;
  message: string | null;
  options: TellerFormOptions;
  requirements: TellerRequirements;
  uploadConstraints: TellerUploadConstraints;
  associatedInvoices: TellerInvoiceOption[];
  history: TellerSubmissionRecord[];
  capabilities: TellerCapabilities;
}

export interface TellerService {
  /**
   * Returns the official submission context: form options, requirements,
   * upload constraints, associable invoices, and submission history.
   *
   * The university contract is not available yet. Implementations must never
   * generate invoices, students, payment records, or submissions locally.
   */
  getSubmissionContext(signal?: AbortSignal): Promise<TellerContextSnapshot>;

  /**
   * Submits payment evidence for review.
   *
   * The evidence file is handed to the service only. Components never persist
   * file contents, and implementations must upload to private
   * university-approved storage — never a public bucket or an invented
   * endpoint.
   */
  submitTeller(
    request: TellerSubmissionRequest,
    evidence: File,
    signal?: AbortSignal,
  ): Promise<TellerSubmissionResult>;
}
