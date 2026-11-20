import { TELLER_REVIEW_STATUS_LABELS } from '../constants';
import type { TellerReviewStatus } from '../types/teller';

const statusClasses: Record<TellerReviewStatus, string> = {
  submitted: 'border-navy-200 bg-navy-50 text-navy-800',
  under_review: 'border-gold-300/70 bg-gold-50 text-gold-800',
  verified: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  rejected: 'border-rose-200 bg-rose-50 text-rose-700',
};

const dotClasses: Record<TellerReviewStatus, string> = {
  submitted: 'bg-navy-500',
  under_review: 'bg-gold-500',
  verified: 'bg-emerald-500',
  rejected: 'bg-rose-500',
};

interface TellerStatusBadgeProps {
  status: TellerReviewStatus;
}

export function TellerStatusBadge({ status }: TellerStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-1.5 py-0.5 text-[10px] font-bold leading-4 whitespace-nowrap ${statusClasses[status]}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${dotClasses[status]}`}
      />
      {TELLER_REVIEW_STATUS_LABELS[status]}
    </span>
  );
}
