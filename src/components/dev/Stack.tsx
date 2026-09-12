import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { skills } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";

export function Stack() {
  const { t } = useI18n();

  return (
    <Section id="stack" eyebrow={t("stack.eyebrow")} title={t("stack.title")}>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.titleKey} delay={i * 60} className="rounded-theme border border-line bg-card p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent2">
              <span className="text-muted">"</span>
              {t(group.titleKey)}
              <span className="text-muted">": [</span>
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-line bg-bg px-2.5 py-1 font-mono text-[13px] transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-muted">]</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
