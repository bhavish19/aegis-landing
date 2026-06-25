import { Panel } from "./ui/Panel";

const BENTO_CARDS = [
  {
    id: "margins",
    span: "col-span-12 lg:col-span-7",
    label: "Software margins",
    value: "Up to 90%",
    description:
      "Proving runs on the user's device, not your servers. That removes the cost of server-side AI checks and manual review — and changes the unit economics.",
  },
  {
    id: "tam",
    span: "col-span-12 sm:col-span-6 lg:col-span-5",
    label: "Total addressable market",
    value: "£12.8B",
    description: "Global identity verification",
  },
  {
    id: "sam",
    span: "col-span-12 sm:col-span-6 lg:col-span-4",
    label: "Serviceable market",
    value: "£1.8B",
    description: "Privacy-preserving age assurance",
  },
  {
    id: "platforms",
    span: "col-span-12 lg:col-span-8",
    label: "Near-term demand",
    value: "400 platforms",
    description:
      "UK platform SMEs in social media, age-restricted e-commerce, adult entertainment, online dating, and gambling — our initial integration cohort within the £704M UK safety tech sector.",
  },
] as const;

export function BentoGrid() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {BENTO_CARDS.map((card) => (
        <Panel key={card.id} className={card.span}>
          <div className="h-full p-7">
            <p className="mb-2 text-sm text-aegis-slate-lo">{card.label}</p>
            <p className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-none tracking-[-0.02em] text-aegis-white">
              {card.value}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-aegis-slate">
              {card.description}
            </p>
          </div>
        </Panel>
      ))}
    </div>
  );
}
