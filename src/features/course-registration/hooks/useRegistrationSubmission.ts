import { useQuery } from '@tanstack/react-query';
import { registrationService } from '../services/registration-service';
import type { RegistrationSubmissionRequest } from '../types/registration';

export function registrationSubmissionQueryKey(
  request: RegistrationSubmissionRequest | null,
  submissionId: number,
) {
  return ['course-registration-submission', request, submissionId] as const;
}

/**
 * Submission state keyed by the request plus a submission counter, following
 * the existing invoice and teller pattern. A retry reuses the same key because
 * the request has not changed; a new selection creates a new key.
 */
export function useRegistrationSubmission(
  request: RegistrationSubmissionRequest | null,
  submissionId: number,
) {
  return useQuery({
    queryKey: registrationSubmissionQueryKey(request, submissionId),
    queryFn: ({ signal }) => {
      if (!request) {
        throw new Error('A registration request is required.');
      }

      return registrationService.submitRegistration(request, signal);
    },
    enabled: request !== null,
    staleTime: Infinity,
    retry: false,
  });
}
