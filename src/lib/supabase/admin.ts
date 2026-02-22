import { createClient } from '@supabase/supabase-js'

/**
 * Supabase admin client using the service role key.
 * IMPORTANT: This client bypasses Row Level Security (RLS).
 * Only use this in server-side code (API routes, server actions).
 * Never expose this client to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
