import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Slightly larger mark for the hero card */
  size?: "nav" | "card";
};

/** Studio-mode wordmark: soft “prostě/just” + bold Veronika. */
export function BrandLogo({ className, size = "nav" }: Props) {
  const { t } = useI18n();

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.35em] font-display tracking-tight",
        size === "nav" && "text-lg leading-none",
        size === "card" && "text-base leading-none sm:text-lg",
        className,
      )}
      aria-label={t("brand.studio")}
    >
      <span
        className={cn(
          "font-light italic text-muted/55",
          size === "nav" && "text-[0.92em]",
          size === "card" && "text-[0.88em]",
        )}
      >
        {t("brand.studio.soft")}
      </span>
      <span className="font-semibold text-fg">{t("brand.studio.name")}</span>
    </span>
  );
}
