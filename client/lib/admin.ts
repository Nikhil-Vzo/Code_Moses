import { getSupabase } from "@/lib/supabase";
import { env } from "@/lib/env";

export async function ensureDevAdmin() {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");
  const user = (import.meta as any).env.VITE_ADMIN_INIT_USER as string | undefined;
  const pass = (import.meta as any).env.VITE_ADMIN_INIT_PASS as string | undefined;
  if (!user || !pass) throw new Error("Missing VITE_ADMIN_INIT_USER/PASS");
  const email = `${user}@guidely.local`;

  const signIn = await supabase.auth.signInWithPassword({ email, password: pass });
  if (signIn.error) {
    const signUp = await supabase.auth.signUp({ email, password: pass });
    if (signUp.error) throw signUp.error;
    await supabase.auth.signInWithPassword({ email, password: pass });
  }

  const { data: existing } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", email)
    .maybeSingle();
  if (!existing) {
    await supabase.from("admin_users").insert({ email, role: "superadmin" });
  }
  return email;
}

export async function currentIsAdmin(): Promise<{ email: string | null; role: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { email: null, role: null };
  const { data: u } = await supabase.auth.getUser();
  const email = u.user?.email || null;
  if (!email) return { email, role: null };
  const { data } = await supabase
    .from("admin_users")
    .select("role")
    .eq("email", email)
    .maybeSingle();
  return { email, role: (data as any)?.role ?? null };
}
