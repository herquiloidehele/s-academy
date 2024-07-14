import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CurrencyCode, Locales } from "@/utils/Constants";

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
