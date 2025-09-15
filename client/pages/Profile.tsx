import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSupabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Profile() {
  const { toast } = useToast();
  const supabase = getSupabase();
  const [saving, setSaving] = React.useState(false);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [needsCompletion, setNeedsCompletion] = React.useState(false);
  const [profile, setProfile] = React.useState<any>({
    full_name: "",
    handle: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    bio: "",
    education_level: "",
    school_name: "",
    percentage_scored: "",
  });

  React.useEffect(() => {
    const cached = localStorage.getItem("guidely:profile");
    if (cached) setProfile(JSON.parse(cached));
  }, []);

  React.useEffect(() => {
    let unsub: (() => void) | undefined;
    async function init() {
      if (!supabase) return;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile((p: any) => ({ ...p, ...data }));
          localStorage.setItem("guidely:profile", JSON.stringify({ ...profile, ...data }));
          if (!data.city || !data.phone || !data.education_level || !data.school_name || !data.percentage_scored) setNeedsCompletion(true);
        } else {
          setProfile((p: any) => ({ ...p, email: user.email || "" }));
          setNeedsCompletion(true);
        }
      } else {
        setUserId(null);
      }
      const { data: sub } = supabase.auth.onAuthStateChange(async (_evt, sess) => {
        if (sess?.user) {
          setUserId(sess.user.id);
          setProfile((p: any) => ({ ...p, email: sess.user.email || p.email }));
          toast({ title: "Logged in" });
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", sess.user.id)
            .single();
          if (!data || !data.city || !data.education_level || !data.school_name || !data.percentage_scored) setNeedsCompletion(true);
          const { data: admin } = await supabase
            .from("admin_users")
            .select("role")
            .eq("email", sess.user.email || "")
            .maybeSingle();
          if (admin) window.location.assign("/admin");
        } else {
          setUserId(null);
        }
      });
      unsub = () => sub.subscription.unsubscribe();
    }
    init();
    return () => {
      unsub?.();
    };
  }, [supabase]);

  async function save() {
    if (!profile.full_name || !profile.email || !profile.city || !profile.education_level || !profile.school_name || !profile.percentage_scored) {
      toast({ title: "Please fill required fields", description: "Name, email, city, education level, school and percentage are required." });
      return;
    }
    setSaving(true);
    try {
      let avatar_url: string | undefined = undefined;
      if (avatarFile && supabase && userId) {
        const path = `avatars/${userId}/${Date.now()}_${avatarFile.name}`;
        const { error: upErr } = await supabase.storage
          .from("avatars")
          .upload(path, avatarFile, { upsert: false });
        if (!upErr) {
          const { data } = supabase.storage.from("avatars").getPublicUrl(path);
          avatar_url = data.publicUrl;
        }
      }

      const next = { ...profile, ...(avatar_url ? { avatar_url } : {}) };
      localStorage.setItem("guidely:profile", JSON.stringify(next));

      if (supabase && userId) {
        await supabase
          .from("profiles")
          .upsert({ id: userId, ...next, last_updated: new Date().toISOString() });
        const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
        if (data) setProfile(data);
      } else {
        setProfile(next);
      }

      setNeedsCompletion(false);
      toast({ title: "Profile updated!" });
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem("guidely:profile");
    localStorage.removeItem("guidely:savedColleges");
    localStorage.removeItem("guidely:quiz:scores");
    toast({ title: "Logged out successfully" });
    window.location.assign("/");
  }

  if (!userId) {
    return (
      <section className="container py-10">
        <header className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Sign in to continue</h1>
          <p className="mt-2 text-muted-foreground">Use your email and password to access your profile and dashboard.</p>
        </header>
        <div className="mx-auto mt-6 max-w-md">
          <AuthForm onSuccess={() => { /* handled in auth listener */ }} />
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Your Profile</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <Card className="border-0 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-white">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="avatar" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="grid gap-2 text-sm">
                <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
                <span className="text-xs text-muted-foreground">JPG/PNG/WebP up to 5 MB</span>
              </div>
            </div>
            <L label="Full name" required>
              <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
            </L>
            <L label="Display name / handle">
              <Input value={profile.handle} onChange={(e) => setProfile({ ...profile, handle: e.target.value })} />
            </L>
            <L label="Email" required>
              <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </L>
            <L label="Phone">
              <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </L>
          </CardContent>
        </Card>
        <Card className="border-0 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <L label="Address">
              <Input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
            </L>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <L label="City">
                <Input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
              </L>
              <L label="State">
                <Input value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
              </L>
            </div>
            <L label="Education level">
              <Input value={profile.education_level} onChange={(e) => setProfile({ ...profile, education_level: e.target.value })} />
            </L>
            <L label="School studied in">
              <Input value={profile.school_name} onChange={(e) => setProfile({ ...profile, school_name: e.target.value })} />
            </L>
            <L label="Percentage scored">
              <Input type="number" value={profile.percentage_scored} onChange={(e) => setProfile({ ...profile, percentage_scored: e.target.value })} />
            </L>
            <L label="Short bio">
              <Textarea maxLength={250} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
            </L>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button className="rounded-full" onClick={save} disabled={saving}>
                {saving ? "Saving..." : "Save profile"}
              </Button>
              <Button variant="outline" className="rounded-full" onClick={logout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={needsCompletion} onOpenChange={setNeedsCompletion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete your profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <L label="Full name" required>
              <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
            </L>
            <L label="City" required>
              <Input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
            </L>
            <L label="Phone" required>
              <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </L>
            <L label="Education level" required>
              <Input value={profile.education_level} onChange={(e) => setProfile({ ...profile, education_level: e.target.value })} />
            </L>
            <L label="School studied in" required>
              <Input value={profile.school_name} onChange={(e) => setProfile({ ...profile, school_name: e.target.value })} />
            </L>
            <L label="Percentage scored" required>
              <Input type="number" value={profile.percentage_scored} onChange={(e) => setProfile({ ...profile, percentage_scored: e.target.value })} />
            </L>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function L({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-foreground">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
