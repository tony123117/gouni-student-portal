import type {
  PaymentHistoryService,
  PaymentHistorySnapshot,
} from '@/features/payments/types/payment-history';

/**
 * Development fallback used while the university payment service is
 * unavailable.
 *
 * It intentionally contains no payment records, invoices, references, receipt
 * links, or summary figures. The Payment History page renders its honest
 * unavailable and empty states from this snapshot.
 */
export const unavailablePaymentHistorySnapshot: PaymentHistorySnapshot = {
  availability: 'unavailable',
  message:
    'Official payment records will appear here once the university payment service is available.',
  summaries: {
    totalPayments: null,
    successfulPayments: null,
    pendingPayments: null,
    failedPayments: null,
  },
  records: [],
  filterOptions: {
    academicSessions: [],
  },
  capabilities: {
    receiptDownload: false,
  },
};

const MOCK_LATENCY_MS = 220;

function waitForMockLatency(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted.', 'AbortError'));
      return;
    }

    const handleAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Request aborted.', 'AbortError'));
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve();
    }, MOCK_LATENCY_MS);

    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}

export function createMockPaymentHistoryService(): PaymentHistoryService {
  return {
    async getPaymentHistory(_filters, signal) {
      await waitForMockLatency(signal);
      return unavailablePaymentHistorySnapshot;
    },
  };
}
