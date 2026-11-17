import {
  AlertCircle,
  CloudOff,
  FileClock,
  FileSearch,
  RefreshCw,
} from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { Badge } from '@/components/ui/Badge';

interface AvailabilityNoticeProps {
  message: string | null;
}

export function InvoiceAvailabilityNotice({
  message,
}: AvailabilityNoticeProps) {
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
          Invoice generation unavailable
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          {message ??
            'Official invoice options will appear here when the university invoice service is available.'}
        </p>
      </div>
    </div>
  );
}

interface InitialStateProps {
  canGenerate: boolean;
  message: string | null;
}

export function InvoiceInitialState({
  canGenerate,
  message,
}: InitialStateProps) {
  return (
    <SectionCard
      title="Invoice Preview"
      description="Your official invoice will appear here after generation."
      headerAside={
        <Badge variant={canGenerate ? 'neutral' : 'warning'}>
          {canGenerate ? 'Awaiting selection' : 'Unavailable'}
        </Badge>
      }
    >
      <div className="flex flex-col items-center px-3 py-9 text-center sm:py-11">
        <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
          <PortalIcon
            icon={canGenerate ? FileClock : CloudOff}
            className="size-[22px]"
            duotone
          />
        </span>
        <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-navy-950">
          {canGenerate ? 'Your invoice preview will appear here' : 'Invoice generation unavailable'}
        </h3>
        <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-500">
          {canGenerate
            ? 'Select an academic session and semester, then choose Generate Invoice. Only official university data will be displayed.'
            : (message ??
              'Official invoice options have not been supplied by the university yet.')}
        </p>
        {!canGenerate ? (
          <p className="mt-1.5 max-w-md text-[10.5px] leading-[17px] text-slate-400">
            No invoice number, student record, fee, or payment reference is
            created by the portal.
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}

interface UnavailableStateProps {
  message: string | null;
}

export function InvoiceUnavailableState({
  message,
}: UnavailableStateProps) {
  return (
    <SectionCard
      title="Invoice Preview"
      description="Your official invoice will appear here after generation."
      headerAside={<Badge variant="warning">Unavailable</Badge>}
    >
      <div className="flex flex-col items-center px-3 py-9 text-center sm:py-11">
        <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
          <PortalIcon icon={CloudOff} className="size-[22px]" duotone />
        </span>
        <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-navy-950">
          Invoice unavailable
        </h3>
        <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-500">
          {message ??
            'The university invoice service did not return an official invoice.'}
        </p>
        <p className="mt-1.5 max-w-md text-[10.5px] leading-[17px] text-slate-400">
          Only invoices returned by the university are displayed here.
        </p>
      </div>
    </SectionCard>
  );
}

interface NoInvoiceStateProps {
  message: string | null;
}

export function InvoiceNoAvailableState({
  message,
}: NoInvoiceStateProps) {
  return (
    <SectionCard
      title="Invoice Preview"
      description="Your official invoice will appear here after generation."
      headerAside={<Badge variant="neutral">No invoice</Badge>}
    >
      <div className="flex flex-col items-center px-3 py-9 text-center sm:py-11">
        <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
          <PortalIcon icon={FileSearch} className="size-[22px]" duotone />
        </span>
        <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-navy-950">
          No invoice available
        </h3>
        <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-500">
          {message ??
            'The university did not return an invoice for the selected session, semester, and fee category.'}
        </p>
        <p className="mt-1.5 max-w-md text-[10.5px] leading-[17px] text-slate-400">
          Try another selection or contact the ICT Help Desk if you believe an
          invoice should be available.
        </p>
      </div>
    </SectionCard>
  );
}

interface ErrorStateProps {
  isRetrying: boolean;
  onRetry: () => void;
}

function RetryButton({
  isRetrying,
  onRetry,
}: ErrorStateProps) {
  return (
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
  );
}

export function InvoiceOptionsError({
  isRetrying,
  onRetry,
}: ErrorStateProps) {
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
        We couldn&apos;t load invoice options
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        The university invoice service is currently unavailable. No invoice has
        been generated.
      </p>
      <RetryButton isRetrying={isRetrying} onRetry={onRetry} />
    </div>
  );
}

export function InvoiceGenerationError({
  isRetrying,
  onRetry,
}: ErrorStateProps) {
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
        We couldn&apos;t generate this invoice
      </h2>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        The university invoice service did not complete the request. No invoice
        has been created or displayed.
      </p>
      <RetryButton isRetrying={isRetrying} onRetry={onRetry} />
    </div>
  );
}
