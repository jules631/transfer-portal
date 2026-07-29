export type TeamId =
  | "payments"
  | "data-platform"
  | "risk"
  | "growth"
  | "customer-platform"
  | "people";

export interface Team {
  id: TeamId;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  level: string;
  team: TeamId;
  managerId: string | null;
  tenureYears: number;
  skills: string[];
}

export type ListingReason =
  | "Seeking growth"
  | "New domain"
  | "Better skills fit"
  | "Team change";

export type ListingStatus = "draft" | "active";

export interface Listing {
  id: string;
  employeeId: string;
  reason: ListingReason;
  note: string;
  status: ListingStatus;
  postedDaysAgo: number;
  swapConsent: boolean;
}

export type InterestStatus = "pending" | "accepted" | "declined";

export interface Interest {
  id: string;
  listingId: string;
  fromManagerId: string;
  roleTitle: string;
  message: string;
  status: InterestStatus;
}

export interface OpenRole {
  id: string;
  managerId: string;
  title: string;
  team: TeamId;
  level: string;
}

export type PersonaId = "maya" | "derek" | "priya" | "june";

export interface Persona {
  id: PersonaId;
  employeeId: string;
  label: string;
  role: string;
}
