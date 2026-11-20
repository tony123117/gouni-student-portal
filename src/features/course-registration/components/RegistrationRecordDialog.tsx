import {
  BookOpenCheck,
  Download,
  Info,
  MessageSquareWarning,
  X,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { RegistrationRecord } from '../types/registration';
import {
  formatCreditUnits,
  formatRegistrationDate,
} from '../utils/format';
import { RegistrationStatusBadge } from './RegistrationStatusBadge';

interface RegistrationRecordDialogProps {
  record: RegistrationRecord;
  canDownloadConfirmation: boolean;
  onClose: () => void;
}

export function RegistrationRecordDialog({
  record,
  canDownloadConfirmation,
  onClose,
}: RegistrationRecordDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const confirmation = record.confirmation;
  const canShowConfirmation = canDownloadConfirmation && confirmation !== null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="registration-record-title"
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
              <PortalIcon icon={BookOpenCheck} className="size-4" duotone />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-navy-600">
                Registration details
              </p>
              <h2
                id="registration-record-title"
                className="mt-0.5 truncate font-mono text-[14px] font-extrabold text-navy-950"
              >
                {record.reference}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration details"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <PortalIcon icon={X} className="size-4" strokeWidth={2.3} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <RegistrationStatusBadge status={record.status} />
            <p className="text-[10.5px] font-medium text-slate-500">
              Submitted {formatRegistrationDate(record.submissionDate)}
            </p>
          </div>

          {record.status.description ? (
            <p className="mt-2 text-[10.5px] leading-[16px] text-slate-500">
              {record.status.description}
            </p>
          ) : null}

          <dl className="mt-4 grid gap-x-4 gap-y-3 rounded-xl border border-portal-line/80 bg-portal-surface/50 p-3.5 sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Academic session
              </dt>
              <dd className="mt-0.5 text-[11.5px] font-semibold text-navy-950">
                {record.term.academicSession}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Semester
              </dt>
              <dd className="mt-0.5 text-[11.5px] font-semibold text-navy-950">
                {record.term.semester}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Total credit units
              </dt>
              <dd className="mt-0.5 text-[12px] font-extrabold tabular-nums text-navy-950">
                {record.totalCreditUnits === null
                  ? 'Not supplied'
                  : formatCreditUnits(record.totalCreditUnits)}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-navy-600">
                Courses
              </dt>
              <dd className="mt-0.5 text-[12px] font-extrabold tabular-nums text-navy-950">
                {record.courses.length}
              </dd>
            </div>
          </dl>

          <div className="mt-3.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-navy-600">
              Registered courses
            </p>
            {record.courses.length > 0 ? (
              <ul className="mt-1.5 divide-y divide-portal-line/70 rounded-xl border border-portal-line/80">
                {record.courses.map((course) => (
                  <li
                    key={course.id}
                    className="flex items-start justify-between gap-3 px-3 py-2"
                  >
                    <p className="min-w-0 text-[11px] leading-[16px] text-navy-950">
                      <span className="font-mono font-extrabold">
                        {course.code}
                      </span>{' '}
                      <span className="font-semibold text-navy-800">
                        {course.title}
                      </span>
                    </p>
                    <span className="shrink-0 whitespace-nowrap text-[10px] font-bold tabular-nums text-navy-800">
                      {formatCreditUnits(course.creditUnits)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-[11px] leading-[17px] text-slate-500">
                The university record does not list any courses.
              </p>
            )}
          </div>

          {record.feedback?.trim() ? (
            <div className="mt-3.5 flex items-start gap-2 rounded-xl border border-portal-line bg-portal-surface/60 px-3 py-2.5">
              <PortalIcon
                icon={MessageSquareWarning}
                className="mt-px size-3.5 shrink-0 text-navy-600"
                strokeWidth={2.2}
              />
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-navy-600">
                  University feedback
                </p>
                <p className="mt-0.5 break-words text-[10.5px] font-medium leading-[16px] text-navy-950">
                  {record.feedback}
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-3.5 rounded-xl border border-portal-line/80 px-3.5 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-navy-600">
              Confirmation document
            </p>
            {canShowConfirmation && confirmation ? (
              <a
                href={confirmation.downloadUrl}
                download={confirmation.fileName}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-navy-900 px-3 text-[11px] font-bold text-white transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                <PortalIcon
                  icon={Download}
                  className="size-3.5"
                  strokeWidth={2.3}
                />
                Download {confirmation.fileName}
              </a>
            ) : (
              <p className="mt-1 flex items-start gap-1.5 text-[10.5px] leading-[16px] text-slate-500">
                <PortalIcon
                  icon={Info}
                  className="mt-px size-3 shrink-0 text-navy-600"
                  strokeWidth={2.2}
                />
                No confirmation document is available for this registration. The
                portal does not generate receipts.
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 justify-end border-t border-portal-line px-4 py-3 sm:px-5">
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
