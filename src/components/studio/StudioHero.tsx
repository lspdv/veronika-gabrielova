import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { mailto, yearsSince } from "@/lib/utils";

export function StudioHero() {
  const { t } = useI18n();
  const years = yearsSince(site.careerStartYear);

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-24">
      <div className="container-x grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1 text-xs font-medium text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {t("studio.hero.eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="font-display text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              {t("studio.hero.title.1")}
              <br />
              <span className="italic font-light text-accent2">{t("studio.hero.title.2")}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("studio.hero.lead", { years })}
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={mailto(site.email, t("contact.subject.studio"))}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-fg"
            >
              {t("studio.hero.cta.primary")}
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-card/60 px-6 text-sm font-medium transition-colors hover:border-fg"
            >
              {t("studio.hero.cta.secondary")}
              <ArrowDown size={16} />
            </a>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span>{t("studio.hero.fact.years", { years })}</span>
            <span aria-hidden="true">·</span>
            <span>{t("studio.hero.fact.saas")}</span>
            <span aria-hidden="true">·</span>
            <span>{t("studio.hero.fact.lang")}</span>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative rounded-[2rem] border border-line bg-card p-6 shadow-soft">
            <div className="absolute -right-4 -top-4 flex h-14 w-14 rotate-6 items-center justify-center rounded-2xl bg-accent text-accent-fg shadow-soft">
              <Sparkles size={22} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {t("studio.hero.card.label")}
            </p>
            <p className="mt-3 font-display text-2xl font-semibold leading-tight">
              {t("studio.hero.card.status")}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["saltedsoul", "vladokniz", "casa-la-paz"].map((id) => (
                <div
                  key={id}
                  className="aspect-[4/3] overflow-hidden rounded-xl border border-line bg-bg"
                >
                  <img
                    src={`/work/${id}.jpg`}
                    alt=""
                    loading="eager"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <div className="text-sm">
                <p className="font-semibold">{site.name}</p>
                <p className="text-muted">{site.location}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
