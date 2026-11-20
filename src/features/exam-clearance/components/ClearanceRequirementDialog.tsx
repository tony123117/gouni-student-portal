import { useEffect, useRef, useState } from 'react';
import {
  ClipboardList,
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
  X,
  Zap,
} from 'lucide-react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import { useClearanceDocumentDownload } from '../hooks/useClearanceDocumentDownload';
import type {
  ClearanceRequirement,
  ClearanceSupportingDocument,
} from '../types/exam-clearance';
import {
  formatClearanceAmount,
  formatClearanceDate,
  getSafeActionDestination,
  getSafeDocumentFileName,
} from '../utils/format';
import { ClearanceStatusBadge } from './ClearanceStatusBadge';

interface ClearanceRequirementDialogProps {
  requirement: ClearanceRequirement;
  documentDownload: boolean;
  onClose: () => void;
}

function DetailValue({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string | null;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'min-w-0 sm:col-span-2' : 'min-w-0'}>
      <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
        {label}
      </dt>
      <dd
        className={`mt-0.5 break-words text-[12px] leading-[18px] ${
          value
            ? 'font-semibold text-navy-950'
            : 'font-medium italic text-slate-400'
        }`}
      >
        {value ?? 'Not supplied'}
      </dd>
    </div>
  );
}

