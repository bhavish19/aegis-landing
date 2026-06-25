import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { CYBERASAP_URL } from "../lib/constants";
import { cn } from "../lib/cn";
import { Panel } from "./ui/Panel";
import { SectionHeading } from "./ui/SectionHeading";

const FAQ_ITEMS: { question: string; answer: ReactNode }[] = [
  {
    question: "How is AEGIS different from passkeys?",
    answer:
      "Passkeys authenticate a user to a specific service. AEGIS proves a compliance predicate (e.g. age eligibility) without revealing identity attributes. Your platform receives a mathematical attestation — not a login credential — and never holds the underlying ID data.",
  },
  {
    question: "Does AEGIS store user identity data?",
    answer:
      "No. AEGIS verifies zk-SNARK proofs statelessly. Only the proof hash transits the network; zero bytes of PII are stored on AEGIS nodes or on your platform's servers as part of the verification flow.",
  },
  {
    question: "Which regulations does AEGIS address?",
    answer:
      "AEGIS is designed for UK Online Safety Act age-assurance obligations, GDPR data-minimisation principles, and sector-specific eligibility checks across social media, age-restricted retail, adult entertainment, online dating, and gambling. Policy IDs map to specific regulatory contexts at integration time.",
  },
  {
    question: "Which industries is AEGIS designed for?",
    answer:
      "Our initial focus is social media platforms, age-restricted e-commerce, adult entertainment and online dating, and online betting and gambling — sectors where regulators demand proof of eligibility without platforms becoming long-term custodians of identity data.",
  },
  {
    question: "What does platform integration look like?",
    answer:
      "Integrators call the AEGIS verification API with a proof hash and policy ID. On success, you receive a signed attestation (JWS) you can audit without storing PII. We provide integration specs and a research briefing to pilot partners.",
  },
  {
    question: "Is AEGIS production-ready?",
    answer: (
      <>
        AEGIS is in active research and pre-seed development through the{" "}
        <a
          href={CYBERASAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-aegis-teal-bright underline-offset-2 hover:underline"
        >
          CyberASAP programme
        </a>
        , with a closed beta for platform partners. Request a pilot via the contact form to
        receive technical documentation and discuss your use case.
      </>
    ),
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-white/[0.06] bg-aegis-bg-2 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="Straight answers on how AEGIS differs from legacy IDV and what integration involves."
          centered
        />

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Panel key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-aegis-teal/50"
                >
                  <span className="text-[15px] font-semibold leading-snug text-aegis-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 text-aegis-teal-bright transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                    <div className="text-sm leading-[1.75] text-aegis-slate">
                      {item.answer}
                    </div>
                  </div>
                )}
              </Panel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
