import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PageHeading } from '@/components/shared/PageHeading';
import { DEFAULT_CLEARANCE_FILTERS } from '../constants';
import { examClearanceQueryKey, useExamClearance } from '../hooks/useExamClearance';
import { useClearanceRequest } from '../hooks/useClearanceRequest';
import type {
  ClearanceFilters,
  ClearanceRequirement,
} from '../types/exam-clearance';
import { ClearanceContextPanel } from './ClearanceContextPanel';
import { ClearanceGuidanceCard } from './ClearanceGuidanceCard';
import { ClearanceRequestDialog } from './ClearanceRequestDialog';
import { ClearanceRequirementDialog } from './ClearanceRequirementDialog';
import { ClearanceRequirementsSection } from './ClearanceRequirementsSection';
import { ClearanceSkeleton } from './ClearanceSkeleton';
import { ClearanceStatusPanel } from './ClearanceStatusPanel';
import {
  ClearanceError,
  ClearanceRefreshNotice,
  ClearanceUnavailableState,
} from './ClearanceStates';

export function ExamClearancePage() {
  const [filters, setFilters] = useState<ClearanceFilters>(
    DEFAULT_CLEARANCE_FILTERS,
  );
  const [selectedRequirementId, setSelectedRequirementId] = useState<
    string | null
  >(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isPending, isError, isFetching, refetch } = useExamClearance();
  const clearanceRequest = useClearanceRequest();

  const selectedRequirement: ClearanceRequirement | null =
    selectedRequirementId && data?.requirements
      ? (data.requirements.find(
          (requirement) => requirement.id === selectedRequirementId,
        ) ?? null)
      : null;

  const handleFilterChange = <Key extends keyof ClearanceFilters>(
    key: Key,
    value: ClearanceFilters[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_CLEARANCE_FILTERS);
  };

  const handleRefresh = () => {
    void refetch();
  };

  const handleViewRequirement = (requirement: ClearanceRequirement) => {
    setSelectedRequirementId(requirement.id);
  };

  const openRequestDialog = useCallback(() => {
    clearanceRequest.reset();
    setRequestDialogOpen(true);
  }, [clearanceRequest]);

  const closeRequestDialog = useCallback(() => {
    if (clearanceRequest.isPending) {
      return;
    }

    setRequestDialogOpen(false);
    clearanceRequest.reset();
  }, [clearanceRequest]);

  const handleSubmitRequest = () => {
    clearanceRequest.mutate(undefined, {
      onSuccess: () => {
        // A receipt may change the university's review status, so refresh the
        // snapshot. The receipt itself is never treated as clearance.
        void queryClient.invalidateQueries({ queryKey: examClearanceQueryKey });
      },
    });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeading
        eyebrow="Academics"
        title="Exam Clearance"
        description="View your clearance requirements and check your eligibility for examinations."
      />

      {isPending ? (
        <ClearanceSkeleton />
      ) : !data ? (
        <ClearanceError isRetrying={isFetching} onRetry={handleRefresh} />
      ) : (
        <>
          {isError ? <ClearanceRefreshNotice /> : null}

          {data.availability === 'unavailable' ? (
            <ClearanceUnavailableState
              message={data.message}
              isRefreshing={isFetching}
              onRefresh={handleRefresh}
            />
          ) : (
            <>
              <ClearanceStatusPanel
                snapshot={data}
                isRefreshing={isFetching}
                onRefresh={handleRefresh}
                onRequestClearance={openRequestDialog}
              />

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] xl:gap-5">
                <ClearanceContextPanel context={data.academicContext} />
                <ClearanceGuidanceCard />
              </div>

              <ClearanceRequirementsSection
                requirements={data.requirements}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onViewRequirement={handleViewRequirement}
              />
            </>
          )}
        </>
      )}

      {selectedRequirement ? (
        <ClearanceRequirementDialog
          requirement={selectedRequirement}
          documentDownload={data?.capabilities.documentDownload ?? false}
          onClose={() => setSelectedRequirementId(null)}
        />
      ) : null}

      {requestDialogOpen ? (
        <ClearanceRequestDialog
          isSubmitting={clearanceRequest.isPending}
          hasError={clearanceRequest.isError}
          result={clearanceRequest.data ?? null}
          onClose={closeRequestDialog}
          onSubmit={handleSubmitRequest}
        />
      ) : null}
    </div>
  );
}
