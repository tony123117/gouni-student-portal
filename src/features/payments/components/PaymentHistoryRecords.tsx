import { SectionCard } from '@/components/shared/SectionCard';
import { Badge } from '@/components/ui/Badge';
import type {
  PaymentHistoryFilters,
  PaymentHistorySnapshot,
  PaymentRecord,
} from '../types/payment-history';
import { PaymentHistoryCards } from './PaymentHistoryCards';
import { PaymentHistoryFilters as PaymentHistoryFilterBar } from './PaymentHistoryFilters';
import {
  PaymentHistoryEmptyState,
  PaymentHistoryFilteredEmptyState,
  PaymentHistoryUnavailableState,
} from './PaymentHistoryStates';
import { PaymentHistoryTable } from './PaymentHistoryTable';

interface PaymentHistoryRecordsProps {
  snapshot: PaymentHistorySnapshot;
  filters: PaymentHistoryFilters;
  hasActiveFilters: boolean;
  onFilterChange: <Key extends keyof PaymentHistoryFilters>(
    key: Key,
    value: PaymentHistoryFilters[Key],
  ) => void;
  onClearFilters: () => void;
  onViewRecord: (record: PaymentRecord) => void;
}

export function PaymentHistoryRecords({
  snapshot,
  filters,
  hasActiveFilters,
  onFilterChange,
  onClearFilters,
  onViewRecord,
}: PaymentHistoryRecordsProps) {
  const isUnavailable = snapshot.availability === 'unavailable';
  const recordCount = snapshot.records.length;

  return (
    <SectionCard
      title="Payment Records"
      description="Search and review payments recorded by the university."
      headerAside={
        isUnavailable ? (
          <Badge variant="warning">Unavailable</Badge>
        ) : (
          <span
            aria-live="polite"
            className="text-[11.5px] font-semibold text-slate-500"
          >
            {recordCount} {recordCount === 1 ? 'record' : 'records'}
          </span>
        )
      }
      bodyClassName="p-0"
    >
      <PaymentHistoryFilterBar
        filters={filters}
        academicSessions={snapshot.filterOptions.academicSessions}
        hasActiveFilters={hasActiveFilters}
        onChange={onFilterChange}
        onClear={onClearFilters}
      />

      {isUnavailable ? (
        <PaymentHistoryUnavailableState message={snapshot.message} />
      ) : recordCount === 0 ? (
        hasActiveFilters ? (
          <PaymentHistoryFilteredEmptyState
            onClearFilters={onClearFilters}
          />
        ) : (
          <PaymentHistoryEmptyState />
        )
      ) : (
        <>
          <PaymentHistoryTable
            records={snapshot.records}
            canDownloadReceipt={snapshot.capabilities.receiptDownload}
            onViewRecord={onViewRecord}
          />
          <PaymentHistoryCards
            records={snapshot.records}
            canDownloadReceipt={snapshot.capabilities.receiptDownload}
            onViewRecord={onViewRecord}
          />
        </>
      )}
    </SectionCard>
  );
}
