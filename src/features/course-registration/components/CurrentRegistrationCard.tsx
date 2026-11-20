import { ArrowUpRight, BookOpenCheck, MessageSquareWarning } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { RegistrationRecord } from '../types/registration';
import {
  formatCreditUnits,
  formatRegistrationDate,
} from '../utils/format';
import { RegistrationStatusBadge } from './RegistrationStatusBadge';

interface CurrentRegistrationCardProps {
  record: RegistrationRecord;
  onViewDetails: () => void;
}

export function CurrentRegistrationCard({
  record,
  onViewDetails,
}: CurrentRegistrationCardProps) {
  return (
    <SectionCard
      title="Current Registration"
      description="The registration the university currently holds for this term."
      headerAside={<RegistrationStatusBadge status={record.status} />}
    >
      <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0">
          <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
            Reference
          </dt>
          <dd className="mt-0.5 break-all font-mono text-[10.5px] font-bold text-navy-950">
            {record.reference}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
            Term
          </dt>
          <dd className="mt-0.5 text-[11.5px] font-semibold text-navy-950">
            {record.term.academicSession} · {record.term.semester}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
            Submitted
          </dt>
          <dd className="mt-0.5 text-[11.5px] font-semibold text-navy-950">
            {formatRegistrationDate(record.submissionDate)}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
            Total credit units
          </dt>
          <dd className="mt-0.5 text-[11.5px] font-bold tabular-nums text-navy-950">
            {record.totalCreditUnits === null
              ? 'Not supplied'
              : formatCreditUnits(record.totalCreditUnits)}
          </dd>
        </div>
      </dl>

      {record.courses.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {record.courses.map((course) => (
            <li
              key={course.id}
              className="inline-flex items-center gap-1 rounded-lg border border-portal-line/80 bg-portal-surface/60 px-2 py-1 text-[9.5px] font-medium text-navy-800"
            >
              <span className="font-mono font-extrabold">{course.code}</span>
              <span className="text-slate-400">·</span>
              <span className="tabular-nums">
                {formatCreditUnits(course.creditUnits)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {record.feedback?.trim() ? (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-portal-line bg-portal-surface/60 px-3 py-2">
          <PortalIcon
            icon={MessageSquareWarning}
            className="mt-px size-3.5 shrink-0 text-navy-600"
            strokeWidth={2.2}
          />
          <p className="min-w-0 break-words text-[10.5px] font-medium leading-[16px] text-navy-950">
            {record.feedback}
          </p>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-portal-line/80 pt-3">
        <p className="flex items-center gap-1.5 text-[9.5px] leading-[15px] text-slate-400">
          <PortalIcon
            icon={BookOpenCheck}
            className="size-3 shrink-0"
            strokeWidth={2.2}
          />
          A new selection cannot be submitted while this registration exists,
          unless the university service says otherwise.
        </p>
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-portal-line bg-white px-2.5 text-[10.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        >
          View details
          <PortalIcon icon={ArrowUpRight} className="size-3" strokeWidth={2.3} />
        </button>
      </div>
    </SectionCard>
  );
}
