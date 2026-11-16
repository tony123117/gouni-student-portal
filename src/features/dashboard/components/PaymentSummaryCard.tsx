import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/shared/SectionCard';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { ROUTES } from '@/constants';
import { formatNaira } from '@/utils/format';
import type {
  PaymentSummary,
  PaymentSummaryStatus,
} from '../types/dashboard';

const statusDetails: Record<
  PaymentSummaryStatus,
  { label: string; variant: BadgeVariant }
> = {
  unavailable: { label: 'Not available', variant: 'neutral' },
  pending: { label: 'Pending verification', variant: 'warning' },
  verified: { label: 'Verified', variant: 'success' },
};

interface PaymentSummaryCardProps {
  summary: PaymentSummary;
}

export function PaymentSummaryCard({ summary }: PaymentSummaryCardProps) {
  const status = statusDetails[summary.status];
  const isUnavailable = summary.status === 'unavailable';

  return (
    <SectionCard
      title="Payment Summary"
      headerAside={<Badge variant={status.variant}>{status.label}</Badge>}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-navy-600">
            Outstanding balance
          </p>
          <p className="mt-1.5 text-[31px] font-extrabold leading-none tracking-[-0.025em] text-navy-950">
            {formatNaira(summary.outstandingBalance)}
          </p>
          <p className="mt-2.5 max-w-xs text-[11.5px] leading-5 text-slate-500">
            {isUnavailable
              ? 'Your payment summary will appear here once it is available.'
              : 'Your current balance and payment activity are shown above.'}
          </p>
        </div>

        <dl className="grid w-full grid-cols-2 gap-2.5 sm:w-auto sm:min-w-[210px]">
          <div className="rounded-xl bg-[#eff4fc] px-3.5 py-3">
            <dt className="text-[9.5px] font-bold uppercase tracking-[0.11em] text-navy-600">
              Pending items
            </dt>
            <dd className="mt-1.5 text-[15px] font-extrabold text-navy-950">
              {summary.pendingItems ?? '—'}
            </dd>
          </div>
          <div className="rounded-xl bg-[#eff4fc] px-3.5 py-3">
            <dt className="text-[9.5px] font-bold uppercase tracking-[0.11em] text-navy-600">
              Verified
            </dt>
            <dd className="mt-1.5 text-[15px] font-extrabold text-navy-950">
              {summary.verifiedPayments ?? '—'}
            </dd>
          </div>
        </dl>
      </div>

      <Link
        to={ROUTES.paymentHistory}
        className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-[12px] font-bold text-navy-800 transition-colors hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
      >
        View payment history
        <ArrowRight
          aria-hidden="true"
          strokeWidth={2.3}
          className="size-3.5"
        />
      </Link>
    </SectionCard>
  );
}
