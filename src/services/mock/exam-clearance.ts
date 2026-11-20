import type {
  ClearanceSnapshot,
  ExamClearanceService,
} from '@/features/exam-clearance/types/exam-clearance';

/**
 * Development fallback used while the university exam-clearance service is
 * unavailable.
 *
 * It intentionally contains no student identity, academic period, clearance
 * verdict, examination eligibility, requirement list, counts, amounts,
 * deadlines, actions, documents, or request state. The page renders honest
 * unavailable states from this snapshot.
 */
export const unavailableClearanceSnapshot: ClearanceSnapshot = {
  availability: 'unavailable',
  message:
    'Exam clearance will be available once the university clearance service is connected.',
  academicContext: null,
  overallStatus: null,
  requirements: null,
  capabilities: {
    requestSubmission: false,
    documentDownload: false,
  },
  requestBlockedReason:
    'Clearance requests are unavailable until the university clearance service is connected.',
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

export function createMockExamClearanceService(): ExamClearanceService {
  return {
    async getClearance(signal) {
      await waitForMockLatency(signal);
      return unavailableClearanceSnapshot;
    },

    async submitClearanceRequest(signal) {
      await waitForMockLatency(signal);

      // No request is recorded. The operation fails honestly until the
      // university supplies an authenticated clearance-request contract.
      throw new Error(
        'Clearance requests are unavailable because the university clearance service has not been connected.',
      );
    },

    async downloadRequirementDocument(_requirementId, _documentId, signal) {
      await waitForMockLatency(signal);

      // No document is generated or retrieved. Supporting documents must come
      // from authenticated university storage.
      throw new Error(
        'Supporting documents are unavailable because the university clearance service has not been connected.',
      );
    },
  };
}
