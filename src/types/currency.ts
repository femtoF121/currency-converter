export type CurrencyCode =
  | "UAH"
  | "USD"
  | "EUR"
  | "GBP"
  | "PLN"
  | "JPY"
  | "CHF"
  | "CNY"
  | "CAD"
  | "AUD"
  | "SGD";

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export type ExchangeRates = Partial<Record<CurrencyCode, number>>;

export interface HistoryItem {
  id: string;
  from: Currency;
  to: Currency;
  amount: number;
  rate: number;
  result: number;
  date: string;
}
