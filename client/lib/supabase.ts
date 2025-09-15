import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    console.warn(
      "Supabase env not set. Connect Supabase MCP and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
    return null;
  }
  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return client;
}
