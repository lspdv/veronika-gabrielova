import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState, type ReactNode } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import { cn, mailto } from "@/lib/utils";

export function Contact() {
  const { t } = useI18n();
  const { isDev } = useMode();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const subject = t(isDev ? "contact.subject.dev" : "contact.subject.studio");

  return (
    <Section
      id="contact"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      lead={t("contact.lead")}
    >
      <Reveal
        className={cn(
          "grid gap-6 rounded-[1.75rem] border border-line bg-card p-7 shadow-soft sm:p-10 lg:grid-cols-[1.2fr_0.8fr]",
          isDev && "rounded-theme shadow-none",
        )}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {t("contact.email")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={mailto(site.email, subject)}
              className={cn(
                "font-display text-2xl font-semibold tracking-tight underline-offset-6 hover:underline sm:text-3xl md:text-4xl",
                isDev && "font-mono text-xl sm:text-2xl md:text-3xl",
              )}
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium text-muted transition-colors hover:text-fg"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t("contact.copied") : t("contact.copy")}
            </button>
          </div>
        </div>
        <ul className="flex flex-col gap-2 lg:items-end">
          <ContactLink href={mailto(site.email, subject)} icon={<Mail size={16} />} label={t("contact.email")} />
          <ContactLink href={site.linkedin} icon={<LinkedinIcon size={16} />} label={t("contact.linkedin")} external />
          <ContactLink href={site.github} icon={<GithubIcon size={16} />} label={t("contact.github")} external />
        </ul>
      </Reveal>
    </Section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-fg"
      >
        {icon}
        {label}
        {external && <ArrowUpRight size={14} className="opacity-60" />}
      </a>
    </li>
  );
}
