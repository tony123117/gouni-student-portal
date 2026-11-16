import { AlertCircle } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';

interface DashboardErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export function DashboardError({
  isRetrying,
  onRetry,
}: DashboardErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-portal-line/90 bg-white p-5 shadow-[0_2px_14px_rgba(5,42,94,0.035)] sm:p-7"
    >
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
        <PortalIcon icon={AlertCircle} className="size-[22px]" strokeWidth={2.3} />
      </span>
      <h1 className="mt-3.5 text-[22px] font-extrabold tracking-[-0.025em] text-navy-950">
        We couldn&apos;t load your dashboard
      </h1>
      <p className="mt-1.5 max-w-md text-[12.5px] leading-[22px] text-slate-600">
        Your dashboard information is currently unavailable. Please try again
        in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-navy-900 px-3.5 py-2 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRetrying ? 'Retrying…' : 'Try again'}
      </button>
    </div>
  );
}
