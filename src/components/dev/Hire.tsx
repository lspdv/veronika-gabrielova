import { ArrowUpRight, Briefcase, PartyPopper, Puzzle } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { formatCzk, mailto } from "@/lib/utils";

const OPTIONS = [
  { id: "contract", icon: Briefcase },
  { id: "project", icon: Puzzle },
  { id: "culture", icon: PartyPopper },
] as const;

export function Hire() {
  const { t } = useI18n();
  const b = site.business;

  return (
    <Section id="hire" eyebrow={t("hire.eyebrow")} title={t("hire.title")}>
      <div className="grid gap-4 md:grid-cols-3">
        {OPTIONS.map((o, i) => {
          const Icon = o.icon;
          return (
            <Reveal key={o.id} delay={i * 60} className="flex flex-col rounded-theme border border-line bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded border border-line bg-bg text-accent2">
                <Icon size={18} />
              </span>
              <h3 className="mt-5 font-mono text-base font-bold">{t(`hire.${o.id}.title`)}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{t(`hire.${o.id}.desc`)}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-6 flex flex-col gap-5 rounded-theme border border-line bg-card p-6 font-mono text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-bold">{t("hire.rate", { rate: formatCzk(site.hourlyRateCzk) })}</p>
          <p className="mt-1 text-xs text-muted">{t("hire.rate.note")}</p>
          <p className="mt-3 text-xs text-muted">
            {t("pricing.invoice.ico")} {b.ico} · {t("pricing.invoice.dic")} {b.dic} · {b.street}, {b.city}
          </p>
        </div>
        <a
          href={mailto(site.email, t("contact.subject.dev"))}
          className="rainbow-border inline-flex h-11 shrink-0 items-center gap-2 rounded-theme bg-card px-5 font-semibold transition-colors hover:bg-accent hover:text-accent-fg"
        >
          {t("hire.cta")}
          <ArrowUpRight size={16} />
        </a>
      </Reveal>
    </Section>
  );
}
