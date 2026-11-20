import { ChevronDown, LoaderCircle, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { formatNaira } from '@/utils/format';
import type {
  TellerFormOptions,
  TellerInvoiceOption,
  TellerRequirements,
  TellerSubmissionRequest,
  TellerUploadConstraints,
} from '../types/teller';
import {
  createTellerFormResolver,
  emptyTellerFormValues,
  toTellerSubmissionRequest,
  type TellerFormValues,
} from '../validation/teller-submission';
import { describeAcceptedFileTypes } from '../utils/teller';
import { TellerFileUpload } from './TellerFileUpload';

interface TellerSubmissionFormProps {
  options: TellerFormOptions;
  requirements: TellerRequirements;
  /** Raw service constraints — nulls mean "no official requirement supplied". */
  constraints: TellerUploadConstraints;
  /** Resolved technical limit used only when the service supplies no official one. */
  maxFileSizeBytes: number;
  associatedInvoices: TellerInvoiceOption[];
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: (request: TellerSubmissionRequest, evidence: File) => void;
}

const controlClassName =
  'mt-1 h-11 w-full rounded-lg border border-portal-line bg-portal-surface/60 text-navy-950 outline-none transition-colors hover:bg-portal-surface focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100 disabled:cursor-not-allowed disabled:opacity-70';

const labelClassName =
  'block text-[9.5px] font-bold uppercase tracking-[0.13em] text-navy-600';

const errorClassName = 'mt-1 text-[10px] font-semibold text-rose-700';

const optionalSuffix = (
  <span className="normal-case tracking-normal text-slate-400">
    {' '}
    (optional)
  </span>
);

export function TellerSubmissionForm({
  options,
  requirements,
  constraints,
  maxFileSizeBytes,
  associatedInvoices,
  canSubmit,
  isSubmitting,
  onSubmit,
}: TellerSubmissionFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TellerFormValues>({
    resolver: createTellerFormResolver({
      requiresDepositorName: requirements.requiresDepositorName,
    }),
    defaultValues: emptyTellerFormValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // The evidence file is kept in a ref so its contents are never copied into
  // React state snapshots or persisted anywhere in the browser.
  const evidenceFileRef = useRef<File | null>(null);
  const [evidenceRequiredError, setEvidenceRequiredError] = useState<
    string | null
  >(null);

  const invoiceIdWatch = watch('invoiceId');
  const fieldsDisabled = !canSubmit || isSubmitting;
  const hasInvoices = associatedInvoices.length > 0;
  const hasSessions = options.academicSessions.length > 0;
  const hasSemesters = options.semesters.length > 0;
  const hasFeeCategories = options.feeCategories.length > 0;
  const hasPaymentChannels = options.paymentChannels.length > 0;
  const invoiceIdField = register('invoiceId');

  const handleInvoiceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    void invoiceIdField.onChange(event);
    const selected = associatedInvoices.find(
      (invoice) => invoice.id === event.target.value,
    );

    if (selected) {
      setValue('invoiceReference', selected.invoiceNumber, {
        shouldValidate: false,
      });
    }
  };

  const submit = (values: TellerFormValues) => {
    if (isSubmitting) {
      return;
    }

    const evidence = evidenceFileRef.current;

    if (!evidence) {
      setEvidenceRequiredError(
        'Select your teller document as payment evidence before submitting.',
      );
      return;
    }

    setEvidenceRequiredError(null);
    onSubmit(toTellerSubmissionRequest(values), evidence);
  };

  const handleEvidenceChange = (file: File | null) => {
    evidenceFileRef.current = file;

    if (file) {
      setEvidenceRequiredError(null);
    }
  };

  return (
    <form noValidate aria-busy={isSubmitting} onSubmit={handleSubmit(submit)}>
      <div className="space-y-3.5">
        <SectionCard
          title="Payment Details"
          description="Provide the payment information printed on your teller."
        >
          <div className="rounded-xl border border-portal-line/80 bg-portal-surface/55 p-3">
            <p className="text-[8.5px] font-bold uppercase tracking-[0.13em] text-navy-600">
              Invoice association
            </p>

            {hasInvoices ? (
              <>
                <label htmlFor="teller-invoice" className="mt-2 block">
                  <span className={labelClassName}>Select invoice</span>
                  <span className="relative mt-1 block">
                    <select
                      id="teller-invoice"
                      {...invoiceIdField}
                      onChange={handleInvoiceChange}
                      disabled={fieldsDisabled}
                      className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
                    >
                      <option value="">No invoice selected</option>
                      {associatedInvoices.map((invoice) => (
                        <option key={invoice.id} value={invoice.id}>
                          {invoice.invoiceNumber}
                        </option>
                      ))}
                    </select>
                    <PortalIcon
                      icon={ChevronDown}
                      className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                      strokeWidth={2.3}
                    />
                  </span>
                </label>
                <SelectedInvoiceSummary
                  invoice={
                    associatedInvoices.find(
                      (invoice) => invoice.id === invoiceIdWatch,
                    ) ?? null
                  }
                />
              </>
            ) : (
              <div className="mt-2">
                <p className="text-[10.5px] leading-[16px] text-slate-500">
                  {requirements.invoiceAssociationRequired
                    ? 'Invoice association is required by the university workflow, but no invoices were supplied yet. Please check back once the invoice service is available.'
                    : 'Invoice association is optional. No invoices were supplied by the university, so your submission will not be linked to one.'}
                </p>
                <p className="mt-1 text-[9.5px] leading-[14px] text-slate-400">
                  Invoice association requires university data; the portal does
                  not create or guess invoices.
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label htmlFor="teller-invoice-reference" className="block">
              <span className={labelClassName}>
                Invoice number or payment reference
              </span>
              <input
                id="teller-invoice-reference"
                type="text"
                {...register('invoiceReference')}
                disabled={fieldsDisabled}
                aria-invalid={Boolean(errors.invoiceReference)}
                aria-describedby={
                  errors.invoiceReference
                    ? 'teller-invoice-reference-error'
                    : undefined
                }
                placeholder="As printed on your invoice or teller"
                className={`${controlClassName} px-3 text-[12px] font-semibold`}
              />
              {errors.invoiceReference ? (
                <span
                  id="teller-invoice-reference-error"
                  role="alert"
                  className={errorClassName}
                >
                  {errors.invoiceReference.message}
                </span>
              ) : null}
            </label>

            <label htmlFor="teller-amount" className="block">
              <span className={labelClassName}>Amount paid (₦)</span>
              <input
                id="teller-amount"
                type="text"
                inputMode="decimal"
                {...register('amountPaid')}
                disabled={fieldsDisabled}
                aria-invalid={Boolean(errors.amountPaid)}
                aria-describedby={
                  errors.amountPaid ? 'teller-amount-error' : undefined
                }
                placeholder="e.g. 25000"
                className={`${controlClassName} px-3 text-[12px] font-semibold`}
              />
              {errors.amountPaid ? (
                <span
                  id="teller-amount-error"
                  role="alert"
                  className={errorClassName}
                >
                  {errors.amountPaid.message}
                </span>
              ) : null}
            </label>

            <label htmlFor="teller-payment-date" className="block">
              <span className={labelClassName}>Payment date</span>
              <input
                id="teller-payment-date"
                type="date"
                {...register('paymentDate')}
                disabled={fieldsDisabled}
                aria-invalid={Boolean(errors.paymentDate)}
                aria-describedby={
                  errors.paymentDate ? 'teller-payment-date-error' : undefined
                }
                className={`${controlClassName} px-3 text-[12px] font-semibold`}
              />
              {errors.paymentDate ? (
                <span
                  id="teller-payment-date-error"
                  role="alert"
                  className={errorClassName}
                >
                  {errors.paymentDate.message}
                </span>
              ) : null}
            </label>

            {requirements.requiresDepositorName ? (
              <label htmlFor="teller-depositor" className="block">
                <span className={labelClassName}>Depositor name</span>
                <input
                  id="teller-depositor"
                  type="text"
                  {...register('depositorName')}
                  disabled={fieldsDisabled}
                  aria-invalid={Boolean(errors.depositorName)}
                  aria-describedby={
                    errors.depositorName
                      ? 'teller-depositor-error'
                      : undefined
                  }
                  className={`${controlClassName} px-3 text-[12px] font-semibold`}
                />
                {errors.depositorName ? (
                  <span
                    id="teller-depositor-error"
                    role="alert"
                    className={errorClassName}
                  >
                    {errors.depositorName.message}
                  </span>
                ) : null}
              </label>
            ) : null}

            {hasSessions ? (
              <label htmlFor="teller-session" className="block">
                <span className={labelClassName}>
                  Academic session{optionalSuffix}
                </span>
                <span className="relative mt-1 block">
                  <select
                    id="teller-session"
                    {...register('academicSession')}
                    disabled={fieldsDisabled}
                    className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
                  >
                    <option value="">Select session</option>
                    {options.academicSessions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <PortalIcon
                    icon={ChevronDown}
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                    strokeWidth={2.3}
                  />
                </span>
              </label>
            ) : null}

            {hasSemesters ? (
              <label htmlFor="teller-semester" className="block">
                <span className={labelClassName}>
                  Semester{optionalSuffix}
                </span>
                <span className="relative mt-1 block">
                  <select
                    id="teller-semester"
                    {...register('semester')}
                    disabled={fieldsDisabled}
                    className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
                  >
                    <option value="">Select semester</option>
                    {options.semesters.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <PortalIcon
                    icon={ChevronDown}
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                    strokeWidth={2.3}
                  />
                </span>
              </label>
            ) : null}

            {hasFeeCategories ? (
              <label htmlFor="teller-fee-category" className="block">
                <span className={labelClassName}>
                  Fee category{optionalSuffix}
                </span>
                <span className="relative mt-1 block">
                  <select
                    id="teller-fee-category"
                    {...register('feeCategory')}
                    disabled={fieldsDisabled}
                    className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
                  >
                    <option value="">Select fee category</option>
                    {options.feeCategories.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <PortalIcon
                    icon={ChevronDown}
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                    strokeWidth={2.3}
                  />
                </span>
              </label>
            ) : null}

            {hasPaymentChannels ? (
              <label htmlFor="teller-channel" className="block">
                <span className={labelClassName}>
                  Bank / payment channel{optionalSuffix}
                </span>
                <span className="relative mt-1 block">
                  <select
                    id="teller-channel"
                    {...register('paymentChannel')}
                    disabled={fieldsDisabled}
                    className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
                  >
                    <option value="">Select bank or channel</option>
                    {options.paymentChannels.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <PortalIcon
                    icon={ChevronDown}
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                    strokeWidth={2.3}
                  />
                </span>
              </label>
            ) : null}

            <label htmlFor="teller-transaction-reference" className="block">
              <span className={labelClassName}>
                Transaction reference{optionalSuffix}
              </span>
              <input
                id="teller-transaction-reference"
                type="text"
                {...register('transactionReference')}
                disabled={fieldsDisabled}
                placeholder="If available"
                className={`${controlClassName} px-3 text-[12px] font-semibold`}
              />
            </label>
          </div>

          <p className="mt-3 text-[9.5px] leading-[14px] text-slate-400">
            Only options supplied by the university are shown. Fields without
            official options stay hidden.
          </p>
        </SectionCard>

        <SectionCard
          title="Payment Evidence"
          description="Attach your bank teller as proof of payment."
        >
          <TellerFileUpload
            constraints={constraints}
            maxFileSizeBytes={maxFileSizeBytes}
            acceptedDescription={describeAcceptedFileTypes(
              constraints.acceptedFileTypes,
            )}
            disabled={fieldsDisabled}
            onFileChange={handleEvidenceChange}
          />

          {evidenceRequiredError ? (
            <p
              role="alert"
              className="mt-2 text-[10.5px] font-semibold leading-[15px] text-rose-700"
            >
              {evidenceRequiredError}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 border-t border-portal-line/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[10px] leading-[16px] text-slate-500">
              Submitting means your evidence has been received for review. It is
              not a payment confirmation.
            </p>

            <button
              type="submit"
              disabled={fieldsDisabled}
              aria-busy={isSubmitting}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-4 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-navy-900/45 disabled:shadow-none"
            >
              <PortalIcon
                icon={isSubmitting ? LoaderCircle : Send}
                className={`size-3.5 ${isSubmitting ? 'animate-spin' : ''}`}
                strokeWidth={2.3}
              />
              {isSubmitting ? 'Submitting teller…' : 'Submit Teller'}
            </button>
          </div>
        </SectionCard>
      </div>
    </form>
  );
}

function SelectedInvoiceSummary({
  invoice,
}: {
  invoice: TellerInvoiceOption | null;
}) {
  if (!invoice) {
    return null;
  }

  return (
    <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 rounded-lg border border-portal-line/80 bg-white px-3 py-2.5">
      <div>
        <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
          Invoice number
        </dt>
        <dd className="mt-0.5 break-words font-mono text-[10px] font-semibold text-navy-950">
          {invoice.invoiceNumber}
        </dd>
      </div>
      <div>
        <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
          Amount due
        </dt>
        <dd className="mt-0.5 text-[10px] font-semibold tabular-nums text-navy-950">
          {invoice.amountDue === null
            ? 'Not supplied'
            : formatNaira(invoice.amountDue)}
        </dd>
      </div>
      <div className="col-span-2">
        <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
          Description
        </dt>
        <dd className="mt-0.5 break-words text-[10px] font-semibold text-navy-950">
          {invoice.description?.trim() || 'Not supplied'}
        </dd>
      </div>
      <div>
        <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
          Session
        </dt>
        <dd className="mt-0.5 text-[10px] font-semibold text-navy-950">
          {invoice.academicSession?.trim() || 'Not supplied'}
        </dd>
      </div>
      <div>
        <dt className="text-[8px] font-bold uppercase tracking-[0.1em] text-navy-600">
          Semester
        </dt>
        <dd className="mt-0.5 text-[10px] font-semibold text-navy-950">
          {invoice.semester?.trim() || 'Not supplied'}
        </dd>
      </div>
    </dl>
  );
}
