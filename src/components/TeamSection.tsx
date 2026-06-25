import { Linkedin } from "lucide-react";
import { TEAM_MEMBERS } from "../lib/constants";
import { InstitutionalPartners } from "./InstitutionalPartners";
import { Panel } from "./ui/Panel";
import { SectionHeading } from "./ui/SectionHeading";

export function TeamSection() {
  return (
    <section id="leadership" className="border-b border-white/[0.06] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Research team"
          title="Built in the lab, not a slide deck"
          description="Lead investigators from Manchester and Sheffield, with commercial development led from Sheffield."
          centered
        />

        <div className="grid gap-4 md:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <Panel key={member.name}>
              <div className="overflow-hidden">
                <div className="flex h-60 items-end justify-center bg-[#eef1f5]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="max-h-full max-w-full object-contain object-bottom"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-aegis-teal-bright">{member.role}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-aegis-white">
                      {member.name}
                    </h3>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.1] text-aegis-slate-lo transition-colors hover:border-aegis-teal/40 hover:text-aegis-teal-bright"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.75]">{member.bio}</p>
                  <p className="mt-4 text-xs text-aegis-slate-lo">
                    {member.tags.join(" · ")}
                  </p>
                </div>
              </div>
            </Panel>
          ))}
        </div>

        <InstitutionalPartners />
      </div>
    </section>
  );
}
