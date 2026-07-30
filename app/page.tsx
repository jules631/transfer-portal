import Link from "next/link";

const RULES = [
  {
    title: "The chain is blind",
    body: "A listing is invisible to the seeker's entire reporting line, everyone above them and everyone below them, and to their own teammates. Not a setting. No admin override.",
  },
  {
    title: "The seeker holds the key",
    body: "Everyone else sees an anonymized profile: discipline, level, skills, a tenure band. A name appears only when the seeker accepts a specific manager's interest.",
  },
  {
    title: "Demand is public, supply is protected",
    body: "Hiring managers are always identified. The asymmetry is the point: the person with the safe position carries the exposure.",
  },
  {
    title: "Swaps need consent",
    body: "A manager can be brought into a match involving their own report, with a backfill headcount on the table, only after the employee explicitly allows it.",
  },
];

const STEPS = [
  {
    actor: "Maya",
    title: "A seeker publishes",
    body: "Maya lists her intent to move. Her reporting line and her whole team are excluded before the listing exists anywhere.",
  },
  {
    actor: "Derek",
    title: "A hiring manager browses",
    body: "Derek, hiring for an open role, sees an anonymized card: discipline, level, tenure band. No name, no team.",
  },
  {
    actor: "Derek",
    title: "Interest goes on the record",
    body: "Derek expresses interest under his own name, with his role and a note. Demand is public, so he commits his identity first.",
  },
  {
    actor: "Maya",
    title: "The seeker decides",
    body: "Maya sees exactly who is asking and accepts or declines quietly. A decline tells Derek nothing, and he never learned who she was.",
  },
  {
    actor: "Both",
    title: "The reveal",
    body: "On accept, her name unmasks for Derek alone. They talk. A swap that brings her manager in happens only if Maya allows it.",
  },
  {
    actor: "June",
    title: "The transfer executes",
    body: "It completes as a normal internal transfer. Through it all, People saw only suppressed aggregates, and a failed match leaves no trace.",
  },
];

const OBJECTIONS = [
  {
    q: "Will the counts expose people on small teams?",
    a: "Aggregates suppress a department on two tests: too few listings, or listings covering most of a small team. At real scale the design adds headcount floors, ranges instead of exact numbers, and delayed snapshots with no query interface to compare against over time.",
  },
  {
    q: "Why not just ask the hiring manager directly?",
    a: "Posted openings lag true demand by months, and every hallway conversation is a leak with no rules attached. One listing reaches every manager with present or future demand, and a failed search costs nothing, because nobody ever knew who you were.",
  },
  {
    q: "What stops people from chasing roles above their level?",
    a: "There is no apply button to abuse. Level and tenure come from the HR system, not self description, and demand approaches supply: a manager sees the level on the card before expressing interest, so a mismatch dies before a name is ever revealed.",
  },
  {
    q: "Can the seeker's own teammates see the card?",
    a: "No. Exclusion follows one test: no ability to hire you, plus the context to unmask you. A teammate fails it hardest, since they cannot hire you onto the team you already share and they recognize your skills instantly. Browsing itself also requires demand: supply is visible only to identified hiring managers, never to curious peers.",
  },
  {
    q: "If a manager's whole org is blind, how does anyone move inside a big org?",
    a: "The exclusion is drawn around each seeker, not around the org. A manager of a sibling team inside the same large org is not in your reporting line, so they see your card and can hire you. The only blocked pairing is a hiring manager who sits directly above you, and that case is served by the public side of the market: every open role shows its manager's name, so a seeker can always choose to reveal themselves. The portal blocks discovery, never choice.",
  },
  {
    q: "Does this not just help managers lose their people?",
    a: "It converts resignation surprise into internal transfer. The company keeps the person, and quiet listings on one team become a coaching signal in aggregate instead of a string of exit interviews.",
  },
  {
    q: "What happens to the team that loses someone?",
    a: "The seat vacated by an internal transfer stays with the losing team, and that policy ships with the product, because a manager who loses the headcount along with the person will rationally fight every transfer. With the seat safe, the losing manager's worst case is a hiring process with a real transition window instead of a two week notice after a surprise resignation. The company keeps the person either way.",
  },
  {
    q: "Why does this not already exist?",
    a: "Every incumbent talent marketplace assumes the manager sees everything, so the supply side never lists. The confidential pattern is already proven externally, where open to work hides your signal from your own employer. Nobody has turned it inward, because the organization that has to buy this product is the same one it disciplines.",
  },
];

const PERSONA_CARDS = [
  {
    name: "Maya Chen",
    role: "Wants to move teams",
    sees: "Publishes a listing and sees exactly who can and cannot see her.",
  },
  {
    name: "Derek Osei",
    role: "Hiring manager",
    sees: "Browses movable talent as redacted profiles. His own org is silently excluded.",
  },
  {
    name: "Priya Raman",
    role: "Maya's manager",
    sees: "Nothing. Her view holds zero evidence her report is looking, unless Maya consents to a swap.",
  },
  {
    name: "June Park",
    role: "People team",
    sees: "Aggregates only, suppressed for small counts and small teams. No names, ever.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-deep">
            Transfer Portal · a product demo
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            The safest way to change jobs shouldn&apos;t be{" "}
            <span className="hero-reveal px-2">quitting.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Employees hide the wish to move teams because signaling it is
            career risk, so companies hear about it at resignation. Transfer
            Portal is an internal mobility marketplace built on one idea:
            intent to move stays confidential from your management chain,
            visible to everyone who could hire you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portal"
              className="rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
            >
              Enter the demo
            </Link>
            <a
              href="#rules"
              className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-faint"
            >
              The visibility rules
            </a>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">
          One portal, four views
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          The demo is a persona switcher over a seeded company. The product is
          not the screens. It is the difference between them.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONA_CARDS.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-line bg-card p-5"
            >
              <p className="font-semibold">{p.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-teal-deep">
                {p.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {p.sees}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold">
            How a transfer happens
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            The whole loop, start to finish. Every step is walkable in the
            demo.
          </p>
          <ol className="mt-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0">
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-8 h-full w-px bg-line"
                  />
                )}
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="font-semibold">
                    {s.title}{" "}
                    <span className="ml-1 font-mono text-[11px] font-normal uppercase tracking-widest text-teal-deep">
                      {s.actor}
                    </span>
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="border-t border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold">
            The four visibility rules
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {RULES.map((r) => (
              <div key={r.title}>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objections */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">The objections</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          The hesitations this design has to survive, answered straight.
        </p>
        <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-card">
          {OBJECTIONS.map((o) => (
            <details key={o.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {o.q}
                <span
                  aria-hidden
                  className="text-ink-faint transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {o.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs leading-relaxed text-ink-faint">
          Meridian Systems is fictional and every person in the demo is
          invented. A product concept demo by Jonathan Jules. All state lives
          in the browser and resets on refresh.
        </p>
      </footer>
    </main>
  );
}
