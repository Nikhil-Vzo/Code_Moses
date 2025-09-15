import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resources } from "@/data/resources";

export default function Resources() {
  const categories = Array.from(new Set(resources.map((r) => r.category)));
  return (
    <section className="container py-10">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Resources & Scholarships
        </h1>
        <p className="mt-3 text-muted-foreground">
          Open-access study materials, scholarships and helpful links.
          Downloadable items work offline.
        </p>
      </header>

      {categories.map((cat) => (
        <div key={cat} className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">{cat}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources
              .filter((r) => r.category === cat)
              .map((r) => (
                <Card key={r.id} className="border-0 bg-white/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">{r.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {r.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
                        {r.format}
                      </span>
                      <span className="rounded-full bg-secondary px-2 py-1">
                        {r.language}
                      </span>
                      {r.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-accent px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button asChild className="rounded-full">
                        <a href={r.link} target="_blank" rel="noreferrer">
                          Open
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
