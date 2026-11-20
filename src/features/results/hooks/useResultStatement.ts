import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resultsService } from '../services/results-service';

/**
 * Retrieves an official statement through the service layer.
 *
 * The previous document request is aborted when a new one starts or when the
 * component unmounts. TanStack mutations do not provide an AbortSignal, so the
 * hook owns the controller and forwards it to the service.
 */
export function useResultStatement() {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    [],
  );

  return useMutation({
    mutationFn: (periodId: string) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      return resultsService.downloadStatement(periodId, controller.signal);
    },
  });
}
