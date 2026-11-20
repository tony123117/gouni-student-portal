import { Clock3, Inbox, MessageSquareWarning } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { formatNaira } from '@/utils/format';
import type {
  TellerAvailability,
  TellerSubmissionRecord,
} from '../types/teller';
import { formatPaymentDate } from '../utils/format';
import { TellerStatusBadge } from './TellerStatusBadge';

interface TellerSubmissionHistoryProps {
  history: TellerSubmissionRecord[];
  availability: TellerAvailability;
  message: string | null;
}

export function TellerSubmissionHistory({
  history,
  availability,
  message,
}: TellerSubmissionHistoryProps) {
  return (
    <SectionCard
      title="Submission History"
      description="Previously submitted tellers and their review status."
      headerAside={
        history.length > 0 ? (
          <span className="text-[10px] font-bold text-slate-400">
            {history.length}{' '}
            {history.length === 1 ? 'submission' : 'submissions'}
          </span>
        ) : null
      }
    >
      {history.length === 0 ? (
        <div className="flex flex-col items-center px-3 py-9 text-center sm:py-10">
          <span className="flex size-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eff5ff] to-[#dfeafa] text-navy-900">
            <PortalIcon
              icon={availability === 'unavailable' ? Clock3 : Inbox}
              className="size-[22px]"
              duotone
            />
          </span>
          <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-navy-950">
            {availability === 'unavailable'
              ? 'Submission history unavailable'
              : 'No teller submissions yet'}
          </h3>
          <p className="mt-1.5 max-w-md text-[11.5px] leading-[19px] text-slate-500">
            {availability === 'unavailable'
              ? (message ??
                'Submitted tellers will appear here once the university evidence service is available.')
              : 'Your submitted tellers and their review status will appear here after you submit payment evidence.'}
          </p>
          {availability === 'unavailable' ? (
            <p className="mt-1.5 max-w-md text-[10.5px] leading-[17px] text-slate-400">
              No submission records are created or shown until the university
              service supplies them.
            </p>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-2.5">
          {history.map((record) => (
            <li
              key={record.id}
              className="rounded-xl border border-portal-line/90 bg-white p-3.5 shadow-[0_1px_8px_rgba(5,42,94,0.03)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-2.5">
                <div className="min-w-0">
                  <p className="break-all font-mono text-[11.5px] font-bold text-navy-950">
                    {record.submissionReference}
                  </p>
                  <p className="mt-1 text-[10.5px] font-medium text-slate-500">
                    Submitted {formatPaymentDate(record.submissionDate)}
                    {record.invoiceNumber
                      ? ` · Invoice ${record.invoiceNumber}`
                      : ''}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <TellerStatusBadge status={record.status} />
                  <p className="text-[11px] font-bold tabular-nums text-navy-950">
                    {record.amount === null
                      ? 'Amount not supplied'
                      : formatNaira(record.amount)}
                  </p>
                </div>
              </div>

              {record.feedback?.trim() ? (
                <div
                  className={`mt-2.5 flex items-start gap-2 rounded-lg border px-3 py-2 ${
                    record.status === 'rejected'
                      ? 'border-rose-200 bg-rose-50/70'
                      : 'border-portal-line bg-portal-surface/60'
                  }`}
                >
                  <PortalIcon
                    icon={MessageSquareWarning}
                    className={`mt-px size-3.5 shrink-0 ${
                      record.status === 'rejected'
                        ? 'text-rose-600'
                        : 'text-navy-600'
                    }`}
                    strokeWidth={2.2}
                  />
                  <p className="min-w-0 break-words text-[10.5px] font-medium leading-[16px] text-navy-950">
                    {record.feedback}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
