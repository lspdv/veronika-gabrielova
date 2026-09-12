import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { slackmojis, type Slackmoji } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

const POINTS = [1, 2, 3, 4] as const;

export function Culture() {
  const { t } = useI18n();

  return (
    <Section
      id="culture"
      eyebrow={t("culture.eyebrow")}
      title={t("culture.title")}
      lead={t("culture.lead")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {POINTS.map((n, i) => (
          <Reveal key={n} delay={i * 60} className="rounded-theme border border-line bg-card p-6">
            <h3 className="font-mono text-base font-bold">{t(`culture.point.${n}.title`)}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(`culture.point.${n}.desc`)}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 rounded-theme border border-line bg-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-sm font-semibold">{t("culture.wall.title")}</p>
          <p className="font-mono text-xs text-muted">{t("culture.wall.hint")}</p>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {slackmojis.map((m) => (
            <Reaction key={m.name} item={m} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function Reaction({ item }: { item: Slackmoji }) {
  const [count, setCount] = useState(item.count);
  const [mine, setMine] = useState(false);

  const toggle = () => {
    setMine((v) => !v);
    setCount((c) => (mine ? c - 1 : c + 1));
  };

  return (
    <li>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={mine}
        aria-label={`:${item.name}:`}
        className={cn(
          "group inline-flex h-9 items-center gap-2 rounded-full border px-3 font-mono text-xs transition-colors",
          mine
            ? "border-accent2 bg-accent2/15 text-fg"
            : "border-line bg-bg text-muted hover:border-accent2/60 hover:text-fg",
        )}
      >
        <span className={cn("inline-block text-base leading-none", `emoji-${item.anim}`)} aria-hidden="true">
          {item.emoji}
        </span>
        <span className="hidden sm:inline">:{item.name}:</span>
        <span className={cn("tabular-nums", mine && "text-accent2")}>{count}</span>
      </button>
    </li>
  );
}
