import { Eye } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { CourseResult } from '../types/results';
import type { ResultColumnAvailability } from '../utils/filter';
import { formatSuppliedNumber } from '../utils/format';

interface ResultsTableProps {
  results: CourseResult[];
  columns: ResultColumnAvailability;
  onViewResult: (result: CourseResult) => void;
}

function ScoreCell({ value }: { value: number | null }) {
  return (
    <span
      className={`text-[11.5px] font-semibold tabular-nums ${
        value === null ? 'text-slate-400' : 'text-navy-950'
      }`}
    >
      {formatSuppliedNumber(value)}
    </span>
  );
}

export function ResultsTable({
  results,
  columns,
  onViewResult,
}: ResultsTableProps) {
  return (
    <div className="hidden xl:block">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">
          Course results returned by the university results service
        </caption>
        <thead>
          <tr className="bg-portal-surface/65">
            <th
              scope="col"
              className="w-[27%] px-2 py-2.5 pl-4 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Course
            </th>
            <th
              scope="col"
              className="w-[8%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Units
            </th>
            {columns.continuousAssessment ? (
              <th
                scope="col"
                aria-label="Continuous assessment score"
                className="w-[8%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
              >
                CA
              </th>
            ) : null}
            {columns.examination ? (
              <th
                scope="col"
                className="w-[8%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
              >
                Exam
              </th>
            ) : null}
            {columns.total ? (
              <th
                scope="col"
                className="w-[9%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
              >
                Total
              </th>
            ) : null}
            {columns.letterGrade ? (
              <th
                scope="col"
                className="w-[8%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
              >
                Grade
              </th>
            ) : null}
            {columns.gradePoint ? (
              <th
                scope="col"
                aria-label="Grade point"
                className="w-[8%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
              >
                Points
              </th>
            ) : null}
            {columns.remark ? (
              <th
                scope="col"
                className="w-[16%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
              >
                Remark
              </th>
            ) : null}
            <th
              scope="col"
              className="w-[8%] px-2 py-2.5 pr-4 text-right text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr
              key={result.id}
              className="border-t border-portal-line/70 transition-colors hover:bg-portal-surface/45"
            >
              <td className="min-w-0 px-2 py-3 pl-4 align-middle">
                <p className="truncate font-mono text-[11px] font-bold text-navy-950">
                  {result.courseCode}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[10.5px] font-medium leading-[15px] text-slate-600">
                  {result.courseTitle}
                </p>
              </td>
              <td className="px-2 py-3 align-middle">
                <span className="text-[11px] font-semibold tabular-nums text-navy-950">
                  {formatSuppliedNumber(result.creditUnits)}
                </span>
              </td>
              {columns.continuousAssessment ? (
                <td className="px-2 py-3 align-middle">
                  <ScoreCell value={result.continuousAssessmentScore} />
                </td>
              ) : null}
              {columns.examination ? (
                <td className="px-2 py-3 align-middle">
                  <ScoreCell value={result.examinationScore} />
                </td>
              ) : null}
              {columns.total ? (
                <td className="px-2 py-3 align-middle">
                  <ScoreCell value={result.totalScore} />
                </td>
              ) : null}
              {columns.letterGrade ? (
                <td className="px-2 py-3 align-middle">
                  {result.letterGrade ? (
                    <span className="inline-flex min-w-6 items-center justify-center rounded-md bg-navy-50 px-1.5 py-0.5 text-[10.5px] font-extrabold text-navy-900 ring-1 ring-navy-100">
                      {result.letterGrade}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">—</span>
                  )}
                </td>
              ) : null}
              {columns.gradePoint ? (
                <td className="px-2 py-3 align-middle">
                  <ScoreCell value={result.gradePoint} />
                </td>
              ) : null}
              {columns.remark ? (
                <td className="px-2 py-3 align-middle">
                  <p
                    className={`line-clamp-2 text-[10.5px] leading-[15px] ${
                      result.remark?.trim()
                        ? 'font-medium text-slate-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {result.remark?.trim() ? result.remark : '—'}
                  </p>
                </td>
              ) : null}
              <td className="px-2 py-3 pr-4 align-middle">
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => onViewResult(result)}
                    aria-label={`View result details for ${result.courseCode}`}
                    title="View result details"
                    className="inline-flex size-8 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
                  >
                    <PortalIcon
                      icon={Eye}
                      className="size-4"
                      strokeWidth={2.2}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
