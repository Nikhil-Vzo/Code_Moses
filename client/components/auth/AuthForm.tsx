import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/lib/supabase";

export function AuthForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const supabase = getSupabase();
  const [mode, setMode] = React.useState<"signin" | "signup">("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      toast({ title: "Connect Supabase first", description: "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY." });
      return;
    }
    setLoading(true);
    try {
      let error: any = null;
      if (mode === "signin") {
        const res = await supabase.auth.signInWithPassword({ email, password });
        error = res.error;
      } else {
        const res = await supabase.auth.signUp({ email, password });
        error = res.error;
      }
      if (error) {
        toast({ title: "Auth error", description: error.message });
        return;
      }
      toast({ title: "Logged in" });
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 bg-white/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          {mode === "signin" ? "Sign in" : "Create account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Email</span>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Password</span>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <Button type="submit" className="rounded-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
          <div className="text-xs text-muted-foreground">
            {mode === "signin" ? (
              <button type="button" onClick={() => setMode("signup")} className="underline">
                New here? Create an account
              </button>
            ) : (
              <button type="button" onClick={() => setMode("signin")} className="underline">
                Already have an account? Sign in
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
