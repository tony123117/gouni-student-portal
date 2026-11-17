import { isApiConfigured } from '@/config/env';
import type { InvoiceService } from '../types/invoice';

/**
 * Live invoice adapter.
 *
 * The university has not supplied an invoice endpoint, response schema,
 * student authorization rules, or an e-Transact initiation contract. No request
 * is sent until those contracts exist.
 *
 * When access is granted, use the existing `apiClient` from `@/services/api`,
 * forward the AbortSignal, and map the validated response into the types in
 * `types/invoice.ts`.
 */
export function createLiveInvoiceService(): InvoiceService {
  const contractUnavailable = () =>
    new Error(
      isApiConfigured
        ? 'The university invoice endpoint contract has not been supplied yet, so official invoices are unavailable.'
        : 'Official invoices are unavailable until the university invoice API is configured.',
    );

  return {
    async getInvoiceOptions(signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
    async generateInvoice(_request, signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
  };
}
