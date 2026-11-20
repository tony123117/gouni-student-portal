import {
  CalendarCheck2,
  CircleCheckBig,
  ClipboardCheck,
  Clock3,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  type LucideIcon,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import type { ClearanceSnapshot } from '../types/exam-clearance';
import {
  formatClearanceCount,
  formatClearanceDate,
} from '../utils/format';
import { ClearanceStatusBadge } from './ClearanceStatusBadge';

interface ClearanceStatusPanelProps {
  snapshot: ClearanceSnapshot;
  isRefreshing: boolean;
  onRefresh: () => void;
  onRequestClearance: () => void;
}

interface StatusMetricProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: 'neutral' | 'positive' | 'critical';
}

const metricToneClasses = {
  neutral: 'bg-portal-sky text-navy-800',
  positive: 'bg-emerald-50 text-emerald-700',
  critical: 'bg-rose-50 text-rose-700',
} as const;

function StatusMetric({
  label,
  value,
  detail,
  icon,
  tone,
}: StatusMetricProps) {
  return (
    <div className="flex min-w-0 items-start gap-2.5 rounded-xl border border-portal-line/80 bg-white px-3 py-2.5">
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${metricToneClasses[tone]}`}
      >
        <PortalIcon icon={icon} className="size-4" strokeWidth={2.3} />
      </span>
      <div className="min-w-0">
        <p className="text-[8.5px] font-bold uppercase tracking-[0.11em] text-navy-600">
          {label}
        </p>
        <p className="mt-0.5 text-[16px] font-extrabold leading-5 tracking-[-0.02em] text-navy-950">
          {value}
        </p>
        <p className="mt-0.5 text-[9px] font-medium leading-[13px] text-slate-500">
          {detail}
        </p>
      </div>
    </div>
  );
}

export function ClearanceStatusPanel({
  snapshot,
  isRefreshing,
  onRefresh,
  onRequestClearance,
}: ClearanceStatusPanelProps) {
  const overall = snapshot.overallStatus;
  const cleared = overall?.cleared ?? null;
  const eligible = overall?.eligibleForExaminations ?? null;
  const requestBlockedReason = snapshot.requestBlockedReason?.trim()
    ? snapshot.requestBlockedReason
    : null;
  const canRequest =
    snapshot.capabilities.requestSubmission && requestBlockedReason === null;

  const verdict =
    cleared === true
      ? {
          title: 'Cleared',
          description:
            'The university reports your overall clearance as cleared.',
          icon: ShieldCheck,
          container: 'border-emerald-200 bg-emerald-50/65',
          iconClasses: 'bg-emerald-100 text-emerald-700',
          titleClasses: 'text-emerald-800',
        }
      : cleared === false
        ? {
            title: 'Not cleared',
            description:
              'The university has not marked your overall clearance as cleared.',
            icon: ShieldAlert,
            container: 'border-rose-200 bg-rose-50/65',
            iconClasses: 'bg-rose-100 text-rose-700',
            titleClasses: 'text-rose-800',
          }
        : {
            title: 'Not supplied',
            description:
              'The university has not supplied an overall clearance verdict for this period.',
            icon: ShieldQuestion,
            container: 'border-portal-line bg-portal-surface/70',
            iconClasses: 'bg-white text-navy-700 ring-1 ring-portal-line',
            titleClasses: 'text-navy-950',
          };

  const message = overall?.message?.trim()
    ? overall.message
    : overall?.status?.description?.trim()
      ? overall.status.description
      : verdict.description;

  const eligibilityLabel =
    eligible === true
      ? 'Eligible'
      : eligible === false
        ? 'Not eligible'
        : 'Not supplied';
  const eligibilityTone =
    eligible === true
      ? 'positive'
      : eligible === false
        ? 'critical'
        : 'neutral';

  return (
    <SectionCard
      title="Clearance status"
      description="Overall verdict and examination eligibility supplied by the university."
      headerAside={
        <div className="flex items-center gap-2">
          {snapshot.lastUpdated ? (
            <span className="hidden text-[10px] font-medium text-slate-500 sm:inline">
              Updated {formatClearanceDate(snapshot.lastUpdated)}
            </span>
          ) : null}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh exam clearance"
            aria-busy={isRefreshing}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-2.5 text-[10.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PortalIcon
              icon={RefreshCw}
              className={`size-3 ${isRefreshing ? 'animate-spin' : ''}`}
              strokeWidth={2.3}
            />
            <span className="hidden sm:inline">
              {isRefreshing ? 'Refreshing…' : 'Refresh'}
            </span>
          </button>
        </div>
      }
    >
      <div
        className={`flex flex-col gap-3 rounded-xl border p-3.5 sm:flex-row sm:items-start sm:justify-between sm:p-4 ${verdict.container}`}
      >
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${verdict.iconClasses}`}
          >
            <PortalIcon
              icon={verdict.icon}
              className="size-5"
              strokeWidth={2.3}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-navy-600">
              Overall clearance
            </p>
            <h3
              className={`mt-0.5 text-[23px] font-extrabold leading-[28px] tracking-[-0.03em] sm:text-[26px] ${verdict.titleClasses}`}
            >
              {verdict.title}
            </h3>
            <p className="mt-1 max-w-xl text-[11.5px] leading-[18px] text-slate-600">
              {message}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
          {overall?.status ? (
            <ClearanceStatusBadge status={overall.status} />
          ) : (
            <span className="inline-flex items-center rounded-full border border-portal-line bg-white px-2 py-0.5 text-[10px] font-bold leading-4 text-slate-500">
              Status label not supplied
            </span>
          )}
          <p className="text-[9.5px] font-medium text-slate-500">
            Last verified{' '}
            <span className="font-semibold text-navy-900">
              {formatClearanceDate(overall?.lastVerifiedAt ?? null)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <StatusMetric
          label="Completed requirements"
          value={formatClearanceCount(
            overall?.completedRequirementCount ?? null,
          )}
          detail={
            overall?.completedRequirementCount == null
              ? 'Not supplied'
              : 'As supplied by the university'
          }
          icon={CircleCheckBig}
          tone="positive"
        />
        <StatusMetric
          label="Outstanding requirements"
          value={formatClearanceCount(
            overall?.outstandingRequirementCount ?? null,
          )}
          detail={
            overall?.outstandingRequirementCount == null
              ? 'Not supplied'
              : 'As supplied by the university'
          }
          icon={Clock3}
          tone={
            overall?.outstandingRequirementCount
              ? 'critical'
              : 'neutral'
          }
        />
        <div className="col-span-2 sm:col-span-1">
          <StatusMetric
            label="Examination eligibility"
            value={eligibilityLabel}
            detail={
              eligible === null
                ? 'Not supplied'
                : 'As supplied by the university'
            }
            icon={eligible === false ? ShieldAlert : CalendarCheck2}
            tone={eligibilityTone}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5 rounded-xl border border-portal-line/80 bg-portal-surface/45 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2">
          <PortalIcon
            icon={ClipboardCheck}
            className="mt-0.5 size-4 shrink-0 text-navy-600"
            strokeWidth={2.2}
          />
          <p
            id="clearance-request-note"
            className="max-w-xl text-[10px] leading-[16px] text-slate-500"
          >
            {snapshot.capabilities.requestSubmission
              ? requestBlockedReason ??
                'Submitting a request does not confirm clearance or examination eligibility. The university reviews every request.'
              : requestBlockedReason ??
                'Clearance requests are not available from the portal for this period.'}
          </p>
        </div>

        {snapshot.capabilities.requestSubmission ? (
          <button
            type="button"
            onClick={onRequestClearance}
            disabled={!canRequest}
            aria-describedby="clearance-request-note"
            className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-navy-900/40 disabled:shadow-none"
          >
            <PortalIcon
              icon={ClipboardCheck}
              className="size-3.5"
              strokeWidth={2.3}
            />
            Request clearance
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-[9px] leading-[14px] text-slate-400">
        The portal does not calculate completed or outstanding counts, infer
        eligibility from requirement statuses, or mark a student cleared.
      </p>
    </SectionCard>
  );
}
