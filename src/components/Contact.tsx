import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
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
      <Reveal
        className={cn(
          "flex flex-col gap-6 rounded-[1.75rem] border border-line bg-card p-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-10",
          isDev && "rounded-theme shadow-none",
        )}
      >
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
        <ul className="flex flex-wrap gap-2 sm:justify-end">
          <ContactLink href={site.linkedin} icon={<LinkedinIcon size={16} />} label={t("contact.linkedin")} />
          <ContactLink href={site.github} icon={<GithubIcon size={16} />} label={t("contact.github")} />
        </ul>
      </Reveal>
    </Section>
  );
}

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-fg"
      >
        {icon}
        {label}
        <ArrowUpRight size={14} className="opacity-60" />
      </a>
    </li>
  );
}
