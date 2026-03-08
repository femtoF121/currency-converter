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
