import type { ReactNode } from 'react';
import {
  AlertTriangle,
  Info,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { RegistrationSnapshot } from '../types/registration';
import {
  describeCreditLimits,
  formatRegistrationDate,
} from '../utils/format';
import { RegistrationStatusBadge } from './RegistrationStatusBadge';

interface RegistrationOverviewProps {
  snapshot: RegistrationSnapshot;
  isRefreshing: boolean;
  onRefresh: () => void;
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
        {label}
      </dt>
      <dd className="mt-0.5 break-words text-[11.5px] font-semibold leading-[17px] text-navy-950">
        {children}
      </dd>
    </div>
  );
}

export function RegistrationOverview({
  snapshot,
  isRefreshing,
  onRefresh,
}: RegistrationOverviewProps) {
  const { student, term, status, eligibility, period } = snapshot;
  const creditLimits = describeCreditLimits(
    snapshot.rules.minimumCreditUnits,
    snapshot.rules.maximumCreditUnits,
  );
  const periodDates = [
    period?.opensAt
      ? `Opens ${formatRegistrationDate(period.opensAt)}`
      : null,
    period?.closesAt
      ? `Closes ${formatRegistrationDate(period.closesAt)}`
      : null,
  ].filter((value): value is string => value !== null);
  const hasPeriod = Boolean(period?.label || periodDates.length > 0);
  const hasStatusContent = Boolean(
    status ||
      eligibility ||
      hasPeriod ||
      creditLimits ||
      snapshot.warnings.length > 0 ||
      snapshot.restrictions.length > 0,
  );

  return (
    <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <SectionCard
        title="Academic Session"
        description="The registration term supplied by the university."
      >
        <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          <Detail label="Academic session">
            {term?.academicSession ?? 'Not supplied'}
          </Detail>
          <Detail label="Semester">{term?.semester ?? 'Not supplied'}</Detail>
        </dl>

        {student ? (
          <div className="mt-3 border-t border-portal-line/80 pt-3">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
              Student
            </p>
            <dl className="mt-2 grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <Detail label="Name">{student.fullName}</Detail>
              {student.matricNumber ? (
                <Detail label="Matric number">{student.matricNumber}</Detail>
              ) : null}
              {student.department ? (
                <Detail label="Department">{student.department}</Detail>
              ) : null}
              {student.level ? (
                <Detail label="Level">{student.level}</Detail>
              ) : null}
            </dl>
          </div>
        ) : null}

        {!term && !student ? (
          <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-[15px] text-slate-400">
            <PortalIcon
              icon={Info}
              className="mt-px size-3 shrink-0"
              strokeWidth={2.2}
            />
            No academic session, semester, or student details were supplied by
            the university service.
          </p>
        ) : null}
      </SectionCard>

      <SectionCard
        title="Registration Status"
        description="Eligibility and period supplied by the university."
        headerAside={
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh registration data"
            aria-busy={isRefreshing}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-2.5 text-[10.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PortalIcon
              icon={RotateCcw}
              className={`size-3 ${isRefreshing ? 'animate-spin' : ''}`}
              strokeWidth={2.3}
            />
            <span className="hidden sm:inline">
              {isRefreshing ? 'Refreshing…' : 'Refresh'}
            </span>
          </button>
        }
      >
        {hasStatusContent ? (
          <>
            {status ? (
              <div className="flex flex-wrap items-start gap-2">
                <RegistrationStatusBadge status={status} />
                {status.description ? (
                  <p className="min-w-0 flex-1 text-[10.5px] leading-[16px] text-slate-500">
                    {status.description}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-[10.5px] leading-[16px] text-slate-500">
                The university has not supplied an official registration status.
              </p>
            )}

            <dl className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <Detail label="Eligibility">
                {eligibility ? (
                  <span
                    className={
                      eligibility.eligible
                        ? 'text-emerald-700'
                        : 'text-rose-700'
                    }
                  >
                    {eligibility.eligible ? 'Eligible' : 'Not eligible'}
                  </span>
                ) : (
                  'Not supplied'
                )}
              </Detail>
              {hasPeriod ? (
                <Detail label={period?.label ?? 'Registration period'}>
                  {periodDates.length > 0
                    ? periodDates.join(' · ')
                    : 'Period supplied without dates'}
                </Detail>
              ) : null}
              {creditLimits ? (
                <Detail label="Official credit-unit limit">
                  {creditLimits}
                </Detail>
              ) : null}
            </dl>

            {eligibility?.reason ? (
              <p className="mt-2 rounded-lg border border-portal-line/80 bg-portal-surface/60 px-2.5 py-2 text-[10px] leading-[15px] text-slate-600">
                {eligibility.reason}
              </p>
            ) : null}

            {snapshot.warnings.length > 0 ? (
              <div className="mt-3 rounded-xl border border-gold-200 bg-gold-50/70 px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gold-800">
                  <PortalIcon
                    icon={AlertTriangle}
                    className="size-3.5"
                    strokeWidth={2.3}
                  />
                  University warnings
                </p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[10.5px] leading-[16px] text-slate-700">
                  {snapshot.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {snapshot.restrictions.length > 0 ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50/70 px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-rose-700">
                  <PortalIcon
                    icon={ShieldAlert}
                    className="size-3.5"
                    strokeWidth={2.3}
                  />
                  University restrictions
                </p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[10.5px] leading-[16px] text-slate-700">
                  {snapshot.restrictions.map((restriction) => (
                    <li key={restriction}>{restriction}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex items-start gap-2.5 rounded-xl border border-portal-line/80 bg-portal-surface/60 px-3 py-3">
            <PortalIcon
              icon={Info}
              className="mt-0.5 size-4 shrink-0 text-navy-600"
              strokeWidth={2.2}
            />
            <p className="text-[10.5px] leading-[16px] text-slate-500">
              The university has not supplied a registration status,
              eligibility decision, period, credit-unit limits, warnings, or
              restrictions yet.
            </p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
