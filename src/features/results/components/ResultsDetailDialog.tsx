import { GraduationCap, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { CourseResult, ResultPeriod } from '../types/results';
import {
  formatSuppliedNumber,
  getPeriodLabel,
} from '../utils/format';
import { ResultsStatusBadge } from './ResultsStatusBadge';

interface ResultsDetailDialogProps {
  result: CourseResult;
  period: ResultPeriod;
  onClose: () => void;
}

interface DetailValueProps {
  label: string;
  value: string | null;
  wide?: boolean;
}

function DetailValue({ label, value, wide = false }: DetailValueProps) {
  return (
    <div className={wide ? 'min-w-0 sm:col-span-2' : 'min-w-0'}>
      <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-[12px] leading-[18px] ${
          value
            ? 'font-semibold text-navy-950'
            : 'font-medium italic text-slate-400'
        }`}
      >
        {value ?? 'Not supplied'}
      </dd>
    </div>
  );
}

export function ResultsDetailDialog({
  result,
  period,
  onClose,
}: ResultsDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      aria-labelledby="result-details-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-lg overflow-hidden rounded-2xl border border-portal-line bg-white p-0 text-navy-950 shadow-[0_24px_60px_rgba(5,36,85,0.28)] backdrop:bg-navy-950/55"
    >
      <div className="flex max-h-[calc(100vh-2rem)] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-portal-line px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon
                icon={GraduationCap}
                className="size-4"
                duotone
              />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-navy-600">
                Course result
              </p>
              <h2
                id="result-details-title"
                className="mt-0.5 truncate font-mono text-[14px] font-extrabold text-navy-950"
              >
                {result.courseCode}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close result details"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <PortalIcon icon={X} className="size-4" strokeWidth={2.3} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            {result.status ? (
              <ResultsStatusBadge status={result.status} />
            ) : null}
            <p className="text-[10px] font-medium text-slate-500">
              {getPeriodLabel(period)}
            </p>
          </div>

          <h3 className="mt-2.5 text-[13.5px] font-bold leading-[20px] text-navy-950">
            {result.courseTitle}
          </h3>

          <dl className="mt-3.5 grid gap-x-4 gap-y-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 p-3.5 sm:grid-cols-2">
            <DetailValue
              label="Credit units"
              value={
                result.creditUnits === null
                  ? null
                  : formatSuppliedNumber(result.creditUnits)
              }
            />
            <DetailValue label="Letter grade" value={result.letterGrade} />
            <DetailValue
              label="Continuous assessment"
              value={
                result.continuousAssessmentScore === null
                  ? null
                  : formatSuppliedNumber(result.continuousAssessmentScore)
              }
            />
            <DetailValue
              label="Examination score"
              value={
                result.examinationScore === null
                  ? null
                  : formatSuppliedNumber(result.examinationScore)
              }
            />
            <DetailValue
              label="Total score"
              value={
                result.totalScore === null
                  ? null
                  : formatSuppliedNumber(result.totalScore)
              }
            />
            <DetailValue
              label="Grade point"
              value={
                result.gradePoint === null
                  ? null
                  : formatSuppliedNumber(result.gradePoint)
              }
            />
            <div className="min-w-0 sm:col-span-2">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Result status
              </dt>
              <dd className="mt-1">
                {result.status ? (
                  <ResultsStatusBadge status={result.status} />
                ) : (
                  <span className="text-[11px] font-medium italic text-slate-400">
                    Not supplied
                  </span>
                )}
              </dd>
            </div>
            <DetailValue label="Remark" value={result.remark} wide />
          </dl>

          <p className="mt-3 text-[9.5px] leading-[15px] text-slate-400">
            All values are shown exactly as supplied by the university. Missing
            values are not calculated, inferred, or replaced with zero. This
            portal does not generate grades, GPA, CGPA, or academic standing.
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-portal-line px-4 py-3 sm:px-5">
          <p className="text-[9.5px] font-medium text-slate-400">
            Portal result record
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-portal-line bg-white px-3.5 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
