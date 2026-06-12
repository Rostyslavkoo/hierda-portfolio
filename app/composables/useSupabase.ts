import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

let _client: SupabaseClient<Database> | null = null

export function useSupabase(): SupabaseClient<Database> {
  if (_client) return _client

  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const key = config.public.supabaseKey as string

  if (!url || !key) {
    throw new Error('Supabase URL or key is not configured')
  }

  const isClient = import.meta.client

  _client = createClient<Database>(url, key, {
    auth: {
      // Only persist on the client — the server has no localStorage and would
      // otherwise fall back to in-memory storage, losing the session on reload.
      persistSession: isClient,
      autoRefreshToken: isClient,
      detectSessionInUrl: isClient,
      storage: isClient ? window.localStorage : undefined,
      storageKey: 'hk-admin-auth',
    },
  })

  return _client
}
