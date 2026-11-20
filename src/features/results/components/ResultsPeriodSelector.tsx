import { CalendarRange, ChevronDown, RefreshCw } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import type { ResultPeriod } from '../types/results';
import { formatResultDate, getPeriodLabel } from '../utils/format';

interface ResultsPeriodSelectorProps {
  /** `null` means the university did not supply a period history. */
  periods: ResultPeriod[] | null;
  activePeriod: ResultPeriod | null;
  isRefreshing: boolean;
  lastUpdated: string | null;
  onSelectPeriod: (periodId: string) => void;
  onRefresh: () => void;
}

const controlClassName =
  'mt-1 h-11 w-full rounded-lg border border-portal-line bg-portal-surface/60 text-navy-950 outline-none transition-colors hover:bg-portal-surface focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100 disabled:cursor-not-allowed disabled:opacity-70';

const labelClassName =
  'block text-[9.5px] font-bold uppercase tracking-[0.13em] text-navy-600';

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => Boolean(value.trim()))));
}

export function ResultsPeriodSelector({
  periods,
  activePeriod,
  isRefreshing,
  lastUpdated,
  onSelectPeriod,
  onRefresh,
}: ResultsPeriodSelectorProps) {
  const historyUnavailable = periods === null;
  const sessions = periods
    ? uniqueValues(periods.map((period) => period.academicSession))
    : [];
  const activeSession = activePeriod?.academicSession ?? '';
  const sessionOptions = uniqueValues([
    ...sessions,
    ...(activeSession ? [activeSession] : []),
  ]);
  const semesterOptions = periods
    ? uniqueValues(
        periods
          .filter((period) => period.academicSession === activeSession)
          .map((period) => period.semester)
          .concat(activePeriod ? [activePeriod.semester] : []),
      )
    : [];
  const activeSemester = activePeriod?.semester ?? '';

  const handleSessionChange = (academicSession: string) => {
    const firstPeriod = periods?.find(
      (period) => period.academicSession === academicSession,
    );

    if (firstPeriod) {
      onSelectPeriod(firstPeriod.id);
    }
  };

  const handleSemesterChange = (semester: string) => {
    const matchingPeriod = periods?.find(
      (period) =>
        period.academicSession === activeSession &&
        period.semester === semester,
    );

    if (matchingPeriod) {
      onSelectPeriod(matchingPeriod.id);
    }
  };

  return (
    <SectionCard
      title="Academic period"
      description="Choose a session and semester supplied by the university."
      headerAside={
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-busy={isRefreshing}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-3 text-[11px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PortalIcon
            icon={RefreshCw}
            className={`size-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
            strokeWidth={2.3}
          />
          {isRefreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      }
    >
      {historyUnavailable ? (
        <p
          role="status"
          className="rounded-lg border border-gold-200 bg-gold-50 px-3 py-2.5 text-[11px] leading-[17px] text-gold-800"
        >
          Result period history is unavailable from the university. The period
          below is the current result period and cannot be changed from this
          page.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <label htmlFor="results-session" className="block">
            <span className={labelClassName}>Academic session</span>
            <span className="relative mt-1 block">
              <select
                id="results-session"
                value={activeSession}
                disabled={sessionOptions.length === 0}
                onChange={(event) => handleSessionChange(event.target.value)}
                className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
              >
                {activeSession ? null : (
                  <option value="">Select a session</option>
                )}
                {sessionOptions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
              <PortalIcon
                icon={ChevronDown}
                className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                strokeWidth={2.3}
              />
            </span>
          </label>

          <label htmlFor="results-semester" className="block">
            <span className={labelClassName}>Semester</span>
            <span className="relative mt-1 block">
              <select
                id="results-semester"
                value={activeSemester}
                disabled={!activeSession || semesterOptions.length === 0}
                onChange={(event) => handleSemesterChange(event.target.value)}
                className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
              >
                {activeSemester ? null : (
                  <option value="">Select a semester</option>
                )}
                {semesterOptions.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
              <PortalIcon
                icon={ChevronDown}
                className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                strokeWidth={2.3}
              />
            </span>
          </label>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-2 rounded-lg border border-portal-line/80 bg-portal-surface/60 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-navy-700 ring-1 ring-portal-line">
            <PortalIcon
              icon={CalendarRange}
              className="size-4"
              strokeWidth={2.2}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.13em] text-navy-600">
              Viewing
            </p>
            <p
              aria-live="polite"
              className="truncate text-[11.5px] font-bold text-navy-950"
            >
              {activePeriod
                ? getPeriodLabel(activePeriod)
                : 'No academic period selected'}
            </p>
          </div>
        </div>
        {lastUpdated ? (
          <p className="shrink-0 text-[10px] font-medium text-slate-500">
            Updated {formatResultDate(lastUpdated)}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
