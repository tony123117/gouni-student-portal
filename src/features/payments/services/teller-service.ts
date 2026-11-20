import { selectAdapter } from '@/services/adapters';
import { createMockTellerService } from '@/services/mock/teller';
import type { TellerService } from '../types/teller';
import { createLiveTellerService } from './teller-live';

export const tellerService = selectAdapter<TellerService>({
  mock: createMockTellerService,
  live: createLiveTellerService,
});
