import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ModulePlaceholder } from '@/components/shared/ModulePlaceholder';
import { NotFoundPage } from '@/components/shared/NotFoundPage';
import { ROUTES } from '@/constants';
import { DashboardPage } from '@/features/dashboard/components/DashboardPage';
import { GenerateInvoicePage } from '@/features/payments/components/GenerateInvoicePage';
import { PaymentHistoryPage } from '@/features/payments/components/PaymentHistoryPage';

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
        element: (
          <ModulePlaceholder
            title="Upload Teller"
            description="Submit your bank teller for payment verification."
            emptyMessage="Your teller submissions will appear here."
          />
        ),
      },
      {
        path: relativePath(ROUTES.courseRegistration),
        element: (
          <ModulePlaceholder
            title="Course Registration"
            description="Review and manage your semester course registration."
            emptyMessage="Your registered courses will appear here."
          />
        ),
      },
      {
        path: relativePath(ROUTES.results),
        element: (
          <ModulePlaceholder
            title="Results"
            description="View your published semester results."
            emptyMessage="Your semester results will appear here."
          />
        ),
      },
      {
        path: relativePath(ROUTES.examClearance),
        element: (
          <ModulePlaceholder
            title="Exam Clearance"
            description="Check your eligibility for semester examinations."
            emptyMessage="Your exam clearance status will appear here."
          />
        ),
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
