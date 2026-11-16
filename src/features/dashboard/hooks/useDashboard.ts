import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard-service';

export const dashboardQueryKey = ['dashboard'] as const;

export function useDashboard() {
  return useQuery({
    queryKey: dashboardQueryKey,
    queryFn: () => dashboardService.getDashboard(),
    staleTime: 5 * 60_000,
  });
}
