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

export const base64ToString = (base64: string) => {
  return Buffer.from(base64, "base64").toString("utf-8");
};

/**
 * Convert string to base64
 * @param str
 */
export const stringToBase64 = (str: string) => {
  return Buffer.from(str, "utf-8").toString("base64");
};

export const base64ToObject = (base64: string) => {
  return JSON.parse(base64ToString(base64));
};
