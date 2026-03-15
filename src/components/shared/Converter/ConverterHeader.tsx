"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConverterHeader } from "@/hooks/useConverterHeader";
import { cn } from "@/lib/utils";
import { RefreshCcw, Wallet } from "lucide-react";

export function ConverterHeader() {
  const { lastUpdated, handleRefresh, status } = useConverterHeader();

  console.log(status);

  return (
    <CardHeader>
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="text-emerald-600" />
          <CardTitle className="text-lg font-bold uppercase tracking-wider">
            Currency converter
          </CardTitle>
        </div>
        <div className="flex flex-row sm:flex-col justify-between items-center">
          {status === "loading" ? (
            <Skeleton className="h-6 w-36 rounded-full" />
          ) : (
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold uppercase",
                status === "failed"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-emerald-100 text-emerald-700",
              )}
            >
              {status === "failed" ? "Offline" : "Live"} Currency Rates
            </div>
          )}
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-slate-500">
              Updated:{" "}
              {lastUpdated
                ? new Date(lastUpdated).toLocaleTimeString()
                : "Never"}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleRefresh}
              title="Update currency rate"
              disabled={status === "loading"}
            >
              <RefreshCcw
                className={cn(
                  status === "loading" && "animate-spin direction-reverse",
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
