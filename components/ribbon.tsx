"use client";

import { useStore } from "@/lib/store";
import type { PersonaId } from "@/lib/types";

const RIGHTS: Record<PersonaId, { can: string[]; cannot: string[] }> = {
  maya: {
    can: [
      "Your own listing and who has shown interest",
      "Exactly who can and cannot see you",
    ],
    cannot: ["Other people's listings"],
  },
  derek: {
    can: [
      "Anonymized listings outside your reporting chain",
      "Full profiles of seekers who accept your interest",
    ],
    cannot: [
      "Listings from anyone in your own org, or that they exist",
      "Names, teams, or exact tenure before mutual interest",
    ],
  },
  priya: {
    can: ["Your team roster, as always"],
    cannot: [
      "Whether anyone on your team is in the portal",
      "Matches involving your team, unless the employee consents to a swap",
    ],
  },
  june: {
    can: ["Aggregate mobility signals, suppressed below 3 per group"],
    cannot: ["Any individual listing, name, or match"],
  },
};

export function Ribbon() {
  const { state } = useStore();
  const rights = RIGHTS[state.persona];

  return (
    <div className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-2 px-4 py-3 sm:grid-cols-2 sm:px-6">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-teal-deep">
            This view can see
          </span>
          <ul className="mt-1 space-y-0.5">
            {rights.can.map((r) => (
              <li key={r} className="text-xs text-ink-soft">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber">
            This view can never see
          </span>
          <ul className="mt-1 space-y-0.5">
            {rights.cannot.map((r) => (
              <li key={r} className="text-xs text-ink-soft">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
