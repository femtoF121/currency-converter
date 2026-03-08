export type AnalyticsRange = "7d" | "30d" | "90d" | "365d";

export interface ChartDataPoint {
  date: string;
  rate: number;
}
