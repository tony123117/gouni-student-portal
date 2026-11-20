import { isApiConfigured } from '@/config/env';
import type { ExamClearanceService } from '../types/exam-clearance';

/**
 * Live exam-clearance adapter.
 *
 * The university has not supplied the clearance API contract, credentials, or
 * authorization model. No request is sent and no document is downloaded until
 * the following are confirmed:
 *
 * 1. Clearance endpoint and response schema.
 * 2. Authenticated student identity contract.
 * 3. Academic session and semester source.
 * 4. Official requirement categories, fields, and status vocabulary.
 * 5. Overall clearance verdict and examination-eligibility contract.
 * 6. Completed/outstanding count definitions.
 * 7. Requirement action types and approved destination rules.
 * 8. Supporting-document endpoint, file types, and storage rules.
 * 9. Clearance-request submission endpoint and idempotency contract.
 * 10. Authorization rules for viewing requirements, submitting a request, and
 *     downloading documents.
 *
 * Pending security requirements:
 *
 * - Derive the student from the authenticated session; never trust a
 *   client-supplied student identifier.
 * - Authorize every clearance, request, and document operation for that
 *   student and keep academic, financial, and personal records private.
 * - Serve documents from authenticated university storage, not a public
 *   bucket, and never expose credentials or document tokens in the UI.
 * - Only open action destinations the university supplies and validates; never
 *   construct approval, payment, or upload URLs locally.
 * - Validate and map responses into `types/exam-clearance.ts`; never infer
 *   clearance, examination eligibility, completion, amounts, or deadlines.
 * - Treat the portal's confirmation as receipt only. The university owns the
 *   final clearance decision.
 * - Do not log sensitive financial, academic, or identity data.
 *
 * When access is granted, use the existing `apiClient` from `@/services/api`
 * for clearance requests and an appropriately authenticated document request,
 * forward the AbortSignal, and map the validated response into
 * `ClearanceSnapshot`. Missing values must remain unavailable.
 */
export function createLiveExamClearanceService(): ExamClearanceService {
  const contractUnavailable = () =>
    new Error(
      isApiConfigured
        ? 'The university exam-clearance contract has not been supplied yet, so clearance information is unavailable.'
        : 'Exam clearance is unavailable until the university clearance API is configured.',
    );

  return {
    async getClearance(signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },

    async submitClearanceRequest(signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },

    async downloadRequirementDocument(
      _requirementId,
      _documentId,
      signal,
    ) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
  };
}
