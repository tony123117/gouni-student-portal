import { isApiConfigured } from '@/config/env';
import type { TellerService } from '../types/teller';

/**
 * Live teller adapter.
 *
 * The university has not supplied the teller submission endpoint, request
 * schema, or evidence storage contract. No request is sent and no file is
 * uploaded until those contracts exist.
 *
 * Pending server-side security requirements to confirm with the university
 * before connecting:
 *
 * - Private, university-approved document storage (never a public bucket).
 * - Server-side validation of file type, size, and content — the client-side
 *   checks are for usability only.
 * - Student authorization on the submission endpoint, and that returned
 *   evidence URLs (if any) are never public.
 * - No sensitive payment details in logs.
 *
 * When access is granted, use the existing `apiClient` from `@/services/api`,
 * forward the AbortSignal, stream the evidence as multipart/form-data, and map
 * the validated response into the types in `types/teller.ts`.
 */
export function createLiveTellerService(): TellerService {
  const contractUnavailable = () =>
    new Error(
      isApiConfigured
        ? 'The university teller submission contract has not been supplied yet, so payment evidence cannot be submitted.'
        : 'Teller submission is unavailable until the university evidence API is configured.',
    );

  return {
    async getSubmissionContext(signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
    async submitTeller(_request, _evidence, signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
  };
}
