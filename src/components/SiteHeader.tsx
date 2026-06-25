import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import { NAV_LINKS } from "../lib/constants";
import { AegisLogo } from "./ui/AegisLogo";

export function SiteHeader({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
          scrolled || menuOpen
            ? "border-white/[0.08] bg-aegis-bg/95 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a href="#" className="flex shrink-0 items-center gap-3" onClick={closeMenu}>
            <div className="rounded-md bg-white px-2 py-1">
              <AegisLogo compact />
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-aegis-slate transition-colors hover:text-aegis-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-md border border-white/[0.12] px-4 py-2 text-sm font-medium text-aegis-slate-hi transition-colors hover:border-aegis-teal/40 hover:text-aegis-white sm:inline-flex"
            >
              Join closed beta
            </a>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.12] text-aegis-slate-hi transition-colors hover:border-aegis-teal/40 hover:text-aegis-white lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/[0.08] bg-aegis-bg px-6 py-4 lg:hidden">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2.5 text-sm text-aegis-slate-hi transition-colors hover:bg-white/[0.04] hover:text-aegis-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-aegis-teal px-4 py-3 text-sm font-medium text-white"
            >
              Join closed beta
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        )}
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-aegis-bg/95 p-3 backdrop-blur-md md:hidden">
        <a
          href="#contact"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-aegis-teal px-4 py-3 text-sm font-medium text-white"
        >
          Request pilot integration
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}
