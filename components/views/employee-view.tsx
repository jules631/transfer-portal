"use client";

import { DemoNote } from "@/components/demo-note";
import { employeeById, teamName } from "@/lib/org";
import { useStore } from "@/lib/store";
import { managementChain } from "@/lib/visibility";

export function EmployeeView() {
  const { state, dispatch } = useStore();
  const maya = employeeById("e-maya");
  const listing = state.listings.find((l) => l.employeeId === maya.id)!;
  const chain = managementChain(maya.id).map((id) => employeeById(id));
  const interests = state.interests.filter((i) => i.listingId === listing.id);
  const accepted = interests.find((i) => i.status === "accepted");

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {/* Listing */}
        <section className="rounded-xl border border-line bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">Your listing</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {maya.title} · {teamName(maya.team)} · {maya.level}
              </p>
            </div>
            {listing.status === "active" ? (
              <span className="rounded-full bg-teal-wash px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-teal-deep">
                Live
              </span>
            ) : (
              <span className="rounded-full bg-amber-wash px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-amber">
                Draft
              </span>
            )}
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                Reason
              </dt>
              <dd className="mt-0.5">{listing.reason}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                Note to hiring managers
              </dt>
              <dd className="mt-0.5 text-ink-soft">{listing.note}</dd>
            </div>
          </dl>

          {listing.status === "draft" && (
            <button
              onClick={() =>
                dispatch({ type: "PUBLISH_LISTING", listingId: listing.id })
              }
              className="mt-6 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
            >
              Publish listing
            </button>
          )}
        </section>

        {/* Interest inbox */}
        <section className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-display text-xl font-bold">Interest</h2>
          {listing.status === "draft" ? (
            <p className="mt-2 text-sm text-ink-soft">
              Publish your listing and interest from hiring managers lands
              here. You decide who learns your name.
            </p>
          ) : interests.length === 0 ? (
            <p className="mt-2 text-sm text-ink-soft">
              No interest yet. Your listing went live moments ago. Switch to
              Derek Osei to see what a hiring manager sees.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {interests.map((i) => {
                const from = employeeById(i.fromManagerId);
                return (
                  <li key={i.id} className="rounded-lg border border-line p-4">
                    <p className="text-sm font-semibold">
                      {from.name} · {teamName(from.team)}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      For: {i.roleTitle}
                    </p>
                    <p className="mt-2 text-sm text-ink-soft">“{i.message}”</p>
                    {i.status === "pending" ? (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "RESPOND_INTEREST",
                              interestId: i.id,
                              status: "accepted",
                            })
                          }
                          className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
                        >
                          Accept and reveal my name
                        </button>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "RESPOND_INTEREST",
                              interestId: i.id,
                              status: "declined",
                            })
                          }
                          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-faint"
                        >
                          Decline quietly
                        </button>
                      </div>
                    ) : i.status === "accepted" ? (
                      <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-teal-deep">
                        Accepted · {from.name.split(" ")[0]} can now see your
                        full profile
                      </p>
                    ) : (
                      <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
                        Declined · they were not told why
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Swap consent */}
        {accepted && (
          <section className="rounded-xl border border-line bg-card p-6">
            <h2 className="font-display text-xl font-bold">
              Swap conversation
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {employeeById(accepted.fromManagerId).name.split(" ")[0]} has
              open headcount to trade. A swap needs your manager in the
              conversation, which means Priya would learn you want to move.
              Nothing is shown to her unless you allow it.
            </p>
            <label className="mt-4 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={listing.swapConsent}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SWAP_CONSENT",
                    listingId: listing.id,
                    consent: e.target.checked,
                  })
                }
                className="h-4 w-4 accent-teal"
              />
              <span className="text-sm font-medium">
                Allow my manager to be approached about a swap
              </span>
            </label>
          </section>
        )}
      </div>

      <div className="space-y-4">
        <section className="rounded-xl border border-line bg-card p-5">
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
            Who can never see this listing
          </h3>
          <ul className="mt-3 space-y-2">
            {chain.map((m) => (
              <li key={m.id} className="text-sm">
                <span className="font-semibold">{m.name}</span>
                <span className="text-ink-soft"> · {m.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Your entire management chain is excluded automatically, based on
            reporting lines in the HR system. This is not a setting. It cannot
            be turned off by an admin.
          </p>
        </section>

        <DemoNote>
          Everyone else sees this listing without your name, team, or exact
          tenure. Identity is rendered as blocks until you accept a specific
          manager. Switch personas in the top bar to verify each claim.
        </DemoNote>
      </div>
    </div>
  );
}
