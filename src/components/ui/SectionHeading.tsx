import { cn } from "../../lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.02em] text-aegis-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-[1.75] text-aegis-slate">
          {description}
        </p>
      )}
    </div>
  );
}
