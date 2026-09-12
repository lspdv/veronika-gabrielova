import { Loader2, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { useContactSheet } from "@/hooks/useContactSheet";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";
import {
  FORM_LIMITS,
  MIN_FILL_MS,
  isRateLimited,
  recordSubmit,
  validateContactForm,
  type FieldErrors,
} from "@/lib/contactForm";
import { cn } from "@/lib/utils";

const FORM_NAME = "contact";

type Status = "idle" | "sending" | "ok" | "error";

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export function ContactSheet() {
  const { t } = useI18n();
  const { isDev } = useMode();
  const { open, closeSheet } = useContactSheet();
  const titleId = useId();
  const errorId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openedAtRef = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    openedAtRef.current = Date.now();
    setStatus("idle");
    setErrors({});
    setBotField("");
    const tid = window.setTimeout(() => firstFieldRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(tid);
    };
  }, [open]);

  if (!open) return null;

  const clearFieldError = (key: keyof FieldErrors) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const fakeSuccess = () => {
    setStatus("ok");
    setName("");
    setEmail("");
    setMessage("");
    setBotField("");
    setErrors({});
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const result = validateContactForm({ name, email, message, botField }, t);
    if (!result.ok) {
      if (result.silent) {
        fakeSuccess();
        return;
      }
      setErrors(result.errors);
      setStatus("idle");
      const first =
        (result.errors.name && "contact-name") ||
        (result.errors.email && "contact-email") ||
        (result.errors.message && "contact-message");
      if (first) document.getElementById(first)?.focus();
      return;
    }

    // Too fast after opening, or too many sends → treat as bot / abuse, pretend OK.
    if (Date.now() - openedAtRef.current < MIN_FILL_MS || isRateLimited()) {
      fakeSuccess();
      return;
    }

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": FORM_NAME,
          "bot-field": botField,
          name: result.values.name,
          email: result.values.email,
          message: result.values.message,
          mode: isDev ? "dev" : "studio",
          language: document.documentElement.lang || "cs",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      recordSubmit();
      fakeSuccess();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 bg-fg/45 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-[81] flex max-h-[min(92dvh,40rem)] w-full flex-col overflow-hidden border border-line bg-bg shadow-soft sm:max-w-lg sm:rounded-[1.75rem]",
          isDev && "rounded-none sm:rounded-theme font-mono",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {t("form.eyebrow")}
            </p>
            <h2 id={titleId} className={cn("mt-1 font-display text-xl font-semibold", isDev && "text-lg")}>
              {t("form.title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSheet}
            aria-label={t("form.close")}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {status === "ok" ? (
            <div className="py-6 text-center">
              <p className="font-display text-2xl font-semibold">{t("form.success.title")}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{t("form.success.lead")}</p>
              <button
                type="button"
                onClick={closeSheet}
                className={cn(
                  "mt-8 inline-flex h-11 items-center rounded-full bg-fg px-6 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-fg",
                  isDev && "rainbow-border rounded-theme bg-card text-fg hover:bg-accent",
                )}
              >
                {t("form.close")}
              </button>
            </div>
          ) : (
            <form
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              {/* Honeypot: hidden from humans, filled by naive bots */}
              <p className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  Don’t fill this out:{" "}
                  <input
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </label>
              </p>

              <Field
                label={t("form.name")}
                htmlFor="contact-name"
                error={errors.name}
                errorId={`${errorId}-name`}
              >
                <input
                  ref={firstFieldRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={FORM_LIMITS.name}
                  autoComplete="name"
                  autoCapitalize="words"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearFieldError("name");
                  }}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${errorId}-name` : undefined}
                  className={fieldClass(isDev, !!errors.name)}
                />
              </Field>

              <Field
                label={t("form.email")}
                htmlFor="contact-email"
                error={errors.email}
                errorId={`${errorId}-email`}
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={FORM_LIMITS.email}
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${errorId}-email` : undefined}
                  className={fieldClass(isDev, !!errors.email)}
                />
              </Field>

              <Field
                label={t("form.message")}
                htmlFor="contact-message"
                error={errors.message}
                errorId={`${errorId}-message`}
              >
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={FORM_LIMITS.message}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearFieldError("message");
                  }}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? `${errorId}-message` : undefined}
                  className={cn(fieldClass(isDev, !!errors.message), "min-h-[7.5rem] resize-y")}
                />
              </Field>

              {status === "error" && (
                <p className="text-sm text-accent2" role="alert">
                  {t("form.error")}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fg text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-fg disabled:opacity-60",
                  isDev && "rainbow-border rounded-theme bg-card text-fg hover:bg-accent",
                )}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  t("form.submit")
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <label htmlFor={htmlFor} className="font-medium text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-[13px] text-accent2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function fieldClass(isDev: boolean, invalid: boolean) {
  return cn(
    "w-full rounded-xl border bg-card px-3.5 py-3 text-base text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent",
    invalid ? "border-accent2" : "border-line",
    isDev && "rounded-theme font-mono text-sm",
  );
}
