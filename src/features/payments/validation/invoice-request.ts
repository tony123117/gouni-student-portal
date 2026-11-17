import type { FieldErrors, Resolver } from 'react-hook-form';
import { z } from 'zod';
import type { InvoiceRequest } from '../types/invoice';

export const invoiceRequestSchema = z.object({
  academicSession: z
    .string()
    .trim()
    .min(1, 'Select an academic session.'),
  semester: z.string().trim().min(1, 'Select a semester.'),
  feeCategory: z.string().trim(),
});

export type InvoiceFormValues = z.infer<typeof invoiceRequestSchema>;

export const emptyInvoiceFormValues: InvoiceFormValues = {
  academicSession: '',
  semester: '',
  feeCategory: '',
};

/**
 * Small resolver adapter so the form can use React Hook Form together with
 * the installed Zod version without adding another dependency.
 */
export const invoiceFormResolver: Resolver<InvoiceFormValues> = (values) => {
  const result = invoiceRequestSchema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors: FieldErrors<InvoiceFormValues> = {};

  for (const issue of result.error.issues) {
    const [field] = issue.path;

    if (
      (field === 'academicSession' ||
        field === 'semester' ||
        field === 'feeCategory') &&
      !errors[field]
    ) {
      errors[field] = {
        type: issue.code,
        message: issue.message,
      };
    }
  }

  return { values: {}, errors };
};

export function toInvoiceRequest(values: InvoiceFormValues): InvoiceRequest {
  return invoiceRequestSchema.parse(values);
}
