import { selectAdapter } from '@/services/adapters';
import { createMockResultsService } from '@/services/mock/results';
import type { ResultsService } from '../types/results';
import { createLiveResultsService } from './results-live';

export const resultsService = selectAdapter<ResultsService>({
  mock: createMockResultsService,
  live: createLiveResultsService,
});
