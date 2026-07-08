import type { ReactNode } from "react";

/** Device-like frame: 430px max on desktop, full-width on mobile. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-surface">
      <div className="app-shell">{children}</div>
    </div>
  );
}
