import { isApiConfigured } from '@/config/env';
import type { RegistrationService } from '../types/registration';

/**
 * Live course-registration adapter.
 *
 * The university has not supplied the registration API contract or
 * credentials. No request is sent and no registration is created until the
 * following are confirmed:
 *
 * - Course catalogue endpoint and response schema.
 * - Academic session and semester source.
 * - Student identity and authorization contract.
 * - Registration eligibility contract.
 * - Course selection and submission endpoint.
 * - Official credit-unit rules.
 * - Prerequisite and restriction rules.
 * - Registration history endpoint.
 * - Confirmation document endpoint, when available.
 *
 * Pending security requirements:
 *
 * - Derive the student from the authenticated session; never trust a
 *   client-supplied student identifier.
 * - Authorize every catalogue, history, and submission request for that
 *   student, and keep registration data private.
 * - Treat client-side course validation as usability only. The server must
 *   re-check eligibility, course availability, prerequisites, restrictions,
 *   and credit-unit limits.
 * - Support idempotency on submission so retries cannot create duplicate
 *   registrations.
 * - Serve confirmation documents from authenticated university storage, not a
 *   public bucket.
 * - Never log sensitive registration, identity, or document details.
 *
 * When access is granted, use the existing `apiClient` from `@/services/api`,
 * forward the AbortSignal, validate responses, and map them into the types in
 * `types/registration.ts`. Submission results must reflect the university's
 * confirmed receipt, not an optimistic UI outcome.
 */
export function createLiveRegistrationService(): RegistrationService {
  const contractUnavailable = () =>
    new Error(
      isApiConfigured
        ? 'The university course-registration contract has not been supplied yet, so registration data cannot be loaded or submitted.'
        : 'Course registration is unavailable until the university registration API is configured.',
    );

  return {
    async getRegistrationContext(signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
    async submitRegistration(_request, signal) {
      signal?.throwIfAborted();
      throw contractUnavailable();
    },
  };
}
