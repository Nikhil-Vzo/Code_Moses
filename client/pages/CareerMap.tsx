import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { careerMaps } from "@/data/careers";
import { lazy, Suspense } from "react";
const CareerGraphLazy = lazy(() => import("@/components/career/CareerGraph"));

export default function CareerMap() {
  return (
    <section className="container py-10">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Course-to-Career Path Mapping
        </h1>
        <p className="mt-3 text-muted-foreground">
          Detailed visual charts showing what each degree (B.A., B.Sc., B.Com.,
          BBA, etc.) offers. The industries or sectors each course leads to and
          relevant government exams, private jobs, entrepreneurial options, or
          higher education available after each stream.
        </p>
      </header>

      <div className="mt-8">
        <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
          <Suspense
            fallback={
              <div className="h-64 animate-pulse rounded-xl bg-muted" />
            }
          >
            {(() => {
              const raw = localStorage.getItem("guidely:quiz:scores");
              if (!raw)
                return (
                  <p className="p-6 text-center text-muted-foreground">
                    Take the quiz to generate your personalized career map.
                  </p>
                );
              const scores = JSON.parse(raw);
              return (<CareerGraphLazy scores={scores} />) as any;
            })()}
          </Suspense>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {careerMaps.map((m) => (
          <Card key={m.stream} className="border-0 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <FlowList
                label="Industries"
                items={m.industries}
                color="from-[#7b61ff] to-[#c9a5ff]"
              />
              <FlowList
                label="Govt Exams"
                items={m.govtExams}
                color="from-[#ff9ad6] to-[#ffd2e8]"
              />
              <FlowList
                label="Private Jobs"
                items={m.privateJobs}
                color="from-[#ffc073] to-[#ffe6c2]"
              />
              <FlowList
                label="Higher Studies"
                items={m.higherStudies}
                color="from-[#6ee7b7] to-[#d1fae5]"
              />
              <FlowList
                label="Entrepreneurship"
                items={m.entrepreneurship}
                color="from-[#60a5fa] to-[#bfdbfe]"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FlowList({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="mb-4">
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${color} px-3 py-1 text-xs font-semibold text-slate-900`}
      >
        {label}
      </div>
      <ul className="mt-2 grid list-disc gap-1 pl-5 text-sm text-muted-foreground">
        {items.map((x) => (
          <li key={x}>
            <Badge variant="secondary" className="mr-2 align-middle">
              •
            </Badge>
            <span className="align-middle text-foreground">{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
