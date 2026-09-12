import { site } from "@/data/site";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

const REPO_URL = "https://github.com/lspdv/veronika-gabrielova";

export function Footer() {
  const { t } = useI18n();
  const { isDev } = useMode();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div
        className={cn(
          "container-x flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between",
          isDev && "font-mono text-[13px]",
        )}
      >
        <p>{t("footer.rights", { year })}</p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{t("footer.made")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("footer.stack")}</span>
          <span aria-hidden="true">·</span>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
            {t("footer.source")}
          </a>
        </p>
        <p className="font-mono text-xs">
          {t("pricing.invoice.ico")} {site.business.ico} · {t("pricing.invoice.dic")} {site.business.dic}
        </p>
      </div>
    </footer>
  );
}
