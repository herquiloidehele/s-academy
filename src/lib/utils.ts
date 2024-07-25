import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CurrencyCode, Locales } from "@/utils/Constants";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateInFuture(years: number) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return date;
}

export const formatCurrency = (price: number) => {
  return Intl.NumberFormat([Locales.PT, Locales.EN], {
    currency: CurrencyCode.MZN,
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(price);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Format number
 * Ex: 1 => 01
 * @param number
 * @returns formatted string
 */
export function formatNumber(number: number) {
  return number.toString().padStart(2, "0");
}

export function formatDate(format: string, date?: string | Date) {
  if (!date) {
    return "--";
  }

  return dayjs(date).format(format);
}
