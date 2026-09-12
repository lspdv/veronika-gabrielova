import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

export function DevToggle() {
  const { t } = useI18n();
  const { isDev, toggle, transitioningTo } = useMode();
  const busy = transitioningTo !== null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={isDev}
      aria-busy={busy}
      aria-label={isDev ? t("mode.toStudio") : t("mode.toDev")}
      title={isDev ? t("mode.studioHint") : t("mode.devHint")}
      className={cn(
        "group relative inline-flex h-9 items-center gap-1 rounded-theme px-3 font-mono text-[13px] font-semibold tracking-tight transition-all",
        isDev
          ? "rainbow-border bg-card text-fg"
          : "border border-fg/80 bg-fg text-bg hover:bg-accent hover:text-accent-fg hover:border-accent",
        busy && "cursor-wait opacity-70",
      )}
    >
      {isDev ? (
        <>
          <span className="text-accent">&lt;/</span>
          <span className="rainbow-text">DEV</span>
          <span className="text-accent">&gt;</span>
        </>
      ) : (
        <>
          <span className="opacity-60">&lt;</span>
          <span>DEV</span>
          <span className="opacity-60">/&gt;</span>
        </>
      )}
      <span className="sr-only">{isDev ? t("mode.toStudio") : t("mode.toDev")}</span>
    </button>
  );
}
