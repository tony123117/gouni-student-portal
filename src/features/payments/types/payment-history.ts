export type PaymentStatus = 'successful' | 'pending' | 'failed';

export type PaymentStatusFilter = PaymentStatus | 'all';

export type PaymentSemester = 'first' | 'second';

export type PaymentSemesterFilter = PaymentSemester | 'all';

export interface PaymentHistoryFilters {
  query: string;
  status: PaymentStatusFilter;
  academicSession: string;
  semester: PaymentSemesterFilter;
}

export type PaymentHistoryAvailability = 'available' | 'unavailable';

export interface PaymentHistorySummaries {
  totalPayments: number | null;
  successfulPayments: number | null;
  pendingPayments: number | null;
  failedPayments: number | null;
}

export interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  paymentReference: string;
  description: string;
  date: string;
  amount: number | null;
  academicSession: string;
  semester: PaymentSemester;
  status: PaymentStatus;
  receiptUrl: string | null;
}

export interface PaymentHistoryFilterOptions {
  academicSessions: string[];
}

/**
 * Capabilities advertised by the payment service.
 *
 * The portal only renders an action when the underlying integration supports
 * it. Retry and confirmation are intentionally absent until the university
 * exposes real operations for them.
 */
export interface PaymentHistoryCapabilities {
  receiptDownload: boolean;
}

export interface PaymentHistorySnapshot {
  availability: PaymentHistoryAvailability;
  message: string | null;
  summaries: PaymentHistorySummaries;
  records: PaymentRecord[];
  filterOptions: PaymentHistoryFilterOptions;
  capabilities: PaymentHistoryCapabilities;
}

export interface PaymentHistoryService {
  /**
   * Returns payment records for the supplied filters.
   *
   * The university endpoint contract is not available yet. Implementations
   * must return only official data and must never generate demo transactions.
   */
  getPaymentHistory(
    filters: PaymentHistoryFilters,
    signal?: AbortSignal,
  ): Promise<PaymentHistorySnapshot>;
}
