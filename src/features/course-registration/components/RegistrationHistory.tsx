import { ArrowUpRight, Clock3, History } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  RegistrationHistorySnapshot,
  RegistrationRecord,
} from '../types/registration';
import {
  formatCreditUnits,
  formatRegistrationDate,
} from '../utils/format';
import { RegistrationStatusBadge } from './RegistrationStatusBadge';

interface RegistrationHistoryProps {
  history: RegistrationHistorySnapshot;
  onViewRecord: (record: RegistrationRecord) => void;
}

export function RegistrationHistory({
  history,
  onViewRecord,
}: RegistrationHistoryProps) {
  const isUnavailable = history.availability === 'unavailable';

  return (
    <SectionCard
      title="Registration History"
      description="Previously submitted registrations and their official status."
      headerAside={
        history.records.length > 0 ? (
          <span className="text-[10px] font-bold text-slate-400">
            {history.records.length}{' '}
            {history.records.length === 1 ? 'record' : 'records'}
          </span>
        ) : null
      }
    >
      {history.records.length === 0 ? (
        <div className="flex flex-col items-center px-3 py-9 text-center sm:py-10">
          <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
            <PortalIcon
              icon={isUnavailable ? Clock3 : History}
              className="size-[22px]"
              duotone
            />
          </span>
          <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-navy-950">
            {isUnavailable
              ? 'Registration history unavailable'
              : 'No registration history yet'}
          </h3>
          <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-500">
            {isUnavailable
              ? (history.message ??
                'Registration records will appear here once the university registration service is available.')
              : 'Previously submitted registrations and their status will appear here after the university service supplies them.'}
          </p>
          {isUnavailable ? (
            <p className="mt-1.5 max-w-md text-[10.5px] leading-[17px] text-slate-400">
              No registration records are created or shown until the university
              service supplies them.
            </p>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-2.5">
          {history.records.map((record) => (
            <li
              key={record.id}
              className="rounded-xl border border-portal-line/90 bg-white p-3.5 shadow-[0_1px_8px_rgba(5,42,94,0.03)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-2.5">
                <div className="min-w-0">
                  <p className="break-all font-mono text-[11.5px] font-bold text-navy-950">
                    {record.reference}
                  </p>
                  <p className="mt-1 text-[10.5px] font-medium text-slate-500">
                    {record.term.academicSession} · {record.term.semester}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    Submitted {formatRegistrationDate(record.submissionDate)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <RegistrationStatusBadge status={record.status} />
                  <p className="text-[10.5px] font-bold tabular-nums text-navy-950">
                    {record.courses.length}{' '}
                    {record.courses.length === 1 ? 'course' : 'courses'}
                    {record.totalCreditUnits !== null
                      ? ` · ${formatCreditUnits(record.totalCreditUnits)}`
                      : ''}
                  </p>
                  <button
                    type="button"
                    onClick={() => onViewRecord(record)}
                    className="group inline-flex items-center gap-1 text-[9.5px] font-bold text-navy-700 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                  >
                    View details
                    <PortalIcon
                      icon={ArrowUpRight}
                      className="size-3"
                      strokeWidth={2.3}
                    />
                  </button>
                </div>
              </div>
              {record.feedback?.trim() ? (
                <p className="mt-2 border-t border-portal-line/70 pt-2 text-[10px] leading-[15px] text-slate-500">
                  {record.feedback}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
