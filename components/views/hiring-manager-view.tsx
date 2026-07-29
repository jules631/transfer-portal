"use client";

import { DemoNote } from "@/components/demo-note";
import { Redacted } from "@/components/redacted";
import { OPEN_ROLES, employeeById, teamName } from "@/lib/org";
import { useStore } from "@/lib/store";
import {
  discipline,
  isRevealedTo,
  listingsHiddenFrom,
  listingsVisibleTo,
  tenureBand,
} from "@/lib/visibility";

const VIEWER = "e-derek";

export function HiringManagerView() {
  const { state, dispatch } = useStore();
  const derek = employeeById(VIEWER);
  const role = OPEN_ROLES.find((r) => r.managerId === VIEWER)!;
  const visible = listingsVisibleTo(VIEWER, state.listings);
  const hidden = listingsHiddenFrom(VIEWER, state.listings);

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <section className="rounded-xl border border-line bg-card p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-bold">
              Internal talent · {visible.length} active{" "}
              {visible.length === 1 ? "listing" : "listings"}
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Hiring for: {role.title}
            </span>
          </div>

          <ul className="mt-5 space-y-4">
            {visible.map((l) => {
              const seeker = employeeById(l.employeeId);
              const revealed = isRevealedTo(VIEWER, l, state.interests);
              const myInterest = state.interests.find(
                (i) => i.listingId === l.id && i.fromManagerId === VIEWER,
              );
              return (
                <li key={l.id} className="rounded-lg border border-line p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold">
                        <Redacted text={seeker.name} revealed={revealed} />
                      </p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {revealed ? (
                          <span className="reveal-in">
                            {seeker.title} · {teamName(seeker.team)} ·{" "}
                            {seeker.tenureYears} years
                          </span>
                        ) : (
                          <>
                            {discipline(seeker.title)} · {seeker.level} ·{" "}
                            {tenureBand(seeker.tenureYears)} · Team{" "}
                            <Redacted
                              text={teamName(seeker.team)}
                              revealed={false}
                            />
                          </>
                        )}
                      </p>
                    </div>
                    <span className="rounded-full bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                      {l.reason}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-ink-soft">“{l.note}”</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {seeker.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded bg-paper px-2 py-0.5 text-xs text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    {!myInterest ? (
                      <button
                        onClick={() =>
                          dispatch({
                            type: "EXPRESS_INTEREST",
                            listingId: l.id,
                            fromManagerId: VIEWER,
                            roleTitle: role.title,
                            message:
                              "Your background looks like a strong fit for a senior analyst seat on Data Platform. Open to a conversation?",
                          })
                        }
                        className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
                      >
                        Express interest
                      </button>
                    ) : myInterest.status === "pending" ? (
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber">
                        Interest sent · waiting on the seeker
                      </p>
                    ) : myInterest.status === "accepted" ? (
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-teal-deep">
                        Mutual interest · profile revealed · take it to a
                        conversation
                      </p>
                    ) : (
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
                        Declined
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="space-y-4">
        <section className="rounded-xl border border-line bg-card p-5">
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
            Your open headcount
          </h3>
          <p className="mt-2 text-sm font-semibold">{role.title}</p>
          <p className="text-sm text-ink-soft">
            {teamName(role.team)} · {role.level}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Open headcount makes you eligible to propose a swap when a match
            forms, if the seeker consents.
          </p>
        </section>

        <DemoNote>
          {hidden.length > 0 ? (
            <>
              Right now {hidden.length === 1 ? "one listing" : "listings"}{" "}
              from {derek.name.split(" ")[0]}&apos;s own org{" "}
              {hidden.length === 1 ? "exists" : "exist"} (Sana Iqbal, on his
              team, is looking). The product does not gray it out or count it.
              It simply is not here. Even a count would tell a manager someone
              on their team is looking.
            </>
          ) : (
            <>
              Listings from this manager&apos;s own org are silently excluded,
              never grayed out or counted.
            </>
          )}{" "}
          Names and teams render as blocks. The real strings are not in this
          view&apos;s DOM until the seeker accepts.
        </DemoNote>
      </div>
    </div>
  );
}
