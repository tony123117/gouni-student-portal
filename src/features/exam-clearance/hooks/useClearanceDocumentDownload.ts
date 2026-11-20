import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { examClearanceService } from '../services/exam-clearance-service';

interface DownloadRequest {
  requirementId: string;
  documentId: string;
}

/**
 * Retrieves a supporting document through an authenticated service operation.
 * The hook owns the AbortController because TanStack mutations do not supply
 * one.
 */
export function useClearanceDocumentDownload() {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    [],
  );

  return useMutation({
    mutationFn: ({ requirementId, documentId }: DownloadRequest) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      return examClearanceService.downloadRequirementDocument(
        requirementId,
        documentId,
        controller.signal,
      );
    },
  });
}
