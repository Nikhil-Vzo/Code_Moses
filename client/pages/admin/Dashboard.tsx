import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminDashboard() {
  const { toast } = useToast();
  const supabase = getSupabase();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [needsCompletion, setNeedsCompletion] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [profile, setProfile] = React.useState<any>({ full_name: "", email: "", city: "", education_level: "", school_name: "", percentage_scored: "", phone: "" });

  React.useEffect(() => {
    async function check() {
      if (!supabase) return;
      const { data: u } = await supabase.auth.getUser();
      const email = u.user?.email || "";
      setUserEmail(email);
      if (!email) return;
      const { data, error } = await supabase
        .from("admin_users")
        .select("role")
        .eq("email", email)
        .maybeSingle();
      if (error) {
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .maybeSingle();
      if (p) setProfile((prev: any) => ({ ...prev, ...p }));
      if (!p || !p.city || !p.education_level || !p.school_name || !p.percentage_scored) setNeedsCompletion(true);
    }
    check();
  }, [supabase]);

  if (!supabase) {
    return (
      <section className="container py-10">
        <Card className="border-0 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle>Connect Supabase</CardTitle>
          </CardHeader>
          <CardContent>
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to use the Admin Dashboard.
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!isAdmin) {
    const canBootstrap = !!(import.meta as any).env.VITE_ADMIN_INIT_USER && !!(import.meta as any).env.VITE_ADMIN_INIT_PASS;
    return (
      <section className="container py-10 grid gap-4">
        <Card className="border-0 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
          </CardHeader>
          <CardContent>Your account does not have admin access. ({userEmail || "no email"})</CardContent>
        </Card>
        {canBootstrap ? (
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle>Bootstrap Dev Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Create or sign in the dev admin from environment variables.</p>
              <Button className="rounded-full" onClick={async () => {
                const { ensureDevAdmin } = await import("@/lib/admin");
                try {
                  const email = await ensureDevAdmin();
                  toast({ title: "Dev admin ready", description: email });
                  window.location.reload();
                } catch (e: any) {
                  toast({ title: "Bootstrap failed", description: e.message });
                }
              }}>Create/Sign-in Dev Admin</Button>
            </CardContent>
          </Card>
        ) : null}
      </section>
    );
  }

  async function saveProfile() {
    if (!supabase) return;
    if (!profile.full_name || !profile.email || !profile.city || !profile.education_level || !profile.school_name || !profile.percentage_scored) {
      toast({ title: "Missing fields", description: "Please fill all required fields." });
      return;
    }
    setSaving(true);
    try {
      await supabase.from("profiles").upsert({ ...profile, last_updated: new Date().toISOString() });
      setNeedsCompletion(false);
      toast({ title: "Saved" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container py-8">
      <header className="mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Signed in as {userEmail}</p>
      </header>
      <Tabs defaultValue="quiz" className="w-full">
        <Dialog open={needsCompletion} onOpenChange={setNeedsCompletion}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete your profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Full name</span>
                <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Email</span>
                <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">City</span>
                <Input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Education level</span>
                <Input value={profile.education_level} onChange={(e) => setProfile({ ...profile, education_level: e.target.value })} />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">School studied in</span>
                <Input value={profile.school_name} onChange={(e) => setProfile({ ...profile, school_name: e.target.value })} />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Percentage scored</span>
                <Input type="number" value={profile.percentage_scored} onChange={(e) => setProfile({ ...profile, percentage_scored: e.target.value })} />
              </label>
            </div>
            <DialogFooter>
              <Button className="rounded-full" onClick={saveProfile} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="quiz">Quiz Manager</TabsTrigger>
          <TabsTrigger value="college">College Manager</TabsTrigger>
          <TabsTrigger value="resources">Resource Manager</TabsTrigger>
          <TabsTrigger value="timelines">Timeline Manager</TabsTrigger>
          <TabsTrigger value="careers">Career Nodes</TabsTrigger>
          <TabsTrigger value="admins">Admin Users</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="quiz">
          <CrudSection
            title="Quiz Questions"
            table="quiz_questions"
            idField="id"
            fields={[
              { key: "text", label: "Question", type: "text" },
              { key: "choices", label: "Choices (JSON)", type: "json" },
              { key: "weight_map", label: "Weight map (JSON)", type: "json" },
              { key: "active", label: "Active", type: "boolean" },
            ]}
          />
        </TabsContent>
        <TabsContent value="college">
          <CrudSection
            title="Colleges"
            table="college"
            idField="id"
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "district", label: "District", type: "text" },
              { key: "contact", label: "Contact", type: "text" },
              { key: "website", label: "Website", type: "text" },
              { key: "lat", label: "Lat", type: "number" },
              { key: "lng", label: "Lng", type: "number" },
              { key: "verified", label: "Verified", type: "boolean" },
            ]}
          />
        </TabsContent>
        <TabsContent value="resources">
          <CrudSection
            title="Resources"
            table="resources"
            idField="id"
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "source", label: "Source", type: "text" },
              { key: "link", label: "Link", type: "text" },
              { key: "type", label: "Type", type: "text" },
              { key: "tags", label: "Tags (JSON)", type: "json" },
            ]}
          />
        </TabsContent>
        <TabsContent value="timelines">
          <CrudSection
            title="Timelines"
            table="timelines"
            idField="id"
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "start_date", label: "Start Date", type: "text" },
              { key: "end_date", label: "End Date", type: "text" },
              { key: "target_streams", label: "Target streams (JSON)", type: "json" },
              { key: "target_colleges", label: "Target colleges (JSON)", type: "json" },
              { key: "message", label: "Message", type: "textarea" },
            ]}
          />
        </TabsContent>
        <TabsContent value="careers">
          <CrudSection
            title="Career Nodes"
            table="career_nodes"
            idField="id"
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "skills", label: "Skills (JSON)", type: "json" },
              { key: "salary_range", label: "Salary range", type: "text" },
              { key: "related_courses", label: "Related courses (JSON)", type: "json" },
              { key: "related_exams", label: "Related exams (JSON)", type: "json" },
            ]}
          />
        </TabsContent>
        <TabsContent value="admins">
          <CrudSection
            title="Admin Users"
            table="admin_users"
            idField="id"
            fields={[
              { key: "email", label: "Email", type: "text" },
              { key: "role", label: "Role (superadmin/content-editor/analytics-viewer)", type: "text" },
            ]}
          />
        </TabsContent>
        <TabsContent value="users">
          <UsersSection />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsPreview />
        </TabsContent>
      </Tabs>
    </section>
  );
}

