import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { skills, softSkills, type SoftSkill } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";

const BAR_CELLS = 20;

export function Stack() {
  const { t } = useI18n();

  return (
    <Section
      id="stack"
      eyebrow={t("stack.eyebrow")}
      title={t("stack.title")}
      lead={t("stack.lead")}
    >
      {/* Character stats — soft skills */}
      <Reveal className="rounded-theme border border-line bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-pixel text-sm text-accent sm:text-base">{t("stack.stats.title")}</h3>
          <p className="font-mono text-xs text-muted">{t("stack.stats.hint")}</p>
        </div>
        <ul className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {softSkills.map((s, i) => (
            <Reveal key={s.key} as="li" delay={i * 40}>
              <StatRow skill={s} />
            </Reveal>
          ))}
        </ul>
      </Reveal>

      {/* Inventory — tech */}
      <div className="mt-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 px-1">
          <h3 className="font-pixel text-sm text-accent2 sm:text-base">{t("stack.inventory.title")}</h3>
          <p className="font-mono text-xs text-muted">{t("stack.inventory.hint")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.titleKey} delay={i * 60} className="rounded-theme border border-line bg-card p-6">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent2">
                <span className="text-muted">"</span>
                {t(group.titleKey)}
                <span className="text-muted">": [</span>
              </h4>
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
      </div>
    </Section>
  );
}

function StatRow({ skill }: { skill: SoftSkill }) {
  const { t } = useI18n();
  const filled = Math.round((skill.level / 100) * BAR_CELLS);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-sm font-bold">
          <span aria-hidden="true">{skill.emoji}</span>
          {t(`${skill.key}.name`)}
        </p>
        <span className="font-pixel text-[11px] text-accent">{skill.level}</span>
      </div>
      <div
        className="mt-2 grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${BAR_CELLS}, minmax(0, 1fr))` }}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
        aria-label={t(`${skill.key}.name`)}
      >
        {Array.from({ length: BAR_CELLS }, (_, i) => (
          <span
            key={i}
            className="h-2.5 rounded-[2px]"
            style={{
              background:
                i < filled
                  ? `linear-gradient(90deg, var(--accent), var(--accent-2))`
                  : "var(--line)",
              backgroundSize: `${BAR_CELLS * 100}% 100%`,
              backgroundPosition: `${(i / (BAR_CELLS - 1)) * 100}% 0`,
            }}
          />
        ))}
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{t(`${skill.key}.desc`)}</p>
    </div>
  );
}
