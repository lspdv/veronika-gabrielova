import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { useContactSheet } from "@/hooks/useContactSheet";
import { useI18n } from "@/hooks/useI18n";
import { formatCzk } from "@/lib/utils";

export function Pricing() {
  const { t } = useI18n();
  const { openSheet } = useContactSheet();
  const rate = site.hourlyRateCzk;
  const vat = site.vatRatePct;
  const rateWithVat = Math.round(rate * (1 + vat / 100));
  const b = site.business;

  return (
    <Section
      id="pricing"
      eyebrow={t("pricing.eyebrow")}
      title={t("pricing.title")}
      lead={t("pricing.lead")}
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="flex flex-col justify-between rounded-[1.75rem] bg-fg p-8 text-bg shadow-soft sm:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
              {t("pricing.rate.label")}
            </p>
            <p className="mt-4 font-display text-6xl font-semibold leading-none tracking-tight sm:text-7xl">
              {t("pricing.rate.value", { rate: formatCzk(rate) })}
            </p>
            <p className="mt-2 text-base opacity-80">{t("pricing.rate.unit")}</p>
            <p className="mt-1 text-sm opacity-60">
              {t("pricing.rate.withVat", { rateWithVat: formatCzk(rateWithVat), vat })}
            </p>
          </div>
          <div className="mt-10 border-t border-bg/20 pt-6">
            <button
              type="button"
              onClick={openSheet}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              {t("pricing.cta")}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={80} className="rounded-[1.75rem] border border-line bg-card p-7 shadow-soft">
            <h3 className="font-display text-xl font-semibold">
              <span className="mr-2 text-accent2" aria-hidden="true">
                ✓
              </span>
              {t("pricing.vat.title")}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{t("pricing.vat.desc", { vat })}</p>
          </Reveal>

          <Reveal delay={140} className="rounded-[1.75rem] border border-line bg-card p-7 shadow-soft">
            <h3 className="font-display text-xl font-semibold">
              <span className="mr-2 text-accent2" aria-hidden="true">
                ✓
              </span>
              {t("pricing.invoice.title")}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{t("pricing.invoice.desc")}</p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
              <dt className="text-muted">{t("pricing.invoice.ico")}</dt>
              <dd className="font-mono">{b.ico}</dd>
              <dt className="text-muted">{t("pricing.invoice.dic")}</dt>
              <dd className="font-mono">{b.dic}</dd>
            </dl>
            <a
              href={`https://ares.gov.cz/ekonomicke-subjekty?ico=${b.ico}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t("pricing.invoice.registry")}
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
