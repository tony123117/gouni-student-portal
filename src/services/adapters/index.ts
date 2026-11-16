import { env } from '@/config/env';

export type ApiMode = 'mock' | 'live';

export const API_MODE: ApiMode = env.useMockApi ? 'mock' : 'live';

interface AdapterFactories<T> {
  mock: () => T;
  live: () => T;
}

/**
 * Chooses a feature-level service implementation for the active API mode.
 *
 * Features own their service contracts and provide both implementations.
 * Factories keep the unused implementation from being constructed, and no
 * university endpoints are assumed here before the backend contract exists.
 */
export function selectAdapter<T>(adapters: AdapterFactories<T>): T {
  return API_MODE === 'mock' ? adapters.mock() : adapters.live();
}
