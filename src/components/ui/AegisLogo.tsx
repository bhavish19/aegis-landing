import { cn } from "../../lib/cn";
import { ASSETS } from "../../lib/constants";

export function AegisLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <img
      src={ASSETS.aegisLogo}
      alt="AEGIS — Auditable Eligibility Governance & Integrity Service"
      className={cn(
        "object-contain object-left",
        compact ? "h-9 w-auto max-w-[140px]" : "h-auto w-full max-w-[280px]",
        className,
      )}
    />
  );
}