export function ClearanceRequirementDialog({
  requirement,
  documentDownload,
  onClose,
}: ClearanceRequirementDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const downloadMutation = useClearanceDocumentDownload();
  const [downloadingDocumentId, setDownloadingDocumentId] = useState<
    string | null
  >(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const actionDestination = requirement.action
    ? getSafeActionDestination(requirement.action.destination)
    : null;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  const handleDownload = async (document: ClearanceSupportingDocument) => {
    setDownloadError(null);
    setDownloadingDocumentId(document.id);

    try {
      const result = await downloadMutation.mutateAsync({
        requirementId: requirement.id,
        documentId: document.id,
      });
      const fileName = getSafeDocumentFileName(
        result.fileName || document.fileName || document.label,
        'clearance-document',
      );
      const url = URL.createObjectURL(result.blob);
      const anchor = window.document.createElement('a');

      anchor.href = url;
      anchor.download = fileName;
      anchor.rel = 'noopener';
      window.document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
    } catch (error) {
      if ((error as { name?: string } | null)?.name !== 'AbortError') {
        setDownloadError(
          'The supporting document could not be downloaded. The portal has not generated a document.',
        );
      }
    } finally {
      setDownloadingDocumentId(null);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="clearance-requirement-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      className="m-auto w-[calc(100vw-1.5rem)] max-w-lg overflow-hidden rounded-2xl border border-portal-line bg-white p-0 text-navy-950 shadow-[0_24px_60px_rgba(5,36,85,0.28)] backdrop:bg-navy-950/55"
    >
      <div className="flex max-h-[calc(100vh-2rem)] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-portal-line px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-portal-sky text-navy-800">
              <PortalIcon icon={ClipboardList} className="size-4" duotone />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-navy-600">
                Clearance requirement
              </p>
              <h2
                id="clearance-requirement-title"
                className="mt-0.5 break-words text-[15px] font-extrabold leading-[21px] tracking-[-0.02em] text-navy-950"
              >
                {requirement.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close clearance requirement details"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <PortalIcon icon={X} className="size-4" strokeWidth={2.3} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            {requirement.status ? (
              <ClearanceStatusBadge status={requirement.status} />
            ) : (
              <span className="inline-flex items-center rounded-full border border-portal-line bg-portal-surface px-2 py-0.5 text-[10px] font-bold leading-4 text-slate-500">
                Status not supplied
              </span>
            )}
            {requirement.category?.trim() ? (
              <span className="inline-flex items-center rounded-full border border-portal-line bg-white px-2 py-0.5 text-[9.5px] font-bold text-navy-700">
                {requirement.category}
              </span>
            ) : null}
          </div>

          {requirement.status?.description?.trim() ? (
            <p className="text-[10.5px] leading-[16px] text-slate-500">
              {requirement.status.description}
            </p>
          ) : null}

          {requirement.description?.trim() ? (
            <p className="text-[11.5px] leading-[18px] text-slate-600">
              {requirement.description}
            </p>
          ) : null}

          {requirement.verificationMessage?.trim() ? (
            <div className="rounded-xl border border-gold-200 bg-gold-50 px-3.5 py-3">
              <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-gold-800">
                University verification message
              </p>
              <p className="mt-1 text-[11px] leading-[17px] text-gold-900">
                {requirement.verificationMessage}
              </p>
            </div>
          ) : null}

          <dl className="grid gap-x-4 gap-y-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 p-3.5 sm:grid-cols-2">
            <DetailValue
              label="Category"
              value={requirement.category}
            />
            <DetailValue
              label="Responsible office"
              value={requirement.responsibleOffice}
            />
            <DetailValue
              label="Outstanding amount"
              value={
                requirement.outstandingAmount === null
                  ? null
                  : formatClearanceAmount(
                      requirement.outstandingAmount,
                      requirement.currency,
                    )
              }
            />
            <DetailValue
              label="Due date"
              value={
                requirement.dueDate
                  ? formatClearanceDate(requirement.dueDate)
                  : null
              }
            />
            <DetailValue
              label="Last updated"
              value={
                requirement.lastUpdatedAt
                  ? formatClearanceDate(requirement.lastUpdatedAt)
                  : null
              }
            />
          </dl>

          <div className="rounded-xl border border-portal-line/80 p-3.5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-portal-sky text-navy-800">
                <PortalIcon icon={Zap} className="size-3.5" strokeWidth={2.3} />
              </span>
              <p className="text-[11px] font-bold text-navy-950">
                Required action
              </p>
            </div>

            {requirement.action ? (
              <>
                <p className="mt-2 text-[11.5px] font-bold text-navy-950">
                  {requirement.action.label}
                </p>
                <p className="mt-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-600">
                  {requirement.action.type}
                </p>
                {requirement.action.description?.trim() ? (
                  <p className="mt-1 text-[10.5px] leading-[16px] text-slate-500">
                    {requirement.action.description}
                  </p>
                ) : null}

                {actionDestination ? (
                  <a
                    href={actionDestination}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3 text-[11px] font-bold text-white shadow-[0_6px_16px_rgba(5,42,94,0.18)] transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                  >
                    <PortalIcon
                      icon={ExternalLink}
                      className="size-3.5"
                      strokeWidth={2.3}
                    />
                    {requirement.action.label}
                  </a>
                ) : (
                  <p className="mt-2 text-[10px] leading-[16px] text-slate-500">
                    The university has not supplied a secure action destination,
                    so this action cannot be opened from the portal.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-2 text-[10.5px] leading-[16px] text-slate-500">
                The university has not requested an action for this requirement.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-portal-line/80 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-portal-sky text-navy-800">
                  <PortalIcon
                    icon={FileText}
                    className="size-3.5"
                    strokeWidth={2.3}
                  />
                </span>
                <p className="text-[11px] font-bold text-navy-950">
                  Supporting documents
                </p>
              </div>
              {documentDownload ? (
                <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                  Authenticated
                </span>
              ) : null}
            </div>

            {requirement.documents.length === 0 ? (
              <p className="mt-2 text-[10.5px] leading-[16px] text-slate-500">
                The university has not supplied supporting documents for this
                requirement.
              </p>
            ) : (
              <ul className="mt-2 space-y-2">
                {requirement.documents.map((document) => {
                  const isDownloading =
                    downloadingDocumentId === document.id;

                  return (
                    <li
                      key={document.id}
                      className="flex items-start justify-between gap-2.5 rounded-lg border border-portal-line/70 bg-portal-surface/40 px-2.5 py-2"
                    >
                      <div className="min-w-0">
                        <p className="break-words text-[10.5px] font-bold text-navy-950">
                          {document.label}
                        </p>
                        {document.fileName?.trim() ? (
                          <p className="mt-0.5 break-all font-mono text-[9px] text-slate-500">
                            {document.fileName}
                          </p>
                        ) : null}
                        {document.description?.trim() ? (
                          <p className="mt-0.5 text-[9.5px] leading-[14px] text-slate-500">
                            {document.description}
                          </p>
                        ) : null}
                      </div>

                      {documentDownload ? (
                        <button
                          type="button"
                          onClick={() => void handleDownload(document)}
                          disabled={downloadingDocumentId !== null}
                          aria-label={`Download ${document.label}`}
                          aria-busy={isDownloading}
                          className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-md border border-portal-line bg-white px-2 text-[9.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <PortalIcon
                            icon={isDownloading ? LoaderCircle : Download}
                            className={`size-3 ${
                              isDownloading ? 'animate-spin' : ''
                            }`}
                            strokeWidth={2.3}
                          />
                          {isDownloading ? 'Saving…' : 'Download'}
                        </button>
                      ) : (
                        <span className="shrink-0 text-[9px] font-medium text-slate-400">
                          Download unavailable
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {documentDownload ? (
              <p className="mt-2 text-[9px] leading-[14px] text-slate-400">
                Documents are retrieved from authenticated university storage.
                The portal does not expose public document links or generate
                clearance documents.
              </p>
            ) : requirement.documents.length > 0 ? (
              <p className="mt-2 text-[9px] leading-[14px] text-slate-400">
                Supporting-document downloads are not available from the portal
                for this period.
              </p>
            ) : null}

            {downloadError ? (
              <p
                role="alert"
                className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[9.5px] leading-[14px] text-rose-700"
              >
                {downloadError}
              </p>
            ) : null}
          </div>

          <p className="text-[9.5px] leading-[15px] text-slate-400">
            Requirement details are shown exactly as supplied by the university.
            Missing values are not calculated, guessed, or replaced. This page
            never marks a requirement or the student as cleared.
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-portal-line px-4 py-3 sm:px-5">
          <p className="text-[9.5px] font-medium text-slate-400">
            University clearance record
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-portal-line bg-white px-3.5 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
