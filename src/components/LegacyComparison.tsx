import { Check, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Panel } from "./ui/Panel";
import { SectionHeading } from "./ui/SectionHeading";

const COMPARISON_ROWS = [
  {
    label: "PII stored on your servers",
    legacy: "Passport scans, facial imagery, documents",
    aegis: "None — proofs only",
  },
  {
    label: "Verification approach",
    legacy: "Manual review and biometric matching",
    aegis: "Cryptographic proof validation",
  },
  {
    label: "GDPR data-controller burden",
    legacy: "High — you hold sensitive identity data",
    aegis: "Minimal — stateless verification",
  },
  {
    label: "Checkout / onboarding friction",
    legacy: "Multi-step flows, ~68% drop-off",
    aegis: "Single-action edge proof",
  },
  {
    label: "Server-side AI processing cost",
    legacy: "Biometric matching at scale",
    aegis: "Proving on user device",
  },
  {
    label: "Breach exposure surface",
    legacy: "Centralised identity honeypot",
    aegis: "No PII vault to breach",
  },
] as const;

export function LegacyComparison() {
  return (
    <section id="compare" className="border-b border-white/[0.06] bg-aegis-bg-2 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why AEGIS"
          title="Legacy IDV vs. edge-native verification"
          description="The architectural difference is not incremental — it removes the data liability entirely."
          centered
        />

        <Panel className="overflow-hidden">
          <div className="hidden md:grid md:grid-cols-[1.1fr_1fr_1fr] md:border-b md:border-white/[0.06]">
            <div className="px-6 py-4 text-sm font-medium text-aegis-slate-lo" />
            <div className="border-l border-white/[0.06] px-6 py-4 text-sm font-medium text-aegis-slate-hi">
              Legacy IDV
            </div>
            <div className="border-l border-white/[0.06] bg-aegis-teal/[0.04] px-6 py-4 text-sm font-medium text-aegis-teal-bright">
              AEGIS
            </div>
          </div>

          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                "grid gap-3 border-white/[0.06] px-5 py-5 md:grid-cols-[1.1fr_1fr_1fr] md:gap-0 md:px-0 md:py-0",
                i > 0 && "border-t",
              )}
            >
              <div className="text-sm font-medium text-aegis-white md:px-6 md:py-4">
                {row.label}
              </div>
              <div className="rounded-md border border-white/[0.06] bg-aegis-bg/40 px-4 py-3 md:rounded-none md:border-0 md:border-l md:bg-transparent md:px-6 md:py-4">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-aegis-slate-lo md:hidden">
                  Legacy IDV
                </p>
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/80" />
                  <p className="text-sm text-aegis-slate">{row.legacy}</p>
                </div>
              </div>
              <div className="rounded-md border border-aegis-teal/20 bg-aegis-teal/[0.05] px-4 py-3 md:rounded-none md:border-0 md:border-l md:px-6 md:py-4">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-aegis-teal-bright md:hidden">
                  AEGIS
                </p>
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <p className="text-sm text-aegis-slate-hi">{row.aegis}</p>
                </div>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </section>
  );
}
