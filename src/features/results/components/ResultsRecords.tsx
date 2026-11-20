import { useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { SectionCard } from '@/components/shared/SectionCard';
import type {
  CourseResult,
  ResultsFilters,
  ResultsSnapshot,
} from '../types/results';
import {
  filterCourseResults,
  getResultColumnAvailability,
  getResultFilterOptions,
  hasActiveResultFilters,
} from '../utils/filter';
import { ResultsCards } from './ResultsCards';
import { ResultsFilters as ResultsFilterBar } from './ResultsFilters';
import {
  ResultsEmptyState,
  ResultsFilteredEmptyState,
  ResultsUnpublishedState,
} from './ResultsStates';
import { ResultsTable } from './ResultsTable';

interface ResultsRecordsProps {
  snapshot: ResultsSnapshot;
  filters: ResultsFilters;
  onFilterChange: <Key extends keyof ResultsFilters>(
    key: Key,
    value: ResultsFilters[Key],
  ) => void;
  onClearFilters: () => void;
  onViewResult: (result: CourseResult) => void;
}

export function ResultsRecords({
  snapshot,
  filters,
  onFilterChange,
  onClearFilters,
  onViewResult,
}: ResultsRecordsProps) {
  const totalCount = snapshot.results.length;
  const filtersAreActive = hasActiveResultFilters(filters);
  const options = useMemo(
    () => getResultFilterOptions(snapshot.results),
    [snapshot.results],
  );
  const filteredResults = useMemo(
    () => filterCourseResults(snapshot.results, filters),
    [filters, snapshot.results],
  );
  const columns = useMemo(
    () => getResultColumnAvailability(snapshot.results),
    [snapshot.results],
  );
  const isUnpublished =
    snapshot.publication?.published === false && totalCount === 0;

  const headerAside = isUnpublished ? (
    <Badge variant="warning">Not published</Badge>
  ) : totalCount === 0 ? (
    <span className="text-[11.5px] font-semibold text-slate-500">
      0 results
    </span>
  ) : (
    <span
      aria-live="polite"
      className="text-[11.5px] font-semibold text-slate-500"
    >
      {filtersAreActive
        ? `${filteredResults.length} of ${totalCount} results`
        : `${totalCount} ${totalCount === 1 ? 'result' : 'results'}`}
    </span>
  );

  return (
    <SectionCard
      title="Course results"
      description="Search and review results supplied by the university for the selected period."
      headerAside={headerAside}
      bodyClassName="p-0"
    >
      {totalCount > 0 ? (
        <ResultsFilterBar
          filters={filters}
          options={options}
          hasActiveFilters={filtersAreActive}
          onChange={onFilterChange}
          onClear={onClearFilters}
        />
      ) : null}

      {isUnpublished ? (
        <ResultsUnpublishedState publication={snapshot.publication} />
      ) : totalCount === 0 ? (
        <ResultsEmptyState />
      ) : filteredResults.length === 0 ? (
        <ResultsFilteredEmptyState onClearFilters={onClearFilters} />
      ) : (
        <>
          <ResultsTable
            results={filteredResults}
            columns={columns}
            onViewResult={onViewResult}
          />
          <ResultsCards
            results={filteredResults}
            onViewResult={onViewResult}
          />
        </>
      )}
    </SectionCard>
  );
}
