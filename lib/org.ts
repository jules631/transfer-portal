import type {
  Employee,
  Interest,
  Listing,
  OpenRole,
  Persona,
  Team,
} from "./types";

// Meridian Systems: a fictional 1,200 person enterprise software company.
// The demo seeds one division of it.

export const TEAMS: Team[] = [
  { id: "payments", name: "Payments" },
  { id: "data-platform", name: "Data Platform" },
  { id: "risk", name: "Risk & Compliance" },
  { id: "growth", name: "Growth" },
  { id: "customer-platform", name: "Customer Platform" },
  { id: "people", name: "People" },
];

export const EMPLOYEES: Employee[] = [
  // Leadership
  {
    id: "e-amara",
    name: "Amara Diallo",
    title: "VP, Product & Operations",
    level: "VP",
    team: "customer-platform",
    managerId: null,
    tenureYears: 7,
    skills: ["Org design", "Strategy"],
  },

  // Payments (Priya's team — Maya reports here)
  {
    id: "e-priya",
    name: "Priya Raman",
    title: "Director, Payments",
    level: "Director",
    team: "payments",
    managerId: "e-amara",
    tenureYears: 5,
    skills: ["Payments infrastructure", "Team leadership"],
  },
  {
    id: "e-maya",
    name: "Maya Chen",
    title: "Senior Product Analyst",
    level: "L5",
    team: "payments",
    managerId: "e-priya",
    tenureYears: 3.5,
    skills: ["SQL", "Experiment design", "Payments risk models", "Python"],
  },
  {
    id: "e-tom",
    name: "Tom Adeyemi",
    title: "Product Manager",
    level: "L5",
    team: "payments",
    managerId: "e-priya",
    tenureYears: 2,
    skills: ["Checkout", "PSP integrations"],
  },
  {
    id: "e-lena",
    name: "Lena Fischer",
    title: "Staff Engineer",
    level: "L6",
    team: "payments",
    managerId: "e-priya",
    tenureYears: 4,
    skills: ["Ledger systems", "Go"],
  },
  {
    id: "e-omar",
    name: "Omar Haddad",
    title: "Product Analyst",
    level: "L4",
    team: "payments",
    managerId: "e-priya",
    tenureYears: 1.5,
    skills: ["SQL", "Dashboards"],
  },

  // Data Platform (Derek's team)
  {
    id: "e-derek",
    name: "Derek Osei",
    title: "Director, Data Platform",
    level: "Director",
    team: "data-platform",
    managerId: "e-amara",
    tenureYears: 4,
    skills: ["Data infrastructure", "Hiring"],
  },
  {
    id: "e-sana",
    name: "Sana Iqbal",
    title: "Analytics Engineer",
    level: "L4",
    team: "data-platform",
    managerId: "e-derek",
    tenureYears: 2.5,
    skills: ["dbt", "Warehouse modeling"],
  },
  {
    id: "e-victor",
    name: "Victor Nguyen",
    title: "Data Engineer",
    level: "L5",
    team: "data-platform",
    managerId: "e-derek",
    tenureYears: 3,
    skills: ["Spark", "Streaming pipelines"],
  },

  // Risk & Compliance
  {
    id: "e-ingrid",
    name: "Ingrid Solberg",
    title: "Director, Risk & Compliance",
    level: "Director",
    team: "risk",
    managerId: "e-amara",
    tenureYears: 6,
    skills: ["Regulatory", "Fraud"],
  },
  {
    id: "e-caleb",
    name: "Caleb Wright",
    title: "Risk Analyst",
    level: "L4",
    team: "risk",
    managerId: "e-ingrid",
    tenureYears: 2,
    skills: ["Fraud models", "SQL"],
  },
  {
    id: "e-dana",
    name: "Dana Petrov",
    title: "Compliance Program Manager",
    level: "L5",
    team: "risk",
    managerId: "e-ingrid",
    tenureYears: 4.5,
    skills: ["Audit", "Program management"],
  },

  // Growth
  {
    id: "e-marcus",
    name: "Marcus Bell",
    title: "Director, Growth",
    level: "Director",
    team: "growth",
    managerId: "e-amara",
    tenureYears: 3,
    skills: ["Lifecycle", "Experimentation"],
  },
  {
    id: "e-yuki",
    name: "Yuki Tanaka",
    title: "Growth Product Manager",
    level: "L5",
    team: "growth",
    managerId: "e-marcus",
    tenureYears: 2.5,
    skills: ["Activation", "A/B testing", "SQL"],
  },
  {
    id: "e-rosa",
    name: "Rosa Delgado",
    title: "Marketing Analyst",
    level: "L4",
    team: "growth",
    managerId: "e-marcus",
    tenureYears: 1,
    skills: ["Attribution", "Looker"],
  },

  {
    id: "e-iris",
    name: "Iris Wong",
    title: "Lifecycle Marketing Manager",
    level: "L5",
    team: "growth",
    managerId: "e-marcus",
    tenureYears: 3,
    skills: ["Lifecycle", "CRM", "Segmentation"],
  },
  {
    id: "e-sam",
    name: "Sam Okafor",
    title: "Fraud Analyst",
    level: "L4",
    team: "risk",
    managerId: "e-ingrid",
    tenureYears: 1.5,
    skills: ["Fraud models", "Python"],
  },

  // Customer Platform
  {
    id: "e-nate",
    name: "Nate Coleman",
    title: "Director, Customer Platform",
    level: "Director",
    team: "customer-platform",
    managerId: "e-amara",
    tenureYears: 5,
    skills: ["Platform strategy", "APIs"],
  },
  {
    id: "e-farah",
    name: "Farah Aziz",
    title: "Product Manager, APIs",
    level: "L5",
    team: "customer-platform",
    managerId: "e-nate",
    tenureYears: 3,
    skills: ["Developer experience", "API design"],
  },

  // People
  {
    id: "e-june",
    name: "June Park",
    title: "People Analytics Lead",
    level: "L6",
    team: "people",
    managerId: "e-amara",
    tenureYears: 4,
    skills: ["Workforce analytics", "Retention"],
  },
];

