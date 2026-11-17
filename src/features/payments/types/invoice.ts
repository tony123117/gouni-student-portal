export type InvoiceAvailability = 'available' | 'unavailable';

export interface InvoiceRequest {
  academicSession: string;
  semester: string;
  feeCategory: string;
}

export interface InvoiceOption {
  value: string;
  label: string;
}

export interface InvoiceFormOptions {
  academicSessions: InvoiceOption[];
  semesters: InvoiceOption[];
  feeCategories: InvoiceOption[];
}

export interface InvoiceOptionsSnapshot {
  availability: InvoiceAvailability;
  message: string | null;
  options: InvoiceFormOptions;
  capabilities: {
    invoiceGeneration: boolean;
  };
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  amount: number | null;
}

export interface InvoiceAdditionalCharge {
  id: string;
  label: string;
  amount: number;
}

export interface InvoiceDocument {
  invoiceNumber: string | null;
  studentName: string | null;
  matriculationNumber: string | null;
  department: string | null;
  academicSession: string | null;
  semester: string | null;
  invoiceDate: string | null;
  dueDate: string | null;
  description: string | null;
  items: InvoiceLineItem[];
  subtotal: number | null;
  additionalCharges: InvoiceAdditionalCharge[];
  totalPayable: number | null;
  paymentReference: string | null;
  instructions: string[];
}

export interface InvoicePaymentAvailability {
  available: boolean;
  destinationUrl: string | null;
  message: string | null;
}

export interface InvoiceGenerationSnapshot {
  availability: InvoiceAvailability;
  message: string | null;
  invoice: InvoiceDocument | null;
  payment: InvoicePaymentAvailability;
}

export interface InvoiceService {
  /**
   * Returns the official options that may be used to request an invoice.
   *
   * The university contract is not available yet. Implementations must never
   * generate academic sessions, semesters, or fee categories locally.
   */
  getInvoiceOptions(signal?: AbortSignal): Promise<InvoiceOptionsSnapshot>;

  /**
   * Requests an official invoice for the supplied selection.
   *
   * Only a university-supplied invoice may be returned. Implementations must
   * never fabricate student details, fees, invoice numbers, or references.
   */
  generateInvoice(
    request: InvoiceRequest,
    signal?: AbortSignal,
  ): Promise<InvoiceGenerationSnapshot>;
}
