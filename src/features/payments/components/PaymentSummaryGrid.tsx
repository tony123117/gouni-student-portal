import {
  CircleCheckBig,
  CircleX,
  Clock3,
  ReceiptText,
  type LucideIcon,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  PaymentHistoryAvailability,
  PaymentHistorySummaries,
} from '../types/payment-history';

interface SummaryItem {
  key: keyof PaymentHistorySummaries;
  label: string;
  detail: string;
  icon: LucideIcon;
  duotone?: boolean;
}

const summaryItems: SummaryItem[] = [
  {
    key: 'totalPayments',
    label: 'Total Payments',
    detail: 'All recorded payments',
    icon: ReceiptText,
    duotone: true,
  },
  {
    key: 'successfulPayments',
    label: 'Successful Payments',
    detail: 'Completed payments',
    icon: CircleCheckBig,
  },
  {
    key: 'pendingPayments',
    label: 'Pending Payments',
    detail: 'Awaiting confirmation',
    icon: Clock3,
  },
  {
    key: 'failedPayments',
    label: 'Failed Payments',
    detail: 'Unsuccessful payments',
    icon: CircleX,
  },
];

interface PaymentSummaryGridProps {
  summaries: PaymentHistorySummaries;
  availability: PaymentHistoryAvailability;
}

export function PaymentSummaryGrid({
  summaries,
  availability,
}: PaymentSummaryGridProps) {
  return (
    <section aria-label="Payment summary">
      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4 xl:gap-3.5">
        {summaryItems.map((item) => {
          const value =
            availability === 'available' ? summaries[item.key] : null;
          const isUnavailable = value === null;

          return (
            <div
              key={item.key}
              className="flex min-h-[96px] items-center gap-3 rounded-2xl border border-portal-line/90 bg-white px-3.5 py-3.5 shadow-[0_2px_12px_rgba(5,42,94,0.035)]"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] via-[#e9f1fc] to-[#dfeafa] text-navy-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70">
                <PortalIcon
                  icon={item.icon}
                  className="size-5"
                  strokeWidth={item.duotone ? 2.2 : 2.5}
                  duotone={item.duotone}
                />
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] font-bold leading-[15px] tracking-[0.005em] text-navy-700">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[22px] font-extrabold leading-6 tracking-[-0.02em] text-navy-950">
                  {isUnavailable ? '—' : value}
                </p>
                <p className="mt-0.5 text-[10.5px] font-medium leading-[14px] text-slate-500">
                  {isUnavailable ? 'Not available' : item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
