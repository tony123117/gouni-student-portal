import { createPortal } from 'react-dom';
import type { InvoiceDocument as InvoiceDocumentData } from '../types/invoice';
import { InvoiceDocument } from './InvoiceDocument';

interface InvoicePrintSheetProps {
  invoice: InvoiceDocumentData;
}

/**
 * A body-level print-only copy of the invoice.
 *
 * The application shell is hidden by the print stylesheet, so the printed
 * document contains only the official invoice surface and university branding.
 */
export function InvoicePrintSheet({ invoice }: InvoicePrintSheetProps) {
  return createPortal(
    <div className="invoice-print-sheet bg-white">
      <InvoiceDocument invoice={invoice} />
    </div>,
    document.body,
  );
}
