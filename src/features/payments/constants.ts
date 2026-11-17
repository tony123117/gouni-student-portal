import type {
  PaymentHistoryFilters,
  PaymentSemester,
  PaymentStatus,
} from './types/payment-history';

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
