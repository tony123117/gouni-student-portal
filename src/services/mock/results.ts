import type {
  ResultsService,
  ResultsSnapshot,
} from '@/features/results/types/results';

/**
 * Development fallback used while the university results service is
 * unavailable.
 *
 * It intentionally contains no student identity, academic periods, course
 * results, scores, grades, GPA/CGPA values, academic standing, publication
 * status, or statement documents. The Results page renders honest unavailable
 * states from this snapshot.
 */
export const unavailableResultsSnapshot: ResultsSnapshot = {
  availability: 'unavailable',
  message:
    'Academic results will appear once the university results service is connected.',
  periods: null,
  activePeriod: null,
  academicContext: null,
  publication: null,
  summary: null,
  results: [],
  capabilities: {
    print: false,
    statementDownload: false,
  },
  document: null,
  lastUpdated: null,
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

export function createMockResultsService(): ResultsService {
  return {
    async getResults(_periodId, signal) {
      await waitForMockLatency(signal);
      return unavailableResultsSnapshot;
    },
    async downloadStatement(_periodId, signal) {
      await waitForMockLatency(signal);

      // No statement is generated or retrieved. The operation fails honestly
      // until the university supplies an authenticated document contract.
      throw new Error(
        'Official result statements are unavailable because the university results service has not been connected.',
      );
    },
  };
}
