import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { PixelDev } from "@/components/PixelDev";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { mailto, yearsSince } from "@/lib/utils";

const STATS = [
  { value: () => `${yearsSince(site.careerStartYear)}+`, key: "dev.hero.stat.years" },
  { value: () => "3", key: "dev.hero.stat.products" },
  { value: () => "30+", key: "dev.hero.stat.mentees" },
  { value: () => "200+", key: "dev.hero.stat.emoji" },
];

function useTyped(text: string, speed = 28) {
  const [typed, setTyped] = useState({ text, length: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setTyped((prev) => {
        const length = prev.text === text ? Math.min(prev.length + 1, text.length) : 1;
        if (length >= text.length) clearInterval(id);
        return { text, length };
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return typed.text === text ? text.slice(0, typed.length) : "";
}

export function DevHero() {
  const { t } = useI18n();
  const typed = useTyped(t("dev.hero.role"));

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="container-x">
        <Reveal>
          <div className="mb-8 -ml-5 sm:ml-0">
            <PixelDev scale={4} className="sm:hidden" />
            <PixelDev scale={6} className="hidden sm:flex" />
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal delay={60}>
              <div className="rounded-theme border border-line bg-card/70 p-5 font-mono text-sm leading-relaxed">
                <p className="text-muted">
                  <span className="text-accent">$</span> {t("dev.hero.prompt")}
                </p>
                <p className="mt-1 text-lg font-bold">{t("dev.hero.name")}</p>
                <p className="cursor-blink text-accent2">{typed}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-8 font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                {t("dev.hero.title")}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
                {t("dev.hero.lead", { years: yearsSince(site.careerStartYear) })}
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={mailto(site.email, t("contact.subject.dev"))}
                className="rainbow-border inline-flex h-11 items-center gap-2 rounded-theme bg-card px-5 font-mono text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-fg"
              >
                {t("dev.hero.cta.primary")}
                <ArrowUpRight size={16} />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-theme border border-line px-5 font-mono text-sm transition-colors hover:border-accent2"
              >
                {t("dev.hero.cta.secondary")}
                <ArrowUpRight size={16} className="opacity-60" />
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#4ff05a] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ff05a]" />
                </span>
                {t("dev.hero.available")}
              </span>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-theme border border-line bg-line">
              {STATS.map((s) => (
                <div key={s.key} className="bg-card p-5">
                  <dd className="font-pixel text-xl leading-none text-accent sm:text-2xl">{s.value()}</dd>
                  <dt className="mt-3 font-mono text-xs text-muted">{t(s.key)}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
