export type College = {
  id: string;
  name: string;
  district: string;
  state: string;
  latitude?: number;
  longitude?: number;
  programs: string[];
  cutoffs_example: Record<string, string>;
  facilities: {
    hostel: boolean;
    lab: boolean;
    library: boolean;
    internet: boolean;
  };
  medium_of_instruction: string[];
  contact: { phone: string; email?: string } | string;
  notes?: string;
};

export const colleges: College[] = [
  {
    id: "govt-college-001",
    name: "Government Degree College, Raipur",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2514,
    longitude: 81.6296,
    programs: ["B.A.", "B.Sc.", "B.Com.", "BBA", "Vocational"],
    cutoffs_example: {
      "B.Sc": "45% (General)",
      "B.A.": "40% (General)",
      "B.Com.": "42% (General)",
    },
    facilities: { hostel: true, lab: true, library: true, internet: true },
    medium_of_instruction: ["Hindi", "English"],
    contact: { phone: "+91-771-XXXXXXX", email: "info@govtcr.edu.in" },
    notes: "Central Raipur campus; sample entry for prototype.",
  },
  {
    id: "govt-college-002",
    name: "Government Arts & Commerce College, Durg Road",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2632,
    longitude: 81.6068,
    programs: ["B.A.", "B.Com.", "Vocational"],
    cutoffs_example: { "B.A.": "38% (General)", "B.Com.": "41% (General)" },
    facilities: { hostel: false, lab: false, library: true, internet: true },
    medium_of_instruction: ["Hindi"],
    contact: { phone: "+91-771-YYYYYYY", email: "admissions@artsdurg.ac.in" },
    notes: "Focus on arts & commerce streams; strong local outreach.",
  },
  {
    id: "govt-college-003",
    name: "Government Science College, Sunder Nagar",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2398,
    longitude: 81.6484,
    programs: ["B.Sc.", "B.Sc. (Vocational)", "BCA"],
    cutoffs_example: { "B.Sc.": "48% (General)", BCA: "50% (General)" },
    facilities: { hostel: true, lab: true, library: true, internet: false },
    medium_of_instruction: ["English", "Hindi"],
    contact: { phone: "+91-771-ZZZZZZZZ", email: "science@sundernagar.gov.in" },
    notes: "Strong science labs; limited hostel seats.",
  },
  {
    id: "govt-college-004",
    name: "Government Evening College, Mowa Road",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2801,
    longitude: 81.6755,
    programs: ["B.A.", "B.Com."],
    cutoffs_example: { "B.A.": "36% (General)", "B.Com.": "39% (General)" },
    facilities: { hostel: false, lab: false, library: true, internet: false },
    medium_of_instruction: ["Hindi"],
    contact: { phone: "+91-771-AAAAAAA", email: "evening@mowacollege.in" },
    notes: "Evening classes for working students; low fees.",
  },
  {
    id: "govt-college-005",
    name: "Government College of Vocational Studies, Nava Raipur",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2255,
    longitude: 81.6609,
    programs: ["Diploma (Vocational)", "B.Voc.", "Certificate Courses"],
    cutoffs_example: { "B.Voc.": "Pass", Diploma: "Pass" },
    facilities: { hostel: false, lab: true, library: true, internet: true },
    medium_of_instruction: ["Hindi", "English"],
    contact: { phone: "+91-771-BBBBBBB", email: "vocational@navaraipur.edu" },
    notes: "Practical skill courses and short-term certificates.",
  },
  {
    id: "govt-college-006",
    name: "Government Women's College, Telibandha",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2489,
    longitude: 81.6112,
    programs: ["B.A.", "B.Sc.", "B.Com."],
    cutoffs_example: { "B.A.": "37% (General)", "B.Sc.": "44% (General)" },
    facilities: { hostel: true, lab: true, library: true, internet: true },
    medium_of_instruction: ["Hindi"],
    contact: { phone: "+91-771-CCCCCCC", email: "women@telibandha.gov.in" },
    notes: "Women-only campus with reserved hostel facilities.",
  },
  {
    id: "govt-college-007",
    name: "Government Technical & Science College, Fafadih",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2323,
    longitude: 81.5907,
    programs: ["B.Sc.", "BCA", "B.Voc.", "Diploma (IT)"],
    cutoffs_example: { "B.Sc.": "46% (General)", BCA: "52% (General)" },
    facilities: { hostel: false, lab: true, library: true, internet: true },
    medium_of_instruction: ["English", "Hindi"],
    contact: { phone: "+91-771-DDDDDDD", email: "tech@fafadih.edu.in" },
    notes: "Strong IT & vocational focus; workshop labs available.",
  },
  {
    id: "govt-college-008",
    name: "Government College of Education, Abhanpur Road",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.3108,
    longitude: 81.6166,
    programs: ["B.A.", "B.Ed. (Integrated)", "Certificate (TEFL)"],
    cutoffs_example: { "B.A.": "40% (General)" },
    facilities: { hostel: false, lab: false, library: true, internet: false },
    medium_of_instruction: ["Hindi", "English"],
    contact: { phone: "+91-771-EEEEEEE", email: "education@abhanpur.gov.in" },
    notes: "Focus on teacher training and education studies.",
  },
  {
    id: "govt-college-009",
    name: "Government Arts & Science College, Devendra Nagar",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2567,
    longitude: 81.6029,
    programs: ["B.A.", "B.Sc.", "B.Com."],
    cutoffs_example: { "B.Sc.": "43% (General)", "B.A.": "39% (General)" },
    facilities: { hostel: false, lab: true, library: true, internet: false },
    medium_of_instruction: ["Hindi"],
    contact: { phone: "+91-771-FFFFFFF", email: "devendra@artsci.gov.in" },
    notes: "Neighborhood college with good local reputation.",
  },
  {
    id: "govt-college-010",
    name: "Government College of Commerce & Management, Bhatagaon",
    district: "Raipur",
    state: "Chhattisgarh",
    latitude: 21.2719,
    longitude: 81.6431,
    programs: ["B.Com.", "BBA", "Certificate (Tally)"],
    cutoffs_example: { "B.Com.": "42% (General)", BBA: "48% (General)" },
    facilities: { hostel: false, lab: false, library: true, internet: true },
    medium_of_instruction: ["English", "Hindi"],
    contact: { phone: "+91-771-GGGGGGG", email: "commerce@bhatagaon.gov.in" },
    notes: "Commerce & management oriented courses; industry tie-ups (pilot).",
  },
];
