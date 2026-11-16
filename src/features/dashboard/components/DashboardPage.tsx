import { AnnouncementsCard } from '../components/AnnouncementsCard';
import { CourseRegistrationCard } from '../components/CourseRegistrationCard';
import { DashboardError } from '../components/DashboardError';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { OverviewGrid } from '../components/OverviewGrid';
import { PaymentSummaryCard } from '../components/PaymentSummaryCard';
import { QuickActionsCard } from '../components/QuickActionsCard';
import { RecentPaymentsCard } from '../components/RecentPaymentsCard';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { useDashboard } from '../hooks/useDashboard';

export function DashboardPage() {
  const { data, isError, isPending, isRefetching, refetch } = useDashboard();

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <DashboardError
        isRetrying={isRefetching}
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <WelcomeHeader />

      <OverviewGrid
        paymentSummary={data.paymentSummary}
        courseRegistration={data.courseRegistration}
        latestResult={data.latestResult}
        examClearance={data.examClearance}
      />

      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <AnnouncementsCard updates={data.updates} />
        <QuickActionsCard />
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        <PaymentSummaryCard summary={data.paymentSummary} />
        <CourseRegistrationCard registration={data.courseRegistration} />
      </div>

      <RecentPaymentsCard payments={data.recentPayments} />
    </div>
  );
}
