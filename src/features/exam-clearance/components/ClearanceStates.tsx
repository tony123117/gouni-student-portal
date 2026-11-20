import {
  AlertCircle,
  CloudOff,
  FileSearch,
  RefreshCw,
  RotateCcw,
  SearchX,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';

interface RetryStateProps {
  message: string | null;
  isRefreshing: boolean;
  onRefresh: () => void;
}

function ClearanceRetryButton({
  isRefreshing,
  onRefresh,
  label,
}: {
  isRefreshing: boolean;
  onRefresh: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onRefresh}
      disabled={isRefreshing}
      aria-busy={isRefreshing}
      className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <PortalIcon
        icon={RefreshCw}
        className={`size-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
        strokeWidth={2.3}
      />
      {isRefreshing ? 'Checking…' : label}
    </button>
  );
}

export function ClearanceUnavailableState({
  message,
  isRefreshing,
  onRefresh,
}: RetryStateProps) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-7"
    >
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[22px]" duotone />
      </span>
      <h2 className="mt-3.5 text-[22px] font-extrabold tracking-[-0.025em] text-navy-950">
        Exam clearance unavailable
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        {message ??
          'Your exam clearance information will appear here once the university clearance service is available.'}
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        The portal does not estimate clearance, create requirements, calculate
        outstanding amounts, or assume examination eligibility.
      </p>
      <ClearanceRetryButton
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        label="Check again"
      />
    </div>
  );
}

export function ClearanceError({
  isRetrying,
  onRetry,
}: {
  isRetrying: boolean;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-7"
    >
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
        <PortalIcon
          icon={AlertCircle}
          className="size-[22px]"
          strokeWidth={2.3}
        />
      </span>
      <h2 className="mt-3.5 text-[22px] font-extrabold tracking-[-0.025em] text-navy-950">
        We couldn&apos;t load your exam clearance
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        Clearance information is currently unavailable. No clearance verdict,
        requirement, amount, deadline, or examination eligibility has been
        assumed.
      </p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        aria-busy={isRetrying}
        className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <PortalIcon
          icon={RefreshCw}
          className={`size-3.5 ${isRetrying ? 'animate-spin' : ''}`}
          strokeWidth={2.3}
        />
        {isRetrying ? 'Retrying…' : 'Retry'}
      </button>
    </div>
  );
}

export function ClearanceRefreshNotice() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-800 ring-1 ring-gold-200">
        <PortalIcon icon={RefreshCw} className="size-[18px]" strokeWidth={2.3} />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold text-navy-950">
          Couldn&apos;t refresh exam clearance
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          Showing the last loaded clearance snapshot. Use the refresh control
          above to try again.
        </p>
      </div>
    </div>
  );
}

export function ClearanceRequirementsUnavailableState() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 px-3.5 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[18px]" duotone />
      </span>
      <div className="min-w-0">
        <p className="text-[11.5px] font-bold text-navy-950">
          Clearance requirements unavailable
        </p>
        <p className="mt-0.5 text-[10.5px] leading-[16px] text-slate-500">
          The university has not supplied a clearance requirement list for this
          period. A missing list is not treated as an empty list, and it does
          not mean you are cleared.
        </p>
      </div>
    </div>
  );
}

export function ClearanceEmptyRequirementsState() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={FileSearch} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        No clearance requirements supplied
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        The university returned an empty requirement list for this period.
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        The empty list does not change the university&apos;s overall verdict.
        Overall clearance and examination eligibility are shown above exactly
        as supplied by the university.
      </p>
    </div>
  );
}

export function ClearanceFilteredEmptyState({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={SearchX} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        No matching requirements
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        No clearance requirements match your current search and filters.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
      >
        <PortalIcon icon={RotateCcw} className="size-3.5" strokeWidth={2.3} />
        Clear filters
      </button>
    </div>
  );
}

