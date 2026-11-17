import { CreditCard, ExternalLink, LockKeyhole, Printer } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { InvoicePaymentAvailability } from '../types/invoice';
import { getSafePaymentDestination } from '../utils/invoice';

interface InvoiceActionsProps {
  payment: InvoicePaymentAvailability;
}

const actionButtonClassName =
  'inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-3.5 text-[11.5px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2';

export function InvoiceActions({ payment }: InvoiceActionsProps) {
  const paymentDestination = payment.available
    ? getSafePaymentDestination(payment.destinationUrl)
    : null;
  const paymentIsAvailable = paymentDestination !== null;
  const unavailableMessage = payment.message?.trim()
    ? payment.message
    : payment.available
      ? 'The university did not supply a valid e-Transact payment destination.'
      : 'Online payment is currently unavailable because the e-Transact (SEC) gateway has not been integrated.';

  return (
    <section
      aria-labelledby="invoice-actions-title"
      className="rounded-2xl border border-portal-line/90 bg-white p-3.5 shadow-[0_2px_12px_rgba(5,42,94,0.035)] sm:p-4"
    >
      <p
        id="invoice-actions-title"
        className="text-[8.5px] font-bold uppercase tracking-[0.15em] text-navy-600"
      >
        Invoice actions
      </p>

      <div className="mt-2.5 grid gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className={`${actionButtonClassName} w-full border border-portal-line bg-white text-navy-800 hover:border-navy-200 hover:bg-portal-surface`}
        >
          <PortalIcon icon={Printer} className="size-3.5" strokeWidth={2.3} />
          Print Invoice
        </button>

        {paymentIsAvailable ? (
          <a
            href={paymentDestination}
            target="_blank"
            rel="noopener noreferrer"
            className={`${actionButtonClassName} w-full bg-navy-900 text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] hover:bg-navy-800`}
          >
            <PortalIcon
              icon={CreditCard}
              className="size-3.5"
              strokeWidth={2.3}
            />
            Pay with e-Transact (SEC)
            <PortalIcon
              icon={ExternalLink}
              className="size-3"
              strokeWidth={2.3}
            />
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-describedby="invoice-payment-action-note"
            className={`${actionButtonClassName} w-full cursor-not-allowed bg-navy-900/45 text-white`}
          >
            <PortalIcon
              icon={LockKeyhole}
              className="size-3.5"
              strokeWidth={2.3}
            />
            Pay with e-Transact (SEC)
          </button>
        )}
      </div>

      {paymentIsAvailable ? (
        <p className="mt-2 text-[9.5px] leading-[15px] text-slate-500">
          You will continue on the university&apos;s e-Transact (SEC) payment
          page.
        </p>
      ) : (
        <p
          id="invoice-payment-action-note"
          className="mt-2 text-[9.5px] leading-[15px] text-slate-500"
        >
          {unavailableMessage}
        </p>
      )}
    </section>
  );
}
