import { CloudOff } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { DEFAULT_PAYMENT_HISTORY_FILTERS } from '../constants';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { usePaymentHistory } from '../hooks/usePaymentHistory';
import type {
  PaymentHistoryFilters,
  PaymentRecord,
} from '../types/payment-history';
import { parsePaymentHistoryFilters } from '../validation/payment-history-filters';
import { PaymentDetailsDialog } from './PaymentDetailsDialog';
import { PaymentHistoryError } from './PaymentHistoryError';
import { PaymentHistoryRecords } from './PaymentHistoryRecords';
import { PaymentHistorySkeleton } from './PaymentHistorySkeleton';
import { PaymentSummaryGrid } from './PaymentSummaryGrid';
import { useMemo, useState } from 'react';

function hasActiveFilters(filters: PaymentHistoryFilters): boolean {
  return (
    filters.query.trim() !== '' ||
    filters.status !== 'all' ||
    filters.academicSession !== 'all' ||
    filters.semester !== 'all'
  );
}

interface AvailabilityNoticeProps {
  message: string | null;
}

function AvailabilityNotice({ message }: AvailabilityNoticeProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 px-4 py-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-800 ring-1 ring-gold-200">
        <PortalIcon icon={CloudOff} className="size-[18px]" duotone />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold text-navy-950">
          Official payment data unavailable
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[18px] text-slate-600">
          {message ??
            'Summary figures and payment records will appear once the university payment service is available.'}
        </p>
      </div>
    </div>
  );
}

export function PaymentHistoryPage() {
  const [filters, setFilters] = useState<PaymentHistoryFilters>(
    DEFAULT_PAYMENT_HISTORY_FILTERS,
  );
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(
    null,
  );
  const debouncedQuery = useDebouncedValue(filters.query, 300);

  const appliedFilters = useMemo(
    () =>
      parsePaymentHistoryFilters({
        ...filters,
        query: debouncedQuery,
      }),
    [
      debouncedQuery,
      filters.academicSession,
      filters.semester,
      filters.status,
    ],
  );

  const { data, isPending, isError, isRefetching, refetch } =
    usePaymentHistory(appliedFilters);
  const filtersAreActive = hasActiveFilters(filters);

  const handleFilterChange = <Key extends keyof PaymentHistoryFilters>(
    key: Key,
    value: PaymentHistoryFilters[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_PAYMENT_HISTORY_FILTERS);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <PageHeading
        eyebrow="Payments"
        title="Payment History"
        description="View and manage your university payment records."
      />

      {isPending ? (
        <PaymentHistorySkeleton />
      ) : isError || !data ? (
        <PaymentHistoryError
          isRetrying={isRefetching}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : (
        <>
          {data.availability === 'unavailable' ? (
            <AvailabilityNotice message={data.message} />
          ) : null}

          <PaymentSummaryGrid
            summaries={data.summaries}
            availability={data.availability}
          />

          <PaymentHistoryRecords
            snapshot={data}
            filters={filters}
            hasActiveFilters={filtersAreActive}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onViewRecord={setSelectedRecord}
          />

          {selectedRecord ? (
            <PaymentDetailsDialog
              record={selectedRecord}
              canDownloadReceipt={data.capabilities.receiptDownload}
              onClose={() => setSelectedRecord(null)}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
