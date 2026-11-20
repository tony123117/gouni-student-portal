import { useQuery } from '@tanstack/react-query';
import { examClearanceService } from '../services/exam-clearance-service';

export const examClearanceQueryKey = ['exam-clearance'] as const;

export function useExamClearance() {
  return useQuery({
    queryKey: examClearanceQueryKey,
    queryFn: ({ signal }) => examClearanceService.getClearance(signal),
    staleTime: 60_000,
    retry: false,
  });
}
