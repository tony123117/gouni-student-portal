import { TELLER_TECHNICAL_ACCEPTED_FILE_TYPES } from '../constants';
import type { TellerUploadConstraints } from '../types/teller';

const MIME_EXTENSION_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
};

const EXTENSION_MIME_TYPES: Record<string, string[]> = {
  pdf: ['application/pdf'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

/**
 * Human-readable accepted-type list. University-supplied MIME types win;
 * otherwise the portal shows its clearly-labelled technical defaults.
 */
export function describeAcceptedFileTypes(
  acceptedFileTypes: string[] | null,
): string {
  const types = acceptedFileTypes ?? TELLER_TECHNICAL_ACCEPTED_FILE_TYPES;
  const labels = types
    .map((type) => MIME_EXTENSION_LABELS[type] ?? null)
    .filter((label): label is string => label !== null);

  const unique = Array.from(new Set(labels));

  if (unique.length === 0) {
    return 'PDF, JPG and PNG';
  }

  if (unique.length === 1) {
    return unique[0];
  }

  return `${unique.slice(0, -1).join(', ')} and ${unique[unique.length - 1]}`;
}

function getFileExtension(name: string): string {
  const dotIndex = name.lastIndexOf('.');

  return dotIndex === -1 ? '' : name.slice(dotIndex + 1).toLowerCase();
}

/**
 * Client-side file usability check. Server-side validation of the evidence
 * document remains a pending university security requirement.
 *
 * Returns an error message, or null when the file is usable.
 */
export function validateTellerEvidence(
  file: File,
  constraints: TellerUploadConstraints,
  maxFileSizeBytes: number,
): string | null {
  const extension = getFileExtension(file.name);
  const acceptedTypes: readonly string[] =
    constraints.acceptedFileTypes ?? TELLER_TECHNICAL_ACCEPTED_FILE_TYPES;

  const extensionAllowed = Object.keys(EXTENSION_MIME_TYPES).some(
    (candidate) =>
      candidate === extension &&
      EXTENSION_MIME_TYPES[candidate].some((mime) =>
        acceptedTypes.includes(mime),
      ),
  );

  const mimeAllowed =
    file.type === '' || acceptedTypes.includes(file.type);

  if (!extensionAllowed || !mimeAllowed) {
    return `Unsupported file type. Accepted types: ${describeAcceptedFileTypes(
      constraints.acceptedFileTypes,
    )}.`;
  }

  if (file.size <= 0) {
    return 'The selected file is empty. Choose a readable copy of your teller.';
  }

  if (file.size > maxFileSizeBytes) {
    return `The selected file is ${formatFileSize(
      file.size,
    )}. The maximum accepted size is ${formatFileSize(maxFileSizeBytes)}.`;
  }

  return null;
}
