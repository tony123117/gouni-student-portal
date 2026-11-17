import { useCallback, useEffect, useRef, useState } from 'react';
import { PageHeading } from '@/components/shared/PageHeading';
import { useInvoice } from '../hooks/useInvoice';
import { useInvoiceOptions } from '../hooks/useInvoiceOptions';
import type { InvoiceRequest } from '../types/invoice';
import { InvoiceGuidanceCard } from './InvoiceGuidanceCard';
import { InvoicePreviewSection } from './InvoicePreviewSection';
import { InvoicePrintSheet } from './InvoicePrintSheet';
import { InvoiceRequestForm } from './InvoiceRequestForm';
import {
  InvoiceAvailabilityNotice,
  InvoiceGenerationError,
  InvoiceInitialState,
  InvoiceNoAvailableState,
  InvoiceOptionsError,
  InvoiceUnavailableState,
} from './InvoiceStates';
import {
  InvoiceGenerationSkeleton,
  InvoicePageSkeleton,
} from './InvoiceSkeletons';

const DEFAULT_OPTIONS_MESSAGE =
  'Official academic sessions, semesters and fee categories will appear here when the university invoice service is available.';

export function GenerateInvoicePage() {
  const optionsQuery = useInvoiceOptions();
  const [submittedRequest, setSubmittedRequest] =
    useState<InvoiceRequest | null>(null);
  const [submissionId, setSubmissionId] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const invoiceQuery = useInvoice(
    submittedRequest,
    submissionId,
  );
  const optionsSnapshot = optionsQuery.data;
  const optionsAvailable = optionsSnapshot?.availability === 'available';
  const hasRequiredOptions =
    (optionsSnapshot?.options.academicSessions.length ?? 0) > 0 &&
    (optionsSnapshot?.options.semesters.length ?? 0) > 0;
  const canGenerate = Boolean(
    optionsAvailable &&
      optionsSnapshot?.capabilities.invoiceGeneration &&
      hasRequiredOptions,
  );
  const isGenerating =
    submittedRequest !== null && invoiceQuery.isPending;
  const previewData = invoiceQuery.data;
  const invoice = previewData?.invoice ?? null;

  useEffect(() => {
    if (!submittedRequest || !invoice) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [invoice, submittedRequest]);

  const handleGenerate = (request: InvoiceRequest) => {
    setSubmittedRequest(request);
    setSubmissionId((current) => current + 1);
  };

  const handleSelectionChange = useCallback(() => {
    setSubmittedRequest(null);
  }, []);

  const optionsNotice = canGenerate
    ? null
    : (optionsSnapshot?.message ??
      (optionsSnapshot?.availability === 'available'
        ? 'The university has not supplied the official options required to generate an invoice.'
        : DEFAULT_OPTIONS_MESSAGE));

  const renderPreview = () => {
    if (invoiceQuery.isError) {
      return (
        <InvoiceGenerationError
          isRetrying={invoiceQuery.isFetching}
          onRetry={() => {
            void invoiceQuery.refetch();
          }}
        />
      );
    }

    if (isGenerating) {
      return <InvoiceGenerationSkeleton />;
    }

    if (previewData) {
      if (previewData.availability === 'unavailable') {
        return <InvoiceUnavailableState message={previewData.message} />;
      }

      if (!previewData.invoice) {
        return <InvoiceNoAvailableState message={previewData.message} />;
      }

      return (
        <InvoicePreviewSection
          invoice={previewData.invoice}
          payment={previewData.payment}
        />
      );
    }

    return (
      <InvoiceInitialState
        canGenerate={canGenerate}
        message={optionsNotice}
      />
    );
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeading
        eyebrow="Payments"
        title="Generate Invoice"
        description="Generate an invoice for your university payments."
      />

      {optionsQuery.isPending ? (
        <InvoicePageSkeleton />
      ) : optionsQuery.isError || !optionsSnapshot ? (
        <InvoiceOptionsError
          isRetrying={optionsQuery.isFetching}
          onRetry={() => {
            void optionsQuery.refetch();
          }}
        />
      ) : (
        <>
          {!canGenerate ? (
            <InvoiceAvailabilityNotice message={optionsNotice} />
          ) : null}

          <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]">
            <InvoiceRequestForm
              options={optionsSnapshot.options}
              canGenerate={canGenerate}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              onSelectionChange={handleSelectionChange}
            />
            <InvoiceGuidanceCard />
          </div>

          <p className="sr-only" role="status">
            {isGenerating
              ? 'Generating invoice.'
              : invoiceQuery.isError
                ? 'Invoice generation failed.'
                : invoice
                  ? 'Invoice generated.'
                  : ''}
          </p>

          <div ref={previewRef} className="scroll-mt-20 lg:scroll-mt-28">
            {renderPreview()}
          </div>

          {invoice ? <InvoicePrintSheet invoice={invoice} /> : null}
        </>
      )}
    </div>
  );
}
