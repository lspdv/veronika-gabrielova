import { Heart, LifeBuoy, Sparkles, Wrench } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { useI18n } from "@/hooks/useI18n";

const SERVICES = [
  { id: "new", icon: Sparkles, popular: false },
  { id: "cms", icon: LifeBuoy, popular: true },
  { id: "lovable", icon: Wrench, popular: false },
  { id: "care", icon: Heart, popular: false },
] as const;

export function Services() {
  const { t } = useI18n();

  return (
    <Section
      id="services"
      eyebrow={t("services.eyebrow")}
      title={t("services.title")}
      lead={t("services.lead")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal
              key={s.id}
              delay={i * 70}
              className="group relative rounded-[1.75rem] border border-line bg-card p-7 shadow-soft"
            >
              {s.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-fg">
                  {t("services.badge.popular")}
                </span>
              )}
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bg text-fg ring-1 ring-line transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight">
                {t(`services.${s.id}.title`)}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(`services.${s.id}.desc`)}</p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
