import { Dices, Heart, Share2, ShoppingCart } from "lucide-react";
import { Panel } from "./ui/Panel";
import { SectionHeading } from "./ui/SectionHeading";

const PLATFORM_AUDIENCES = [
  {
    icon: Share2,
    title: "Social media platforms",
    body: "Age assurance and eligibility checks without storing passport scans or facial biometrics at scale.",
  },
  {
    icon: ShoppingCart,
    title: "Age-restricted e-commerce",
    body: "Verify restricted goods — alcohol, vape, and age-rated products — at checkout without centralising customer identity data.",
  },
  {
    icon: Heart,
    title: "Adult entertainment and online dating",
    body: "Gate mature content and dating access with privacy-preserving proofs rather than document uploads.",
  },
  {
    icon: Dices,
    title: "Online betting and gambling",
    body: "Satisfy age and eligibility requirements for wagering flows without building a centralised identity honeypot.",
  },
] as const;

export function WhoItsForSection() {
  return (
    <section id="platforms" className="border-b border-white/[0.06] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for platforms facing urgent compliance deadlines"
          description="AEGIS targets social media, age-restricted e-commerce, adult entertainment and online dating, and online betting and gambling — high-risk sectors driving demand in the £704M UK safety tech market."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {PLATFORM_AUDIENCES.map((item) => (
            <Panel key={item.title}>
              <div className="p-6">
                <item.icon className="mb-3 h-5 w-5 text-aegis-teal-bright" />
                <h3 className="text-base font-semibold text-aegis-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.75] text-aegis-slate">
                  {item.body}
                </p>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
