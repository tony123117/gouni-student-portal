import type {
  DashboardService,
  StudentDashboard,
} from '@/features/dashboard/types/dashboard';

/**
 * Development fallback used while the university services are unavailable.
 *
 * The snapshot intentionally contains no student identity, balances, courses,
 * results, clearance status, announcements, or transactions. Each section
 * therefore renders its production empty state.
 */
export const unavailableStudentDashboard: StudentDashboard = {
  paymentSummary: {
    status: 'unavailable',
    outstandingBalance: null,
    pendingItems: null,
    verifiedPayments: null,
  },
  courseRegistration: {
    status: 'unavailable',
    registeredCourses: null,
    totalCourses: null,
  },
  latestResult: {
    status: 'unavailable',
    label: 'Not available',
    detail: 'Results unavailable.',
  },
  examClearance: {
    status: 'unavailable',
    label: 'Not available',
    detail: 'Clearance unavailable.',
  },
  updates: [],
  recentPayments: [],
};

export function createMockDashboardService(): DashboardService {
  return {
    async getDashboard() {
      return unavailableStudentDashboard;
    },
  };
}
