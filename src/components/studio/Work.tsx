import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { work } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

export function Work() {
  const { t } = useI18n();
  const { isDev } = useMode();

  return (
    <Section id="work" eyebrow={t("work.eyebrow")} title={t("work.title")} lead={t("work.lead")}>
      <ul className="grid gap-6 md:grid-cols-2">
        {work.map((item, i) => (
          <Reveal key={item.id} as="li" delay={i * 70}>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group block overflow-hidden rounded-theme border border-line bg-card shadow-soft transition-transform hover:-translate-y-1",
                isDev && "shadow-none hover:border-accent",
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/90 text-fg opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={cn("font-display text-xl font-semibold", isDev && "text-lg")}>
                    {t(item.titleKey)}
                  </h3>
                  <span className="shrink-0 text-xs text-muted">
                    {item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(item.descKey)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(isDev ? item.stack : item.tagKeys.map((k) => t(k))).map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted",
                        isDev && "rounded font-mono",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
