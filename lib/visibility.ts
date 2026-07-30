import { EMPLOYEES, employeeById } from "./org";
import type { Employee, Interest, Listing } from "./types";

/**
 * The visibility engine. Everything the product promises lives here.
 *
 * Rule 1: A listing is invisible to the seeker's entire reporting line,
 *         everyone above them and everyone below them, and to the
 *         seeker's own team. Exclusion follows one test: no ability to
 *         hire the seeker, plus the context to unmask them. A teammate
 *         fails it hardest of anyone in the company.
 * Rule 2: Outside the reporting line, a listing is anonymized until the
 *         seeker accepts a specific manager's interest. The seeker holds
 *         the reveal key.
 * Rule 3: Hiring managers are always identified. Asymmetry is the point:
 *         demand is public, supply is protected.
 * Rule 4: Aggregate reporting suppresses any group smaller than
 *         K_ANONYMITY listings, and any group where listings cover more
 *         than MAX_TEAM_SHARE of the team's headcount, so totals cannot
 *         unmask individuals in small teams.
 */

export const K_ANONYMITY = 3;

/** A team's visible listing count may never cover more than half the team. */
export const MAX_TEAM_SHARE = 0.5;

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

/** True when the viewer sits anywhere above this employee. */
export function isInChainOf(viewerId: string, employeeId: string): boolean {
  return managementChain(employeeId).includes(viewerId);
}

/**
 * Rule 1. The exclusion runs both directions: the seeker's chain above,
 * and the seeker's subtree below. Excluding only the chain would let a
 * listing manager's own reports browse their manager's card.
 */
export function inReportingLineOf(
  viewerId: string,
  employeeId: string,
): boolean {
  return isInChainOf(viewerId, employeeId) || isInChainOf(employeeId, viewerId);
}

/**
 * The team rule. A teammate can never hire the seeker onto the team they
 * already share, and no one in the company is better equipped to unmask
 * an anonymized card. Zero legitimate demand, maximum context: excluded.
 */
export function isTeammateOf(viewerId: string, employeeId: string): boolean {
  return employeeById(viewerId).team === employeeById(employeeId).team;
}

/** True when this viewer must never know the listing exists. */
export function isExcludedFrom(viewerId: string, employeeId: string): boolean {
  return (
    inReportingLineOf(viewerId, employeeId) ||
    isTeammateOf(viewerId, employeeId)
  );
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
      !isExcludedFrom(viewerId, l.employeeId),
  );
}

/** Listings hidden from this viewer specifically by the exclusion rules. */
export function listingsHiddenFrom(
  viewerId: string,
  listings: Listing[],
): Listing[] {
  return listings.filter(
    (l) =>
      l.status === "active" &&
      l.employeeId !== viewerId &&
      isExcludedFrom(viewerId, l.employeeId),
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

/**
 * Rule 4: a department is suppressed on either of two tests. Too few
 * listings, and a count points at individuals. Listings covering most of
 * a small team, and a count implicates the whole team at once: three
 * listings on a four person team exposes everyone at 75 percent odds.
 */
export function aggregateByTeam(
  listings: Listing[],
): { teamId: string; count: number; suppressed: boolean }[] {
  const counts = new Map<string, number>();
  for (const l of listings) {
    if (l.status !== "active") continue;
    const team = employeeById(l.employeeId).team;
    counts.set(team, (counts.get(team) ?? 0) + 1);
  }
  return [...counts.entries()].map(([teamId, count]) => {
    const headcount = EMPLOYEES.filter((e) => e.team === teamId).length;
    return {
      teamId,
      count,
      suppressed: count < K_ANONYMITY || count > headcount * MAX_TEAM_SHARE,
    };
  });
}
