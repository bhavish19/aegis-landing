import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 block text-[13px] font-medium text-aegis-teal-bright">
      {children}
    </span>
  );
}
