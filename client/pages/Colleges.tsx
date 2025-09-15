import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { colleges as seedColleges } from "@/data/colleges";
import LeafletMap from "@/components/maps/LeafletMap";

function saveCollege(id: string) {
  const key = "guidely:savedColleges";
  const set = new Set<string>(JSON.parse(localStorage.getItem(key) || "[]"));
  set.add(id);
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

export default function Colleges() {
  const [view, setView] = useState<"map" | "list">("list");
  const [colleges, setColleges] = useState(seedColleges);

  // offline cache
  useEffect(() => {
    const key = "guidely:colleges";
    const cached = localStorage.getItem(key);
    if (!cached) localStorage.setItem(key, JSON.stringify(seedColleges));
    else setColleges(JSON.parse(cached));
  }, []);

  const bbox = useMemo(() => {
    const lats = colleges.map((c) => c.latitude);
    const lons = colleges.map((c) => c.longitude);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLon: Math.min(...lons),
      maxLon: Math.max(...lons),
    };
  }, [colleges]);

  return (
    <section className="container py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Nearby Government Colleges
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Raipur district — map + list with quick details.
          </p>
        </div>
        <div className="inline-flex rounded-full border p-1">
          <Button
            variant={view === "list" ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            variant={view === "map" ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => setView("map")}
          >
            Map
          </Button>
        </div>
      </header>

      {view === "map" ? (
        <div className="mt-6 rounded-2xl border bg-white/80 p-4 shadow-sm">
          <LeafletMap
            colleges={colleges}
            center={{ lat: 21.2514, lng: 81.6296 }}
          />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <input
              className="w-full rounded-full border px-4 py-2 text-sm"
              placeholder="Search by name or district..."
              onChange={(e) => {
                const q = e.target.value.toLowerCase();
                setColleges(
                  seedColleges.filter(
                    (c) =>
                      c.name.toLowerCase().includes(q) ||
                      c.district.toLowerCase().includes(q),
                  ),
                );
              }}
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {colleges.map((c) => (
              <Card key={c.id} className="border-0 bg-white/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{c.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    <div className="text-muted-foreground">
                      {c.district}, {c.state}
                    </div>
                    <div>
                      <strong>Programs:</strong> {c.programs.join(", ")}
                    </div>
                    <div>
                      <strong>Facilities:</strong>{" "}
                      {Object.entries(c.facilities)
                        .filter(([, v]) => v)
                        .map(([k]) => k)
                        .join(", ") || "N/A"}
                    </div>
                    <div>
                      <strong>Medium:</strong>{" "}
                      {c.medium_of_instruction.join(", ")}
                    </div>
                    <div>
                      <strong>Cut-offs:</strong>{" "}
                      {Object.entries(c.cutoffs_example)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join("; ")}
                    </div>
                    <div>
                      <strong>Contact:</strong>{" "}
                      {typeof c.contact === "string"
                        ? c.contact
                        : `${c.contact.phone || ""}${(c as any).contact?.email ? " • " + (c as any).contact.email : ""}`}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="rounded-full"
                      onClick={() => saveCollege(c.id)}
                    >
                      Save to Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
