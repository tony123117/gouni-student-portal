import { useEffect, useState } from 'react';
import { PageHeading } from '@/components/shared/PageHeading';
import { DEFAULT_RESULT_FILTERS } from '../constants';
import { useResults } from '../hooks/useResults';
import type {
  CourseResult,
  ResultsFilters,
} from '../types/results';
import { ResultsContextPanel } from './ResultsContextPanel';
import { ResultsDetailDialog } from './ResultsDetailDialog';
import { ResultsError } from './ResultsError';
import { ResultsHistory } from './ResultsHistory';
import {
  ResultsNoPeriodsState,
  ResultsNotPublishedNotice,
  ResultsRefreshNotice,
  ResultsSelectPeriodNotice,
  ResultsUnavailableState,
} from './ResultsStates';
import { ResultsOverview } from './ResultsOverview';
import { ResultsPeriodSelector } from './ResultsPeriodSelector';
import { ResultsPrintSheet } from './ResultsPrintSheet';
import { ResultsPublicationPanel } from './ResultsPublicationPanel';
import { ResultsRecords } from './ResultsRecords';
import { ResultsSkeleton } from './ResultsSkeleton';

export function ResultsPage() {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(
    null,
  );
  const [filters, setFilters] = useState<ResultsFilters>(
    DEFAULT_RESULT_FILTERS,
  );
  const [selectedResult, setSelectedResult] = useState<CourseResult | null>(
    null,
  );

  const { data, isPending, isError, isFetching, refetch } =
    useResults(selectedPeriodId);
  const activePeriodId = data?.activePeriod?.id ?? null;

  useEffect(() => {
    setFilters(DEFAULT_RESULT_FILTERS);
    setSelectedResult(null);
  }, [activePeriodId]);

  const handleFilterChange = <Key extends keyof ResultsFilters>(
    key: Key,
    value: ResultsFilters[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_RESULT_FILTERS);
  };

  const handleRefresh = () => {
    void refetch();
  };

  const handleSelectPeriod = (periodId: string) => {
    setSelectedPeriodId(periodId);
  };

  const noPeriods = data?.periods !== null && data?.periods?.length === 0;
  const showResultsWorkspace =
    data !== undefined &&
    data.availability === 'available' &&
    !noPeriods;

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeading
        eyebrow="Academics"
        title="Academic Results"
        description="View your academic performance and examination results."
      />

      {isPending ? (
        <ResultsSkeleton />
      ) : !data ? (
        <ResultsError isRetrying={isFetching} onRetry={handleRefresh} />
      ) : (
        <>
          {isError ? <ResultsRefreshNotice /> : null}

          {data.availability === 'unavailable' ? (
            <ResultsUnavailableState
              message={data.message}
              isRefreshing={isFetching}
              onRefresh={handleRefresh}
            />
          ) : noPeriods ? (
            <ResultsNoPeriodsState
              message={data.message}
              isRefreshing={isFetching}
              onRefresh={handleRefresh}
            />
          ) : showResultsWorkspace ? (
            <>
              <ResultsPeriodSelector
                periods={data.periods}
                activePeriod={data.activePeriod}
                isRefreshing={isFetching}
                lastUpdated={data.lastUpdated}
                onSelectPeriod={handleSelectPeriod}
                onRefresh={handleRefresh}
              />

              {data.publication?.published === false ? (
                <ResultsNotPublishedNotice publication={data.publication} />
              ) : null}

              {data.activePeriod ? (
                <>
                  <ResultsOverview summary={data.summary} />

                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] xl:gap-5">
                    <ResultsContextPanel context={data.academicContext} />
                    <ResultsPublicationPanel
                      publication={data.publication}
                      period={data.activePeriod}
                      capabilities={data.capabilities}
                      statementDocument={data.document}
                    />
                  </div>

                  <ResultsRecords
                    snapshot={data}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    onViewResult={setSelectedResult}
                  />

                  <ResultsHistory
                    periods={data.periods}
                    activePeriodId={activePeriodId}
                    onSelectPeriod={handleSelectPeriod}
                  />
                </>
              ) : (
                <>
                  <ResultsSelectPeriodNotice />
                  <ResultsHistory
                    periods={data.periods}
                    activePeriodId={activePeriodId}
                    onSelectPeriod={handleSelectPeriod}
                  />
                </>
              )}
            </>
          ) : null}
        </>
      )}

      {data?.activePeriod && data.availability === 'available' ? (
        <ResultsPrintSheet snapshot={data} />
      ) : null}

      {selectedResult && data?.activePeriod ? (
        <ResultsDetailDialog
          result={selectedResult}
          period={data.activePeriod}
          onClose={() => setSelectedResult(null)}
        />
      ) : null}
    </div>
  );
}
