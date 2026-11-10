import { ASSETS, PARTNER_LOGO_BOX_COMPACT, PARTNER_LOGO_BOX_FULL, PARTNER_LOGO_SURFACE } from "../lib/constants";
import { cn } from "../lib/cn";

function UniversityLogoImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain object-center"
    />
  );
}

export function InstitutionalPartners({ variant = "full" }: { variant?: "full" | "compact" }) {
  const logos = [
    {
      id: "sheffield" as const,
      src: ASSETS.universitySheffield,
      alt: "University of Sheffield",
      name: "University of Sheffield",
    },
  ];

  const logoBoxClass =
    variant === "compact" ? PARTNER_LOGO_BOX_COMPACT : PARTNER_LOGO_BOX_FULL;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {logos.map((logo) => (
          <div key={logo.name} className={cn(PARTNER_LOGO_SURFACE, logoBoxClass)}>
            <UniversityLogoImage src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-14 border-t border-white/[0.06] pt-12">
      <p className="mb-8 text-center text-sm text-aegis-slate">
        A University of Sheffield research project
      </p>

      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        {logos.map((logo) => (
          <div key={logo.name} className="flex w-full flex-col items-center gap-3">
            <div className={cn(PARTNER_LOGO_SURFACE, logoBoxClass)}>
              <UniversityLogoImage src={logo.src} alt={logo.alt} />
            </div>
            <p className="text-center text-xs text-aegis-slate-lo">{logo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
