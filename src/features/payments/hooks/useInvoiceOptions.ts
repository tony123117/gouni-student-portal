import { useQuery } from '@tanstack/react-query';
import { invoiceService } from '../services/invoice-service';

export const invoiceOptionsQueryKey = ['invoice-options'] as const;

export function useInvoiceOptions() {
  return useQuery({
    queryKey: invoiceOptionsQueryKey,
    queryFn: ({ signal }) => invoiceService.getInvoiceOptions(signal),
    staleTime: 60_000,
    retry: false,
  });
}
