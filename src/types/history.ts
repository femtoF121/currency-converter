import { CurrencyCode } from "./currency";

export interface HistoryItem {
  id: string;
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
  result: number;
  timestamp: number;
}
