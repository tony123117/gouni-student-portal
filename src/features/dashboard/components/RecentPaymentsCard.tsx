import { ReceiptText } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { formatNaira } from '@/utils/format';
import type {
  PaymentActivity,
  PaymentActivityStatus,
} from '../types/dashboard';

const statusDetails: Record<
  PaymentActivityStatus,
  { label: string; variant: BadgeVariant }
> = {
  'pending-review': { label: 'Pending review', variant: 'warning' },
  verified: { label: 'Verified', variant: 'success' },
};

interface RecentPaymentsCardProps {
  payments: PaymentActivity[];
}

export function RecentPaymentsCard({
  payments,
}: RecentPaymentsCardProps) {
  return (
    <SectionCard
      title="Recent Payment Activity"
      bodyClassName="flex flex-col px-4 py-3.5 sm:px-5 sm:py-4"
    >
      {payments.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
          <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
            <PortalIcon icon={ReceiptText} className="size-[22px]" duotone />
          </span>
          <p className="mt-3 text-[14px] font-bold text-navy-950">
            No payment activity
          </p>
          <p className="mt-1 max-w-sm text-[12px] leading-[18px] text-slate-500">
            Your payment transactions will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-portal-line/70">
          {payments.map((payment) => {
            const status = statusDetails[payment.status];

            return (
              <li
                key={payment.id}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-navy-950">
                    {payment.description}
                  </p>
                  <p className="mt-0.5 font-mono text-[9.5px] text-slate-500">
                    {payment.reference}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="text-[11.5px] font-medium tabular-nums text-slate-600">
                    {formatNaira(payment.amount)}
                  </span>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
