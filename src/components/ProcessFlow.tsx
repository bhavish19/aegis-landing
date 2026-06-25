import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ShieldAlert,
  Smartphone,
} from "lucide-react";
import { cn } from "../lib/cn";
import { Panel } from "./ui/Panel";

const FLOW_STEPS = [
  {
    id: 1,
    title: "On-Device Attestation",
    icon: Smartphone,
    summary: "ID processed locally — credential never leaves the device.",
    detail:
      "The user's edge device reads local credential state and generates witness variables entirely in-memory. Raw biometric data, passport imagery, and PII are never serialised, transmitted, or persisted beyond the secure enclave. A zk-SNARK proof hash is produced on-device before anything crosses the network.",
    engineerPoints: [
      "Witness vector w is derived from local credential state inside the device TEE or secure enclave — never written to disk as plaintext.",
      "Proving key (pk) is distributed to the client; structured reference string (SRS) is pinned at build time.",
      "Circuit C encodes the compliance predicate (e.g. age ≥ 18) without revealing the underlying attribute value.",
      "Output: proof π and public inputs x — serialised as a compact proof hash for transmission.",
    ],
  },
  {
    id: 2,
    title: "Zero-Knowledge Routing",
    icon: ShieldAlert,
    summary: "Only the proof hash reaches AEGIS — no PII shared.",
    detail:
      "AEGIS stateless middleware receives a compact zk-SNARK proof hash — not identity data. The cloud layer stores and verifies the mathematical proof with zero bytes of PII and no GDPR data-controller obligations for personal data.",
    engineerPoints: [
      "AEGIS node runs verify(pk, x, π) using the same circuit C — no witness access required server-side.",
      "Verification is stateless: no user identity, document images, or biometric templates are persisted.",
      "Proof hash is the only payload crossing the network boundary; TLS terminates at the AEGIS edge.",
      "Invalid or replayed proofs are rejected without leaking why verification failed (no oracle attacks).",
    ],
  },
  {
    id: 3,
    title: "Compliant Access Granted",
    icon: CheckCircle,
    summary: "Your platform queries AEGIS and receives a validity signal.",
    detail:
      "The integrating platform submits the proof hash to the AEGIS node for validation — never the user's ID. On success, the platform receives a tamper-evident compliance attestation. Statutory age-assurance and identity requirements are met without checkout friction or a centralised honeypot.",
    engineerPoints: [
      "Platform integration: POST /verify with { proofHash, policyId } — response { valid, attestationJws }.",
      "Attestation is a signed JWT/JWS bound to your platform's API key — auditable without storing PII.",
      "Policy IDs map to regulatory contexts (Online Safety Act age gate, restricted goods, KYC tier-0).",
      "Webhook optional for async audit trails; zero retention of identity artefacts on your servers.",
    ],
  },
] as const;

function FlowNode({
  title,
  subtitle,
  active,
}: {
  title: string;
  subtitle: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "w-[148px] shrink-0 rounded-lg border px-3 py-5 text-center transition-all duration-300 sm:w-[160px]",
        active
          ? "border-aegis-teal/45 bg-aegis-teal/[0.06] opacity-100"
          : "border-white/[0.12] opacity-50",
      )}
    >
      <p className="text-sm font-medium text-aegis-white">{title}</p>
      <p className="mt-1 text-[11px] leading-snug text-aegis-slate">{subtitle}</p>
    </div>
  );
}

function FlowConnector({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex min-w-[72px] flex-1 flex-col justify-center px-1 sm:px-2">
      <div
        className={cn(
          "flex items-center transition-colors duration-300",
          active ? "text-aegis-teal" : "text-white/20",
        )}
      >
        <div className="h-px flex-1 bg-current" />
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      </div>
      <p
        className={cn(
          "mt-2 text-center text-[10px] leading-tight transition-colors duration-300",
          active ? "text-aegis-teal-bright" : "text-aegis-slate-lo",
        )}
      >
        {label}
      </p>
    </div>
  );
}

