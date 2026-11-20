import { useEffect, useRef } from 'react';
import {
  CircleAlert,
  CircleCheckBig,
  ClipboardCheck,
  Info,
  LoaderCircle,
  X,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { ClearanceRequestResult } from '../types/exam-clearance';
import { formatClearanceDate } from '../utils/format';
import { ClearanceStatusBadge } from './ClearanceStatusBadge';

interface ClearanceRequestDialogProps {
  isSubmitting: boolean;
  hasError: boolean;
  result: ClearanceRequestResult | null;
  onClose: () => void;
  onSubmit: () => void;
}

export function ClearanceRequestDialog({
  isSubmitting,
  hasError,
  result,
  onClose,
  onSubmit,
}: ClearanceRequestDialogProps) {
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

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="clearance-request-title"
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          handleClose();
        }
      }}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-md overflow-hidden rounded-2xl border border-portal-line bg-white p-0 text-navy-950 shadow-[0_24px_60px_rgba(5,36,85,0.28)] backdrop:bg-navy-950/55"
    >
      <div className="flex max-h-[calc(100vh-2rem)] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-portal-line px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon icon={ClipboardCheck} className="size-4" duotone />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-navy-600">
                Exam clearance
              </p>
              <h2
                id="clearance-request-title"
                className="mt-0.5 text-[15px] font-extrabold tracking-[-0.02em] text-navy-950"
              >
                {result ? 'Request receipt' : 'Request clearance review'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close clearance request"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PortalIcon icon={X} className="size-4" strokeWidth={2.3} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          {result ? (
            <>
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <PortalIcon
                    icon={CircleCheckBig}
                    className="size-[18px]"
                    strokeWidth={2.3}
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-extrabold text-navy-950">
                    Request received by the university
                  </p>
                  <p className="mt-0.5 text-[11px] leading-[17px] text-slate-500">
                    {result.message?.trim()
                      ? result.message
                      : 'The university confirmed receipt of your clearance request.'}
                  </p>
                </div>
              </div>

              <dl className="mt-3.5 grid gap-x-4 gap-y-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 p-3.5">
                <div className="min-w-0">
                  <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                    Request status
                  </dt>
                  <dd className="mt-1">
                    {result.status ? (
                      <ClearanceStatusBadge status={result.status} />
                    ) : (
                      <span className="text-[11px] font-medium italic text-slate-400">
                        Not supplied
                      </span>
                    )}
                  </dd>
                </div>
                {result.reference ? (
                  <div className="min-w-0">
                    <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                      Reference
                    </dt>
                    <dd className="mt-0.5 break-all font-mono text-[11px] font-semibold text-navy-950">
                      {result.reference}
                    </dd>
                  </div>
                ) : null}
                <div className="min-w-0">
                  <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                    Submitted
                  </dt>
                  <dd className="mt-0.5 text-[11px] font-semibold text-navy-950">
                    {formatClearanceDate(result.submittedAt)}
                  </dd>
                </div>
              </dl>

              <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-navy-200 bg-navy-50 px-3.5 py-3">
                <PortalIcon
                  icon={Info}
                  className="mt-0.5 size-4 shrink-0 text-navy-700"
                  strokeWidth={2.3}
                />
                <p className="text-[10px] leading-[16px] text-navy-900">
                  This is a receipt only. It does not confirm clearance, approve
                  any requirement, or make you eligible for examinations. The
                  university reviews every request, and your official status
                  remains as shown on this page.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-[11.5px] leading-[18px] text-slate-600">
                This sends a clearance request to the university for review. The
                university owns the verification process and the final
                clearance decision.
              </p>

              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-[10.5px] leading-[16px] text-slate-600">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-navy-600"
                  />
                  Submitting a request does not clear you.
                </li>
                <li className="flex items-start gap-2 text-[10.5px] leading-[16px] text-slate-600">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-navy-600"
                  />
                  It does not complete any outstanding requirement.
                </li>
                <li className="flex items-start gap-2 text-[10.5px] leading-[16px] text-slate-600">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-navy-600"
                  />
                  It does not make you eligible for examinations.
                </li>
              </ul>

              <div className="mt-3 rounded-xl border border-gold-200 bg-gold-50 px-3.5 py-2.5">
                <p className="text-[9.5px] leading-[15px] text-gold-900">
                  Only submit when you intend to ask the university to review
                  your clearance. The portal records the receipt returned by the
                  service; it does not create a clearance decision.
                </p>
              </div>

              {hasError ? (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5"
                >
                  <PortalIcon
                    icon={CircleAlert}
                    className="mt-0.5 size-4 shrink-0 text-rose-700"
                    strokeWidth={2.3}
                  />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-rose-800">
                      The university did not confirm receipt
                    </p>
                    <p className="mt-0.5 text-[9.5px] leading-[15px] text-rose-700">
                      You can retry. If you are unsure whether an earlier request
                      reached the university, close this dialog and refresh
                      before submitting again.
                    </p>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-portal-line px-4 py-3 sm:px-5">
          {result ? (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              Close
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-portal-line bg-white px-3.5 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PortalIcon
                  icon={isSubmitting ? LoaderCircle : ClipboardCheck}
                  className={`size-3.5 ${isSubmitting ? 'animate-spin' : ''}`}
                  strokeWidth={2.3}
                />
                {isSubmitting
                  ? 'Submitting…'
                  : hasError
                    ? 'Try again'
                    : 'Submit request'}
              </button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
