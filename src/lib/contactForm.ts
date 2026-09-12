/** Client-side checks for the Netlify contact form. Keeps bots and junk out before POST. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

/** Obvious injection / spam patterns  -  not a full sanitizer, just a gate. */
const SUSPICIOUS_RE =
  /<\s*script\b|<\/\s*script\s*>|javascript\s*:|on(?:error|load|click|mouse\w*|focus|blur|submit|input)\s*=|<\s*iframe\b|<\s*object\b|<\s*embed\b|<\s*link\b|<\s*meta\b|data\s*:\s*text\/html|<\s*svg\b[^>]*onload/i;

export const FORM_LIMITS = {
  name: 100,
  email: 254,
  message: 4000,
} as const;

export type FormFields = {
  name: string;
  email: string;
  message: string;
  /** Honeypot  -  must stay empty. */
  botField: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export type ValidateResult =
  | { ok: true; values: { name: string; email: string; message: string } }
  | { ok: false; errors: FieldErrors; /** Silent reject (bot / timing)  -  show fake success. */ silent?: boolean };

type T = (key: string) => string;

export function validateContactForm(fields: FormFields, t: T): ValidateResult {
  // Filled honeypot → bot. Don't tip them off.
  if (fields.botField.trim()) return { ok: false, errors: {}, silent: true };

  const name = fields.name.trim().replace(/\s+/g, " ");
  const email = fields.email.trim();
  const message = fields.message.trim();
  const errors: FieldErrors = {};

  if (!name) errors.name = t("form.error.name.required");
  else if (name.length > FORM_LIMITS.name) errors.name = t("form.error.name.tooLong");
  else if (SUSPICIOUS_RE.test(name)) errors.name = t("form.error.suspicious");

  if (!email) errors.email = t("form.error.email.required");
  else if (email.length > FORM_LIMITS.email || !EMAIL_RE.test(email))
    errors.email = t("form.error.email.invalid");
  else if (SUSPICIOUS_RE.test(email)) errors.email = t("form.error.email.invalid");

  if (!message) errors.message = t("form.error.message.required");
  else if (message.length > FORM_LIMITS.message) errors.message = t("form.error.message.tooLong");
  else if (SUSPICIOUS_RE.test(message)) errors.message = t("form.error.suspicious");

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, values: { name, email, message } };
}

const RATE_KEY = "vg.form.submits";
const RATE_MAX = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
/** Submits faster than this after opening the sheet are treated as bots. */
export const MIN_FILL_MS = 2500;

export function isRateLimited(): boolean {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const times: number[] = raw ? (JSON.parse(raw) as number[]) : [];
    const now = Date.now();
    const recent = times.filter((t) => now - t < RATE_WINDOW_MS);
    return recent.length >= RATE_MAX;
  } catch {
    return false;
  }
}

export function recordSubmit() {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const times: number[] = raw ? (JSON.parse(raw) as number[]) : [];
    const now = Date.now();
    const recent = times.filter((t) => now - t < RATE_WINDOW_MS);
    recent.push(now);
    localStorage.setItem(RATE_KEY, JSON.stringify(recent));
  } catch {
    /* private mode */
  }
}
