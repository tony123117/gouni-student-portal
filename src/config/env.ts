function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value !== 'string') {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  return fallback;
}

export const env = {
  apiBaseUrl: readString(import.meta.env.VITE_API_BASE_URL),
  useMockApi: readBoolean(import.meta.env.VITE_USE_MOCK_API, true),
  supabaseUrl: readString(import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: readString(import.meta.env.VITE_SUPABASE_ANON_KEY),
  isDevelopment: import.meta.env.DEV,
} as const;

export const isApiConfigured = env.apiBaseUrl.length > 0;

export const isSupabaseConfigured =
  env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;
