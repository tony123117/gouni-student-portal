import type {
  PaymentHistoryFilters,
  PaymentSemester,
  PaymentStatus,
} from './types/payment-history';
import type { TellerReviewStatus } from './types/teller';

export const DEFAULT_PAYMENT_HISTORY_FILTERS: PaymentHistoryFilters = {
  query: '',
  status: 'all',
  academicSession: 'all',
  semester: 'all',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  successful: 'Successful',
  pending: 'Pending',
  failed: 'Failed',
};

export const PAYMENT_STATUS_FILTER_OPTIONS: Array<{
  value: PaymentHistoryFilters['status'];
  label: string;
}> = [
  { value: 'all', label: 'All statuses' },
  { value: 'successful', label: 'Successful' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

export const PAYMENT_SEMESTER_LABELS: Record<PaymentSemester, string> = {
  first: 'First Semester',
  second: 'Second Semester',
};

export const PAYMENT_SEMESTER_FILTER_OPTIONS: Array<{
  value: PaymentHistoryFilters['semester'];
  label: string;
}> = [
  { value: 'all', label: 'All semesters' },
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

export const TELLER_REVIEW_STATUS_LABELS: Record<TellerReviewStatus, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  verified: 'Verified',
  rejected: 'Rejected',
};

/**
 * Technical upload defaults used only while the university has not supplied
 * official requirements. The UI labels these as technical limits — they are
 * never presented as university policy.
 */
export const TELLER_TECHNICAL_ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
] as const;

export const TELLER_TECHNICAL_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
