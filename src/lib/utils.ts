import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1200 -> "1 200" (Czech thin-space grouping) */
export function formatCzk(n: number) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 }).format(n);
}

/** Whole years since a given year — rolls over every Jan 1. */
export function yearsSince(year: number) {
  return Math.max(1, new Date().getFullYear() - year);
}
