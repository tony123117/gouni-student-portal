import type {
  TellerContextSnapshot,
  TellerService,
} from '@/features/payments/types/teller';

/**
 * Development fallback used while the university teller service is
 * unavailable.
 *
 * It intentionally contains no invoices, students, payment records,
 * submission history, official upload limits, or payment channels. The page
 * renders its honest unavailable states from this snapshot, and submission
 * fails rather than faking an upload success.
 */
export const unavailableTellerContext: TellerContextSnapshot = {
  availability: 'unavailable',
  message:
    'Teller submission will be available once the university payment evidence service is connected.',
  options: {
    academicSessions: [],
    semesters: [],
    feeCategories: [],
    paymentChannels: [],
  },
  requirements: {
    requiresDepositorName: false,
    invoiceAssociationRequired: false,
  },
  uploadConstraints: {
    acceptedFileTypes: null,
    maxFileSizeBytes: null,
  },
  associatedInvoices: [],
  history: [],
  capabilities: {
    submission: false,
    uploadProgress: false,
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

export function createMockTellerService(): TellerService {
  return {
    async getSubmissionContext(signal) {
      await waitForMockLatency(signal);
      return unavailableTellerContext;
    },
    async submitTeller(_request, _evidence, signal) {
      await waitForMockLatency(signal);

      // No upload is performed anywhere. The submission is rejected honestly
      // until the university supplies the official evidence endpoint.
      throw new Error(
        'Teller submission is unavailable because the university evidence service has not been connected.',
      );
    },
  };
}
