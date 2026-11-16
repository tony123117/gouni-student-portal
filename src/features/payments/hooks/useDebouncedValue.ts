import { useEffect, useState } from 'react';

/**
 * Delays fast-changing values so typing in the payment search field does not
 * issue a request for every keystroke once the live service is connected.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