type FieldDef = { key: string; label: string; type: "text" | "number" | "textarea" | "json" | "boolean" };

function CrudSection({ title, table, idField, fields }: { title: string; table: string; idField: string; fields: FieldDef[] }) {
  const supabase = getSupabase();
  const { toast } = useToast();
  const [rows, setRows] = React.useState<any[]>([]);
  const [form, setForm] = React.useState<Record<string, any>>({});
  const [csv, setCsv] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from(table).select("*").limit(50);
    if (error) {
      toast({ title: `${title}: load failed`, description: error.message });
    } else {
      setRows(data || []);
    }
  }, [supabase, table, title]);

  React.useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!supabase) return;
    setLoading(true);
    try {
      const clean: any = {};
      for (const f of fields) {
        const v = form[f.key];
        if (f.type === "json") {
          clean[f.key] = v ? JSON.parse(v) : null;
        } else if (f.type === "number") {
          clean[f.key] = v === "" || v === undefined ? null : Number(v);
        } else if (f.type === "boolean") {
          clean[f.key] = !!v;
        } else {
          clean[f.key] = v ?? null;
        }
      }
      const { error } = await supabase.from(table).insert(clean);
      if (error) {
        toast({ title: `${title}: create failed`, description: error.message });
      } else {
        setForm({});
        toast({ title: "Saved" });
        load();
      }
    } catch (err: any) {
      toast({ title: `${title}: invalid input`, description: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: any) {
    if (!supabase) return;
    const { error } = await supabase.from(table).delete().eq(idField, id);
    if (error) {
      toast({ title: `${title}: delete failed`, description: error.message });
    } else {
      toast({ title: "Deleted" });
      load();
    }
  }

  function exportCsv() {
    const headers = fields.map((f) => f.key);
    const lines = [headers.join(",")];
    for (const r of rows) {
      const vals = headers.map((h) => {
        const v = r[h] ?? "";
        const s = typeof v === "object" ? JSON.stringify(v) : String(v);
        return `"${s.replaceAll('"', '""')}"`;
      });
      lines.push(vals.join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${table}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importCsv() {
    if (!supabase) return;
    const lines = csv.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;
    const headers = lines[0].split(",").map((h) => h.trim());
    const parseCell = (cell: string) => {
      const unq = cell.replace(/^"|"$/g, "").replace(/""/g, '"');
      try {
        const maybe = JSON.parse(unq);
        return maybe;
      } catch {
        return unq;
      }
    };
    const records = lines.slice(1).map((ln) => {
      const cells = ln.match(/\"[^\"]*\"|[^,]+/g) || [];
      const obj: any = {};
      headers.forEach((h, i) => (obj[h] = parseCell(cells[i] ?? "")));
      return obj;
    });
    const { error } = await supabase.from(table).insert(records);
    if (error) {
      toast({ title: `${title}: import failed`, description: error.message });
    } else {
      toast({ title: "Imported" });
      setCsv("");
      load();
    }
  }

  return (
    <div className="mt-4 grid gap-4">
      <Card className="border-0 bg-white/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            {fields.map((f) => (
              <label key={f.key} className="grid gap-1 text-sm">
                <span className="font-medium">{f.label}</span>
                {f.type === "textarea" ? (
                  <Textarea value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                ) : f.type === "json" ? (
                  <Textarea value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder="{ }" />
                ) : f.type === "boolean" ? (
                  <div className="flex items-center gap-2">
                    <Checkbox checked={!!form[f.key]} onCheckedChange={(v) => setForm({ ...form, [f.key]: !!v })} />
                  </div>
                ) : (
                  <Input type={f.type === "number" ? "number" : "text"} value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                )}
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-full" onClick={save} disabled={loading}>
              {loading ? "Saving..." : "Create"}
            </Button>
            <Button variant="outline" className="rounded-full" type="button" onClick={exportCsv}>Export CSV</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Bulk import (CSV)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Textarea value={csv} onChange={(e) => setCsv(e.target.value)} placeholder={fields.map((f) => f.key).join(",")} />
          <div>
            <Button className="rounded-full" type="button" onClick={importCsv}>Import CSV</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Latest</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map((f) => (
                  <TableHead key={f.key}>{f.key}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r[idField] ?? JSON.stringify(r)}>
                  {fields.map((f) => (
                    <TableCell key={f.key}>
                      {f.type === "json" ? JSON.stringify(r[f.key]) : String(r[f.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => remove(r[idField])}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function UsersSection() {
  const supabase = getSupabase();
  const { toast } = useToast();
  const [rows, setRows] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    async function load() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, city, education_level, school_name, percentage_scored, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) {
        toast({ title: "Load users failed", description: error.message });
      } else {
        setRows(data || []);
      }
    }
    load();
  }, [supabase]);

  const filtered = React.useMemo(() => {
    if (!filter) return rows;
    const q = filter.toLowerCase();
    return rows.filter((r) =>
      [r.full_name, r.email, r.city, r.education_level, r.school_name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [rows, filter]);

  function exportCsv() {
    const headers = ["full_name","email","phone","city","education_level","school_name","percentage_scored","created_at"];
    const lines = [headers.join(",")];
    for (const r of filtered) {
      const vals = headers.map((h) => {
        const v = r[h] ?? "";
        const s = String(v).replaceAll('"', '""');
        return `"${s}"`;
      });
      lines.push(vals.join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="border-0 bg-white/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Users</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Search</span>
            <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="name, email, city..." />
          </label>
          <Button className="rounded-full" onClick={exportCsv}>Export CSV</Button>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>School</TableHead>
                <TableHead>%</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.full_name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.phone}</TableCell>
                  <TableCell>{r.city}</TableCell>
                  <TableCell>{r.education_level}</TableCell>
                  <TableCell>{r.school_name}</TableCell>
                  <TableCell>{r.percentage_scored}</TableCell>
                  <TableCell>{new Date(r.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function AnalyticsPreview() {
  const supabase = getSupabase();
  const { toast } = useToast();
  const [range, setRange] = React.useState<{ from: string; to: string }>(() => {
    const to = new Date();
    const from = new Date(Date.now() - 7 * 24 * 3600 * 1000);
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    return { from: iso(from), to: iso(to) };
  });
  const [count, setCount] = React.useState<{ events: number; users: number }>({ events: 0, users: 0 });

  React.useEffect(() => {
    async function load() {
      if (!supabase) return;
      const { data: ev, error: e1 } = await supabase
        .from("analytics")
        .select("id", { count: "exact", head: true })
        .gte("timestamp", `${range.from}T00:00:00.000Z`)
        .lte("timestamp", `${range.to}T23:59:59.999Z`);
      if (e1) {
        toast({ title: "Analytics error", description: e1.message });
        return;
      }
      const { data: users, error: e2 } = await supabase
        .from("analytics")
        .select("user_id")
        .gte("timestamp", `${range.from}T00:00:00.000Z`)
        .lte("timestamp", `${range.to}T23:59:59.999Z`);
      if (e2) {
        toast({ title: "Analytics error", description: e2.message });
        return;
      }
      const uniqueUsers = new Set((users || []).map((u: any) => u.user_id)).size;
      setCount({ events: (ev as any)?.length ?? 0, users: uniqueUsers });
    }
    load();
  }, [range, supabase]);

  return (
    <Card className="border-0 bg-white/80 shadow-sm mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Analytics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-sm">
            <span className="font-medium">From</span>
            <Input type="date" value={range.from} onChange={(e) => setRange({ ...range, from: e.target.value })} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">To</span>
            <Input type="date" value={range.to} onChange={(e) => setRange({ ...range, to: e.target.value })} />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:max-w-xs">
          <div className="rounded-lg bg-primary/10 p-4 text-center">
            <div className="text-xs text-muted-foreground">Events</div>
            <div className="text-2xl font-bold">{count.events}</div>
          </div>
          <div className="rounded-lg bg-primary/10 p-4 text-center">
            <div className="text-xs text-muted-foreground">Unique users</div>
            <div className="text-2xl font-bold">{count.users}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
