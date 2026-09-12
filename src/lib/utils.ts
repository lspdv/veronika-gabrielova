import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1200 -> "1 200" (Czech thin-space grouping) */
export function formatCzk(n: number) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(n);
}

export function mailto(email: string, subject?: string) {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${q}`;
}