export function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(1);
  const [engineerOpen, setEngineerOpen] = useState(false);
  const current = FLOW_STEPS.find((s) => s.id === activeStep)!;

  useEffect(() => {
    setEngineerOpen(false);
  }, [activeStep]);

  return (
    <div className="space-y-8">
      <Panel className="border-aegis-teal/25 bg-aegis-teal/[0.04]">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-aegis-slate-hi">
            This is the same three-step flow as the{" "}
            <a
              href="#proof-flow"
              className="font-medium text-aegis-teal-bright underline-offset-2 hover:underline"
            >
              interactive demo above
            </a>
            : device attestation → AEGIS proof routing → platform validation.
          </p>
          <a
            href="#proof-flow"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-aegis-teal-bright transition-colors hover:text-aegis-teal-glow"
          >
            Run the demo
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="border-b border-white/[0.06] px-5 py-4 md:px-7">
          <p className="text-sm text-aegis-slate-lo">Data flow</p>
          <p className="mt-0.5 text-xs text-aegis-slate-lo/80">
            Matches the interactive demo: device → proof hash → AEGIS → your platform.
          </p>
        </div>

        <div className="px-4 py-8 md:px-8">
          <div className="hidden md:block">
            <div className="relative mx-auto max-w-4xl">
              <div className="flex items-center">
                <FlowNode
                  title="User device"
                  subtitle="PII stays here"
                  active={activeStep === 1}
                />
                <FlowConnector label="zk-SNARK proof" active={activeStep >= 2} />
                <FlowNode
                  title="AEGIS"
                  subtitle="verifies proof only"
                  active={activeStep === 2}
                />
                <FlowConnector label="attestation" active={activeStep >= 3} />
                <FlowNode
                  title="Platform"
                  subtitle="access granted"
                  active={activeStep === 3}
                />
              </div>
              <div className="mt-5 flex max-w-[148px] flex-col items-center sm:max-w-[160px]">
                <div className="h-3 w-px bg-aegis-teal/40" />
                <div className="mt-1 w-full border-t border-dashed border-aegis-teal/35" />
                <p className="mt-2 text-center text-[10px] leading-tight text-aegis-teal-bright">
                  No PII shared
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-0 md:hidden">
            {[
              { label: "User device", sub: "PII stays here", step: 1 },
              {
                label: "zk-SNARK proof",
                sub: "math only — no PII",
                step: 2,
                connector: true,
              },
              { label: "AEGIS middleware", sub: "verifies proof", step: 2 },
              { label: "Attestation", sub: "signed signal", step: 3, connector: true },
              { label: "Platform", sub: "access granted", step: 3 },
            ].map((node, i) => (
              <div key={`${node.label}-${i}`}>
                {node.connector && (
                  <div className="flex justify-center py-1">
                    <div
                      className={cn(
                        "h-6 w-px transition-colors",
                        activeStep >= node.step ? "bg-aegis-teal" : "bg-white/15",
                      )}
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg border px-4 py-3 transition-colors",
                    activeStep === node.step
                      ? "border-aegis-teal/40 bg-aegis-teal/5"
                      : "border-white/[0.08]",
                  )}
                >
                  <p className="text-sm font-medium text-aegis-white">{node.label}</p>
                  <p className="text-xs text-aegis-slate-lo">{node.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-3 md:grid-cols-3 md:items-stretch">
        {FLOW_STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className="flex h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-aegis-teal/50"
            >
              <Panel active={isActive} className="h-full w-full">
                <div className="flex h-full min-h-[132px] flex-col p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-aegis-teal-bright" : "text-aegis-slate-lo",
                      )}
                    />
                    <span className="text-xs text-aegis-slate-lo">
                      Step {step.id} of 3
                    </span>
                  </div>
                  <h3 className="min-h-[2.75rem] text-[15px] font-semibold leading-snug text-aegis-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-aegis-slate">
                    {step.summary}
                  </p>
                </div>
              </Panel>
            </button>
          );
        })}
      </div>

      <Panel active>
        <div className="p-6 md:p-7">
          <p className="mb-2 text-xs text-aegis-slate-lo">
            Step {activeStep} — {current.title}
          </p>
          <p className="max-w-3xl text-sm leading-[1.75] text-aegis-slate-hi">
            {current.detail}
          </p>

          <button
            type="button"
            onClick={() => setEngineerOpen((open) => !open)}
            aria-expanded={engineerOpen}
            className="mt-5 flex w-full items-center justify-between gap-3 rounded-md border border-white/[0.08] bg-aegis-bg/50 px-4 py-3 text-left transition-colors hover:border-aegis-teal/30 hover:bg-aegis-teal/[0.04]"
          >
            <span className="text-sm font-medium text-aegis-white">
              Engineer detail
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-aegis-teal-bright transition-transform duration-200",
                engineerOpen && "rotate-180",
              )}
            />
          </button>

          {engineerOpen && (
            <ul className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
              {current.engineerPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-[13px] leading-relaxed text-aegis-slate"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aegis-teal-bright" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>
    </div>
  );
}
