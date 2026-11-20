import { ArrowUpRight, CloudOff } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import type { ResultPeriod } from '../types/results';
import { ResultsStatusBadge } from './ResultsStatusBadge';

interface ResultsHistoryProps {
  periods: ResultPeriod[] | null;
  activePeriodId: string | null;
  onSelectPeriod: (periodId: string) => void;
}

export function ResultsHistory({
  periods,
  activePeriodId,
  onSelectPeriod,
}: ResultsHistoryProps) {
  return (
    <SectionCard
      title="Result history"
      description="Academic periods supplied by the university."
      headerAside={
        periods ? (
          <span className="text-[11.5px] font-semibold text-slate-500">
            {periods.length} {periods.length === 1 ? 'period' : 'periods'}
          </span>
        ) : (
          <Badge variant="warning">Unavailable</Badge>
        )
      }
    >
      {periods === null ? (
        <div className="flex items-start gap-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 px-3.5 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
            <PortalIcon icon={CloudOff} className="size-[18px]" duotone />
          </span>
          <div className="min-w-0">
            <p className="text-[11.5px] font-bold text-navy-950">
              Result history unavailable
            </p>
            <p className="mt-0.5 text-[10.5px] leading-[16px] text-slate-500">
              The university has not supplied a history of result periods. The
              current period is shown on this page, but other periods cannot be
              listed or selected.
            </p>
          </div>
        </div>
      ) : periods.length === 0 ? (
        <p className="text-[11px] leading-[17px] text-slate-500">
          No result periods have been supplied by the university.
        </p>
      ) : (
        <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {periods.map((period) => {
            const isActive = period.id === activePeriodId;

            return (
              <li key={period.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => onSelectPeriod(period.id)}
                  disabled={isActive}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group flex h-full w-full min-w-0 flex-col rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-navy-200 bg-navy-50/70'
                      : 'border-portal-line/90 bg-white hover:border-navy-200 hover:bg-portal-surface/50'
                  }`}
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[11.5px] font-bold text-navy-950">
                        {period.academicSession}
                      </p>
                      <p className="mt-0.5 truncate text-[10.5px] font-semibold text-slate-600">
                        {period.semester}
                      </p>
                    </div>
                    {isActive ? (
                      <Badge variant="navy">Viewing</Badge>
                    ) : (
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors group-hover:bg-white">
                        <PortalIcon
                          icon={ArrowUpRight}
                          className="size-3.5"
                          strokeWidth={2.3}
                        />
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex w-full flex-wrap items-center justify-between gap-1.5">
                    {period.publicationStatus ? (
                      <ResultsStatusBadge
                        status={period.publicationStatus}
                      />
                    ) : (
                      <span className="text-[9.5px] font-medium text-slate-400">
                        Publication status not supplied
                      </span>
                    )}
                    {isActive ? null : (
                      <span className="text-[9.5px] font-bold text-navy-700">
                        View results
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {periods ? (
        <p className="mt-2.5 text-[9.5px] leading-[15px] text-slate-400">
          Sessions and semesters are shown exactly as supplied by the
          university.
        </p>
      ) : null}
    </SectionCard>
  );
}
