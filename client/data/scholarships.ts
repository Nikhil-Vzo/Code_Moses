export type Scholarship = {
  id: string;
  title: string;
  amount: string;
  deadline: string;
  link: string;
};

export const scholarships: Scholarship[] = [
  {
    id: "sch1",
    title: "National Means-cum-Merit Scholarship",
    amount: "₹12,000 per annum",
    deadline: "30 Apr",
    link: "https://scholarships.gov.in/",
  },
  {
    id: "sch2",
    title: "State Scholarship for Higher Education",
    amount: "Up to ₹50,000",
    deadline: "15 Jun",
    link: "https://www.myscheme.gov.in/",
  },
];
