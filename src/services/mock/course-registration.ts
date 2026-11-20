import type {
  RegistrationService,
  RegistrationSnapshot,
} from '@/features/course-registration/types/registration';

/**
 * Development fallback used while the university course-registration service
 * is unavailable.
 *
 * It intentionally contains no student identity, academic term, eligibility
 * decision, course catalogue, credit-unit rules, registration records, or
 * confirmation documents. The page renders honest unavailable states, and
 * submission fails rather than pretending a registration was received.
 */
export const unavailableRegistrationContext: RegistrationSnapshot = {
  availability: 'unavailable',
  message:
    'Course registration will be available once the university registration service is connected.',
  student: null,
  term: null,
  status: null,
  eligibility: null,
  period: null,
  courses: [],
  rules: {
    minimumCreditUnits: null,
    maximumCreditUnits: null,
  },
  warnings: [],
  restrictions: [],
  submissionBlockedReason:
    'Registration submission is unavailable until the university registration service is connected.',
  currentRegistration: null,
  history: {
    availability: 'unavailable',
    message:
      'Registration history will appear once the university registration service is connected.',
    records: [],
  },
  capabilities: {
    submission: false,
    confirmationDownload: false,
  },
};

const MOCK_LATENCY_MS = 220;

function waitForMockLatency(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted.', 'AbortError'));
      return;
    }

    const handleAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Request aborted.', 'AbortError'));
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve();
    }, MOCK_LATENCY_MS);

    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}

export function createMockRegistrationService(): RegistrationService {
  return {
    async getRegistrationContext(signal) {
      await waitForMockLatency(signal);
      return unavailableRegistrationContext;
    },
    async submitRegistration(_request, signal) {
      await waitForMockLatency(signal);

      // No registration is created anywhere. The submission is rejected
      // honestly until the university supplies the official endpoint.
      throw new Error(
        'Course registration is unavailable because the university registration service has not been connected.',
      );
    },
  };
}
