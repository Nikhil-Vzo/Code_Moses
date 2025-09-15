export type QuizOption = {
  label: string;
  value: number; // -2..+2
};

export type QuizQuestion = {
  id: string;
  text: string;
  weights: Partial<Record<StreamKey, number>>; // influence per stream
};

export type StreamKey = "arts" | "science" | "commerce" | "vocational";

export const options: QuizOption[] = [
  { label: "Strongly Disagree", value: -2 },
  { label: "Disagree", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Strongly Agree", value: 2 },
];

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    text: "I enjoy experimenting, building models, or doing science projects.",
    weights: { science: 2, vocational: 1 },
  },
  {
    id: "q2",
    text: "I like analyzing data, numbers, or business news.",
    weights: { commerce: 2, science: 1 },
  },
  {
    id: "q3",
    text: "I express myself through writing, art, music, or public speaking.",
    weights: { arts: 2 },
  },
  {
    id: "q4",
    text: "I prefer hands-on learning: workshops, labs, or practical tasks.",
    weights: { vocational: 2, science: 1 },
  },
  {
    id: "q5",
    text: "I am curious about how the world works (physics, biology, tech).",
    weights: { science: 2 },
  },
  {
    id: "q6",
    text: "I like organizing events, negotiating, or selling ideas/products.",
    weights: { commerce: 2, arts: 1 },
  },
  {
    id: "q7",
    text: "I follow current affairs, social issues, or enjoy humanities subjects.",
    weights: { arts: 2 },
  },
  {
    id: "q8",
    text: "I enjoy repairing gadgets, carpentry, cooking, or design tools.",
    weights: { vocational: 2, arts: 1 },
  },
  {
    id: "q9",
    text: "I aim for competitive exams like JEE/NEET or research careers.",
    weights: { science: 2 },
  },
  {
    id: "q10",
    text: "I want to run a business or work in finance/marketing.",
    weights: { commerce: 2 },
  },
  {
    id: "q11",
    text: "I want a job-focused path with quicker entry into the workforce.",
    weights: { vocational: 2, commerce: 1 },
  },
  {
    id: "q12",
    text: "I like collaborating with people and communicating ideas.",
    weights: { arts: 1, commerce: 1 },
  },
];
