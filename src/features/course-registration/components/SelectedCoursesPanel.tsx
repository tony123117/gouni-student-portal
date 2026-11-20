import {
  AlertCircle,
  BookOpenCheck,
  ClipboardCheck,
  Info,
  LoaderCircle,
  X,
} from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { RegistrationCourse } from '../types/registration';
import {
  describeCreditLimits,
  formatCreditUnits,
} from '../utils/format';

interface SelectedCoursesPanelProps {
  selectedCourses: RegistrationCourse[];
  totalCreditUnits: number;
  minimumCreditUnits: number | null;
  maximumCreditUnits: number | null;
  canSubmit: boolean;
  blockedReason: string | null;
  isSubmitting: boolean;
  errorMessage: string | null;
  onRemove: (courseId: string) => void;
  onClear: () => void;
  onReview: () => void;
}

export function SelectedCoursesPanel({
  selectedCourses,
  totalCreditUnits,
  minimumCreditUnits,
  maximumCreditUnits,
  canSubmit,
  blockedReason,
  isSubmitting,
  errorMessage,
  onRemove,
  onClear,
  onReview,
}: SelectedCoursesPanelProps) {
  const creditLimits = describeCreditLimits(
    minimumCreditUnits,
    maximumCreditUnits,
  );
  const actionsDisabled = isSubmitting;

  return (
    <SectionCard
      title="Selected Courses"
      description="Your current selection for this term."
      headerAside={
        <span className="text-[10px] font-bold text-slate-400">
          {selectedCourses.length} selected
        </span>
      }
    >
      {selectedCourses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-portal-line bg-portal-surface/40 px-3 py-6 text-center">
          <span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-white text-navy-700 ring-1 ring-portal-line/80">
            <PortalIcon icon={BookOpenCheck} className="size-[20px]" duotone />
          </span>
          <p className="mt-2.5 text-[12px] font-bold text-navy-950">
            No courses selected yet
          </p>
          <p className="mx-auto mt-1 max-w-[220px] text-[10px] leading-[15px] text-slate-500">
            Choose courses from the catalogue to build your registration.
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {selectedCourses.map((course) => (
              <li
                key={course.id}
                className="flex items-start justify-between gap-2 rounded-lg border border-portal-line/80 bg-white px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-[11px] leading-[16px] text-navy-950">
                    <span className="font-mono font-extrabold">
                      {course.code}
                    </span>{' '}
                    <span className="font-semibold text-navy-800">
                      {course.title}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[9.5px] font-medium text-slate-500">
                    {formatCreditUnits(course.creditUnits)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(course.id)}
                  disabled={actionsDisabled}
                  aria-label={`Remove ${course.code} from your selection`}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-portal-line text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PortalIcon icon={X} className="size-3.5" strokeWidth={2.3} />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={onClear}
              disabled={actionsDisabled}
              className="text-[10px] font-bold text-navy-700 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear selection
            </button>
          </div>
        </>
      )}

      <div className="mt-3 rounded-xl border border-portal-line/80 bg-portal-surface/60 px-3 py-2.5">
        <div className="flex items-end justify-between gap-2">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
            Total selected
          </span>
          <span className="text-[20px] font-extrabold leading-none tabular-nums text-navy-950">
            {totalCreditUnits}{' '}
            <span className="text-[10px] font-bold text-slate-500">
              credit units
            </span>
          </span>
        </div>
        <p className="mt-1.5 text-[9px] leading-[14px] text-slate-400">
          {creditLimits
            ? `Official limit: ${creditLimits}. Supplied by the university.`
            : 'No credit-unit limit was supplied by the university service.'}
        </p>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50/70 px-2.5 py-2"
        >
          <PortalIcon
            icon={AlertCircle}
            className="mt-px size-3.5 shrink-0 text-rose-600"
            strokeWidth={2.3}
          />
          <p className="min-w-0 text-[10px] font-semibold leading-[15px] text-rose-700">
            {errorMessage}
          </p>
        </div>
      ) : null}

      {!canSubmit && blockedReason ? (
        <p className="mt-3 flex items-start gap-1.5 text-[9.5px] leading-[15px] text-slate-500">
          <PortalIcon
            icon={Info}
            className="mt-px size-3 shrink-0 text-navy-600"
            strokeWidth={2.2}
          />
          {blockedReason}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onReview}
        disabled={!canSubmit || isSubmitting}
        aria-busy={isSubmitting}
        className="mt-3 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-4 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-navy-900/45 disabled:shadow-none"
      >
        <PortalIcon
          icon={isSubmitting ? LoaderCircle : ClipboardCheck}
          className={`size-3.5 ${isSubmitting ? 'animate-spin' : ''}`}
          strokeWidth={2.3}
        />
        {isSubmitting ? 'Submitting registration…' : 'Review registration'}
      </button>

      <p className="mt-2 text-center text-[9px] leading-[14px] text-slate-400">
        Submitting sends your selection to the university. It is not final
        approval.
      </p>
    </SectionCard>
  );
}
