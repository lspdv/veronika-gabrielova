import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { useI18n } from "@/hooks/useI18n";

const STEPS = [1, 2, 3, 4] as const;

export function Process() {
  const { t } = useI18n();

  return (
    <Section id="process" eyebrow={t("process.eyebrow")} title={t("process.title")}>
      <ol className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((n, i) => (
          <Reveal key={n} as="li" delay={i * 80} className="bg-card p-7">
            <span className="font-display text-5xl font-light italic text-accent">0{n}</span>
            <h3 className="mt-5 font-display text-xl font-semibold">{t(`process.${n}.title`)}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(`process.${n}.desc`)}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
