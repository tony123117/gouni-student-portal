import { SectionCard } from '@/components/shared/SectionCard';
import { Badge } from '@/components/ui/Badge';
import type {
  InvoiceDocument as InvoiceDocumentData,
  InvoicePaymentAvailability,
} from '../types/invoice';
import { InvoiceActions } from './InvoiceActions';
import { InvoiceDocument } from './InvoiceDocument';
import { InvoicePaymentInformation } from './InvoicePaymentInformation';

interface InvoicePreviewSectionProps {
  invoice: InvoiceDocumentData;
  payment: InvoicePaymentAvailability;
}

export function InvoicePreviewSection({
  invoice,
  payment,
}: InvoicePreviewSectionProps) {
  return (
    <SectionCard
      title="Invoice Preview"
      description="Review the official invoice before printing or paying."
      headerAside={<Badge variant="gold">Official invoice</Badge>}
      bodyClassName="p-3.5 sm:p-4"
    >
      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.42fr)_minmax(290px,0.58fr)] xl:items-start">
        <InvoiceDocument invoice={invoice} />

        <div className="space-y-3.5">
          <InvoiceActions payment={payment} />
          <InvoicePaymentInformation invoice={invoice} payment={payment} />
        </div>
      </div>
    </SectionCard>
  );
}
