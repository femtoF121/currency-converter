export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "PLN"
  | "JPY"
  | "CHF"
  | "CNY"
  | "CAD"
  | "AUD"
  | "BRL"
  | "CZK"
  | "DKK"
  | "HKD"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "ISK"
  | "KRW"
  | "MXN"
  | "MYR"
  | "NOK"
  | "NZD"
  | "PHP"
  | "RON"
  | "SEK"
  | "SGD"
  | "THB"
  | "TRY"
  | "ZAR";

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export type ExchangeRates = Partial<Record<CurrencyCode, number>>;
