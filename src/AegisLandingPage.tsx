import { useEffect, useState } from "react";
import { ChevronRight, Lock, Mail, ShieldAlert, Users } from "lucide-react";
import {
  ASSETS,
  CONTACT_EMAIL,
  PARTNER_LOGO_BOX_COMPACT,
  PARTNER_LOGO_SURFACE,
  TAGLINE,
} from "./lib/constants";
import { BentoGrid } from "./components/BentoGrid";
import { FaqSection } from "./components/FaqSection";
import { InstitutionalPartners } from "./components/InstitutionalPartners";
import { LegacyComparison } from "./components/LegacyComparison";
import { PilotContactForm } from "./components/PilotContactForm";
import { PrivacyNotice } from "./components/PrivacyNotice";
import { ProcessFlow } from "./components/ProcessFlow";
import { ResearchCredibilityStrip } from "./components/ResearchCredibilityStrip";
import { SiteHeader } from "./components/SiteHeader";
import { TeamSection } from "./components/TeamSection";
import { WhoItsForSection } from "./components/WhoItsForSection";
import { ZKPSimulator } from "./components/ZKPSimulator";
import { Eyebrow } from "./components/ui/Eyebrow";
import { Panel } from "./components/ui/Panel";
import { SectionHeading } from "./components/ui/SectionHeading";
import { cn } from "./lib/cn";

export default function AegisLandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-aegis-bg pb-20 text-aegis-slate md:pb-0">
      <SiteHeader scrolled={scrolled} />

      <main className="relative z-10">
        <section className="border-b border-white/[0.06] pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm text-aegis-slate-lo">
                University of Manchester × University of Sheffield
              </p>

              <h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-aegis-white">
                AEGIS
              </h1>

              <p className="mt-3 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] italic leading-snug text-aegis-teal-bright">
                {TAGLINE}
              </p>

              <p className="mt-2 text-sm text-aegis-slate-lo">
                Auditable Eligibility Governance &amp; Integrity Service
              </p>

              <p className="mt-6 text-[15px] leading-[1.75] text-aegis-slate">
                We&apos;re building client-side cryptographic middleware that
                keeps identity checks on the user&apos;s device — so platforms
                can satisfy the law without holding the data.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#technology"
                  className="inline-flex items-center gap-2 rounded-md bg-aegis-teal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-aegis-teal-bright"
                >
                  How it works
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] px-5 py-2.5 text-sm font-medium text-aegis-slate-hi transition-colors hover:border-white/25 hover:text-aegis-white"
                >
                  Request a pilot
                </a>
              </div>
            </div>

            <ZKPSimulator />
          </div>
        </section>

        <ResearchCredibilityStrip />

        <section id="problem" className="border-b border-white/[0.06] bg-aegis-bg-2 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="The problem"
              title="Compliance shouldn't mean collecting more data."
              description="Regulators want proof of eligibility. Most vendors respond by centralising biometrics and documents — which creates liability for platforms and friction for users."
            />

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: ShieldAlert,
                  title: "Corporate PII liability",
                  body: "Passport scans and facial imagery end up on central servers. That's a breach waiting to happen — and a GDPR problem under the Online Safety Act.",
                  stat: "Fines up to 10% of global turnover",
                },
                {
                  icon: Users,
                  title: "User abandonment",
                  body: "Multi-step verification, manual review queues, and slow turnarounds kill conversion. Drop-off at the gate is typically around 68%.",
                  stat: "~68% abandonment at verification",
                },
              ].map((card) => (
                <Panel key={card.title}>
                  <div className="p-7">
                    <card.icon className="mb-4 h-5 w-5 text-aegis-teal-bright" />
                    <h3 className="mb-2 text-lg font-semibold text-aegis-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-[1.75]">{card.body}</p>
                    <p className="mt-4 text-xs text-red-400/90">{card.stat}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        <WhoItsForSection />

        <section id="technology" className="border-b border-white/[0.06] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps. No PII leaves the device."
              description="The pipeline below expands on the interactive proof flow in the hero — click each step for technical detail."
              centered
            />
            <ProcessFlow />
          </div>
        </section>

        <LegacyComparison />

        <section id="metrics" className="border-b border-white/[0.06] bg-aegis-bg-2 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading eyebrow="Market context" title="Where AEGIS sits" />
            <BentoGrid />
          </div>
        </section>

        <FaqSection />

        <TeamSection />

        <footer id="contact" className="bg-aegis-bg-2 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-aegis-white">
                Request a pilot integration
              </h2>
              <p className="mt-4 max-w-md text-sm leading-[1.75]">
                We&apos;re working with a small group of platform partners ahead
                of wider release. Leave your details and we&apos;ll send
                integration specs and a research briefing.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-aegis-slate-lo" />
                  <div>
                    <p className="text-sm text-aegis-slate-hi">{CONTACT_EMAIL}</p>
                    <p className="text-xs text-aegis-slate-lo">
                      Technical &amp; research enquiries
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 text-aegis-slate-lo" />
                  <div>
                    <p className="text-sm text-aegis-slate-hi">
                      Confidential — NDA on request
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Panel>
              <PilotContactForm />
            </Panel>
          </div>

          <PrivacyNotice />

          <div className="mx-auto max-w-6xl border-t border-white/[0.06] px-6 pt-8">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center">
              <div className={cn(PARTNER_LOGO_SURFACE, PARTNER_LOGO_BOX_COMPACT)}>
                <img
                  src={ASSETS.aegisLogo}
                  alt="AEGIS"
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <InstitutionalPartners variant="compact" />
            </div>
            <p className="mt-6 text-center text-xs text-aegis-slate-lo">
              © {new Date().getFullYear()} AEGIS. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
