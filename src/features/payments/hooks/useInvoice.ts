import { useQuery } from '@tanstack/react-query';
import { invoiceService } from '../services/invoice-service';
import type { InvoiceRequest } from '../types/invoice';

export function invoiceQueryKey(
  request: InvoiceRequest | null,
  submissionId: number,
) {
  return ['invoice', request, submissionId] as const;
}

export function useInvoice(
  request: InvoiceRequest | null,
  submissionId: number,
) {
  return useQuery({
    queryKey: invoiceQueryKey(request, submissionId),
    queryFn: ({ signal }) => {
      if (!request) {
        throw new Error('An invoice request is required.');
      }

      return invoiceService.generateInvoice(request, signal);
    },
    enabled: request !== null,
    staleTime: 60_000,
    retry: false,
  });
}
