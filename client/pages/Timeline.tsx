import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { timelineEvents } from "@/data/timeline";

export default function Timeline() {
  return (
    <section className="container py-10">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Timeline & Notifications
        </h1>
        <p className="mt-2 text-muted-foreground">
          Admission windows, scholarships, entrance tests, and counseling dates
          for Raipur district.
        </p>
      </header>
      <div className="mt-8 grid gap-4">
        {timelineEvents.map((e) => (
          <Card key={e.id} className="border-0 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{e.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {e.start_date} → {e.end_date}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 font-medium">
                  {e.district}
                </span>
                <span className="rounded-full bg-accent px-3 py-1">
                  {e.related_programs.join(", ")}
                </span>
              </div>
              <p className="mt-2 text-sm">{e.notes}</p>
              <div className="mt-3 flex gap-2">
                <Button asChild className="rounded-full">
                  <a href={e.apply_url} target="_blank" rel="noreferrer">
                    Apply / Details
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => addToMyTimeline(e.id)}
                >
                  Add to My Timeline
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function addToMyTimeline(id: string) {
  const key = "guidely:timeline";
  const set = new Set<string>(JSON.parse(localStorage.getItem(key) || "[]"));
  set.add(id);
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
  alert("Added to your timeline!");
}
