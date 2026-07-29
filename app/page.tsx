import Link from "next/link";

const RULES = [
  {
    title: "The chain is blind",
    body: "A listing is invisible to the seeker's entire management chain, all the way up. Not a setting. No admin override.",
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
    sees: "Aggregates only, suppressed below three per group. No names, ever.",
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
