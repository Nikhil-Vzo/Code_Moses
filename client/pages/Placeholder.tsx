import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Placeholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white/70 p-8 text-center shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-3 text-muted-foreground">
          {description ||
            "This screen is part of the Guidely prototype. Ask to flesh this out next."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full px-6">
            <Link to="/quiz">Try the Quiz</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
