import type { ReactNode } from "react";

/**
 * Authorial annotation for the demo viewer. These sit outside the product:
 * the persona on screen never sees them. They explain what the product is
 * deliberately hiding and why.
 */
export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <aside className="border border-amber/30 bg-note rounded-lg p-4 text-sm leading-relaxed text-ink-soft">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber block mb-1.5">
        Demo note · not part of the product
      </span>
      {children}
    </aside>
  );
}
