import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PageHeading } from '@/components/shared/PageHeading';
import {
  registrationContextQueryKey,
  useRegistrationContext,
} from '../hooks/useRegistrationContext';
import { useRegistrationSubmission } from '../hooks/useRegistrationSubmission';
import type {
  RegistrationRecord,
  RegistrationSubmissionRequest,
} from '../types/registration';
import { CurrentRegistrationCard } from './CurrentRegistrationCard';
import { RegistrationHistory } from './RegistrationHistory';
import { RegistrationOverview } from './RegistrationOverview';
import { RegistrationRecordDialog } from './RegistrationRecordDialog';
import { CourseRegistrationSkeleton } from './RegistrationSkeletons';
import {
  RegistrationAvailabilityNotice,
  RegistrationContextError,
  RegistrationRefreshNotice,
  RegistrationSubmissionBlockedNotice,
  RegistrationSubmissionError,
  RegistrationSubmissionPending,
  RegistrationSuccessCard,
} from './RegistrationStates';
import { RegistrationWorkspace } from './RegistrationWorkspace';

export function CourseRegistrationPage() {
  const queryClient = useQueryClient();
  const contextQuery = useRegistrationContext();
  const [submittedRequest, setSubmittedRequest] =
    useState<RegistrationSubmissionRequest | null>(null);
  const [submissionId, setSubmissionId] = useState(0);
  const [workspaceResetKey, setWorkspaceResetKey] = useState(0);
  const [selectedRecord, setSelectedRecord] =
    useState<RegistrationRecord | null>(null);

  const submissionQuery = useRegistrationSubmission(
    submittedRequest,
    submissionId,
  );
  const context = contextQuery.data;
  const result = submissionQuery.data;
  const isSubmitting =
    submittedRequest !== null &&
    (submissionQuery.isPending || submissionQuery.isFetching);

  useEffect(() => {
    if (!submissionQuery.isSuccess || !result) {
      return;
    }

    setWorkspaceResetKey((current) => current + 1);
    void queryClient.invalidateQueries({
      queryKey: registrationContextQueryKey,
    });
  }, [result, submissionQuery.isSuccess, queryClient]);

  const handleSubmission = useCallback(
    (request: RegistrationSubmissionRequest) => {
      if (submissionQuery.isFetching) {
        return;
      }

      setSubmittedRequest(request);
      setSubmissionId((current) => current + 1);
    },
    [submissionQuery.isFetching],
  );

  const renderSubmissionOutcome = () => {
    if (!submittedRequest) {
      return null;
    }

    if (submissionQuery.isPending) {
      return <RegistrationSubmissionPending />;
    }

    if (submissionQuery.isError) {
      return (
        <RegistrationSubmissionError
          isRetrying={submissionQuery.isFetching}
          onRetry={() => {
            void submissionQuery.refetch();
          }}
        />
      );
    }

    if (result) {
      return <RegistrationSuccessCard result={result} />;
    }

    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeading
        eyebrow="Academics"
        title="Course Registration"
        description="View available courses, manage your selections, and submit your registration."
      />

      {contextQuery.isPending ? (
        <CourseRegistrationSkeleton />
      ) : !context ? (
        <RegistrationContextError
          isRetrying={contextQuery.isFetching}
          onRetry={() => {
            void contextQuery.refetch();
          }}
        />
      ) : (
        <>
          {contextQuery.isError ? <RegistrationRefreshNotice /> : null}

          {context.availability === 'unavailable' ? (
            <RegistrationAvailabilityNotice message={context.message} />
          ) : !context.capabilities.submission ? (
            <RegistrationSubmissionBlockedNotice
              message={context.submissionBlockedReason}
            />
          ) : null}

          <RegistrationOverview
            snapshot={context}
            isRefreshing={contextQuery.isFetching}
            onRefresh={() => {
              void contextQuery.refetch();
            }}
          />

          {renderSubmissionOutcome()}

          <RegistrationWorkspace
            key={workspaceResetKey}
            snapshot={context}
            isSubmitting={isSubmitting}
            receiptRecorded={result !== null}
            onSubmit={handleSubmission}
          />

          {context.currentRegistration ? (
            <CurrentRegistrationCard
              record={context.currentRegistration}
              onViewDetails={() =>
                setSelectedRecord(context.currentRegistration ?? null)
              }
            />
          ) : null}

          <RegistrationHistory
            history={context.history}
            onViewRecord={setSelectedRecord}
          />

          <p className="sr-only" role="status" aria-live="polite">
            {isSubmitting
              ? 'Submitting course registration.'
              : submissionQuery.isError
                ? 'Course registration submission failed.'
                : result
                  ? 'Course registration received by the university. This is a receipt acknowledgement, not final approval.'
                  : context.currentRegistration
                    ? 'A current registration is held by the university.'
                    : ''}
          </p>

          {selectedRecord ? (
            <RegistrationRecordDialog
              record={selectedRecord}
              canDownloadConfirmation={
                context.capabilities.confirmationDownload
              }
              onClose={() => setSelectedRecord(null)}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
