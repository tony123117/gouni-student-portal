import {
  CheckCircle2,
  CircleAlert,
  Info,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  InvoiceDocument,
  InvoicePaymentAvailability,
} from '../types/invoice';
import { getSafePaymentDestination } from '../utils/invoice';

interface InvoicePaymentInformationProps {
  invoice: InvoiceDocument;
  payment: InvoicePaymentAvailability;
}

export function InvoicePaymentInformation({
  invoice,
  payment,
}: InvoicePaymentInformationProps) {
  const paymentDestination = payment.available
    ? getSafePaymentDestination(payment.destinationUrl)
    : null;
  const paymentIsAvailable = paymentDestination !== null;
  const gatewayMessage = payment.message?.trim()
    ? payment.message
    : paymentIsAvailable
      ? 'Online payment is available through the university e-Transact (SEC) gateway.'
      : 'Online payment is currently unavailable. The e-Transact (SEC) gateway has not been integrated.';

  return (
    <aside
      aria-labelledby="invoice-payment-information-title"
      className="rounded-2xl border border-portal-line/90 bg-white p-3.5 shadow-[0_2px_12px_rgba(5,42,94,0.035)] sm:p-4"
    >
      <div className="flex items-start gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
          <PortalIcon icon={WalletCards} className="size-[17px]" duotone />
        </span>
        <div className="min-w-0">
          <h3
            id="invoice-payment-information-title"
            className="text-[13px] font-extrabold tracking-[-0.01em] text-navy-950"
          >
            Payment information
          </h3>
          <p className="mt-0.5 text-[9.5px] leading-[15px] text-slate-500">
            Instructions and payment status supplied by the university.
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-portal-line/80 bg-portal-surface/55 p-3">
        <p className="text-[8.5px] font-bold uppercase tracking-[0.13em] text-navy-600">
          Payment instructions
        </p>
        {invoice.instructions.length > 0 ? (
          <ol className="mt-2 space-y-2">
            {invoice.instructions.map((instruction, index) => (
              <li
                key={`${index}-${instruction}`}
                className="flex items-start gap-2 text-[10.5px] font-medium leading-[16px] text-navy-950"
              >
                <span className="mt-px flex size-4 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[7.5px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="min-w-0 break-words">{instruction}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-1.5 flex items-start gap-2">
            <PortalIcon
              icon={Info}
              className="mt-0.5 size-3.5 shrink-0 text-slate-400"
              strokeWidth={2.2}
            />
            <p className="text-[10.5px] leading-[16px] text-slate-500">
              Payment instructions have not been supplied for this invoice.
            </p>
          </div>
        )}
      </div>

      <div
        className={`mt-3 rounded-xl border p-3 ${
          paymentIsAvailable
            ? 'border-emerald-200 bg-emerald-50/70'
            : 'border-amber-200 bg-amber-50/70'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
              paymentIsAvailable
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            <PortalIcon
              icon={paymentIsAvailable ? CheckCircle2 : CircleAlert}
              className="size-4"
              strokeWidth={2.3}
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-[10.5px] font-bold text-navy-950">
                {paymentIsAvailable ? 'Online payment available' : 'Payment unavailable'}
              </p>
              <Badge variant={paymentIsAvailable ? 'success' : 'warning'}>
                {paymentIsAvailable ? 'e-Transact ready' : 'Not integrated'}
              </Badge>
            </div>
            <p className="mt-1 text-[9.5px] leading-[15px] text-slate-600">
              {gatewayMessage}
            </p>
            {!paymentIsAvailable ? (
              <p className="mt-1.5 text-[9px] font-semibold leading-[14px] text-amber-800">
                No payment has been initiated. Online payment will only be
                enabled after the university supplies a valid payment
                destination.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[8.5px] leading-[13px] text-slate-400">
        <PortalIcon
          icon={ShieldCheck}
          className="mt-px size-3 shrink-0 text-slate-400"
          strokeWidth={2.2}
        />
        Pay only through a destination confirmed by the university. No payment
        details are generated by this portal.
      </p>
    </aside>
  );
}
