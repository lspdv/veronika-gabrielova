import { LANGUAGES, type Language } from "@/data/translations";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

const SHORT: Record<Language, string> = { cs: "CZ", en: "EN" };

export function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("language.switch")}
      className="inline-flex h-9 items-center rounded-theme border border-line p-0.5 font-mono text-[12px]"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={t(`language.${lang}`)}
          className={cn(
            "h-full rounded-[calc(var(--radius)-2px)] px-2.5 transition-colors",
            language === lang ? "bg-fg text-bg" : "text-muted hover:text-fg",
          )}
        >
          {SHORT[lang]}
        </button>
      ))}
    </div>
  );
}
