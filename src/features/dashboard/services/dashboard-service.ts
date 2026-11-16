import { selectAdapter } from '@/services/adapters';
import { createMockDashboardService } from '@/services/mock/dashboard';
import type {
  DashboardService,
  StudentDashboard,
} from '../types/dashboard';

const liveDashboardService: DashboardService = {
  async getDashboard(): Promise<StudentDashboard> {
    throw new Error('Dashboard data is currently unavailable.');
  },
};

export const dashboardService: DashboardService =
  selectAdapter<DashboardService>({
    mock: createMockDashboardService,
    live: () => liveDashboardService,
  });
