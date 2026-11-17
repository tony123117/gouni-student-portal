import { selectAdapter } from '@/services/adapters';
import { createMockInvoiceService } from '@/services/mock/invoice';
import type { InvoiceService } from '../types/invoice';
import { createLiveInvoiceService } from './invoice-live';

export const invoiceService = selectAdapter<InvoiceService>({
  mock: createMockInvoiceService,
  live: createLiveInvoiceService,
});
