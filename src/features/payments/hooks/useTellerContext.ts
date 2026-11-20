import { useQuery } from '@tanstack/react-query';
import { tellerService } from '../services/teller-service';

export const tellerContextQueryKey = ['teller-context'] as const;

export function useTellerContext() {
  return useQuery({
    queryKey: tellerContextQueryKey,
    queryFn: ({ signal }) => tellerService.getSubmissionContext(signal),
    staleTime: 60_000,
    retry: false,
  });
}
