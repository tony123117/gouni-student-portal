import { Eye } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { CourseResult } from '../types/results';
import { formatSuppliedNumber } from '../utils/format';
import { ResultsStatusBadge } from './ResultsStatusBadge';

interface ResultsCardsProps {
  results: CourseResult[];
  onViewResult: (result: CourseResult) => void;
}

interface CardValue {
  label: string;
  value: string;
}

function getMetaValues(result: CourseResult): CardValue[] {
  const values: CardValue[] = [];

  if (result.creditUnits !== null) {
    values.push({
      label: 'Credit units',
      value: formatSuppliedNumber(result.creditUnits),
    });
  }

  if (result.letterGrade) {
    values.push({ label: 'Grade', value: result.letterGrade });
  }

  if (result.gradePoint !== null) {
    values.push({
      label: 'Grade point',
      value: formatSuppliedNumber(result.gradePoint),
    });
  }

  return values;
}

function getScoreValues(result: CourseResult): CardValue[] {
  const values: CardValue[] = [];

  if (result.continuousAssessmentScore !== null) {
    values.push({
      label: 'CA',
      value: formatSuppliedNumber(result.continuousAssessmentScore),
    });
  }

  if (result.examinationScore !== null) {
    values.push({
      label: 'Exam',
      value: formatSuppliedNumber(result.examinationScore),
    });
  }

  if (result.totalScore !== null) {
    values.push({
      label: 'Total',
      value: formatSuppliedNumber(result.totalScore),
    });
  }

  return values;
}

export function ResultsCards({ results, onViewResult }: ResultsCardsProps) {
  return (
    <ul className="grid gap-2.5 bg-portal-surface/55 p-3.5 sm:grid-cols-2 sm:gap-3 sm:p-4 xl:hidden">
      {results.map((result) => {
        const metaValues = getMetaValues(result);
        const scoreValues = getScoreValues(result);

        return (
          <li
            key={result.id}
            className="flex min-w-0 flex-col rounded-xl border border-portal-line/90 bg-white p-3.5 shadow-[0_1px_8px_rgba(5,42,94,0.03)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-mono text-[11.5px] font-bold text-navy-950">
                  {result.courseCode}
                </p>
                <p className="mt-0.5 text-[12.5px] font-semibold leading-[18px] text-navy-950">
                  {result.courseTitle}
                </p>
              </div>
              {result.status ? (
                <ResultsStatusBadge status={result.status} />
              ) : null}
            </div>

            {metaValues.length > 0 ? (
              <dl className="mt-2.5 grid grid-cols-3 gap-2 rounded-lg bg-portal-surface/80 px-3 py-2">
                {metaValues.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <dt className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-[12px] font-extrabold tabular-nums text-navy-950">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {scoreValues.length > 0 ? (
              <dl className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-portal-line/70 pt-2.5">
                {scoreValues.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline gap-1.5"
                  >
                    <dt className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
                      {item.label}
                    </dt>
                    <dd className="text-[11.5px] font-bold tabular-nums text-navy-950">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {result.remark?.trim() ? (
              <p className="mt-2.5 border-t border-portal-line/70 pt-2 text-[10.5px] leading-[16px] text-slate-500">
                {result.remark}
              </p>
            ) : null}

            <div className="mt-3 flex">
              <button
                type="button"
                onClick={() => onViewResult(result)}
                aria-label={`View result details for ${result.courseCode}`}
                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-3 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
              >
                <PortalIcon icon={Eye} className="size-3.5" strokeWidth={2.2} />
                View result details
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
