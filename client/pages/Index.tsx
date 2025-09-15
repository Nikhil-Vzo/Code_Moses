import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  MapPin,
  CalendarClock,
  Workflow,
  BookOpen,
  BellRing,
} from "lucide-react";
import { Link } from "react-router-dom";
import { colleges } from "@/data/colleges";
import { scholarships } from "@/data/scholarships";

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#d4b5ff_0%,#f7d8ff_50%,#fff7eb_100%)]" />
        <div className="absolute -bottom-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[50%] bg-white/60 blur-2xl" />
        <div className="relative container flex min-h-[72dvh] flex-col items-center justify-center py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-inset ring-black/5">
            Made for Indian students • Works offline
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Find your path with Guidely
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Clear guidance for Class 10–12 students and parents: quiz, career
            maps, nearby colleges, timeline, and resources.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full px-6 text-base">
              <Link to="/quiz">Take Quiz</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 text-base"
            >
              <Link to="/colleges">Explore Colleges</Link>
            </Button>
          </div>
          <div className="mt-6 grid max-w-md grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            <div className="rounded-lg bg-white/70 p-3 shadow-sm">
              10–12 Qs
              <div className="text-[10px]">Aptitude & Interest</div>
            </div>
            <div className="rounded-lg bg-white/70 p-3 shadow-sm">
              {colleges.length}+ colleges
              <div className="text-[10px]">Nearby directory</div>
            </div>
            <div className="rounded-lg bg-white/70 p-3 shadow-sm">
              {scholarships.length}+ schemes
              <div className="text-[10px]">Scholarships & resources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="container py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-gradient-to-br from-[#7b61ff] to-[#ff9ad6] p-2 text-white">
                {<GraduationCap className="h-5 w-5" />}
              </div>
              <div className="text-sm">
                <div className="font-semibold">Take the Quiz</div>
                <div className="text-muted-foreground">
                  Get personalized stream suggestions
                </div>
              </div>
              <Button asChild className="ml-auto rounded-full">
                <Link to="/quiz">Start</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-gradient-to-br from-[#7b61ff] to-[#ff9ad6] p-2 text-white">
                {<MapPin className="h-5 w-5" />}
              </div>
              <div className="text-sm">
                <div className="font-semibold">Explore Colleges</div>
                <div className="text-muted-foreground">
                  Programs, cut-offs, facilities
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="ml-auto rounded-full"
              >
                <Link to="/colleges">Open</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-gradient-to-br from-[#7b61ff] to-[#ff9ad6] p-2 text-white">
                {<BookOpen className="h-5 w-5" />}
              </div>
              <div className="text-sm">
                <div className="font-semibold">Resources & Scholarships</div>
                <div className="text-muted-foreground">
                  Download PDFs for offline use
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="ml-auto rounded-full"
              >
                <Link to="/resources">Browse</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Highlights */}
      <section className="container pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <HighlightCard
            icon={<BellRing />}
            title="Smart timeline"
            desc="Add admission windows and exam dates. Get reminders on time."
          />
          <HighlightCard
            icon={<Workflow />}
            title="Visual career maps"
            desc="Understand degrees → industries, exams, jobs, and higher studies."
          />
          <HighlightCard
            icon={<MapPin />}
            title="Works offline"
            desc="Cache data on-device for low connectivity areas."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureTile({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-white/70 p-4">
      <div className="rounded-xl bg-gradient-to-br from-[#7b61ff] to-[#ff9ad6] p-2 text-white [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function HighlightCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        {title}
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
