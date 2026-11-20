import { ClipboardCheck, Info, LoaderCircle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  RegistrationCourse,
  RegistrationTerm,
} from '../types/registration';
import {
  describeCreditLimits,
  formatCreditUnits,
} from '../utils/format';

interface RegistrationReviewDialogProps {
  term: RegistrationTerm;
  courses: RegistrationCourse[];
  totalCreditUnits: number;
  minimumCreditUnits: number | null;
  maximumCreditUnits: number | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RegistrationReviewDialog({
  term,
  courses,
  totalCreditUnits,
  minimumCreditUnits,
  maximumCreditUnits,
  isSubmitting,
  onClose,
  onConfirm,
}: RegistrationReviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const creditLimits = describeCreditLimits(
    minimumCreditUnits,
    maximumCreditUnits,
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="registration-review-title"
      onCancel={(event) => {
        event.preventDefault();

        if (!isSubmitting) {
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current && !isSubmitting) {
          onClose();
        }
      }}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-lg overflow-hidden rounded-2xl border border-portal-line bg-white p-0 text-navy-950 shadow-[0_24px_60px_rgba(5,36,85,0.28)] backdrop:bg-navy-950/55"
    >
      <div className="flex max-h-[calc(100vh-2rem)] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-portal-line px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon icon={ClipboardCheck} className="size-4" duotone />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-navy-600">
                Review
              </p>
              <h2
                id="registration-review-title"
                className="mt-0.5 text-[15px] font-extrabold tracking-[-0.02em] text-navy-950"
              >
                Confirm your course selection
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close registration review"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PortalIcon icon={X} className="size-4" strokeWidth={2.3} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <dl className="grid gap-x-4 gap-y-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 p-3.5 sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Academic session
              </dt>
              <dd className="mt-0.5 text-[11.5px] font-semibold text-navy-950">
                {term.academicSession}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Semester
              </dt>
              <dd className="mt-0.5 text-[11.5px] font-semibold text-navy-950">
                {term.semester}
              </dd>
            </div>
          </dl>

          <div className="mt-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-navy-600">
                Selected courses
              </p>
              <p className="text-[10px] font-bold text-navy-800">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'}
              </p>
            </div>
            <ul className="mt-1.5 divide-y divide-portal-line/70 rounded-xl border border-portal-line/80">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="flex items-start justify-between gap-3 px-3 py-2"
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
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-[10px] font-bold tabular-nums text-navy-800">
                    {formatCreditUnits(course.creditUnits)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex items-end justify-between gap-2 rounded-xl border border-portal-line/80 bg-portal-surface/60 px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Total credit units
              </p>
              <p className="mt-0.5 text-[9px] leading-[14px] text-slate-400">
                {creditLimits
                  ? `Official limit: ${creditLimits}.`
                  : 'No credit-unit limit was supplied by the university.'}
              </p>
            </div>
            <span className="text-[20px] font-extrabold leading-none tabular-nums text-navy-950">
              {totalCreditUnits}
            </span>
          </div>

          <div className="mt-3.5 flex items-start gap-2 rounded-xl border border-gold-200 bg-gold-50/70 px-3 py-2.5">
            <PortalIcon
              icon={Info}
              className="mt-px size-3.5 shrink-0 text-gold-800"
              strokeWidth={2.2}
            />
            <p className="min-w-0 text-[10px] leading-[15px] text-slate-600">
              Submitting sends this selection to the university registration
              service. A receipt acknowledgement is not final approval, and the
              portal cannot create a registration on the university&apos;s
              behalf.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-portal-line px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-portal-line bg-white px-3.5 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting || courses.length === 0}
            aria-busy={isSubmitting}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-navy-900/45 disabled:shadow-none"
          >
            <PortalIcon
              icon={isSubmitting ? LoaderCircle : ClipboardCheck}
              className={`size-3.5 ${isSubmitting ? 'animate-spin' : ''}`}
              strokeWidth={2.3}
            />
            {isSubmitting ? 'Submitting…' : 'Submit registration'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
