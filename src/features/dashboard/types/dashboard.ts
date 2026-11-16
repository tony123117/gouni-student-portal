export type PaymentSummaryStatus = 'unavailable' | 'pending' | 'verified';

export interface PaymentSummary {
  status: PaymentSummaryStatus;
  outstandingBalance: number | null;
  pendingItems: number | null;
  verifiedPayments: number | null;
}

export type PaymentActivityStatus = 'pending-review' | 'verified';

export interface PaymentActivity {
  id: string;
  description: string;
  reference: string;
  amount: number | null;
  status: PaymentActivityStatus;
}

export type CourseRegistrationStatus =
  | 'in-progress'
  | 'not-started'
  | 'completed'
  | 'unavailable';

export interface CourseRegistrationSummary {
  status: CourseRegistrationStatus;
  registeredCourses: number | null;
  totalCourses: number | null;
}

export type LatestResultStatus = 'unavailable' | 'published';

export interface LatestResultSummary {
  status: LatestResultStatus;
  label: string;
  detail: string;
}

export type ExamClearanceStatus = 'unavailable' | 'pending' | 'cleared';

export interface ExamClearanceSummary {
  status: ExamClearanceStatus;
  label: string;
  detail: string;
}

export type AcademicUpdateCategory = 'announcement' | 'reminder' | 'guidance';

export interface AcademicUpdate {
  id: string;
  title: string;
  summary: string;
  category: AcademicUpdateCategory;
}

export interface StudentDashboard {
  paymentSummary: PaymentSummary;
  courseRegistration: CourseRegistrationSummary;
  latestResult: LatestResultSummary;
  examClearance: ExamClearanceSummary;
  updates: AcademicUpdate[];
  recentPayments: PaymentActivity[];
}

export interface DashboardService {
  getDashboard(): Promise<StudentDashboard>;
}
