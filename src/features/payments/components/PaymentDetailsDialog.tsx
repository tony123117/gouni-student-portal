import { Download, ReceiptText, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { formatNaira } from '@/utils/format';
import { PAYMENT_SEMESTER_LABELS } from '../constants';
import type { PaymentRecord } from '../types/payment-history';
import { formatPaymentDate } from '../utils/format';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface PaymentDetailsDialogProps {
  record: PaymentRecord;
  canDownloadReceipt: boolean;
  onClose: () => void;
}

export function PaymentDetailsDialog({
  record,
  canDownloadReceipt,
  onClose,
}: PaymentDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="payment-details-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-lg overflow-hidden rounded-2xl border border-portal-line bg-white p-0 text-navy-950 shadow-[0_24px_60px_rgba(5,36,85,0.28)] backdrop:bg-navy-950/55"
    >
      <div className="flex max-h-[calc(100vh-2rem)] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-portal-line px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon icon={ReceiptText} className="size-4" duotone />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-navy-600">
                Payment details
              </p>
              <h2
                id="payment-details-title"
                className="mt-0.5 truncate font-mono text-[14px] font-extrabold text-navy-950"
              >
                {record.invoiceNumber}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close payment details"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <PortalIcon icon={X} className="size-4" strokeWidth={2.3} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <PaymentStatusBadge status={record.status} />
            <p className="text-[10.5px] font-medium text-slate-500">
              {formatPaymentDate(record.date)}
            </p>
          </div>

          <dl className="mt-4 grid gap-x-4 gap-y-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 p-3.5 sm:grid-cols-2">
            <div className="min-w-0 sm:col-span-2">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Payment description
              </dt>
              <dd className="mt-0.5 text-[12px] font-semibold leading-[18px] text-navy-950">
                {record.description || '—'}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Payment reference
              </dt>
              <dd className="mt-0.5 truncate font-mono text-[10.5px] font-semibold text-navy-950">
                {record.paymentReference || '—'}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Amount
              </dt>
              <dd className="mt-0.5 text-[12px] font-extrabold tabular-nums text-navy-950">
                {formatNaira(record.amount)}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Academic session
              </dt>
              <dd className="mt-0.5 truncate text-[11.5px] font-semibold text-navy-950">
                {record.academicSession || '—'}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Semester
              </dt>
              <dd className="mt-0.5 truncate text-[11.5px] font-semibold text-navy-950">
                {PAYMENT_SEMESTER_LABELS[record.semester]}
              </dd>
            </div>
          </dl>

          <div className="mt-3.5 rounded-xl border border-portal-line/80 px-3.5 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-navy-600">
              Receipt
            </p>
            {canDownloadReceipt && record.receiptUrl ? (
              <a
                href={record.receiptUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3 text-[11px] font-bold text-white transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                <PortalIcon
                  icon={Download}
                  className="size-3.5"
                  strokeWidth={2.3}
                />
                Download receipt
              </a>
            ) : (
              <p className="mt-1 text-[11px] leading-[17px] text-slate-500">
                No receipt is available for this payment.
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 justify-end border-t border-portal-line px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-portal-line bg-white px-3.5 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
