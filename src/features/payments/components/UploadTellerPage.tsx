import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PageHeading } from '@/components/shared/PageHeading';
import { TELLER_TECHNICAL_MAX_FILE_SIZE_BYTES } from '../constants';
import { useTellerContext } from '../hooks/useTellerContext';
import { useTellerSubmission } from '../hooks/useTellerSubmission';
import type { TellerSubmissionRequest } from '../types/teller';
import { TellerGuidanceCard } from './TellerGuidanceCard';
import { TellerSubmissionForm } from './TellerSubmissionForm';
import { TellerSubmissionHistory } from './TellerSubmissionHistory';
import {
  TellerAvailabilityNotice,
  TellerContextError,
  TellerSubmissionError,
  TellerSubmissionPending,
  TellerSuccessCard,
} from './TellerStates';
import { TellerPageSkeleton } from './TellerSkeletons';

export function UploadTellerPage() {
  const queryClient = useQueryClient();
  const contextQuery = useTellerContext();
  const [submittedRequest, setSubmittedRequest] =
    useState<TellerSubmissionRequest | null>(null);
  const [submissionId, setSubmissionId] = useState(0);
  const [formResetKey, setFormResetKey] = useState(0);
  const evidenceRef = useRef<File | null>(null);

  const submissionQuery = useTellerSubmission(
    submittedRequest,
    submissionId,
    evidenceRef,
  );
  const context = contextQuery.data;
  const canSubmit =
    context?.availability === 'available' && context.capabilities.submission;
  const isSubmitting = submittedRequest !== null && submissionQuery.isPending;
  const result = submissionQuery.data;

  useEffect(() => {
    if (!submissionQuery.isSuccess || !result) {
      return;
    }

    evidenceRef.current = null;
    setFormResetKey((current) => current + 1);
    void queryClient.invalidateQueries({ queryKey: ['teller-context'] });
  }, [submissionQuery.isSuccess, result, queryClient]);

  const handleSubmit = useCallback(
    (request: TellerSubmissionRequest, evidence: File) => {
      if (isSubmitting) {
        return;
      }

      evidenceRef.current = evidence;
      setSubmittedRequest(request);
      setSubmissionId((current) => current + 1);
    },
    [isSubmitting],
  );

  const renderSubmissionOutcome = () => {
    if (!submittedRequest) {
      return null;
    }

    if (submissionQuery.isPending) {
      return <TellerSubmissionPending />;
    }

    if (submissionQuery.isError) {
      return (
        <TellerSubmissionError
          isRetrying={submissionQuery.isFetching}
          onRetry={() => {
            void submissionQuery.refetch();
          }}
        />
      );
    }

    if (result) {
      return <TellerSuccessCard result={result} />;
    }

    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeading
        eyebrow="Payments"
        title="Upload Teller"
        description="Submit your payment evidence for review and verification."
      />

      {contextQuery.isPending ? (
        <TellerPageSkeleton />
      ) : contextQuery.isError || !context ? (
        <TellerContextError
          isRetrying={contextQuery.isFetching}
          onRetry={() => {
            void contextQuery.refetch();
          }}
        />
      ) : (
        <>
          {!canSubmit ? (
            <TellerAvailabilityNotice message={context.message} />
          ) : null}

          <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]">
            <TellerSubmissionForm
              key={formResetKey}
              options={context.options}
              requirements={context.requirements}
              constraints={context.uploadConstraints}
              maxFileSizeBytes={
                context.uploadConstraints.maxFileSizeBytes ??
                TELLER_TECHNICAL_MAX_FILE_SIZE_BYTES
              }
              associatedInvoices={context.associatedInvoices}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
            <TellerGuidanceCard />
          </div>

          <p className="sr-only" role="status">
            {isSubmitting
              ? 'Submitting teller.'
              : submissionQuery.isError
                ? 'Teller submission failed.'
                : result
                  ? 'Teller submitted and awaiting verification.'
                  : ''}
          </p>

          {renderSubmissionOutcome()}

          <TellerSubmissionHistory
            history={context.history}
            availability={context.availability}
            message={context.message}
          />
        </>
      )}
    </div>
  );
}
