import { Download, Eye } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { formatNaira } from '@/utils/format';
import { PAYMENT_SEMESTER_LABELS } from '../constants';
import type { PaymentRecord } from '../types/payment-history';
import { formatPaymentDate } from '../utils/format';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface PaymentHistoryCardsProps {
  records: PaymentRecord[];
  canDownloadReceipt: boolean;
  onViewRecord: (record: PaymentRecord) => void;
}

export function PaymentHistoryCards({
  records,
  canDownloadReceipt,
  onViewRecord,
}: PaymentHistoryCardsProps) {
  return (
    <ul className="grid gap-2.5 bg-portal-surface/55 p-3.5 sm:grid-cols-2 sm:gap-3 sm:p-4 xl:hidden">
      {records.map((record) => (
        <li
          key={record.id}
          className="flex min-w-0 flex-col rounded-xl border border-portal-line/90 bg-white p-3.5 shadow-[0_1px_8px_rgba(5,42,94,0.03)]"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-mono text-[11.5px] font-bold text-navy-950">
                {record.invoiceNumber}
              </p>
              <p className="mt-0.5 truncate font-mono text-[9.5px] text-slate-500">
                {record.paymentReference}
              </p>
            </div>
            <PaymentStatusBadge status={record.status} />
          </div>

          <p className="mt-2.5 line-clamp-2 text-[12.5px] font-semibold leading-[18px] text-navy-950">
            {record.description}
          </p>

          <div className="mt-2.5 flex items-end justify-between gap-3">
            <p className="text-[20px] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-navy-950">
              {formatNaira(record.amount)}
            </p>
            <p className="shrink-0 text-[10.5px] font-medium text-slate-500">
              {formatPaymentDate(record.date)}
            </p>
          </div>

          <dl className="mt-2.5 grid grid-cols-2 gap-2 rounded-lg bg-portal-surface/80 px-3 py-2">
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Academic session
              </dt>
              <dd className="mt-0.5 truncate text-[10.5px] font-semibold text-navy-950">
                {record.academicSession || '—'}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
                Semester
              </dt>
              <dd className="mt-0.5 truncate text-[10.5px] font-semibold text-navy-950">
                {PAYMENT_SEMESTER_LABELS[record.semester]}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onViewRecord(record)}
              className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-3 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
            >
              <PortalIcon icon={Eye} className="size-3.5" strokeWidth={2.2} />
              View details
            </button>
            {canDownloadReceipt && record.receiptUrl ? (
              <a
                href={record.receiptUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3 text-[11.5px] font-bold text-white transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
              >
                <PortalIcon
                  icon={Download}
                  className="size-3.5"
                  strokeWidth={2.2}
                />
                Receipt
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
