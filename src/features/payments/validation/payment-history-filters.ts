import { z } from 'zod';
import type { PaymentHistoryFilters } from '../types/payment-history';

export const paymentHistoryFiltersSchema = z.object({
  query: z
    .string()
    .trim()
    .max(80, 'Search must be 80 characters or fewer.'),
  status: z.enum(['all', 'successful', 'pending', 'failed']),
  academicSession: z.string().trim().max(32),
  semester: z.enum(['all', 'first', 'second']),
});

export function parsePaymentHistoryFilters(
  filters: PaymentHistoryFilters,
): PaymentHistoryFilters {
  return paymentHistoryFiltersSchema.parse(filters);
}
