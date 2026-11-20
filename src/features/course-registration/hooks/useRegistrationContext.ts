import { useQuery } from '@tanstack/react-query';
import { registrationService } from '../services/registration-service';

export const registrationContextQueryKey = [
  'course-registration-context',
] as const;

export function useRegistrationContext() {
  return useQuery({
    queryKey: registrationContextQueryKey,
    queryFn: ({ signal }) =>
      registrationService.getRegistrationContext(signal),
    staleTime: 60_000,
    retry: false,
  });
}
