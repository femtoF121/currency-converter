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
