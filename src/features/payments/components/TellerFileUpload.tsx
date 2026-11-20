import { FileText, RotateCcw, ShieldCheck, Upload, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type { TellerUploadConstraints } from '../types/teller';
import { formatFileSize, validateTellerEvidence } from '../utils/teller';

interface TellerFileUploadProps {
  constraints: TellerUploadConstraints;
  maxFileSizeBytes: number;
  acceptedDescription: string;
  disabled: boolean;
  /** Shown when the university requires no depositor fields etc. — unused here. */
  onFileChange: (file: File | null, validationError: string | null) => void;
}

/**
 * Accessible evidence upload. The native file input stays in the DOM (visually
 * hidden) so keyboard and screen-reader users get the platform picker, while
 * the visible button simply forwards the click.
 *
 * File contents are never read, persisted, or stored — the selected File
 * object is handed straight to the parent for submission.
 */
export function TellerFileUpload({
  constraints,
  maxFileSizeBytes,
  acceptedDescription,
  disabled,
  onFileChange,
}: TellerFileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const clearFile = () => {
    setSelectedFile(null);
    setValidationError(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    onFileChange(null, null);
  };

  const acceptFile = (file: File | null) => {
    if (!file) {
      clearFile();
      return;
    }

    const error = validateTellerEvidence(file, constraints, maxFileSizeBytes);
    setValidationError(error);
    setSelectedFile(error ? null : file);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    onFileChange(error ? null : file, error);
  };

  const sizeLimitNote = constraints.maxFileSizeBytes
    ? `Maximum size ${formatFileSize(constraints.maxFileSizeBytes)} (university requirement).`
    : `Maximum size ${formatFileSize(maxFileSizeBytes)} (technical limit — not a university policy).`;

  return (
    <div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={constraints.acceptedFileTypes?.join(',') ?? '.pdf,.jpg,.jpeg,.png'}
        disabled={disabled}
        className="sr-only"
        aria-describedby={`${inputId}-requirements ${inputId}-status`}
        onChange={(event) => {
          acceptFile(event.target.files?.[0] ?? null);
        }}
      />

      <p
        id={`${inputId}-requirements`}
        className="text-[10px] leading-[15px] text-slate-500"
      >
        Accepted types: {acceptedDescription}. {sizeLimitNote}
      </p>

      <div
        id={`${inputId}-status`}
        aria-live="polite"
        className="mt-2.5 rounded-xl border border-portal-line/80 bg-portal-surface/55 p-3"
      >
        {selectedFile ? (
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy-700 ring-1 ring-portal-line/80">
              <PortalIcon icon={FileText} className="size-4" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11.5px] font-bold text-navy-950">
                {selectedFile.name}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                {formatFileSize(selectedFile.size)} — selected. The file will be
                submitted with your payment details.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-portal-line bg-white px-2.5 text-[10.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PortalIcon
                  icon={RotateCcw}
                  className="size-3"
                  strokeWidth={2.3}
                />
                Replace
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={clearFile}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-portal-line bg-white text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <PortalIcon icon={X} className="size-3.5" strokeWidth={2.3} />
                <span className="sr-only">
                  Remove selected file {selectedFile.name}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium leading-[17px] text-slate-500">
              Select a scan or photo of your bank teller as payment evidence.
            </p>
            <button
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-3.5 text-[11.5px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PortalIcon icon={Upload} className="size-3.5" strokeWidth={2.3} />
              Choose file
            </button>
          </div>
        )}
      </div>

      {validationError ? (
        <p
          role="alert"
          className="mt-2 text-[10.5px] font-semibold leading-[15px] text-rose-700"
        >
          {validationError}
        </p>
      ) : null}

      <p className="mt-2 flex items-start gap-1.5 text-[9px] leading-[14px] text-slate-400">
        <PortalIcon
          icon={ShieldCheck}
          className="mt-px size-3 shrink-0 text-slate-400"
          strokeWidth={2.2}
        />
        Your teller is treated as sensitive financial evidence. It is sent only
        to the university&apos;s secure review system and is never stored in
        your browser.
      </p>
    </div>
  );
}
