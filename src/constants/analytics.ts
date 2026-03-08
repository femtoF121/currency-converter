import { AnalyticsRange } from "@/types/analytics";

export const DEFAULT_ANALYTICS_RANGE: AnalyticsRange = "90d";

export const PERIODS: { label: string; value: AnalyticsRange }[] = [
  { label: "1W", value: "7d" },
  { label: "1M", value: "30d" },
  { label: "3M", value: "90d" },
  { label: "1Y", value: "365d" },
];
