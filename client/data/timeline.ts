export type TimelineEvent = {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  district: string;
  related_programs: string[];
  apply_url: string;
  notes: string;
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "timeline-001",
    title: "Govt College — B.Sc Admissions Open (Raipur District)",
    start_date: "2026-06-01",
    end_date: "2026-07-15",
    district: "Raipur",
    related_programs: ["B.Sc."],
    apply_url: "https://example.raipur.gov/admissions/bsc-2026",
    notes: "Main UG science admission window for prototype/demo.",
  },
  {
    id: "timeline-002",
    title: "Govt College — B.A./B.Com Admissions (Raipur)",
    start_date: "2026-06-10",
    end_date: "2026-07-20",
    district: "Raipur",
    related_programs: ["B.A.", "B.Com."],
    apply_url: "https://example.raipur.gov/admissions/ba-bcom-2026",
    notes: "Arts & Commerce admission dates.",
  },
  {
    id: "timeline-003",
    title:
      "Scholarship: Raipur District Merit Scholarship — Application Window",
    start_date: "2026-05-15",
    end_date: "2026-06-30",
    district: "Raipur",
    related_programs: ["All"],
    apply_url: "https://example.raipur.gov/scholarships/merit-2026",
    notes:
      "District-level merit scholarship for SC/ST/OBC categories (sample).",
  },
  {
    id: "timeline-004",
    title:
      "Entrance Test: State Vocational Aptitude Test (SVAT) — Registration",
    start_date: "2026-04-20",
    end_date: "2026-05-10",
    district: "Raipur",
    related_programs: ["B.Voc.", "Diploma (Vocational)"],
    apply_url: "https://example.stateedu.gov/svat/register",
    notes: "Required for some vocational seats; mock data for demo.",
  },
  {
    id: "timeline-005",
    title: "College Counseling Week — Raipur District",
    start_date: "2026-07-25",
    end_date: "2026-07-31",
    district: "Raipur",
    related_programs: ["All"],
    apply_url: "https://example.raipur.gov/counseling/2026",
    notes: "District counseling schedules — encourage students to attend.",
  },
  {
    id: "timeline-006",
    title:
      "Short-Term Certificate Course Intake — Vocational College Nava Raipur",
    start_date: "2026-03-01",
    end_date: "2026-03-31",
    district: "Raipur",
    related_programs: ["Certificate Courses", "Diploma"],
    apply_url: "https://example.navaraipur.gov/vocational/apply",
    notes: "1-month certificate intakes for skill boost.",
  },
  {
    id: "timeline-007",
    title: "Late Admission Round — Arts & Commerce (Raipur)",
    start_date: "2026-08-05",
    end_date: "2026-08-15",
    district: "Raipur",
    related_programs: ["B.A.", "B.Com."],
    apply_url: "https://example.raipur.gov/admissions/late-round",
    notes: "Late seats and spot admissions (if available).",
  },
  {
    id: "timeline-008",
    title: "State-wide Scholarship: Girls' Higher Education Grant — Deadline",
    start_date: "2026-05-01",
    end_date: "2026-05-30",
    district: "Raipur",
    related_programs: ["All"],
    apply_url: "https://example.stateedu.gov/scholarships/girlsgrant",
    notes: "Support for female students — sample entry for pilot.",
  },
  {
    id: "timeline-009",
    title: "Orientation & Campus Tour — Government Degree College, Raipur",
    start_date: "2026-07-28",
    end_date: "2026-07-28",
    district: "Raipur",
    related_programs: ["All"],
    apply_url: "https://govtcr.edu.in/orientation-2026",
    notes: "One-day campus orientation for newly admitted students.",
  },
  {
    id: "timeline-010",
    title: "Application Deadline Reminder — BBA Program (Commerce College)",
    start_date: "2026-06-20",
    end_date: "2026-06-20",
    district: "Raipur",
    related_programs: ["BBA"],
    apply_url: "https://example.bhatagaon.edu/bba/apply",
    notes: "Single-day reminder event for BBA applicants.",
  },
];
