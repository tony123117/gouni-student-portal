import { selectAdapter } from '@/services/adapters';
import { createMockRegistrationService } from '@/services/mock/course-registration';
import type { RegistrationService } from '../types/registration';
import { createLiveRegistrationService } from './registration-live';

export const registrationService = selectAdapter<RegistrationService>({
  mock: createMockRegistrationService,
  live: createLiveRegistrationService,
});
