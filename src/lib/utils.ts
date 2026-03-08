import { AnalyticsRange } from "@/types/analytics";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateConversion(
  amount: number,
  fromRate?: number,
  toRate?: number,
) {
  if (!fromRate || !toRate) return 0;

  const crossRate = toRate / fromRate;
  return Number((amount * crossRate).toFixed(2));
}

export const getStartDateByRange = (range: AnalyticsRange): string => {
  const date = new Date();

  const rangeMap: Record<AnalyticsRange, () => void> = {
    "7d": () => date.setDate(date.getDate() - 7),
    "30d": () => date.setMonth(date.getMonth() - 1),
    "90d": () => date.setMonth(date.getMonth() - 3),
    "365d": () => date.setFullYear(date.getFullYear() - 1),
  };

  rangeMap[range]();

  return date.toISOString().split("T")[0];
};
