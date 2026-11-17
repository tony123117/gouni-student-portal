import {
  ChevronDown,
  FilePlus2,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { Badge } from '@/components/ui/Badge';
import type { InvoiceFormOptions, InvoiceRequest } from '../types/invoice';
import {
  emptyInvoiceFormValues,
  invoiceFormResolver,
  toInvoiceRequest,
  type InvoiceFormValues,
} from '../validation/invoice-request';

interface InvoiceRequestFormProps {
  options: InvoiceFormOptions;
  canGenerate: boolean;
  isGenerating: boolean;
  onGenerate: (request: InvoiceRequest) => void;
  onSelectionChange: () => void;
}

const controlClassName =
  'mt-1 h-11 w-full rounded-lg border border-portal-line bg-portal-surface/60 text-navy-950 outline-none transition-colors hover:bg-portal-surface focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100 disabled:cursor-not-allowed disabled:opacity-70';

const labelClassName =
  'block text-[9.5px] font-bold uppercase tracking-[0.13em] text-navy-600';

const errorClassName = 'mt-1 text-[10px] font-semibold text-rose-700';

export function InvoiceRequestForm({
  options,
  canGenerate,
  isGenerating,
  onGenerate,
  onSelectionChange,
}: InvoiceRequestFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: invoiceFormResolver,
    defaultValues: emptyInvoiceFormValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((_values, { name }) => {
      if (
        name === 'academicSession' ||
        name === 'semester' ||
        name === 'feeCategory'
      ) {
        onSelectionChange();
      }
    });

    return () => subscription.unsubscribe();
  }, [onSelectionChange, watch]);

  const hasRequiredOptions =
    options.academicSessions.length > 0 && options.semesters.length > 0;
  const fieldsDisabled = !canGenerate || !hasRequiredOptions || isGenerating;
  const hasFeeCategories = options.feeCategories.length > 0;

  const submit = (values: InvoiceFormValues) => {
    onGenerate(toInvoiceRequest(values));
  };

  return (
    <SectionCard
      title="Invoice Selection"
      description="Choose the official session, semester, and fee category for your invoice."
      headerAside={
        isGenerating ? (
          <Badge variant="navy">Generating…</Badge>
        ) : canGenerate ? (
          <Badge variant="success">Ready</Badge>
        ) : (
          <Badge variant="warning">Unavailable</Badge>
        )
      }
    >
      <form
        noValidate
        aria-busy={isGenerating}
        onSubmit={handleSubmit(submit)}
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <label htmlFor="invoice-academic-session" className="block">
            <span className={labelClassName}>Academic session</span>
            <span className="relative mt-1 block">
              <select
                id="invoice-academic-session"
                {...register('academicSession')}
                disabled={fieldsDisabled}
                aria-invalid={Boolean(errors.academicSession)}
                aria-describedby={
                  errors.academicSession
                    ? 'invoice-academic-session-error'
                    : undefined
                }
                className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
              >
                <option value="">
                  {options.academicSessions.length === 0
                    ? 'Sessions unavailable'
                    : 'Select academic session'}
                </option>
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
            {errors.academicSession ? (
              <span
                id="invoice-academic-session-error"
                role="alert"
                className={errorClassName}
              >
                {errors.academicSession.message}
              </span>
            ) : null}
          </label>

          <label htmlFor="invoice-semester" className="block">
            <span className={labelClassName}>Semester</span>
            <span className="relative mt-1 block">
              <select
                id="invoice-semester"
                {...register('semester')}
                disabled={fieldsDisabled}
                aria-invalid={Boolean(errors.semester)}
                aria-describedby={
                  errors.semester ? 'invoice-semester-error' : undefined
                }
                className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
              >
                <option value="">
                  {options.semesters.length === 0
                    ? 'Semesters unavailable'
                    : 'Select semester'}
                </option>
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
            {errors.semester ? (
              <span
                id="invoice-semester-error"
                role="alert"
                className={errorClassName}
              >
                {errors.semester.message}
              </span>
            ) : null}
          </label>

          <label htmlFor="invoice-fee-category" className="block">
            <span className={labelClassName}>
              Fee category{' '}
              <span className="normal-case tracking-normal text-slate-400">
                (optional)
              </span>
            </span>
            <span className="relative mt-1 block">
              <select
                id="invoice-fee-category"
                {...register('feeCategory')}
                disabled={fieldsDisabled || !hasFeeCategories}
                className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
              >
                <option value="">
                  {hasFeeCategories
                    ? 'Select fee category'
                    : 'Fee categories unavailable'}
                </option>
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
            {!hasFeeCategories ? (
              <span className="mt-1 block text-[10px] leading-[14px] text-slate-400">
                No fee categories were supplied by the university.
              </span>
            ) : null}
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-portal-line/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-xl items-start gap-1.5 text-[10px] leading-[16px] text-slate-500">
            <PortalIcon
              icon={ShieldCheck}
              className="mt-px size-3.5 shrink-0 text-navy-500"
              strokeWidth={2.2}
            />
            {canGenerate
              ? 'Only options supplied by the university are shown. No fees or invoice details are generated locally.'
              : 'Invoice generation will be enabled when the university supplies and enables the official invoice options.'}
          </p>

          <button
            type="submit"
            disabled={fieldsDisabled}
            aria-busy={isGenerating}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-4 text-[11.5px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-navy-900/45 disabled:shadow-none"
          >
            <PortalIcon
              icon={isGenerating ? LoaderCircle : FilePlus2}
              className={`size-3.5 ${isGenerating ? 'animate-spin' : ''}`}
              strokeWidth={2.3}
            />
            {isGenerating ? 'Generating invoice…' : 'Generate Invoice'}
          </button>
        </div>
      </form>
    </SectionCard>
  );
}
