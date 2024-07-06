import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateInFuture(years: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return date;
}
