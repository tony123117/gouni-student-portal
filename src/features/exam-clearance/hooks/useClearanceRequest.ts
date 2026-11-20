import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { examClearanceService } from '../services/exam-clearance-service';

/**
 * Submits a clearance request through the service layer.
 *
 * TanStack mutations do not provide an AbortSignal, so the hook owns the
 * controller and forwards it to the service. A new request aborts the previous
 * one; unmounting aborts the active request.
 */
export function useClearanceRequest() {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    [],
  );

  return useMutation({
    mutationFn: () => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      return examClearanceService.submitClearanceRequest(controller.signal);
    },
  });
}
