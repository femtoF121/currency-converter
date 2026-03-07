"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CURRENCIES, REVALIDATION_TIME } from "@/constants/currencies";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchRates } from "@/lib/features/currency/currencySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { CurrencyCode } from "@/types/currency";
import { ArrowUpDown, RefreshCcw, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CurrencySelect } from "./CurrencySelect";

export const Converter = () => {
  const [amount, setAmount] = useState("1");
  const debouncedAmount = +useDebounce(amount, 500);

  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("UAH");

  const dispatch = useAppDispatch();
  const { rates, lastUpdated, status } = useAppSelector(
    (state) => state.currency,
  );

  const result = useMemo(() => {
    const fromRate = rates[from];
    const toRate = rates[to];

    if (!fromRate || !toRate) return 0;

    const crossRate = toRate / fromRate;
    return Number((+debouncedAmount * crossRate).toFixed(2));
  }, [debouncedAmount, from, to, rates]);

  useEffect(() => {
    const isStale =
      !lastUpdated || Date.now() - lastUpdated > REVALIDATION_TIME;

    if (status !== "loading" && isStale) {
      dispatch(fetchRates());
    }
  }, [dispatch, status, lastUpdated]);

  useEffect(() => {
    const handleOnline = () => {
      dispatch(fetchRates());
    };

    window.addEventListener("online", handleOnline);

    return () => window.removeEventListener("online", handleOnline);
  }, [dispatch]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Card className="shadow-2xl w-full max-w-xl">
      <div className="h-2 bg-linear-to-r from-emerald-500 to-amber-200" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="text-emerald-600" />
          <CardTitle className="text-lg font-bold uppercase tracking-wider">
            Currency converter
          </CardTitle>
          <div className="ml-auto flex flex-col items-center gap-1">
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
                {status === "succeeded" ? "Live" : "Offline"} Currency Rates
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
                onClick={() => dispatch(fetchRates())}
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

      <CardContent>
        <div className="flex items-end gap-4">
          <Field>
            <FieldLabel
              className="text-sm font-semibold text-slate-500 uppercase"
              htmlFor="convert-from"
            >
              From
            </FieldLabel>
            {status === "loading" ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <Input
                id="convert-from"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onFocus={(e) => +e.target.value === 0 && setAmount("")}
                onBlur={(e) => e.target.value === "" && setAmount("1")}
              />
            )}
          </Field>
          <CurrencySelect
            items={CURRENCIES.filter(({ code }) => code !== to)}
            value={from}
            onValueChange={setFrom}
          />
        </div>

        <div className="relative py-6 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-12 w-12 border-2 shadow-lg hover:bg-white hover:border-amber-400 hover:text-amber-500 transition-all z-10 group"
          >
            <ArrowUpDown className="size-5 group-hover:rotate-180 transition-all duration-500" />
          </Button>
          <div className="w-full border-t-2 border-dashed" />
        </div>

        <div className="flex items-end gap-4">
          <Field className="text-emerald-600">
            <FieldLabel
              className="text-sm font-semibold uppercase"
              htmlFor="convert-to"
            >
              To
            </FieldLabel>
            {status === "loading" ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <Input
                className="font-semibold border-emerald-300"
                id="convert-to"
                type="number"
                value={result}
                readOnly
              />
            )}
          </Field>
          <CurrencySelect
            items={CURRENCIES.filter(({ code }) => code !== from)}
            value={to}
            onValueChange={setTo}
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 mt-4 rounded-lg bg-amber-50 border border-amber-200">
          <TrendingUp className="text-amber-600" />
          <p className="text-sm text-amber-800 font-medium">
            Rate: 1 {from} ={" "}
            {debouncedAmount > 0
              ? (result / debouncedAmount).toFixed(4)
              : "0.0000"}{" "}
            {to}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
