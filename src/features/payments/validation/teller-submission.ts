import type { FieldErrors, Resolver } from 'react-hook-form';
import { z } from 'zod';
import type { TellerSubmissionRequest } from '../types/teller';

/**
 * Options that change the official validation rules. Only the university
 * workflow can make a field required.
 */
export interface TellerSchemaOptions {
  requiresDepositorName: boolean;
}

const amountPattern = /^\d+(\.\d{1,2})?$/;

export function createTellerSubmissionSchema(options: TellerSchemaOptions) {
  return z.object({
    invoiceReference: z
      .string()
      .trim()
      .min(1, 'Enter the invoice number or payment reference.'),
    invoiceId: z.string(),
    feeCategory: z.string(),
    academicSession: z.string(),
    semester: z.string(),
    amountPaid: z
      .string()
      .trim()
      .min(1, 'Enter the amount paid.')
      .refine(
        (value) => amountPattern.test(value),
        'Enter a valid amount, for example 25000 or 25000.50.',
      )
      .refine(
        (value) => Number(value) > 0,
        'The amount paid must be greater than zero.',
      ),
    paymentDate: z
      .string()
      .min(1, 'Select the payment date.')
      .refine(
        (value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()),
        'Enter a valid payment date.',
      )
      .refine(
        (value) => {
          const date = new Date(`${value}T00:00:00`);
          const endOfToday = new Date();
          endOfToday.setHours(23, 59, 59, 999);

          return date.getTime() <= endOfToday.getTime();
        },
        'The payment date cannot be in the future.',
      ),
    depositorName: options.requiresDepositorName
      ? z.string().trim().min(1, 'Enter the depositor name.')
      : z.string(),
    paymentChannel: z.string(),
    transactionReference: z.string(),
  });
}

export type TellerFormValues = z.infer<
  ReturnType<typeof createTellerSubmissionSchema>
>;

export const emptyTellerFormValues: TellerFormValues = {
  invoiceReference: '',
  invoiceId: '',
  feeCategory: '',
  academicSession: '',
  semester: '',
  amountPaid: '',
  paymentDate: '',
  depositorName: '',
  paymentChannel: '',
  transactionReference: '',
};

const TELLER_FORM_FIELDS = [
  'invoiceReference',
  'invoiceId',
  'feeCategory',
  'academicSession',
  'semester',
  'amountPaid',
  'paymentDate',
  'depositorName',
  'paymentChannel',
  'transactionReference',
] as const;

/**
 * Resolver factory so the form uses React Hook Form with the installed Zod
 * version, matching the approach in `invoice-request.ts`.
 */
export function createTellerFormResolver(
  options: TellerSchemaOptions,
): Resolver<TellerFormValues> {
  const schema = createTellerSubmissionSchema(options);

  return (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<TellerFormValues> = {};

    for (const issue of result.error.issues) {
      const [field] = issue.path;

      if (
        TELLER_FORM_FIELDS.some((candidate) => candidate === field) &&
        field !== undefined &&
        !errors[field as keyof TellerFormValues]
      ) {
        errors[field as keyof TellerFormValues] = {
          type: issue.code,
          message: issue.message,
        } as never;
      }
    }

    return { values: {}, errors };
  };
}

export function toTellerSubmissionRequest(
  values: TellerFormValues,
): TellerSubmissionRequest {
  const optional = (value: string) => {
    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : null;
  };

  return {
    invoiceReference: values.invoiceReference.trim(),
    invoiceId: optional(values.invoiceId),
    feeCategory: optional(values.feeCategory),
    academicSession: optional(values.academicSession),
    semester: optional(values.semester),
    amountPaid: Number(values.amountPaid.trim()),
    paymentDate: values.paymentDate,
    depositorName: optional(values.depositorName),
    paymentChannel: optional(values.paymentChannel),
    transactionReference: optional(values.transactionReference),
  };
}
