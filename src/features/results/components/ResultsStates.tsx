import {
  CalendarX,
  Clock3,
  CloudOff,
  FileSearch,
  RefreshCw,
  RotateCcw,
  SearchX,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { ResultPublication } from '../types/results';
import { ResultsStatusBadge } from './ResultsStatusBadge';

interface RetryStateProps {
  message: string | null;
  isRefreshing: boolean;
  onRefresh: () => void;
}

function ResultsRetryButton({
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

export function ResultsUnavailableState({
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
        Academic results unavailable
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        {message ??
          'Official academic results will appear here once the university results service is available.'}
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        The portal does not estimate, calculate, or fabricate results, grades,
        GPA, CGPA, or academic standing.
      </p>
      <ResultsRetryButton
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        label="Check again"
      />
    </div>
  );
}

export function ResultsNoPeriodsState({
  message,
  isRefreshing,
  onRefresh,
}: RetryStateProps) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-7"
    >
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-portal-sky text-navy-800 ring-1 ring-portal-line">
        <PortalIcon icon={CalendarX} className="size-[22px]" strokeWidth={2.2} />
      </span>
      <h2 className="mt-3.5 text-[22px] font-extrabold tracking-[-0.025em] text-navy-950">
        No result periods available
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        {message ??
          'The university has not supplied any academic periods with results for your student record.'}
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        Academic sessions and semesters are never assumed by the portal. They
        will appear only when the university supplies them.
      </p>
      <ResultsRetryButton
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        label="Check again"
      />
    </div>
  );
}

export function ResultsSelectPeriodNotice() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-navy-200 bg-navy-50 px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy-700 ring-1 ring-navy-200">
        <PortalIcon icon={CalendarX} className="size-[18px]" strokeWidth={2.2} />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold text-navy-950">
          Select an academic period
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          Choose one of the periods supplied by the university to view its
          results.
        </p>
      </div>
    </div>
  );
}

interface NotPublishedNoticeProps {
  publication: ResultPublication;
}

export function ResultsNotPublishedNotice({
  publication,
}: NotPublishedNoticeProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 ring-1 ring-amber-200">
        <PortalIcon icon={Clock3} className="size-[18px]" strokeWidth={2.3} />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[12.5px] font-bold text-navy-950">
            Results not published
          </p>
          {publication.status ? (
            <ResultsStatusBadge status={publication.status} />
          ) : null}
        </div>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          {publication.message?.trim()
            ? publication.message
            : 'The university has not published results for this period. Course results and summaries will appear after publication.'}
        </p>
      </div>
    </div>
  );
}

export function ResultsUnpublishedState({
  publication,
}: {
  publication: ResultPublication | null;
}) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
        <PortalIcon icon={Clock3} className="size-[22px]" strokeWidth={2.2} />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        Results not published
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        {publication?.message?.trim()
          ? publication.message
          : 'The university has not published course results for this period yet.'}
      </p>
      {publication?.status ? (
        <div className="mt-2.5">
          <ResultsStatusBadge status={publication.status} />
        </div>
      ) : null}
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        Only published results are displayed. The portal does not estimate or
        calculate missing results.
      </p>
    </div>
  );
}

export function ResultsEmptyState() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={FileSearch} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        No results for this period
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        The university has not returned any course results for the selected
        academic period.
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        Only official results returned by the university are displayed here.
      </p>
    </div>
  );
}

export function ResultsFilteredEmptyState({
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
        No matching results
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        No course results match your current search and filters.
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

export function ResultsRefreshNotice() {
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
          Couldn&apos;t refresh results
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          Showing the last loaded snapshot. Use the refresh control above to try
          again.
        </p>
      </div>
    </div>
  );
}
