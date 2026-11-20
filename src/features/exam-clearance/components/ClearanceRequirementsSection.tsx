import { useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { SectionCard } from '@/components/shared/SectionCard';
import type {
  ClearanceFilters,
  ClearanceRequirement,
} from '../types/exam-clearance';
import {
  filterClearanceRequirements,
  getClearanceFilterOptions,
  hasActiveClearanceFilters,
} from '../utils/filter';
import { ClearanceFilters as ClearanceFilterBar } from './ClearanceFilters';
import { ClearanceRequirementCard } from './ClearanceRequirementCard';
import {
  ClearanceEmptyRequirementsState,
  ClearanceFilteredEmptyState,
  ClearanceRequirementsUnavailableState,
} from './ClearanceStates';

interface ClearanceRequirementsSectionProps {
  requirements: ClearanceRequirement[] | null;
  filters: ClearanceFilters;
  onFilterChange: <Key extends keyof ClearanceFilters>(
    key: Key,
    value: ClearanceFilters[Key],
  ) => void;
  onClearFilters: () => void;
  onViewRequirement: (requirement: ClearanceRequirement) => void;
}

export function ClearanceRequirementsSection({
  requirements,
  filters,
  onFilterChange,
  onClearFilters,
  onViewRequirement,
}: ClearanceRequirementsSectionProps) {
  const totalCount = requirements?.length ?? 0;
  const filtersAreActive = hasActiveClearanceFilters(filters);
  const options = useMemo(
    () => getClearanceFilterOptions(requirements ?? []),
    [requirements],
  );
  const filteredRequirements = useMemo(
    () =>
      requirements
        ? filterClearanceRequirements(requirements, filters)
        : [],
    [filters, requirements],
  );

  const headerAside =
    requirements === null ? (
      <Badge variant="warning">Unavailable</Badge>
    ) : totalCount === 0 ? (
      <span className="text-[11.5px] font-semibold text-slate-500">
        0 requirements
      </span>
    ) : (
      <span
        aria-live="polite"
        className="text-[11.5px] font-semibold text-slate-500"
      >
        {filtersAreActive
          ? `${filteredRequirements.length} of ${totalCount} requirements`
          : `${totalCount} ${
              totalCount === 1 ? 'requirement' : 'requirements'
            }`}
      </span>
    );

  return (
    <SectionCard
      title="Clearance requirements"
      description="Requirements, verification details, and actions supplied by the university for your student record."
      headerAside={headerAside}
      bodyClassName="p-0"
    >
      {requirements !== null && totalCount > 0 ? (
        <ClearanceFilterBar
          filters={filters}
          options={options}
          hasActiveFilters={filtersAreActive}
          onChange={onFilterChange}
          onClear={onClearFilters}
        />
      ) : null}

      {requirements === null ? (
        <div className="px-4 py-4 sm:px-5">
          <ClearanceRequirementsUnavailableState />
        </div>
      ) : totalCount === 0 ? (
        <ClearanceEmptyRequirementsState />
      ) : filteredRequirements.length === 0 ? (
        <ClearanceFilteredEmptyState onClearFilters={onClearFilters} />
      ) : (
        <>
          <ul className="grid gap-2.5 px-4 py-4 sm:px-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRequirements.map((requirement) => (
              <li key={requirement.id} className="min-w-0">
                <ClearanceRequirementCard
                  requirement={requirement}
                  onView={() => onViewRequirement(requirement)}
                />
              </li>
            ))}
          </ul>
          <p className="border-t border-portal-line/70 px-4 py-2.5 text-[9.5px] leading-[15px] text-slate-400 sm:px-5">
            The university determines which requirements apply. The portal does
            not add, remove, prioritise, or complete requirements, and a
            completed requirement never changes your overall clearance or
            examination eligibility on its own.
          </p>
        </>
      )}
    </SectionCard>
  );
}
