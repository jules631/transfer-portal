"use client";

import Link from "next/link";
import { PERSONAS } from "@/lib/org";
import { useStore } from "@/lib/store";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

export function PersonaBar() {
  const { state, dispatch } = useStore();

  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight">
              Transfer Portal
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              Meridian Systems
            </span>
          </Link>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="font-mono text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink transition-colors"
          >
            Reset demo
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Viewing as">
          {PERSONAS.map((p) => {
            const active = state.persona === p.id;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                onClick={() => dispatch({ type: "SWITCH_PERSONA", persona: p.id })}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors ${
                  active
                    ? "border-teal bg-teal-wash"
                    : "border-line bg-card hover:border-ink-faint"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    active ? "bg-teal text-white" : "bg-paper text-ink-soft"
                  }`}
                >
                  {initials(p.label)}
                </span>
                <span>
                  <span className="block text-sm font-semibold leading-tight">
                    {p.label}
                  </span>
                  <span
                    className={`block text-xs leading-tight ${active ? "text-teal-deep" : "text-ink-faint"}`}
                  >
                    {p.role}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
