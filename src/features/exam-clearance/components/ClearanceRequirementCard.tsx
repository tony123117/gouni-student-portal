import {
  Building2,
  CalendarClock,
  ChevronRight,
  FileText,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { ClearanceRequirement } from '../types/exam-clearance';
import {
  formatClearanceAmount,
  formatClearanceDate,
  getSafeActionDestination,
} from '../utils/format';
import { ClearanceStatusBadge } from './ClearanceStatusBadge';

interface ClearanceRequirementCardProps {
  requirement: ClearanceRequirement;
  onView: () => void;
}

interface MetaItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

function getMetaItems(requirement: ClearanceRequirement): MetaItem[] {
  const items: MetaItem[] = [];

  if (requirement.responsibleOffice?.trim()) {
    items.push({
      label: 'Responsible office',
      value: requirement.responsibleOffice,
      icon: Building2,
    });
  }

  if (requirement.outstandingAmount !== null) {
    items.push({
      label: 'Outstanding amount',
      value: formatClearanceAmount(
        requirement.outstandingAmount,
        requirement.currency,
      ),
      icon: Wallet,
    });
  }

  if (requirement.dueDate) {
    items.push({
      label: 'Due date',
      value: formatClearanceDate(requirement.dueDate),
      icon: CalendarClock,
    });
  }

  return items;
}

export function ClearanceRequirementCard({
  requirement,
  onView,
}: ClearanceRequirementCardProps) {
  const metaItems = getMetaItems(requirement);
  const actionDestination = requirement.action
    ? getSafeActionDestination(requirement.action.destination)
    : null;
  const actionAvailable = Boolean(requirement.action && actionDestination);
  const documentCount = requirement.documents.length;

  return (
    <article className="flex h-full min-w-0 flex-col rounded-xl border border-portal-line/90 bg-white p-3.5 transition-colors hover:border-navy-200">
      <div className="flex flex-wrap items-start justify-between gap-1.5">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {requirement.category?.trim() ? (
            <span className="inline-flex max-w-full items-center rounded-full border border-portal-line bg-portal-surface px-2 py-0.5 text-[9.5px] font-bold text-navy-700">
              <span className="truncate">{requirement.category}</span>
            </span>
          ) : null}
          {requirement.status ? (
            <ClearanceStatusBadge status={requirement.status} />
          ) : (
            <span className="inline-flex items-center rounded-full border border-portal-line bg-portal-surface px-2 py-0.5 text-[10px] font-bold leading-4 text-slate-500">
              Status not supplied
            </span>
          )}
        </div>

        {documentCount > 0 ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-portal-line bg-white px-2 py-0.5 text-[9.5px] font-bold text-slate-600">
            <PortalIcon icon={FileText} className="size-3" strokeWidth={2.3} />
            {documentCount} {documentCount === 1 ? 'document' : 'documents'}
          </span>
        ) : null}
      </div>

      <h3 className="mt-2 break-words text-[13px] font-extrabold leading-[19px] tracking-[-0.01em] text-navy-950">
        {requirement.title}
      </h3>

      {requirement.description?.trim() ? (
        <p className="mt-1 break-words text-[10.5px] leading-[16px] text-slate-600">
          {requirement.description}
        </p>
      ) : null}

      {requirement.verificationMessage?.trim() ? (
        <p className="mt-2 rounded-lg border border-gold-200 bg-gold-50 px-2.5 py-2 text-[10px] leading-[15px] text-gold-900">
          {requirement.verificationMessage}
        </p>
      ) : null}

      {metaItems.length > 0 ? (
        <dl className="mt-2.5 space-y-1.5">
          {metaItems.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 items-start justify-between gap-3"
            >
              <dt className="flex min-w-0 items-center gap-1.5 text-[9.5px] font-semibold text-slate-500">
                <PortalIcon
                  icon={item.icon}
                  className="size-3 shrink-0"
                  strokeWidth={2.3}
                />
                <span className="truncate">{item.label}</span>
              </dt>
              <dd className="max-w-[58%] break-words text-right text-[10px] font-bold text-navy-950">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-2 text-[9.5px] font-medium text-slate-400">
          No office, amount, or due date supplied.
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-portal-line/70 pt-2.5">
        <span
          className={`inline-flex min-w-0 items-center gap-1.5 text-[9.5px] font-semibold ${
            actionAvailable ? 'text-emerald-700' : 'text-slate-400'
          }`}
        >
          <PortalIcon icon={Zap} className="size-3 shrink-0" strokeWidth={2.3} />
          <span className="truncate">
            {actionAvailable && requirement.action
              ? `Action available: ${requirement.action.type}`
              : requirement.action
                ? 'Action destination unavailable'
                : 'No action requested'}
          </span>
        </span>

        <button
          type="button"
          onClick={onView}
          className="inline-flex h-7 shrink-0 items-center justify-center gap-0.5 rounded-md border border-portal-line bg-white px-2 text-[10px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        >
          Details
          <PortalIcon
            icon={ChevronRight}
            className="size-3"
            strokeWidth={2.4}
          />
        </button>
      </div>
    </article>
  );
}
