import * as React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { options, type StreamKey } from "@/data/quiz"; // Keep static options
import { careerMaps, streamLabels } from "@/data/careers";
import { Link } from "react-router-dom";
import { getSupabase } from "@/lib/supabase"; // Import Supabase client

// Define a type for your question data from Supabase
type QuizQuestion = {
  id: string;
  text: string;
  weights: Record<StreamKey, number>;
};

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]); // To store questions from DB
  const [loading, setLoading] = useState(true); // To show a loading message
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // useEffect hook to fetch data when the component loads
  React.useEffect(() => {
    async function fetchQuestions() {
      const supabase = getSupabase();
      if (!supabase) {
        console.error("Supabase client is not available.");
        setLoading(false);
        return;
      }

      // Fetch only the 'active' questions from your database
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("active", true);

      if (error) {
        console.error("Error fetching quiz questions:", error);
        // Here you could show an error toast to the user
      } else {
        // The 'weight_map' column from your DB might be the weights
        const formattedQuestions = data.map(item => ({
          ...item,
          weights: item.weight_map // Assuming DB column 'weight_map' holds the weights
        }));
        setQuestions(formattedQuestions || []);
      }
      setLoading(false);
    }

    fetchQuestions();
  }, []); // The empty array [] means this runs only once when the page loads

  const progress =
    questions.length > 0
      ? (Object.keys(answers).length / questions.length) * 100
      : 0;

  const scores = useMemo(() => {
    const s: Record<StreamKey, number> = {
      arts: 0,
      science: 0,
      commerce: 0,
      vocational: 0,
    };
    for (const q of questions) {
      const v = answers[q.id] ?? 0;
      for (const [stream, weight] of Object.entries(q.weights)) {
        s[stream as StreamKey] += v * (weight as number);
      }
    }
    return s;
  }, [answers, questions]);

  const ranked = useMemo(() => {
    return (Object.keys(scores) as StreamKey[])
      .map((k) => ({ key: k, score: scores[k] }))
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  const topTwo = ranked.slice(0, 2).map((r) => r.key);
  const maxScore = Math.max(1, ...ranked.map((r) => Math.abs(r.score)));
  const pct = (val: number) =>
    Math.round(((val + maxScore) / (2 * maxScore)) * 100);
  
  // Display a loading message while fetching data
  if (loading) {
    return (
      <div className="container py-10 text-center">Loading quiz...</div>
    );
  }

  // Display a message if no active questions are found
  if (questions.length === 0) {
    return (
      <div className="container py-10 text-center">
        No active quiz questions found. Please add some in the admin panel.
      </div>
    );
  }

  return (
    <section className="bg-[radial-gradient(1200px_600px_at_100%_0%,#f7d8ff,transparent_60%),radial-gradient(1000px_500px_at_0%_0%,#fff7eb,transparent_60%)]">
      <div className="container max-w-4xl py-10">
        <div className="mb-6 rounded-2xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Aptitude & Interest Quiz
            </h1>
            <div className="flex items-center gap-3">
              <Progress value={progress} className="w-40" />
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <Card key={q.id} className="border-0 bg-white/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    {q.text}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {options.map((o) => (
                      <Button
                        key={o.label}
                        variant={
                          (answers[q.id] ?? 999) === o.value
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [q.id]: o.value }))
                        }
                        className="justify-center rounded-full"
                      >
                        {o.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Back to Home
              </Link>
              <Button
                className="rounded-full px-6"
                onClick={() => {
                  localStorage.setItem(
                    "guidely:quiz:scores",
                    JSON.stringify(scores),
                  );
                  setSubmitted(true);
                }}
                disabled={
                  Object.keys(answers).length < Math.min(6, questions.length)
                }
              >
                See Results <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="border-0 bg-white/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Your Recommended Streams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {ranked.map((r) => (
                    <div key={r.key} className="rounded-xl border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">
                          {streamLabels[r.key]}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {pct(r.score)}% match
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#7b61ff] to-[#ff9ad6]"
                          style={{ width: `${pct(r.score)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Compare Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {topTwo.map((k) => {
                    const cm = careerMaps.find((c) => c.stream === k)!;
                    return (
                      <div key={k} className="rounded-xl border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-lg font-bold">
                            {streamLabels[k]}
                          </div>
                          <div className="inline-flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />{" "}
                            {pct(scores[k])}%
                          </div>
                        </div>
                        <ul className="grid list-disc gap-1 pl-5 text-sm text-muted-foreground">
                          <li>
                            Industries:{" "}
                            <span className="text-foreground">
                              {cm.industries.join(", ")}
                            </span>
                          </li>
                          <li>
                            Govt Exams:{" "}
                            <span className="text-foreground">
                              {cm.govtExams.join(", ")}
                            </span>
                          </li>
                          <li>
                            Private Jobs:{" "}
                            <span className="text-foreground">
                              {cm.privateJobs.join(", ")}
                            </span>
                          </li>
                          <li>
                            Higher Studies:{" "}
                            <span className="text-foreground">
                              {cm.higherStudies.join(", ")}
                            </span>
                          </li>
                          <li>
                            Entrepreneurship:{" "}
                            <span className="text-foreground">
                              {cm.entrepreneurship.join(", ")}
                            </span>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/career-map">Open Dynamic Career Map</Link>
                  </Button>
                  <Button asChild className="rounded-full">
                    <Link to="/colleges">Explore Nearby Colleges</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setSubmitted(false)}
              >
                Retake Quiz
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/timeline">Add to My Timeline</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}