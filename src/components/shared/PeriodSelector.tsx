"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_ANALYTICS_RANGE, PERIODS } from "@/constants/analytics";
import { cn } from "@/lib/utils";
import { AnalyticsRange } from "@/types/analytics";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PeriodSelector({
  currentRange = DEFAULT_ANALYTICS_RANGE,
}: {
  currentRange?: AnalyticsRange;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePeriodChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-fit bg-slate-100 p-1.5 rounded-lg border border-slate-200 shadow-inner">
      {PERIODS.map((period) => {
        const isActive = currentRange === period.value;
        return (
          <Button
            key={period.value}
            variant="ghost"
            size="sm"
            onClick={() => handlePeriodChange(period.value)}
            className={cn(
              "rounded-lg px-4 transition-colors font-bold",
              isActive
                ? "bg-white text-emerald-600 shadow-sm hover:bg-white"
                : "text-slate-500 hover:bg-slate-200",
            )}
          >
            {period.label}
          </Button>
        );
      })}
    </div>
  );
}
