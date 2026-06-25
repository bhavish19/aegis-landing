import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Panel({
  children,
  className,
  active = false,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-aegis-card transition-colors duration-200",
        active
          ? "border-aegis-teal/35"
          : "border-white/[0.08] hover:border-white/[0.14]",
        muted && "opacity-50",
        className,
      )}
    >
      {children}
    </div>
  );
}
