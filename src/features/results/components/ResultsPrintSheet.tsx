import { createPortal } from 'react-dom';
import type { ResultsSnapshot } from '../types/results';
import { getResultColumnAvailability } from '../utils/filter';
import {
  formatResultDate,
  formatSuppliedNumber,
  getPeriodLabel,
} from '../utils/format';

interface ResultsPrintSheetProps {
  snapshot: ResultsSnapshot;
}

function printValue(value: number | null): string {
  return value === null ? 'Not supplied' : formatSuppliedNumber(value);
}

function suppliedText(value: string | null): string {
  return value?.trim() ? value : 'Not supplied';
}

/**
 * A body-level print-only copy of the current result period.
 *
 * It is explicitly labelled as a portal printout and never claims to be an
 * official transcript, certified statement, or university-signed document.
 */
export function ResultsPrintSheet({ snapshot }: ResultsPrintSheetProps) {
  const period = snapshot.activePeriod;

  if (!period) {
    return null;
  }

  const context = snapshot.academicContext;
  const publication = snapshot.publication;
  const summary = snapshot.summary;
  const columns = getResultColumnAvailability(snapshot.results);
  const standing = summary?.academicStanding?.trim()
    ? summary.academicStanding
    : null;

  return createPortal(
    <div
      aria-hidden="true"
      className="results-print-sheet bg-white text-navy-950"
    >
      <div className="mx-auto max-w-[900px] px-8 py-8">
        <header className="border-b-4 border-gold-400 pb-4">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-navy-600">
            Godfrey Okoye University · Student Portal
          </p>
          <h1 className="mt-1 text-[25px] font-extrabold tracking-[-0.02em] text-navy-950">
            Academic Results
          </h1>
          <p className="mt-1 text-[11.5px] font-bold text-amber-800">
            PORTAL PRINTOUT — NOT AN OFFICIAL TRANSCRIPT OR CERTIFIED STATEMENT
          </p>
        </header>

        <dl className="mt-5 grid grid-cols-3 gap-x-5 gap-y-3">
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Student
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {suppliedText(context?.student?.fullName ?? null)}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Matriculation number
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {suppliedText(context?.student?.matriculationNumber ?? null)}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Programme
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {suppliedText(context?.programme ?? null)}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Academic session
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {period.academicSession || 'Not supplied'}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Semester
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {period.semester || 'Not supplied'}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Publication
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {publication?.status?.label ??
                (publication?.published === false
                  ? 'Not published'
                  : 'Not supplied')}
              {publication?.date
                ? ` · ${formatResultDate(publication.date)}`
                : ''}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Department
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {suppliedText(context?.department ?? null)}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Faculty
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {suppliedText(context?.faculty ?? null)}
            </dd>
          </div>
          <div>
            <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Level
            </dt>
            <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
              {suppliedText(context?.level ?? null)}
            </dd>
          </div>
        </dl>

        <section className="mt-5">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-700">
            Performance summary
          </h2>
          <dl className="mt-2 grid grid-cols-4 gap-2 border border-portal-line bg-portal-surface/60 p-3">
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Semester GPA
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.semesterGpa ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Cumulative GPA
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.cumulativeGpa ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Registered units
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.registeredCreditUnits ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Earned units
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.earnedCreditUnits ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Passed courses
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.passedCourses ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Failed courses
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.failedCourses ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Outstanding courses
              </dt>
              <dd className="mt-0.5 text-[13px] font-extrabold text-navy-950">
                {printValue(summary?.outstandingCourses ?? null)}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Academic standing
              </dt>
              <dd className="mt-0.5 text-[11px] font-bold text-navy-950">
                {standing ?? 'Not supplied'}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-700">
              Course results
            </h2>
            <p className="text-[9px] font-medium text-slate-500">
              {getPeriodLabel(period)}
            </p>
          </div>

          {snapshot.results.length === 0 ? (
            <p className="mt-2 border border-portal-line px-3 py-4 text-center text-[10.5px] font-medium text-slate-500">
              No course results were supplied for this period.
            </p>
          ) : (
            <table className="mt-2 w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-navy-200 bg-portal-surface">
                  <th className="px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                    Course
                  </th>
                  <th className="w-[8%] px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                    Units
                  </th>
                  {columns.continuousAssessment ? (
                    <th className="w-[8%] px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                      CA
                    </th>
                  ) : null}
                  {columns.examination ? (
                    <th className="w-[8%] px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                      Exam
                    </th>
                  ) : null}
                  {columns.total ? (
                    <th className="w-[8%] px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                      Total
                    </th>
                  ) : null}
                  {columns.letterGrade ? (
                    <th className="w-[8%] px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                      Grade
                    </th>
                  ) : null}
                  {columns.gradePoint ? (
                    <th className="w-[8%] px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                      Points
                    </th>
                  ) : null}
                  {columns.remark ? (
                    <th className="px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-navy-700">
                      Remark
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {snapshot.results.map((result) => (
                  <tr
                    key={result.id}
                    className="border-b border-portal-line/70 align-top"
                  >
                    <td className="px-2 py-1.5">
                      <p className="font-mono text-[9px] font-bold text-navy-950">
                        {result.courseCode}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-[12px] text-slate-600">
                        {result.courseTitle}
                      </p>
                    </td>
                    <td className="px-2 py-1.5 text-[9.5px] font-semibold tabular-nums text-navy-950">
                      {formatSuppliedNumber(result.creditUnits)}
                    </td>
                    {columns.continuousAssessment ? (
                      <td className="px-2 py-1.5 text-[9.5px] font-semibold tabular-nums text-navy-950">
                        {formatSuppliedNumber(
                          result.continuousAssessmentScore,
                        )}
                      </td>
                    ) : null}
                    {columns.examination ? (
                      <td className="px-2 py-1.5 text-[9.5px] font-semibold tabular-nums text-navy-950">
                        {formatSuppliedNumber(result.examinationScore)}
                      </td>
                    ) : null}
                    {columns.total ? (
                      <td className="px-2 py-1.5 text-[9.5px] font-semibold tabular-nums text-navy-950">
                        {formatSuppliedNumber(result.totalScore)}
                      </td>
                    ) : null}
                    {columns.letterGrade ? (
                      <td className="px-2 py-1.5 text-[9.5px] font-bold text-navy-950">
                        {result.letterGrade ?? '—'}
                      </td>
                    ) : null}
                    {columns.gradePoint ? (
                      <td className="px-2 py-1.5 text-[9.5px] font-semibold tabular-nums text-navy-950">
                        {formatSuppliedNumber(result.gradePoint)}
                      </td>
                    ) : null}
                    {columns.remark ? (
                      <td className="px-2 py-1.5 text-[9px] leading-[12px] text-slate-600">
                        {result.remark?.trim() ? result.remark : '—'}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <footer className="mt-6 border-t border-portal-line pt-3">
          <p className="text-[8.5px] leading-[13px] text-slate-500">
            This portal printout contains results displayed in the student
            portal for the selected period. It is not an official university
            transcript, is not certified, and must not be used as one. Missing
            values are shown as not supplied; the portal does not calculate or
            infer grades, GPA, CGPA, pass/fail verdicts, or academic standing.
            Official statements are available only when the university supplies
            them.
          </p>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
