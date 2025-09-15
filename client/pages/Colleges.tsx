import * as React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSupabase } from "@/lib/supabase";
import CollegeMap from "@/components/map/CollegeMap"; // Normal import is fine now

// Define a more detailed type for your college data from Supabase
type College = {
  id: number;
  name: string | null;
  district: string | null;
  contact: string | null;
  website: string | null;
  programs: string | null;
  cut_offs: string | null;
  facilities: string | null;
  lat: number | null;
  lng: number | null;
};

export default function Colleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  React.useEffect(() => {
    async function fetchColleges() {
      const supabase = getSupabase();
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from("college").select("*").order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching colleges:", error);
      } else {
        setColleges(data || []);
      }
      setLoading(false);
    }
    fetchColleges();
  }, []);

  const districts = useMemo(() => {
    const d = new Set(colleges.map((c) => c.district).filter(Boolean));
    return Array.from(d).sort();
  }, [colleges]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return colleges.filter((c) => {
      if (districtFilter && c.district !== districtFilter) return false;
      const nameMatch = c.name ? c.name.toLowerCase().includes(q) : false;
      const districtMatch = c.district ? c.district.toLowerCase().includes(q) : false;
      return nameMatch || districtMatch;
    });
  }, [colleges, search, districtFilter]);
  
  if (loading) {
    return <div className="container py-10 text-center">Loading colleges...</div>;
  }

  return (
    <section className="container py-10">
      <header className="mb-6 rounded-2xl bg-white/70 p-6 shadow-sm backdrop-blur">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Government Colleges
        </h1>
        <p className="mt-1 text-muted-foreground">
          Discover programs, cut-offs, and facilities in your area.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by college name or district..."
            className="rounded-full"
          />
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="flex h-10 w-full items-center justify-between rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-xs"
          >
            <option value="">All Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="mb-6">
        <CollegeMap colleges={filtered} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card
            key={c.id}
            className="flex flex-col border-0 bg-white/70 shadow-sm transition-all hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-lg">{c.name || "Unnamed College"}</CardTitle>
              <p className="text-sm text-muted-foreground">{c.district || "No District"}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              {c.programs && <p className="text-sm"><strong>Programs:</strong> {c.programs}</p>}
              {c.cut_offs && <p className="text-sm mt-1"><strong>Cut-offs:</strong> {c.cut_offs}</p>}
              
              <div className="flex-1" />

              <div className="mt-4 flex items-center justify-between">
                {c.website && (
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
                <Link
                  to={`/college/${c.id}`}
                  className="text-sm font-semibold text-primary"
                >
                  View Details &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="sm:col-span-2 lg:col-span-3 text-center text-muted-foreground">
            No colleges found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
}