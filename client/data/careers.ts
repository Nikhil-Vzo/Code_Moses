import type { StreamKey } from "./quiz";

export type CareerMap = {
  stream: StreamKey;
  title: string;
  industries: string[];
  govtExams: string[];
  privateJobs: string[];
  higherStudies: string[];
  entrepreneurship: string[];
};

export const careerMaps: CareerMap[] = [
  {
    stream: "science",
    title: "Science → Tech/Health/Research",
    industries: ["Engineering", "Healthcare", "Data & AI"],
    govtExams: ["JEE", "NEET", "ISRO/DRDO Apprentices"],
    privateJobs: ["Software Developer", "Lab Technician", "Data Analyst"],
    higherStudies: ["B.Tech", "MBBS/BDS", "BSc + MSc/PhD"],
    entrepreneurship: ["Tech Startup", "EdTech", "Health Services"],
  },
  {
    stream: "commerce",
    title: "Commerce → Business/Finance",
    industries: ["Banking", "Finance", "Marketing"],
    govtExams: ["SBI/IBPS", "SSC CGL", "UPSC Commerce"],
    privateJobs: ["Accountant", "Business Analyst", "Marketing Exec"],
    higherStudies: ["B.Com/BBA", "CA/CS/CMA", "MBA"],
    entrepreneurship: ["Retail", "Digital Marketing", "SMEs"],
  },
  {
    stream: "arts",
    title: "Arts → Social/Media/Public Service",
    industries: ["Media", "Education", "Public Policy"],
    govtExams: ["UPSC", "State PSC", "SSC CGL"],
    privateJobs: ["Journalist", "Content Designer", "Teacher"],
    higherStudies: ["BA", "MA", "B.Ed/M.Ed"],
    entrepreneurship: ["Content Studio", "NGO", "Design Services"],
  },
  {
    stream: "vocational",
    title: "Vocational → Skilled Trades/Design",
    industries: ["Hospitality", "Manufacturing", "Design"],
    govtExams: ["Railways Apprentice", "PSUs Technician"],
    privateJobs: ["Chef", "Electrician", "UX/Graphic Assistant"],
    higherStudies: ["Diploma", "B.Voc", "Specialized Certs"],
    entrepreneurship: ["Catering", "Repair Services", "Studios"],
  },
];

export const streamLabels: Record<StreamKey, string> = {
  arts: "Arts",
  science: "Science",
  commerce: "Commerce",
  vocational: "Vocational",
};
