import { ArrowUpRight } from "lucide-react";

import { LinkedinIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { useContactSheet } from "@/hooks/useContactSheet";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

export function Contact() {
  const { t } = useI18n();
  const { isDev } = useMode();
  const { openSheet } = useContactSheet();

  return (
    <Section
      id="contact"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      lead={t("contact.lead")}
    >
      <Reveal className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openSheet}
          className={cn(
            "inline-flex h-14 items-center justify-center rounded-full bg-fg px-8 text-base font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-fg",
            isDev && "rainbow-border rounded-theme bg-card text-fg hover:bg-accent",
          )}
        >
          {t("contact.cta")}
        </button>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-fg"
        >
          <LinkedinIcon size={16} />
          {t("contact.linkedin")}
          <ArrowUpRight size={14} className="opacity-60" />
        </a>
      </Reveal>
    </Section>
  );
}
