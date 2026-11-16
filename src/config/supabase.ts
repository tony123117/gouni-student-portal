import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from '@/config/env';

export { isSupabaseConfigured };

let client: SupabaseClient | null = null;

/**
 * Returns the shared Supabase client.
 *
 * Only the public anonymous key is used here. The service role key must never
 * be shipped to the browser. Configuration is checked lazily so that missing
 * environment variables do not crash application startup.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your local .env file.',
    );
  }

  if (!client) {
    client = createClient(env.supabaseUrl, env.supabaseAnonKey);
  }

  return client;
}

/**
 * Convenience reference for optional use. `null` until both public Supabase
 * environment variables are present; prefer `getSupabaseClient()` inside
 * services when configuration is required.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? getSupabaseClient()
  : null;
