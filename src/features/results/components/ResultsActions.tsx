import { Download, Printer } from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { useResultStatement } from '../hooks/useResultStatement';
import type { ResultsDocument } from '../types/results';
import { getSafeDownloadFileName } from '../utils/format';

interface ResultsActionsProps {
  periodId: string;
  canPrint: boolean;
  canDownload: boolean;
  statementDocument: ResultsDocument | null;
}

const actionButtonClassName =
  'inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 text-[11px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2';

export function ResultsActions({
  periodId,
  canPrint,
  canDownload,
  statementDocument,
}: ResultsActionsProps) {
  const statement = useResultStatement();
  const downloadAvailable = canDownload && statementDocument !== null;

  const handleDownload = async () => {
    try {
      const downloaded = await statement.mutateAsync(periodId);
      const objectUrl = URL.createObjectURL(downloaded.blob);
      const link = window.document.createElement('a');

      link.href = objectUrl;
      link.download = getSafeDownloadFileName(
        downloaded.fileName,
        'result-statement',
      );
      link.rel = 'noopener';
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
    } catch {
      // The mutation state renders a retryable explanation below.
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!canPrint}
          title={
            canPrint
              ? 'Print a portal view of the results'
              : 'Printing is not available from the portal for this period.'
          }
          className={`${actionButtonClassName} border border-portal-line bg-white text-navy-800 hover:border-navy-200 hover:bg-portal-surface disabled:cursor-not-allowed disabled:border-portal-line/70 disabled:text-slate-400 disabled:hover:bg-white`}
        >
          <PortalIcon icon={Printer} className="size-3.5" strokeWidth={2.3} />
          Print results
        </button>

        <button
          type="button"
          onClick={() => {
            void handleDownload();
          }}
          disabled={!downloadAvailable || statement.isPending}
          aria-busy={statement.isPending}
          title={
            downloadAvailable
              ? 'Download the official statement supplied by the university'
              : 'No official result statement is available for this period.'
          }
          className={`${actionButtonClassName} bg-navy-900 text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-navy-900/45 disabled:shadow-none`}
        >
          <PortalIcon
            icon={Download}
            className="size-3.5"
            strokeWidth={2.3}
          />
          {statement.isPending ? 'Preparing…' : 'Download statement'}
        </button>
      </div>

      <p className="mt-2 text-[9.5px] leading-[15px] text-slate-500">
        Printing produces a portal printout, not an official transcript.
        {downloadAvailable
          ? ' The official result statement is retrieved from the university.'
          : ' No official result statement document is available for this period.'}
      </p>

      {statement.isError ? (
        <p
          role="alert"
          className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-2 text-[10px] font-medium leading-[15px] text-rose-700"
        >
          The result statement could not be downloaded. Please try again later.
        </p>
      ) : statement.isSuccess ? (
        <p
          role="status"
          className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-[10px] font-medium leading-[15px] text-emerald-700"
        >
          The result statement download has started.
        </p>
      ) : null}
    </div>
  );
}
