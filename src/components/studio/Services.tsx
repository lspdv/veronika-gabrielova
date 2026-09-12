import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "new", popular: false },
  { id: "cms", popular: true },
  { id: "lovable", popular: false },
  { id: "care", popular: false },
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
      <ol className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.id}
            as="li"
            delay={i * 70}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-card p-7 shadow-soft sm:p-8",
              s.popular && "border-accent/40",
            )}
          >
            {/* big faint index number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-light italic leading-none text-fg/[0.045] transition-colors group-hover:text-accent/10"
            >
              0{i + 1}
            </span>

            {/* from → to */}
            <p className="relative flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="text-fg/60 line-through decoration-accent2/70 decoration-[1.5px]">
                {t(`services.${s.id}.from`)}
              </span>
              <span aria-hidden="true" className="text-accent2">
                →
              </span>
              <span className="font-medium text-accent">{t(`services.${s.id}.to`)}</span>
            </p>

            <h3 className="relative mt-6 font-display text-2xl font-semibold leading-tight sm:text-[1.7rem]">
              {t(`services.${s.id}.title`)}
            </h3>
            <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-muted">
              {t(`services.${s.id}.desc`)}
            </p>

            {s.popular && (
              <p className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-fg">
                {t("services.badge.popular")}
              </p>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
