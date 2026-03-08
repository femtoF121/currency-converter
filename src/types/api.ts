import { CurrencyCode } from "./currency";

export interface FrankfurterRates {
  [date: string]: Record<CurrencyCode, number>;
}

export interface FrankfurterResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: FrankfurterRates;
}
