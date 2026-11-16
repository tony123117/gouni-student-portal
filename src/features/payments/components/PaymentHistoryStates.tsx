import { CloudOff, ReceiptText, RotateCcw, SearchX } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';

interface UnavailableStateProps {
  message: string | null;
}

export function PaymentHistoryUnavailableState({
  message,
}: UnavailableStateProps) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        Payment records unavailable
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        {message ??
          'Official payment records will appear here once the university payment service is available.'}
      </p>
      <p className="mt-1.5 max-w-md text-[11px] leading-[18px] text-slate-400">
        Only official records returned by the university are shown here.
      </p>
    </div>
  );
}

export function PaymentHistoryEmptyState() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={ReceiptText} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        No payment records
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        Payments recorded against your student account will appear here when
        they are available.
      </p>
    </div>
  );
}

interface FilteredEmptyStateProps {
  onClearFilters: () => void;
}

export function PaymentHistoryFilteredEmptyState({
  onClearFilters,
}: FilteredEmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
        <PortalIcon icon={SearchX} className="size-[22px]" duotone />
      </span>
      <h3 className="mt-3.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy-950">
        No matching payments
      </h3>
      <p className="mt-1.5 max-w-md text-[12px] leading-[19px] text-slate-500">
        No payment records match your current search and filters.
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
