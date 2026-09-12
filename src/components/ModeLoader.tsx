import { useEffect, useState } from "react";

import { useI18n } from "@/hooks/useI18n";
import { useMode, type Mode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

const DEV_STEPS = ["dev.loading.step.1", "dev.loading.step.2", "dev.loading.step.3", "dev.loading.step.4"] as const;
const STUDIO_STEPS = [
  "studio.loading.step.1",
  "studio.loading.step.2",
  "studio.loading.step.3",
  "studio.loading.step.4",
] as const;

export function ModeLoader() {
  const { transitioningTo, switchCount } = useMode();
  if (!transitioningTo) return null;
  return <ModeLoaderScreen key={switchCount} target={transitioningTo} />;
}

function ModeLoaderScreen({ target }: { target: Mode }) {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // Ease out cubic  -  hangs a bit near the end like a real loader.
      const eased = 1 - (1 - p) ** 3;
      setProgress(Math.round(eased * 100));
      setStep(Math.min(3, Math.floor(eased * 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setProgress(100);
        setLeaving(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (target === "dev") {
    return (
      <div
        className={cn("mode-loader mode-loader-dev", leaving && "mode-loader-leave")}
        role="status"
        aria-live="polite"
        aria-label={t("dev.loading.title")}
      >
        <div className="mode-loader-scan" aria-hidden="true" />
        <div className="relative z-10 flex w-full max-w-md flex-col items-stretch gap-6 px-5">
          <p className="font-pixel text-[10px] leading-relaxed text-[#4dd2ff] sm:text-xs">
            {t("dev.loading.eyebrow")}
          </p>
          <h2 className="font-pixel text-sm leading-snug text-[#ffe63b] sm:text-base">
            {t("dev.loading.title")}
            <span className="mode-loader-blink">_</span>
          </h2>
          <div className="space-y-2 font-pixel text-[9px] leading-relaxed text-[#eef3ff] sm:text-[10px]">
            {DEV_STEPS.map((key, i) => (
              <p
                key={key}
                className={cn(
                  "transition-opacity duration-200",
                  i < step ? "text-[#4ff05a]" : i === step ? "text-[#eef3ff]" : "text-[#23375f]",
                )}
              >
                {i < step ? ">" : i === step ? "*" : " "} {t(key)}
                {i === step && <span className="mode-loader-blink">...</span>}
                {i < step && " OK"}
              </p>
            ))}
          </div>
          <div>
            <div className="flex items-end justify-between font-pixel text-[9px] text-[#9fb0d0]">
              <span>{t("dev.loading.progress")}</span>
              <span className="text-[#ff66c4]">{progress}%</span>
            </div>
            <div className="mt-2 h-4 border-2 border-[#eef3ff] bg-[#0b1d3a] p-0.5">
              <div
                className="h-full bg-[repeating-linear-gradient(90deg,#ff66c4_0_6px,#0b1d3a_6px_8px)] transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="font-pixel text-[8px] text-[#6f7fa3] sm:text-[9px]">{t("dev.loading.hint")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("mode-loader mode-loader-studio", leaving && "mode-loader-leave")}
      role="status"
      aria-live="polite"
      aria-label={t("studio.loading.title")}
    >
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 text-center">
        <div className="mode-loader-ring" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="h-14 w-14">
            <circle cx="32" cy="32" r="28" className="mode-loader-ring-track" />
            <circle
              cx="32"
              cy="32"
              r="28"
              className="mode-loader-ring-value"
              style={{ strokeDashoffset: `${176 - (176 * progress) / 100}` }}
            />
          </svg>
        </div>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          {t("studio.loading.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          {t("studio.loading.title")}
        </h2>
        <p className="mt-3 text-sm text-muted">{t(STUDIO_STEPS[step])}</p>
        <div className="mt-8 h-px w-full max-w-[12rem] overflow-hidden bg-line">
          <div
            className="h-full bg-fg transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-[11px] tabular-nums text-muted">{progress}%</p>
      </div>
    </div>
  );
}