export const PERSONAS: Persona[] = [
  {
    id: "maya",
    employeeId: "e-maya",
    label: "Maya Chen",
    role: "Transfer seeker",
  },
  {
    id: "derek",
    employeeId: "e-derek",
    label: "Derek Osei",
    role: "Hiring manager",
  },
  {
    id: "priya",
    employeeId: "e-priya",
    label: "Priya Raman",
    role: "Maya's manager",
  },
  {
    id: "june",
    employeeId: "e-june",
    label: "June Park",
    role: "People team",
  },
];

// Maya's listing starts as a draft; the demo walks through publishing it.
export const SEED_LISTINGS: Listing[] = [
  {
    id: "l-maya",
    employeeId: "e-maya",
    reason: "New domain",
    note: "Three years modeling payments risk. Looking to apply the same analytical depth to a data infrastructure problem.",
    status: "draft",
    postedDaysAgo: 0,
    swapConsent: false,
  },
  {
    id: "l-caleb",
    employeeId: "e-caleb",
    reason: "Seeking growth",
    note: "Want a path toward senior analyst scope with broader model ownership.",
    status: "active",
    postedDaysAgo: 12,
    swapConsent: false,
  },
  {
    id: "l-yuki",
    employeeId: "e-yuki",
    reason: "New domain",
    note: "Interested in moving from growth experiments to platform product work.",
    status: "active",
    postedDaysAgo: 8,
    swapConsent: false,
  },
  {
    id: "l-rosa",
    employeeId: "e-rosa",
    reason: "Better skills fit",
    note: "My strongest work is analytical, not creative. Looking for an analyst seat.",
    status: "active",
    postedDaysAgo: 21,
    swapConsent: false,
  },
  {
    id: "l-dana",
    reason: "Seeking growth",
    employeeId: "e-dana",
    note: "Looking for program scope beyond audit cycles.",
    status: "active",
    postedDaysAgo: 15,
    swapConsent: false,
  },
  {
    id: "l-sam",
    employeeId: "e-sam",
    reason: "New domain",
    note: "Fraud modeling taught me the data side. I want to build on it.",
    status: "active",
    postedDaysAgo: 3,
    swapConsent: false,
  },
  {
    id: "l-iris",
    employeeId: "e-iris",
    reason: "Team change",
    note: "Three years in lifecycle. Ready for a new problem and a new team.",
    status: "active",
    postedDaysAgo: 10,
    swapConsent: false,
  },
  // In Derek's own org: he must never see this one.
  {
    id: "l-sana",
    employeeId: "e-sana",
    reason: "Team change",
    note: "Ready for a different problem space after two and a half years.",
    status: "active",
    postedDaysAgo: 5,
    swapConsent: false,
  },
];

export const SEED_INTERESTS: Interest[] = [];

export const OPEN_ROLES: OpenRole[] = [
  {
    id: "r-senior-analyst",
    managerId: "e-derek",
    title: "Senior Analyst, Data Platform",
    team: "data-platform",
    level: "L5",
  },
  {
    id: "r-pm-risk",
    managerId: "e-ingrid",
    title: "Product Manager, Risk",
    team: "risk",
    level: "L5",
  },
];

export function employeeById(id: string): Employee {
  const e = EMPLOYEES.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown employee: ${id}`);
  return e;
}

export function teamName(id: string): string {
  return TEAMS.find((t) => t.id === id)?.name ?? id;
}
