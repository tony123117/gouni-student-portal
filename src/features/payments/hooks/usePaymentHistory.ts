import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { paymentHistoryService } from '../services/payment-history-service';
import type { PaymentHistoryFilters } from '../types/payment-history';

export function paymentHistoryQueryKey(filters: PaymentHistoryFilters) {
  return ['payment-history', filters] as const;
}

export function usePaymentHistory(filters: PaymentHistoryFilters) {
  return useQuery({
    queryKey: paymentHistoryQueryKey(filters),
    queryFn: ({ signal }) =>
      paymentHistoryService.getPaymentHistory(filters, signal),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}
