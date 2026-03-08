import { DEFAULT_ANALYTICS_RANGE } from "@/constants/analytics";
import { getStartDateByRange } from "@/lib/utils";
import { AnalyticsRange, ChartDataPoint } from "@/types/analytics";
import { FrankfurterResponse } from "@/types/api";
import { CurrencyCode } from "@/types/currency";

const BASE_URL = "https://api.frankfurter.app";

export async function fetchHistoryData(
  from: CurrencyCode,
  to: CurrencyCode,
  range?: AnalyticsRange,
): Promise<ChartDataPoint[]> {
  const endDate = new Date().toISOString().split("T")[0];
  const startDate = getStartDateByRange(range || DEFAULT_ANALYTICS_RANGE);

  try {
    const response = await fetch(
      `${BASE_URL}/${startDate}..${endDate}?from=${from}&to=${to}`,
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: FrankfurterResponse = await response.json();

    if (!data.rates) return [];

    return Object.entries(data.rates).map(([date, rateObj]) => ({
      date,
      rate: rateObj[to],
    }));
  } catch (error) {
    console.error("Failed to fetch historical analytics:", error);
    return [];
  }
}
