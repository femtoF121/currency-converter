import type { Currency, CurrencyCode } from "@/types/currency";

export const CURRENCIES: Currency[] = [
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "₣" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
];

export const REVALIDATION_TIME = 30 * 60 * 1000;

export const INITIAL_FROM: CurrencyCode = "USD";
export const INITIAL_TO: CurrencyCode = "UAH";
