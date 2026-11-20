import { ChevronDown, RotateCcw, Search } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  ClearanceFilterOptions,
  ClearanceFilters,
} from '../types/exam-clearance';

interface ClearanceFiltersProps {
  filters: ClearanceFilters;
  options: ClearanceFilterOptions;
  hasActiveFilters: boolean;
  onChange: <Key extends keyof ClearanceFilters>(
    key: Key,
    value: ClearanceFilters[Key],
  ) => void;
  onClear: () => void;
}

const controlClassName =
  'mt-1 h-11 w-full rounded-lg border border-portal-line bg-portal-surface/60 text-navy-950 outline-none transition-colors hover:bg-portal-surface focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100 disabled:cursor-not-allowed disabled:opacity-70';

const labelClassName =
  'block text-[9.5px] font-bold uppercase tracking-[0.13em] text-navy-600';

export function ClearanceFilters({
  filters,
  options,
  hasActiveFilters,
  onChange,
  onClear,
}: ClearanceFiltersProps) {
  return (
    <div
      role="search"
      aria-label="Filter clearance requirements"
      className="border-b border-portal-line/80 px-4 py-4 sm:px-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_170px_190px_auto] xl:items-end">
        <label htmlFor="clearance-filter-search" className="block">
          <span className={labelClassName}>Search</span>
          <span className="relative mt-1 block">
            <PortalIcon
              icon={Search}
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-navy-500"
              strokeWidth={2.3}
            />
            <input
              id="clearance-filter-search"
              type="search"
              value={filters.query}
              maxLength={80}
              onChange={(event) => onChange('query', event.target.value)}
              placeholder="Requirement, office, or action"
              autoComplete="off"
              className={`${controlClassName} pl-9 pr-3 text-[12.5px] font-medium placeholder:font-normal placeholder:text-slate-500 [&::-webkit-search-cancel-button]:hidden`}
            />
          </span>
        </label>

        <label htmlFor="clearance-filter-status" className="block">
          <span className={labelClassName}>Status</span>
          <span className="relative mt-1 block">
            <select
              id="clearance-filter-status"
              value={filters.status}
              disabled={options.statuses.length === 0}
              onChange={(event) => onChange('status', event.target.value)}
              className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
            >
              <option value="all">
                {options.statuses.length === 0
                  ? 'Statuses unavailable'
                  : 'All statuses'}
              </option>
              {options.statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <PortalIcon
              icon={ChevronDown}
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
              strokeWidth={2.3}
            />
          </span>
        </label>

        <label htmlFor="clearance-filter-category" className="block">
          <span className={labelClassName}>Category</span>
          <span className="relative mt-1 block">
            <select
              id="clearance-filter-category"
              value={filters.category}
              disabled={options.categories.length === 0}
              onChange={(event) => onChange('category', event.target.value)}
              className={`${controlClassName} appearance-none pl-3 pr-8 text-[12px] font-semibold`}
            >
              <option value="all">
                {options.categories.length === 0
                  ? 'Categories unavailable'
                  : 'All categories'}
              </option>
              {options.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <PortalIcon
              icon={ChevronDown}
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
              strokeWidth={2.3}
            />
          </span>
        </label>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-3 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-portal-line/70 disabled:text-slate-400 disabled:hover:bg-white sm:col-span-2 xl:col-span-1"
        >
          <PortalIcon icon={RotateCcw} className="size-3.5" strokeWidth={2.3} />
          Clear filters
        </button>
      </div>
    </div>
  );
}
