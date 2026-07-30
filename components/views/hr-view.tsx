"use client";

import { DemoNote } from "@/components/demo-note";
import { teamName } from "@/lib/org";
import { useStore } from "@/lib/store";
import { K_ANONYMITY, aggregateByTeam } from "@/lib/visibility";

const CHART_COLOR = "#0d9488";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-card p-5">
      <p className="font-display text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

export function HRView() {
  const { state } = useStore();
  const active = state.listings.filter((l) => l.status === "active");
  const matches = state.interests.filter((i) => i.status === "accepted");
  const days = active.map((l) => l.postedDaysAgo).sort((a, b) => a - b);
  const median = days.length ? days[Math.floor(days.length / 2)] : 0;

  const agg = aggregateByTeam(state.listings);
  const shown = agg.filter((a) => !a.suppressed).sort((a, b) => b.count - a.count);
  const suppressed = agg.filter((a) => a.suppressed);
  const max = Math.max(...shown.map((s) => s.count), 1);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active listings" value={String(active.length)} />
        <StatTile label="Mutual matches" value={String(matches.length)} />
        <StatTile label="Median days listed" value={String(median)} />
        <StatTile label="Transfers last quarter" value="7" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-display text-xl font-bold">
            Active listings by department
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Departments are suppressed below {K_ANONYMITY} listings, or when
            listings cover most of a small team, so totals cannot point at a
            person.
          </p>

          <div className="mt-6 space-y-3">
            {shown.map((row) => (
              <div
                key={row.teamId}
                className="grid grid-cols-[140px_1fr_2ch] items-center gap-3"
                title={`${teamName(row.teamId)}: ${row.count} active listings`}
              >
                <span className="text-sm text-ink-soft">
                  {teamName(row.teamId)}
                </span>
                <div className="h-5 rounded-r bg-paper">
                  <div
                    className="h-5 rounded-r"
                    style={{
                      width: `${(row.count / max) * 100}%`,
                      background: CHART_COLOR,
                    }}
                  />
                </div>
                <span className="text-right font-mono text-sm font-medium">
                  {row.count}
                </span>
              </div>
            ))}
            {suppressed.length > 0 && (
              <div className="grid grid-cols-[140px_1fr_2ch] items-center gap-3">
                <span className="text-sm text-ink-faint">
                  {suppressed.length} other{" "}
                  {suppressed.length === 1 ? "dept" : "depts"}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
                  Suppressed · protecting small groups
                </span>
                <span />
              </div>
            )}
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-xl border border-line bg-card p-5">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              What People sees
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Aggregate demand and flow, never individuals. Enough to spot a
              team losing people before the exit interviews say so, without
              becoming a surveillance tool.
            </p>
          </section>

          <DemoNote>
            Publish or match listings as the other personas and these numbers
            move. The suppressed row is load bearing: a department with one
            listing plus a curious manager equals an unmasked employee. A
            count never renders below the threshold, and never when listings
            cover most of a small team, because three listings on a four
            person team implicates everyone at once.
          </DemoNote>
        </div>
      </div>
    </div>
  );
}
