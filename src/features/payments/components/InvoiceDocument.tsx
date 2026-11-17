import { GraduationCap, Hash } from 'lucide-react';
import { useId } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { InvoiceDocument as InvoiceDocumentData } from '../types/invoice';
import {
  displayInvoiceValue,
  formatInvoiceAmount,
  formatInvoiceDate,
  hasInvoiceValue,
} from '../utils/invoice';

const UNIVERSITY_LOGO = '/logo/gouni-logo.png';

interface InvoiceDocumentProps {
  invoice: InvoiceDocumentData;
  className?: string;
}

function InvoiceMetaItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
        {label}
      </dt>
      <dd
        className={`mt-0.5 break-words text-[11px] font-semibold leading-[16px] text-navy-950 ${
          mono ? 'font-mono text-[10.5px]' : ''
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export function InvoiceDocument({
  invoice,
  className = '',
}: InvoiceDocumentProps) {
  const titleId = useId();
  const hasStudentDetails =
    hasInvoiceValue(invoice.studentName) ||
    hasInvoiceValue(invoice.matriculationNumber) ||
    hasInvoiceValue(invoice.department);

  return (
    <article
      aria-labelledby={titleId}
      className={`invoice-document mx-auto w-full max-w-[860px] overflow-hidden rounded-2xl border border-portal-line bg-white text-navy-950 shadow-[0_10px_30px_rgba(5,42,94,0.06)] ${className}`}
    >
      <h2 id={titleId} className="sr-only">
        Student invoice
      </h2>

      <span
        aria-hidden="true"
        className="block h-1 bg-gradient-to-r from-navy-950 via-navy-800 to-gold-400"
      />

      <div className="p-4 sm:p-5 lg:p-6">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-portal-line pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={UNIVERSITY_LOGO}
              alt=""
              width={177}
              height={177}
              draggable={false}
              className="size-12 shrink-0 object-contain sm:size-14"
            />
            <div className="min-w-0">
              <p className="text-[14px] font-extrabold leading-[18px] tracking-[-0.02em] text-navy-950 sm:text-[16px] sm:leading-5">
                Godfrey Okoye University
              </p>
              <p className="mt-0.5 text-[7.5px] font-bold uppercase tracking-[0.22em] text-gold-700 sm:text-[8px]">
                Student Portal
              </p>
            </div>
          </div>

          <div className="min-w-0 text-left sm:text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold-700">
              Official student invoice
            </p>
            <p className="mt-0.5 text-[25px] font-extrabold leading-none tracking-[-0.04em] text-navy-950 sm:text-[28px]">
              INVOICE
            </p>
            <p className="mt-1 break-all font-mono text-[10px] font-semibold text-slate-500">
              {displayInvoiceValue(invoice.invoiceNumber)}
            </p>
          </div>
        </header>

        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          {hasStudentDetails ? (
            <section
              aria-label="Student details"
              className="min-w-0 rounded-xl border border-portal-line/80 bg-portal-surface/55 p-3.5"
            >
              <div className="flex items-start gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy-800 ring-1 ring-portal-line/80">
                  <PortalIcon
                    icon={GraduationCap}
                    className="size-[17px]"
                    duotone
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-navy-600">
                    Billed to
                  </p>
                  <p className="mt-0.5 break-words text-[14px] font-extrabold leading-[19px] text-navy-950">
                    {displayInvoiceValue(invoice.studentName)}
                  </p>
                </div>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
                <div className="min-w-0">
                  <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                    Matriculation number
                  </dt>
                  <dd className="mt-0.5 break-words font-mono text-[10px] font-semibold leading-[15px] text-navy-950">
                    {displayInvoiceValue(invoice.matriculationNumber)}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
                    Department
                  </dt>
                  <dd className="mt-0.5 break-words text-[10.5px] font-semibold leading-[15px] text-navy-950">
                    {displayInvoiceValue(invoice.department)}
                  </dd>
                </div>
              </dl>
            </section>
          ) : (
            <div className="rounded-xl border border-gold-200 bg-gold-50 p-3.5">
              <p className="text-[11px] font-bold text-gold-900">
                Student details were not supplied with this invoice.
              </p>
              <p className="mt-1 text-[10.5px] leading-[16px] text-gold-800/90">
                The university response did not include a name, matriculation
                number, or department.
              </p>
            </div>
          )}

          <dl className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-3 rounded-xl border border-portal-line/80 px-3.5 py-3">
            <InvoiceMetaItem
              label="Invoice date"
              value={formatInvoiceDate(invoice.invoiceDate)}
            />
            <InvoiceMetaItem
              label="Due date"
              value={formatInvoiceDate(invoice.dueDate)}
            />
            <InvoiceMetaItem
              label="Academic session"
              value={displayInvoiceValue(invoice.academicSession)}
            />
            <InvoiceMetaItem
              label="Semester"
              value={displayInvoiceValue(invoice.semester)}
            />
          </dl>
        </div>

        <div className="mt-3 rounded-xl border border-portal-line/80 px-3.5 py-3">
          <p className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-navy-600">
            Payment description
          </p>
          <p className="mt-1 break-words text-[11.5px] font-semibold leading-[18px] text-navy-950">
            {hasInvoiceValue(invoice.description)
              ? invoice.description
              : 'No payment description was supplied with this invoice.'}
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-portal-line/90">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Invoice fee breakdown</caption>
            <thead>
              <tr className="bg-navy-950 text-white">
                <th
                  scope="col"
                  className="px-3 py-2 text-[8.5px] font-bold uppercase tracking-[0.12em] sm:px-3.5"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="w-[92px] px-3 py-2 text-right text-[8.5px] font-bold uppercase tracking-[0.12em] sm:w-[120px] sm:px-3.5"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="px-3 py-3 text-[10.5px] leading-[16px] text-slate-500 sm:px-3.5"
                  >
                    No itemised fee breakdown was supplied with this invoice.
                  </td>
                </tr>
              ) : (
                invoice.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-portal-line/70 first:border-t-0"
                  >
                    <td className="break-words px-3 py-2.5 text-[10.5px] font-medium leading-[16px] text-navy-950 sm:px-3.5">
                      {item.description}
                    </td>
                    <td className="px-3 py-2.5 text-right align-top text-[10.5px] font-bold tabular-nums text-navy-950 sm:px-3.5">
                      {formatInvoiceAmount(item.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-end">
          <dl className="w-full max-w-[290px] rounded-xl border border-portal-line/80 bg-portal-surface/45 p-3.5">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[10px] font-semibold text-slate-600">
                Subtotal
              </dt>
              <dd className="text-[11px] font-bold tabular-nums text-navy-950">
                {formatInvoiceAmount(invoice.subtotal)}
              </dd>
            </div>

            {invoice.additionalCharges.map((charge) => (
              <div
                key={charge.id}
                className="mt-2 flex items-baseline justify-between gap-3"
              >
                <dt className="break-words text-[10px] font-semibold text-slate-600">
                  {charge.label}
                </dt>
                <dd className="shrink-0 text-[11px] font-bold tabular-nums text-navy-950">
                  {formatInvoiceAmount(charge.amount)}
                </dd>
              </div>
            ))}

            <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-portal-line pt-2.5">
              <dt className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-navy-900">
                Total payable
              </dt>
              <dd className="text-[17px] font-extrabold leading-none tabular-nums text-navy-950">
                {formatInvoiceAmount(invoice.totalPayable)}
              </dd>
            </div>
          </dl>
        </div>

        {hasInvoiceValue(invoice.paymentReference) ? (
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-navy-100 bg-navy-50/70 px-3.5 py-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-navy-700 ring-1 ring-navy-100">
              <PortalIcon icon={Hash} className="size-3.5" strokeWidth={2.3} />
            </span>
            <div className="min-w-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Payment reference
              </p>
              <p className="mt-0.5 break-all font-mono text-[10px] font-semibold text-navy-950">
                {invoice.paymentReference}
              </p>
            </div>
          </div>
        ) : null}

        <footer className="mt-4 flex flex-col gap-1.5 border-t border-portal-line pt-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-[8.5px] leading-[14px] text-slate-500">
            This invoice is generated from records supplied by Godfrey Okoye
            University. Keep it for your records.
          </p>
          <p className="shrink-0 text-[7.5px] font-bold uppercase tracking-[0.16em] text-navy-600">
            Student Portal · Invoice
          </p>
        </footer>
      </div>
    </article>
  );
}
