import {
  BookOpen,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  CourseRegistrationSummary,
  ExamClearanceSummary,
  LatestResultSummary,
  PaymentSummary,
} from '../types/dashboard';

type OverviewTone = 'gold' | 'navy' | 'neutral';

interface OverviewItem {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: OverviewTone;
  duotone?: boolean;
}

const toneClasses: Record<OverviewTone, string> = {
  gold: 'bg-gold-500',
  navy: 'bg-navy-800',
  neutral: 'bg-slate-400',
};

const paymentLabels: Record<PaymentSummary['status'], string> = {
  unavailable: 'Not available',
  pending: 'Pending verification',
  verified: 'Verified',
};

const registrationLabels: Record<
  CourseRegistrationSummary['status'],
  string
> = {
  'in-progress': 'In progress',
  'not-started': 'Not started',
  completed: 'Completed',
  unavailable: 'Not available',
};

interface OverviewGridProps {
  paymentSummary: PaymentSummary;
  courseRegistration: CourseRegistrationSummary;
  latestResult: LatestResultSummary;
  examClearance: ExamClearanceSummary;
}

export function OverviewGrid({
  paymentSummary,
  courseRegistration,
  latestResult,
  examClearance,
}: OverviewGridProps) {
  const hasPaymentCounts =
    paymentSummary.pendingItems !== null &&
    paymentSummary.verifiedPayments !== null;
  const hasRegistrationCounts =
    courseRegistration.registeredCourses !== null &&
    courseRegistration.totalCourses !== null;

  const items: OverviewItem[] = [
    {
      label: 'Payment Status',
      value: paymentLabels[paymentSummary.status],
      detail: hasPaymentCounts
        ? `${paymentSummary.pendingItems} pending · ${paymentSummary.verifiedPayments} verified`
        : 'No payment records.',
      icon: CreditCard,
      tone:
        paymentSummary.status === 'verified'
          ? 'navy'
          : paymentSummary.status === 'pending'
            ? 'gold'
            : 'neutral',
      duotone: true,
    },
    {
      label: 'Course Registration',
      value: registrationLabels[courseRegistration.status],
      detail: hasRegistrationCounts
        ? `${courseRegistration.registeredCourses} of ${courseRegistration.totalCourses} courses added`
        : 'No courses registered.',
      icon: BookOpen,
      tone:
        courseRegistration.status === 'completed'
          ? 'navy'
          : courseRegistration.status === 'in-progress'
            ? 'gold'
            : 'neutral',
      duotone: true,
    },
    {
      label: 'Latest Result',
      value: latestResult.label,
      detail: latestResult.detail,
      icon: ChartNoAxesColumnIncreasing,
      tone: latestResult.status === 'published' ? 'navy' : 'neutral',
    },
    {
      label: 'Exam Clearance',
      value: examClearance.label,
      detail: examClearance.detail,
      icon: ClipboardCheck,
      tone: examClearance.status === 'cleared' ? 'navy' : 'neutral',
      duotone: true,
    },
  ];

  return (
    <section aria-label="Student overview">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="flex min-h-[108px] min-w-0 items-center gap-3.5 rounded-2xl border border-portal-line/90 bg-white px-3.5 py-4 shadow-[0_2px_12px_rgba(5,42,94,0.035)] sm:min-h-[110px] sm:px-4"
            >
              <span className="flex size-[62px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] via-[#e9f1fc] to-[#dfeafa] text-navy-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70">
                <PortalIcon
                  icon={Icon}
                  className="size-[27px]"
                  strokeWidth={item.duotone ? 2.2 : 2.5}
                  duotone={item.duotone}
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-bold leading-[18px] tracking-[0.005em] text-navy-700">
                  {item.label}
                </p>
                <p className="mt-1 flex items-center gap-2 text-[16.5px] font-extrabold leading-5 text-navy-950">
                  <span className="truncate">{item.value}</span>
                  <span
                    aria-hidden="true"
                    className={`size-2.5 shrink-0 rounded-full ring-2 ring-white ${toneClasses[item.tone]}`}
                  />
                </p>
                <p className="mt-1 truncate text-[12px] font-medium leading-4 text-slate-500">
                  {item.detail}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
