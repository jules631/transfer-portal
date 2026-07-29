"use client";

import { DemoNote } from "@/components/demo-note";
import { EMPLOYEES, OPEN_ROLES, employeeById, teamName } from "@/lib/org";
import { useStore } from "@/lib/store";

const VIEWER = "e-priya";

export function ManagerView() {
  const { state } = useStore();
  const team = EMPLOYEES.filter((e) => e.managerId === VIEWER);

  // A swap surfaces to a manager ONLY when their report has an accepted
  // match with a manager holding open headcount AND has consented.
  const swap = state.listings
    .map((l) => {
      const seeker = employeeById(l.employeeId);
      if (seeker.managerId !== VIEWER || !l.swapConsent) return null;
      const match = state.interests.find(
        (i) => i.listingId === l.id && i.status === "accepted",
      );
      if (!match) return null;
      const role = OPEN_ROLES.find((r) => r.managerId === match.fromManagerId);
      if (!role) return null;
      return { seeker, counterpart: employeeById(match.fromManagerId), role };
    })
    .find(Boolean);

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <section className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-display text-xl font-bold">Your team</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Payments · {team.length} direct reports
          </p>
          <ul className="mt-5 divide-y divide-line">
            {team.map((e) => (
              <li
                key={e.id}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{e.name}</p>
                  <p className="text-sm text-ink-soft">{e.title}</p>
                </div>
                <span className="font-mono text-xs text-ink-faint">
                  {e.level} · {e.tenureYears} yrs
                </span>
              </li>
            ))}
          </ul>
        </section>

        {swap && (
          <section className="rounded-xl border border-teal bg-teal-wash p-6">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-teal-deep">
              Swap opportunity · shared with employee consent
            </span>
            <h2 className="mt-2 font-display text-xl font-bold">
              {swap.seeker.name} has a confirmed match on{" "}
              {teamName(swap.role.team)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {swap.seeker.name.split(" ")[0]} matched with{" "}
              {swap.counterpart.name} and consented to bringing you in.{" "}
              {swap.counterpart.name.split(" ")[0]} offers a backfill
              headcount ({swap.role.level}) in return, so you would not lose
              the seat. This is the first moment the portal has told you
              anything about your team.
            </p>
            <button className="mt-4 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-deep">
              Join the swap conversation
            </button>
          </section>
        )}
      </div>

      <div className="space-y-4">
        <section className="rounded-xl border border-line bg-card p-5">
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
            Team mobility
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            You cannot see whether anyone on your team has a listing. No
            badge, no count, no admin override. If someone wants you in the
            conversation, they will bring you in.
          </p>
        </section>

        <DemoNote>
          {swap ? (
            <>
              Maya consented to a swap, so one card appeared. Before that
              consent this view contained zero evidence of her listing, her
              match, or the fact that a match existed at all.
            </>
          ) : (
            <>
              Maya may have an active listing and even a mutual match right
              now. This view contains zero evidence of it, and the data never
              reaches this persona&apos;s DOM. To unlock the one exception,
              have Maya accept Derek&apos;s interest and consent to a swap,
              then return here.
            </>
          )}
        </DemoNote>
      </div>
    </div>
  );
}
