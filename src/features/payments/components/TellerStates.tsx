import {
  AlertCircle,
  CircleCheckBig,
  CircleAlert,
  CloudOff,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { TellerSubmissionResult } from '../types/teller';
import { TellerStatusBadge } from './TellerStatusBadge';

interface AvailabilityNoticeProps {
  message: string | null;
}

export function TellerAvailabilityNotice({ message }: AvailabilityNoticeProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-800 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[18px]" duotone />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold text-navy-950">
          Teller submission unavailable
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          {message ??
            'Teller submission will be available once the university payment evidence service is connected.'}
        </p>
      </div>
    </div>
  );
}

interface ContextErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export function TellerContextError({ isRetrying, onRetry }: ContextErrorProps) {
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
        We couldn&apos;t load the teller submission form
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        The university teller service is currently unavailable. Nothing has been
        submitted.
      </p>
      <RetryButton isRetrying={isRetrying} onRetry={onRetry} />
    </div>
  );
}

interface SubmissionErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export function TellerSubmissionError({
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
        We couldn&apos;t submit your teller
      </h2>
      <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-600">
        The university evidence service did not complete the submission. No
        payment evidence was uploaded, so you can safely try again.
      </p>
      <RetryButton isRetrying={isRetrying} onRetry={onRetry} />
    </div>
  );
}

interface SuccessCardProps {
  result: TellerSubmissionResult;
}

export function TellerSuccessCard({ result }: SuccessCardProps) {
  const statusCopy: Record<
    TellerSubmissionResult['status'],
    { title: string; detail: string }
  > = {
    submitted: {
      title: 'Payment evidence submitted',
      detail:
        'Your payment evidence has been submitted and is awaiting verification.',
    },
    under_review: {
      title: 'Payment evidence received',
      detail:
        'Your payment evidence has been submitted and is currently under review by the university.',
    },
    verified: {
      title: 'Payment evidence verified',
      detail:
        'The university has reviewed and verified this submission. This status was supplied by the university service.',
    },
    rejected: {
      title: 'Submission needs attention',
      detail:
        'The university service reported that this submission was rejected. Review the feedback and contact the ICT Help Desk if needed.',
    },
  };

  const copy = statusCopy[result.status];
  const isVerified = result.status === 'verified';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-2xl border p-4 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-5 ${
        isVerified
          ? 'border-emerald-200 bg-emerald-50/60'
          : 'border-portal-line/90 bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex size-[44px] shrink-0 items-center justify-center rounded-2xl ${
            isVerified
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
          }`}
        >
          <PortalIcon
            icon={CircleCheckBig}
            className="size-[19px]"
            strokeWidth={2.3}
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[17px] font-extrabold tracking-[-0.02em] text-navy-950 sm:text-[18px]">
              {copy.title}
            </h2>
            <TellerStatusBadge status={result.status} />
          </div>
          <p className="mt-1 max-w-lg text-[12px] leading-[19px] text-slate-600">
            {copy.detail}
          </p>
          {result.submissionReference ? (
            <p className="mt-2 text-[11px] font-semibold text-navy-900">
              Submission reference:{' '}
              <span className="break-all font-mono text-[10.5px]">
                {result.submissionReference}
              </span>
            </p>
          ) : null}
          {result.message?.trim() ? (
            <p className="mt-1.5 max-w-lg text-[10.5px] leading-[16px] text-slate-500">
              {result.message}
            </p>
          ) : null}
          {!isVerified ? (
            <p className="mt-2 max-w-lg text-[9.5px] leading-[15px] text-slate-400">
              This acknowledgement confirms receipt of your evidence only. The
              portal does not report a payment as successful or verified until
              the university service returns that status.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function TellerSubmissionPending() {
  return (
    <div
      role="status"
      aria-label="Submitting your teller"
      className="rounded-2xl border border-portal-line/90 bg-white p-4 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-5"
    >
      <span className="sr-only">Submitting your teller</span>
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
            Submitting your payment evidence…
          </p>
          <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-500">
            Your teller is being sent to the university&apos;s secure review
            system. Please keep this page open.
          </p>
        </div>
      </div>
    </div>
  );
}

function RetryButton({
  isRetrying,
  onRetry,
}: ContextErrorProps) {
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
