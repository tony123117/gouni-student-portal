import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ModulePlaceholder } from '@/components/shared/ModulePlaceholder';
import { NotFoundPage } from '@/components/shared/NotFoundPage';
import { ROUTES } from '@/constants';
import { DashboardPage } from '@/features/dashboard/components/DashboardPage';
import { CourseRegistrationPage } from '@/features/course-registration/components/CourseRegistrationPage';
import { ExamClearancePage } from '@/features/exam-clearance/components/ExamClearancePage';
import { ResultsPage } from '@/features/results/components/ResultsPage';
import { GenerateInvoicePage } from '@/features/payments/components/GenerateInvoicePage';
import { PaymentHistoryPage } from '@/features/payments/components/PaymentHistoryPage';
import { UploadTellerPage } from '@/features/payments/components/UploadTellerPage';

const relativePath = (path: string) => path.replace(/^\//, '');

export const router = createBrowserRouter([
  {
    path: ROUTES.dashboard,
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: relativePath(ROUTES.payments),
        element: <Navigate to={ROUTES.paymentHistory} replace />,
      },
      {
        path: relativePath(ROUTES.paymentHistory),
        element: <PaymentHistoryPage />,
      },
      {
        path: relativePath(ROUTES.generateInvoice),
        element: <GenerateInvoicePage />,
      },
      {
        path: relativePath(ROUTES.uploadTeller),
        element: <UploadTellerPage />,
      },
      {
        path: relativePath(ROUTES.courseRegistration),
        element: <CourseRegistrationPage />,
      },
      {
        path: relativePath(ROUTES.results),
        element: <ResultsPage />,
      },
      {
        path: relativePath(ROUTES.examClearance),
        element: <ExamClearancePage />,
      },
      {
        path: relativePath(ROUTES.hostel),
        element: <Navigate to={ROUTES.hostelBooking} replace />,
      },
      {
        path: relativePath(ROUTES.hostelBooking),
        element: (
          <ModulePlaceholder
            title="Hostel Booking"
            description="Review available accommodation and submit a booking."
            emptyMessage="Hostel accommodation details will appear here."
          />
        ),
      },
      {
        path: relativePath(ROUTES.hostelHistory),
        element: (
          <ModulePlaceholder
            title="Hostel History"
            description="Review your previous hostel bookings."
            emptyMessage="Your hostel booking history will appear here."
          />
        ),
      },
      {
        path: relativePath(ROUTES.account),
        element: (
          <ModulePlaceholder
            title="Account"
            description="View your student account and profile details."
            emptyMessage="Your account information will appear here."
          />
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
