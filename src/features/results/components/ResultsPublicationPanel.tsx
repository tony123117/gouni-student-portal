import { CalendarDays, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { SectionCard } from '@/components/shared/SectionCard';
import type {
  ResultPeriod,
  ResultPublication,
  ResultsCapabilities,
  ResultsDocument,
} from '../types/results';
import { formatResultDate } from '../utils/format';
import { ResultsActions } from './ResultsActions';
import { ResultsStatusBadge } from './ResultsStatusBadge';

interface ResultsPublicationPanelProps {
  publication: ResultPublication | null;
  period: ResultPeriod;
  capabilities: ResultsCapabilities;
  statementDocument: ResultsDocument | null;
}

export function ResultsPublicationPanel({
  publication,
  period,
  capabilities,
  statementDocument,
}: ResultsPublicationPanelProps) {
  return (
    <SectionCard
      title="Publication"
      description="Status and statement access supplied by the university."
    >
      {publication ? (
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {publication.status ? (
              <ResultsStatusBadge status={publication.status} />
            ) : (
              <Badge variant="neutral">Status not supplied</Badge>
            )}
            {publication.date ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                <PortalIcon
                  icon={CalendarDays}
                  className="size-3"
                  strokeWidth={2.3}
                />
                {formatResultDate(publication.date)}
              </span>
            ) : null}
          </div>

          {publication.message?.trim() ? (
            <p className="mt-2.5 text-[11px] leading-[17px] text-slate-600">
              {publication.message}
            </p>
          ) : null}

          {publication.published === false ? (
            <p className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[10px] font-medium leading-[15px] text-amber-800">
              The university marks results for this period as not published.
              Course results appear only after publication.
            </p>
          ) : publication.published === null ? (
            <p className="mt-2.5 text-[10px] leading-[15px] text-slate-400">
              The university did not supply a publication verdict for this
              period.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="flex items-start gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-700">
            <PortalIcon icon={FileText} className="size-4" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="text-[11.5px] font-bold text-navy-950">
              Publication information unavailable
            </p>
            <p className="mt-0.5 text-[10.5px] leading-[16px] text-slate-500">
              The university did not return publication details for this
              period.
            </p>
          </div>
        </div>
      )}

      <div className="mt-3.5 border-t border-portal-line/80 pt-3.5">
        <ResultsActions
          key={period.id}
          periodId={period.id}
          canPrint={capabilities.print}
          canDownload={capabilities.statementDownload}
          statementDocument={statementDocument}
        />
      </div>
    </SectionCard>
  );
}
