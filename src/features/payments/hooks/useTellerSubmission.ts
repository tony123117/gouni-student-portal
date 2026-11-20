import { useQuery } from '@tanstack/react-query';
import { tellerService } from '../services/teller-service';
import type { TellerSubmissionRequest } from '../types/teller';

export function tellerSubmissionQueryKey(
  request: TellerSubmissionRequest | null,
  submissionId: number,
) {
  return ['teller-submission', request, submissionId] as const;
}

/**
 * Submission state keyed by the request plus a submission counter, mirroring
 * the Generate Invoice pattern. The evidence file travels through a ref so it
 * never enters a query key and is never persisted in React state snapshots.
 */
export function useTellerSubmission(
  request: TellerSubmissionRequest | null,
  submissionId: number,
  evidenceRef: React.RefObject<File | null>,
) {
  return useQuery({
    queryKey: tellerSubmissionQueryKey(request, submissionId),
    queryFn: ({ signal }) => {
      const evidence = evidenceRef.current;

      if (!request || !evidence) {
        throw new Error('A completed form and evidence file are required.');
      }

      return tellerService.submitTeller(request, evidence, signal);
    },
    enabled: request !== null && evidenceRef.current !== null,
    staleTime: Infinity,
    retry: false,
  });
}
