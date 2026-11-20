import { useQuery } from '@tanstack/react-query';
import { resultsService } from '../services/results-service';

export function resultsQueryKey(periodId: string | null) {
  return ['academic-results', periodId ?? 'default'] as const;
}

export function useResults(periodId: string | null) {
  return useQuery({
    queryKey: resultsQueryKey(periodId),
    queryFn: ({ signal }) => resultsService.getResults(periodId, signal),
    staleTime: 60_000,
    retry: false,
  });
}
