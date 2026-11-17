import { Download, Eye } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { formatNaira } from '@/utils/format';
import { PAYMENT_SEMESTER_LABELS } from '../constants';
import type { PaymentRecord } from '../types/payment-history';
import { formatPaymentDate } from '../utils/format';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface PaymentHistoryTableProps {
  records: PaymentRecord[];
  canDownloadReceipt: boolean;
  onViewRecord: (record: PaymentRecord) => void;
}

export function PaymentHistoryTable({
  records,
  canDownloadReceipt,
  onViewRecord,
}: PaymentHistoryTableProps) {
  return (
    <div className="hidden xl:block">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">
          Payment records returned by the university payment service
        </caption>
        <thead>
          <tr className="bg-portal-surface/65">
            <th
              scope="col"
              className="w-[15%] px-2 py-2.5 pl-4 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Invoice Number
            </th>
            <th
              scope="col"
              className="w-[22%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Payment Description
            </th>
            <th
              scope="col"
              className="w-[10%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Date
            </th>
            <th
              scope="col"
              className="w-[11%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Amount
            </th>
            <th
              scope="col"
              className="w-[12%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Academic Session
            </th>
            <th
              scope="col"
              className="w-[10%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Semester
            </th>
            <th
              scope="col"
              className="w-[10%] px-2 py-2.5 text-left text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Status
            </th>
            <th
              scope="col"
              className="w-[10%] px-2 py-2.5 pr-4 text-right text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="border-t border-portal-line/70 transition-colors hover:bg-portal-surface/45"
            >
              <td className="min-w-0 px-2 py-3 pl-4 align-middle">
                <p className="truncate font-mono text-[11px] font-bold text-navy-950">
                  {record.invoiceNumber}
                </p>
                <p className="mt-0.5 truncate font-mono text-[9px] text-slate-500">
                  {record.paymentReference}
                </p>
              </td>
              <td className="min-w-0 px-2 py-3 align-middle">
                <p className="line-clamp-2 text-[11.5px] font-semibold leading-[17px] text-navy-950">
                  {record.description}
                </p>
              </td>
              <td className="px-2 py-3 align-middle whitespace-nowrap">
                <span className="text-[11px] font-medium text-slate-600">
                  {formatPaymentDate(record.date)}
                </span>
              </td>
              <td className="px-2 py-3 align-middle whitespace-nowrap">
                <span className="text-[11.5px] font-bold tabular-nums text-navy-950">
                  {formatNaira(record.amount)}
                </span>
              </td>
              <td className="px-2 py-3 align-middle">
                <span className="block truncate text-[11px] font-medium text-slate-600">
                  {record.academicSession || '—'}
                </span>
              </td>
              <td className="px-2 py-3 align-middle whitespace-nowrap">
                <span className="text-[11px] font-medium text-slate-600">
                  {PAYMENT_SEMESTER_LABELS[record.semester]}
                </span>
              </td>
              <td className="px-2 py-3 align-middle">
                <PaymentStatusBadge status={record.status} />
              </td>
              <td className="px-2 py-3 pr-4 align-middle">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onViewRecord(record)}
                    aria-label={`View payment details for invoice ${record.invoiceNumber}`}
                    title="View payment details"
                    className="inline-flex size-8 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
                  >
                    <PortalIcon
                      icon={Eye}
                      className="size-4"
                      strokeWidth={2.2}
                    />
                  </button>
                  {canDownloadReceipt && record.receiptUrl ? (
                    <a
                      href={record.receiptUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Download receipt for invoice ${record.invoiceNumber}`}
                      title="Download receipt"
                      className="inline-flex size-8 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
                    >
                      <PortalIcon
                        icon={Download}
                        className="size-4"
                        strokeWidth={2.2}
                      />
                    </a>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
