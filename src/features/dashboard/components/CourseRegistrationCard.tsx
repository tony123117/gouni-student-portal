import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/shared/SectionCard';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { ROUTES } from '@/constants';
import type {
  CourseRegistrationStatus,
  CourseRegistrationSummary,
} from '../types/dashboard';

const statusDetails: Record<
  CourseRegistrationStatus,
  { label: string; variant: BadgeVariant }
> = {
  'in-progress': { label: 'In progress', variant: 'navy' },
  'not-started': { label: 'Not started', variant: 'neutral' },
  completed: { label: 'Completed', variant: 'success' },
  unavailable: { label: 'Not available', variant: 'neutral' },
};

interface CourseRegistrationCardProps {
  registration: CourseRegistrationSummary;
}

export function CourseRegistrationCard({
  registration,
}: CourseRegistrationCardProps) {
  const status = statusDetails[registration.status];
  const hasCounts =
    registration.registeredCourses !== null &&
    registration.totalCourses !== null;
  const hasProgress =
    hasCounts && (registration.totalCourses ?? 0) > 0;
  const progress = hasProgress
    ? Math.min(
        100,
        Math.round(
          ((registration.registeredCourses ?? 0) /
            (registration.totalCourses ?? 1)) *
            100,
        ),
      )
    : 0;

  return (
    <SectionCard
      title="Course Registration"
      headerAside={<Badge variant={status.variant}>{status.label}</Badge>}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-navy-600">
            Courses added
          </p>
          <p className="mt-1.5 text-[31px] font-extrabold leading-none tracking-[-0.025em] text-navy-950">
            {hasCounts ? registration.registeredCourses : '—'}
            <span className="text-sm font-semibold text-slate-500">
              {hasCounts ? ` / ${registration.totalCourses}` : ''}
            </span>
          </p>
        </div>
        {hasProgress ? (
          <span className="text-[12px] font-extrabold text-navy-800">
            {progress}%
          </span>
        ) : null}
      </div>

      {hasProgress ? (
        <div
          role="progressbar"
          aria-label="Course registration progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-4 h-2 overflow-hidden rounded-full bg-portal-sky"
        >
          <div
            className="h-full rounded-full bg-navy-800"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="mt-4 h-2 rounded-full border border-dashed border-portal-line bg-portal-surface"
        />
      )}

      <p className="mt-3.5 text-[11.5px] leading-5 text-slate-500">
        {registration.status === 'unavailable'
          ? 'Your registered courses will appear here.'
          : `${registration.registeredCourses ?? 0} of ${
              registration.totalCourses ?? 0
            } courses added.`}
      </p>

      <Link
        to={ROUTES.courseRegistration}
        className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-[12px] font-bold text-navy-800 transition-colors hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
      >
        Open course registration
        <ArrowRight
          aria-hidden="true"
          strokeWidth={2.3}
          className="size-3.5"
        />
      </Link>
    </SectionCard>
  );
}
