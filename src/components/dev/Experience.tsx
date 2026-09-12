import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { experience, volunteering, type ExperienceItem } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

const ARTICLE_URL =
  "https://cc.cz/z-nemocnice-do-globalniho-technologickeho-startupu-jak-se-z-mlade-zdravotni-sestry-stala-uspesna-vyvojarka/";

function Timeline({ items }: { items: ExperienceItem[] }) {
  const { t } = useI18n();
  return (
    <ol className="relative border-l border-line pl-6 sm:pl-10">
      {items.map((item, i) => (
        <Reveal key={item.id} as="li" delay={i * 50} className="relative pb-10 last:pb-0">
          <span
            className={cn(
              "absolute -left-[calc(1.5rem+5px)] top-2 h-[9px] w-[9px] rounded-sm border border-bg sm:-left-[calc(2.5rem+5px)]",
              item.highlight ? "bg-accent" : "bg-line",
            )}
            aria-hidden="true"
          />
          <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="font-mono text-xs text-muted sm:pt-1">{item.period}</p>
            <div>
              <h3 className="font-mono text-base font-bold leading-snug sm:text-lg">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                  >
                    {item.company}
                    <ArrowUpRight size={14} className="opacity-50" />
                  </a>
                ) : (
                  item.company
                )}
                <span className="text-muted"> — {t(item.roleKey)}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{t(item.descKey)}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-line bg-card px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function Experience() {
  const { t } = useI18n();

  return (
    <Section id="experience" eyebrow={t("exp.eyebrow")} title={t("exp.title")} lead={t("exp.lead")}>
      <Timeline items={experience} />

      <Reveal className="mt-16 max-w-2xl sm:mt-20">
        <p className="mb-3 font-mono text-xs text-accent">$ {t("vol.eyebrow")}</p>
        <h3 className="font-display text-2xl font-bold leading-snug sm:text-3xl">{t("vol.title")}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{t("vol.lead")}</p>
      </Reveal>
      <div className="mt-10 sm:mt-12">
        <Timeline items={volunteering} />
      </div>

      <Reveal className="mt-12 rounded-theme border border-dashed border-line p-5 font-mono text-sm text-muted">
        <span className="text-accent">#</span> {t("exp.origin")}{" "}
        <a
          href={ARTICLE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-fg underline-offset-4 hover:underline"
        >
          {t("exp.origin.link")}
          <ArrowUpRight size={12} />
        </a>
      </Reveal>
    </Section>
  );
}
