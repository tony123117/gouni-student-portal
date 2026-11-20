import { isApiConfigured } from '@/config/env';
import type { ResultsService } from '../types/results';

/**
 * Live academic-results adapter.
 *
 * The university has not supplied the results API contract, credentials, or
 * authorization model. No request is sent and no document is downloaded until
 * the following are confirmed:
 *
 * 1. Results endpoint and response schema.
 * 2. Authenticated student identity contract.
 * 3. Academic session and semester source.
 * 4. Result publication status contract.
 * 5. Course result field definitions.
 * 6. Official grading scale.
 * 7. GPA and CGPA calculation specification, if the portal ever needs to
 *    calculate them (it does not today; values are displayed only when the
 *    university supplies them).
 * 8. Academic standing rules, if applicable.
 * 9. Result history endpoint.
 * 10. Official result statement/document endpoint.
 * 11. Authorization rules for accessing results and downloads.
 *
 * Pending security requirements:
 *
 * - Derive the student from the authenticated session; never accept a
 *   client-supplied student identifier as authorization.
 * - Authorize every results and document request for that student, and keep
 *   academic records private.
 * - Serve statements from authenticated university storage, not a public
 *   bucket, and never place credentials or document tokens in the UI.
 * - Validate and map responses into `types/results.ts`; never infer missing
 *   scores, grades, pass/fail verdicts, GPA/CGPA, publication state, or
 *   standing.
 * - Do not log sensitive academic or identity data.
 *
 * When access is granted, use the existing `apiClient` from `@/services/api`
 * (or an appropriately authenticated document request), forward the
 * AbortSignal, and map the validated response into `ResultsSnapshot`. The
 * portal must continue to treat every missing value as unavailable.
 */
export function createLiveResultsService(): ResultsService {
  const contractUnavailable = () =>
    new Error(
      isApiConfigured
        ? 'The university results contract has not been supplied yet, so academic results cannot be loaded or downloaded.'
        : 'Academic results are unavailable until the university results API is configured.',
    );

  return {
    async getResults(_periodId, signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
    async downloadStatement(_periodId, signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
  };
}
