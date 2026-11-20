import {
  AlertCircle,
  BookX,
  CircleAlert,
  CircleCheckBig,
  CloudOff,
  LoaderCircle,
  RotateCcw,
  SearchX,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { RegistrationSubmissionResult } from '../types/registration';
import { RegistrationStatusBadge } from './RegistrationStatusBadge';

interface NoticeProps {
  title: string;
  message: string | null;
}

function RegistrationNotice({ title, message }: NoticeProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-800 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[18px]" duotone />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold text-navy-950">{title}</p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          {message ??
            'Course registration will be available once the university registration service is connected.'}
        </p>
      </div>
    </div>
  );
}

interface RegistrationAvailabilityNoticeProps {
  message: string | null;
}

export function RegistrationAvailabilityNotice({
  message,
}: RegistrationAvailabilityNoticeProps) {
  return (
    <RegistrationNotice title="Course registration unavailable" message={message} />
  );
}

interface RegistrationSubmissionBlockedNoticeProps {
  message: string | null;
}

export function RegistrationSubmissionBlockedNotice({
  message,
}: RegistrationSubmissionBlockedNoticeProps) {
  return (
    <RegistrationNotice
      title="Registration submission unavailable"
      message={message}
    />
  );
}

export function RegistrationRefreshNotice() {
  return (
    <RegistrationNotice
      title="Couldn't refresh registration data"
      message="Showing the last loaded snapshot. Since submission state is confirmed only by the university service, check your registration history before retrying anything."
    />
  );
}

interface ContextErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export function RegistrationContextError({
  isRetrying,
  onRetry,
}: ContextErrorProps) {
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
        We couldn&apos;t load course registration
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        The university registration service is currently unavailable. No
        registration data was loaded and nothing has been submitted.
      </p>
      <RetryButton isRetrying={isRetrying} onRetry={onRetry} />
    </div>
  );
}

interface SubmissionErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export function RegistrationSubmissionError({
  isRetrying,
  onRetry,
}: SubmissionErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-portal-line/90 bg-white p-4 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-5"
    >
      <span className="flex size-[44px] items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
        <PortalIcon
          icon={CircleAlert}
          className="size-[19px]"
          strokeWidth={2.3}
        />
      </span>
      <h2 className="mt-3 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950 sm:text-[19px]">
        We couldn&apos;t submit your registration
      </h2>
      <p className="mt-1.5 max-w-lg text-[11.5px] leading-[19px] text-slate-600">
        The university registration service did not confirm receipt. The portal
        has not recorded a successful registration.
      </p>
      <p className="mt-1 max-w-lg text-[10.5px] leading-[17px] text-slate-500">
        You can retry safely. If you are unsure whether an earlier request
        reached the university, refresh the registration data and check your
        history before submitting again.
      </p>
      <RetryButton isRetrying={isRetrying} onRetry={onRetry} />
    </div>
  );
}

export function RegistrationSubmissionPending() {
  return (
    <div
      role="status"
      aria-label="Submitting your course registration"
      className="rounded-2xl border border-portal-line/90 bg-white p-4 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-5"
    >
      <span className="sr-only">Submitting your course registration</span>
      <div className="flex items-center gap-3">
        <span className="flex size-[44px] shrink-0 items-center justify-center rounded-2xl bg-portal-sky text-navy-800">
          <PortalIcon
            icon={LoaderCircle}
            className="size-[19px] animate-spin"
            strokeWidth={2.3}
          />
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-extrabold tracking-[-0.02em] text-navy-950">
            Submitting your registration…
          </p>
          <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-500">
            Your course selection is being sent to the university registration
            service. Please keep this page open.
          </p>
        </div>
      </div>
    </div>
  );
}

interface SuccessCardProps {
  result: RegistrationSubmissionResult;
}

/**
 * A resolved request means the university confirmed receipt only. The portal
 * deliberately does not describe the registration as approved or completed.
 */
export function RegistrationSuccessCard({ result }: SuccessCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-[44px] shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <PortalIcon
            icon={CircleCheckBig}
            className="size-[19px]"
            strokeWidth={2.3}
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-navy-950 sm:text-[18px]">
              Registration received
            </h2>
            <RegistrationStatusBadge status={result.status} />
          </div>
          <p className="mt-1 max-w-xl text-[12px] leading-[19px] text-slate-600">
            The university has received your course registration. This
            acknowledgement confirms receipt only; final approval is confirmed
            only when the university returns an approved registration status.
          </p>
          {result.reference ? (
            <p className="mt-2 text-[11px] font-semibold text-navy-900">
              Registration reference:{' '}
              <span className="break-all font-mono text-[10.5px]">
                {result.reference}
              </span>
            </p>
          ) : (
            <p className="mt-2 text-[10.5px] leading-[16px] text-slate-500">
              The university did not return a registration reference.
            </p>
          )}
          {result.message?.trim() ? (
            <p className="mt-1.5 max-w-xl text-[10.5px] leading-[16px] text-slate-500">
              {result.message}
            </p>
          ) : null}
          <p className="mt-2 max-w-xl text-[9.5px] leading-[15px] text-slate-400">
            Keep this acknowledgement. Your registration status will update only
            when the university service publishes a new status.
          </p>
        </div>
      </div>
    </div>
  );
}

interface CatalogueUnavailableProps {
  message: string | null;
}

export function CourseCatalogueUnavailable({
  message,
}: CatalogueUnavailableProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        Course catalogue unavailable
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        {message ??
          'The university has not supplied its course catalogue for this registration period.'}
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        The portal never generates courses or academic rules locally.
      </p>
    </div>
  );
}

interface CatalogueEmptyProps {
  message: string | null;
}

export function CourseCatalogueEmpty({ message }: CatalogueEmptyProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={BookX} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        No courses available
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        {message ??
          'The university did not return any courses for this registration period.'}
      </p>
    </div>
  );
}

interface NoResultsProps {
  onClearFilters: () => void;
}

export function CourseCatalogueNoResults({ onClearFilters }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center px-4 py-9 text-center sm:py-10">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={SearchX} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-navy-950">
        No matching courses
      </h3>
      <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-500">
        No courses match your current search and classification filter.
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

function RetryButton({ isRetrying, onRetry }: ContextErrorProps) {
  return (
    <button
      type="button"
      onClick={onRetry}
      disabled={isRetrying}
      aria-busy={isRetrying}
      className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <PortalIcon
        icon={RotateCcw}
        className={`size-3.5 ${isRetrying ? 'animate-spin' : ''}`}
        strokeWidth={2.3}
      />
      {isRetrying ? 'Retrying…' : 'Retry'}
    </button>
  );
}
