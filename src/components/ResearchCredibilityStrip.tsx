import { ASSETS, CYBERASAP_URL } from "../lib/constants";

export function ResearchCredibilityStrip() {
  const badges = [
    "Pre-seed research programme",
    "Online Safety Act 2023",
    "UK Safety Tech sector",
    "GDPR data minimisation",
  ];

  return (
    <section className="border-b border-white/[0.06] bg-aegis-bg-2 py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <a
            href={CYBERASAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition-opacity hover:opacity-80"
            aria-label="CyberASAP programme (opens in new tab)"
          >
            <img
              src={ASSETS.cyberAsap}
              alt="CyberASAP"
              className="h-9 w-auto object-contain brightness-0 invert opacity-90"
            />
          </a>
          <p className="max-w-xs text-xs leading-relaxed text-aegis-slate-lo">
            Supported by the{" "}
            <a
              href={CYBERASAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-aegis-teal-bright underline-offset-2 hover:underline"
            >
              CyberASAP
            </a>{" "}
            programme — cross-institutional research across Manchester and Sheffield.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-md border border-white/[0.08] bg-aegis-card px-2.5 py-1 text-[11px] text-aegis-slate-hi"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
