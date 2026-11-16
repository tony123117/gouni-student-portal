import { isApiConfigured } from '@/config/env';
import type { PaymentHistoryService } from '../types/payment-history';

/**
 * Live payment adapter.
 *
 * The university has not supplied the payment endpoint, response schema, or
 * receipt source. No request is sent until that contract exists, so this
 * adapter deliberately reports that official data is unavailable.
 *
 * When access is granted, call the existing `apiClient` from
 * `@/services/api` here with the university-provided endpoint, forward the
 * AbortSignal, and map the validated response into `PaymentHistorySnapshot`.
 */
export function createLivePaymentHistoryService(): PaymentHistoryService {
  return {
    async getPaymentHistory(_filters, signal) {
      signal?.throwIfAborted();

      throw new Error(
        isApiConfigured
          ? 'The university payment endpoint contract has not been supplied yet, so official payment records are unavailable.'
          : 'Official payment data is unavailable until the university payment API is configured.',
      );
    },
  };
}
