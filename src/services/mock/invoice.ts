import type {
  InvoiceGenerationSnapshot,
  InvoiceOptionsSnapshot,
  InvoiceService,
} from '@/features/payments/types/invoice';

const unavailableOptions: InvoiceOptionsSnapshot = {
  availability: 'unavailable',
  message:
    'Official academic sessions, semesters and fee categories will appear here when the university invoice service is available.',
  options: {
    academicSessions: [],
    semesters: [],
    feeCategories: [],
  },
  capabilities: {
    invoiceGeneration: false,
  },
};

const unavailableInvoice: InvoiceGenerationSnapshot = {
  availability: 'unavailable',
  message:
    'Official invoices are not yet available from the university invoice service.',
  invoice: null,
  payment: {
    available: false,
    destinationUrl: null,
    message:
      'Online payment is currently unavailable because the e-Transact (SEC) gateway has not been integrated.',
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

/**
 * Development fallback used while the university invoice service is
 * unavailable.
 *
 * It intentionally contains no student records, invoices, fee categories, fee
 * amounts, invoice numbers, payment references, or payment destinations.
 */
export function createMockInvoiceService(): InvoiceService {
  return {
    async getInvoiceOptions(signal) {
      await waitForMockLatency(signal);
      return unavailableOptions;
    },
    async generateInvoice(_request, signal) {
      await waitForMockLatency(signal);
      return unavailableInvoice;
    },
  };
}
