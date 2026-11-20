import { selectAdapter } from '@/services/adapters';
import { createMockExamClearanceService } from '@/services/mock/exam-clearance';
import type { ExamClearanceService } from '../types/exam-clearance';
import { createLiveExamClearanceService } from './exam-clearance-live';

export const examClearanceService = selectAdapter<ExamClearanceService>({
  mock: createMockExamClearanceService,
  live: createLiveExamClearanceService,
});
