import { selectAdapter } from '@/services/adapters';
import { createMockPaymentHistoryService } from '@/services/mock/payment-history';
import type { PaymentHistoryService } from '../types/payment-history';
import { createLivePaymentHistoryService } from './payment-history-live';

export const paymentHistoryService = selectAdapter<PaymentHistoryService>({
  mock: createMockPaymentHistoryService,
  live: createLivePaymentHistoryService,
});
