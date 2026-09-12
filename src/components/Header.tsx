import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { DevToggle } from "@/components/DevToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

const STUDIO_NAV = [
  { href: "#services", key: "nav.services" },
  { href: "#work", key: "nav.work" },
  { href: "#process", key: "nav.process" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#contact", key: "nav.contact" },
];

const DEV_NAV = [
  { href: "#experience", key: "nav.experience" },
  { href: "#stack", key: "nav.stack" },
  { href: "#culture", key: "nav.culture" },
  { href: "#hire", key: "nav.hire" },
  { href: "#contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useI18n();
  const { isDev } = useMode();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = isDev ? DEV_NAV : STUDIO_NAV;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-md" : "",
      )}
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className={cn(
            "whitespace-nowrap font-display text-lg font-semibold tracking-tight",
            isDev && "font-mono text-base",
          )}
        >
          {isDev ? (
            <span>
              <span className="text-accent2">~</span>/veronika{" "}
              <span className="text-accent">$</span>
            </span>
          ) : (
            <span>
              Veronika <span className="hidden italic font-light sm:inline">Gabrielová</span>
              <span className="italic font-light sm:hidden">G.</span>
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                "text-sm text-muted transition-colors hover:text-fg",
                isDev && "font-mono text-[13px]",
              )}
            >
              {isDev ? `./${t(item.key).toLowerCase()}` : t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <DevToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-theme border border-line md:hidden"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line md:hidden"
          style={{ backgroundColor: "var(--bg)" }}
          aria-label="Mobile"
        >
          <ul className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn("block py-3 text-base", isDev && "font-mono")}
                >
                  {isDev ? `./${t(item.key).toLowerCase()}` : t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
