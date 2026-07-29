import { EMPLOYEES, employeeById } from "./org";
import type { Employee, Interest, Listing } from "./types";

/**
 * The visibility engine. Everything the product promises lives here.
 *
 * Rule 1: A listing is invisible to everyone in the seeker's management
 *         chain, all the way up. Not just the direct manager.
 * Rule 2: Outside the chain, a listing is anonymized until the seeker
 *         accepts a specific manager's interest. The seeker holds the
 *         reveal key.
 * Rule 3: Hiring managers are always identified. Asymmetry is the point:
 *         demand is public, supply is protected.
 * Rule 4: Aggregate reporting suppresses any group smaller than
 *         K_ANONYMITY listings so totals cannot unmask individuals.
 */

export const K_ANONYMITY = 3;

/** Every manager above this employee, walking managerId to the top. */
export function managementChain(employeeId: string): string[] {
  const chain: string[] = [];
  let current: Employee | undefined = employeeById(employeeId);
  while (current?.managerId) {
    chain.push(current.managerId);
    current = EMPLOYEES.find((e) => e.id === current!.managerId);
  }
  return chain;
}

/** Rule 1. */
export function isInChainOf(viewerId: string, employeeId: string): boolean {
  return managementChain(employeeId).includes(viewerId);
}

/** Listings a given viewer is allowed to know exist. */
export function listingsVisibleTo(
  viewerId: string,
  listings: Listing[],
): Listing[] {
  return listings.filter(
    (l) =>
      l.status === "active" &&
      l.employeeId !== viewerId &&
      !isInChainOf(viewerId, l.employeeId),
  );
}

/** Listings hidden from this viewer specifically by the chain rule. */
export function listingsHiddenFrom(
  viewerId: string,
  listings: Listing[],
): Listing[] {
  return listings.filter(
    (l) => l.status === "active" && isInChainOf(viewerId, l.employeeId),
  );
}

/** Rule 2: identity reveals only after the seeker accepts this manager. */
export function isRevealedTo(
  viewerId: string,
  listing: Listing,
  interests: Interest[],
): boolean {
  return interests.some(
    (i) =>
      i.listingId === listing.id &&
      i.fromManagerId === viewerId &&
      i.status === "accepted",
  );
}

/** Tenure shown as a band, never an exact figure, while anonymized. */
export function tenureBand(years: number): string {
  if (years < 1) return "Under 1 year";
  if (years < 3) return "1 to 3 years";
  if (years < 5) return "3 to 5 years";
  return "5+ years";
}

/**
 * Anonymized cards show a discipline, never a team. A team plus a level
 * plus a tenure band is enough to unmask someone in a small org.
 */
export function discipline(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("analyst") || t.includes("analytics")) return "Analytics";
  if (t.includes("product")) return "Product";
  if (t.includes("engineer")) return "Engineering";
  if (t.includes("marketing")) return "Marketing";
  if (t.includes("program")) return "Program management";
  return "General";
}

/** Rule 4: department totals below the threshold are suppressed. */
export function aggregateByTeam(
  listings: Listing[],
): { teamId: string; count: number; suppressed: boolean }[] {
  const counts = new Map<string, number>();
  for (const l of listings) {
    if (l.status !== "active") continue;
    const team = employeeById(l.employeeId).team;
    counts.set(team, (counts.get(team) ?? 0) + 1);
  }
  return [...counts.entries()].map(([teamId, count]) => ({
    teamId,
    count,
    suppressed: count < K_ANONYMITY,
  }));
}
