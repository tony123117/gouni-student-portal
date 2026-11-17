import { PAYMENT_STATUS_LABELS } from '../constants';
import type { PaymentStatus } from '../types/payment-history';

const statusClasses: Record<PaymentStatus, string> = {
  successful: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  pending: 'border-amber-200 bg-amber-50 text-amber-800',
  failed: 'border-rose-200 bg-rose-50 text-rose-700',
};

const dotClasses: Record<PaymentStatus, string> = {
  successful: 'bg-emerald-500',
  pending: 'bg-amber-500',
  failed: 'bg-rose-500',
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-1.5 py-0.5 text-[10px] font-bold leading-4 whitespace-nowrap ${statusClasses[status]}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${dotClasses[status]}`}
      />
      {PAYMENT_STATUS_LABELS[status]}
    </span>
  );
}
