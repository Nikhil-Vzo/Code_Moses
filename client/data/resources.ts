export type Resource = {
  id: string;
  category: string;
  title: string;
  description: string;
  language: string;
  tags: string[];
  link: string;
  format: string;
};

export const resources: Resource[] = [
  {
    id: "res-001",
    category: "E-Books & Study Materials",
    title: "NCERT Class 12 Physics Textbook",
    description: "Official NCERT PDF for Class 12 Physics (Part 1 & 2).",
    language: "English",
    tags: ["NCERT", "Class 12", "Physics", "E-Book"],
    link: "https://ncert.nic.in/textbook/pdf/leph1dd.zip",
    format: "PDF",
  },
  {
    id: "res-002",
    category: "E-Books & Study Materials",
    title: "NCERT Class 12 Mathematics Textbook",
    description: "Official NCERT PDF for Class 12 Mathematics.",
    language: "English",
    tags: ["NCERT", "Class 12", "Maths", "E-Book"],
    link: "https://ncert.nic.in/textbook/pdf/lemh1dd.zip",
    format: "PDF",
  },
  {
    id: "res-003",
    category: "Scholarships & Financial Aid",
    title: "National Scholarship Portal",
    description: "Apply for central and state government scholarships via NSP.",
    language: "English/Hindi",
    tags: ["Scholarship", "Government", "Financial Aid"],
    link: "https://scholarships.gov.in/",
    format: "Web Portal",
  },
  {
    id: "res-004",
    category: "Scholarships & Financial Aid",
    title: "Post Matric Scholarship (Chhattisgarh)",
    description:
      "State scholarship scheme for SC/ST/OBC students in Chhattisgarh.",
    language: "Hindi",
    tags: ["Scholarship", "Chhattisgarh", "SC/ST/OBC"],
    link: "https://postmatric-scholarship.cg.nic.in/",
    format: "Web Portal",
  },
  {
    id: "res-005",
    category: "Career Guidance",
    title: "What After 12th? Career Options",
    description:
      "Government of India career guidance portal for students after Class 12.",
    language: "English",
    tags: ["Career", "Guidance", "After 12th"],
    link: "https://www.ncs.gov.in/",
    format: "Website",
  },
  {
    id: "res-006",
    category: "Skill Development",
    title: "SWAYAM Online Courses",
    description: "Free online courses from government-recognized institutions.",
    language: "English/Hindi",
    tags: ["Skills", "Online Course", "Free"],
    link: "https://swayam.gov.in/",
    format: "Web Platform",
  },
  {
    id: "res-007",
    category: "Skill Development",
    title: "NPTEL Engineering Courses",
    description:
      "Video lectures and assignments for engineering & science domains.",
    language: "English",
    tags: ["NPTEL", "Engineering", "Free", "MOOC"],
    link: "https://nptel.ac.in/",
    format: "Web Platform",
  },
  {
    id: "res-008",
    category: "Exam Preparation",
    title: "CUET UG Previous Year Papers",
    description: "Download CUET UG exam papers for practice.",
    language: "English",
    tags: ["CUET", "Exam Prep", "UG Admission"],
    link: "https://nta.ac.in/Cuetexam",
    format: "PDF/Website",
  },
  {
    id: "res-009",
    category: "Exam Preparation",
    title: "NEET UG Information Bulletin & Papers",
    description: "Official NEET UG resources from NTA.",
    language: "English",
    tags: ["NEET", "Medical", "Exam Prep"],
    link: "https://neet.nta.nic.in/",
    format: "Website",
  },
  {
    id: "res-010",
    category: "Student Support",
    title: "National Mental Health Helpline (KIRAN)",
    description:
      "Toll-free helpline for mental health support (1800-599-0019).",
    language: "English/Hindi",
    tags: ["Mental Health", "Support", "Helpline"],
    link: "https://www.mohfw.gov.in/",
    format: "Helpline/Info",
  },
  {
    id: "res-011",
    category: "Student Support",
    title: "Free Resume Templates",
    description: "Google Docs starter resume templates for freshers.",
    language: "English",
    tags: ["Resume", "Career", "Template"],
    link: "https://docs.google.com/document/u/0/?ftv=1&tgif=d",
    format: "Templates",
  },
];
