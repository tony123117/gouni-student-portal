import axios from 'axios';
import { env } from '@/config/env';

/**
 * HTTP client for the university's existing backend.
 *
 * The base URL is intentionally empty until the integration contract and
 * authorized access are available. Requests fail with an actionable error
 * rather than silently calling the frontend origin.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl || undefined,
  timeout: 20_000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (!config.baseURL) {
    return Promise.reject(
      new Error(
        'The university API is not configured. Set VITE_API_BASE_URL when the integration is available.',
      ),
    );
  }

  return config;
});
